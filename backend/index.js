const express = require("express");
const cors = require("cors");

const admin = require("firebase-admin");
const dotenv = require("dotenv");

dotenv.config();

// Initialize Firebase
if (!admin.apps.length) {
    admin.initializeApp({
        projectId: "gen-lang-client-0569630162",
    });
}
const db = admin.firestore();
db.settings({
    databaseId: "civshield-database"
});

const GEMINI_KEY = process.env.GEMINI_API_KEY;

const app = express();
app.use(cors());
app.use(express.json());

// ----- Route 1: Return threat zones from Firestore -----
app.get("/threats", async (req, res) => {
    try {
        const snapshot = await db.collection("threats").get();
        const threats = [];
        snapshot.forEach(doc => {
            threats.push(doc.data());
        });
        res.json(threats);
    } catch (error) {
        console.error("Error getting threats:", error);
        res.status(500).json({ error: "Failed to fetch threats" });
    }
});

// ----- Route 2: Call Gemini for safety advice -----
app.post("/advise", async (req, res) => {
    const { message, history = [] } = req.body;

    if (!message) return res.status(400).json({ error: "Missing message" });

    try {
        // Build conversation contents for Gemini
        // History format: [{ role: 'user' | 'assistant', content: string }]
        const contents = [];

        // Add conversation history
        history.forEach(msg => {
            contents.push({
                role: msg.role === 'assistant' ? 'model' : 'user',
                parts: [{ text: msg.content }]
            });
        });

        // Add current message with system prompt
        const systemPrompt = `You are an emergency safety assistant for civilians in conflict zones or dangerous situations.
Provide clear, actionable safety instructions. If they describe a specific threat, give 5-10 step-by-step instructions.
If they ask a general question, provide helpful safety advice relevant to their situation.
Be concise, direct, and prioritize their immediate safety.`;

        contents.push({
            role: 'user',
            parts: [{ text: `${systemPrompt}\n\nUser: ${message}` }]
        });

        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${GEMINI_KEY}`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ contents }),
            }
        );

        const result = await response.json();
        console.log("Gemini API Status:", response.status);

        const advice = result.candidates?.[0]?.content?.parts?.[0]?.text || "No advice available";
        res.json({ advice });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to get advice from Gemini" });
    }
});

// ----- Start server -----
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
