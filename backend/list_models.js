const dotenv = require("dotenv");
dotenv.config();

const GEMINI_KEY = process.env.GEMINI_API_KEY;

async function listModels() {
    try {
        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models?key=${GEMINI_KEY}`
        );
        const result = await response.json();
        const geminiModels = result.models.filter(m => m.name.includes("gemini")).map(m => m.name);
        console.log(JSON.stringify(geminiModels, null, 2));
    } catch (err) {
        console.error(err);
    }
}

listModels();
