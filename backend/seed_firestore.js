const admin = require("firebase-admin");
const threats = require("./threats.json");

// Initialize Firebase Admin SDK
admin.initializeApp({
    projectId: "gen-lang-client-0569630162",
});

const db = admin.firestore();
db.settings({
    databaseId: "civshield-database"
});

async function seedDatabase() {
    console.log("Seeding Firestore...");
    const batch = db.batch();

    threats.forEach((threat) => {
        // Use the ID from the JSON as the document ID
        const docRef = db.collection("threats").doc(String(threat.id));
        // Ensure timestamp is included (it's in the JSON now)
        batch.set(docRef, threat);
    });

    try {
        await batch.commit();
        console.log("Successfully seeded database with " + threats.length + " threats.");
    } catch (error) {
        console.error("Error seeding database:", error);
    }
}

seedDatabase();
