# CIVshield 🛡️

**A mobile safety application built in 24 hours for civilians in conflict zones**

CIVshield is a React Native mobile app that provides real-time threat mapping, AI-powered safety guidance, and offline capabilities to help civilians navigate dangerous situations.

## What We Built

In 24 hours, we created a fully functional mobile safety application with:

- **Interactive Threat Map**: Real-time visualization of danger zones, safe areas, and critical infrastructure
- **AI Safety Assistant**: Google Gemini-powered chat interface that provides contextual safety advice
- **Offline Maps**: Download and view threat data for areas without internet connectivity
- **Cloud Backend**: Express.js API deployed on Google Cloud Run with Firestore integration

## Key Features

### Real-Time Threat Mapping
- Color-coded markers (High/Medium/Low/Safe) showing threat levels
- Interactive map with user location tracking
- Threat details including type, timestamp, and location
- Tap markers to get context-aware safety advice

### AI Safety Assistant
- Chat interface powered by Google Gemini
- Contextual safety instructions based on threat scenarios
- Attach threat data from map for personalized advice
- Conversation history for follow-up questions

### Offline Capabilities
- Download map regions for offline use
- View saved threat data without internet connection
- Manage multiple downloaded regions
- Essential for areas with unreliable connectivity

## Tech Stack

### Frontend
- **React Native** with **Expo** (~54.0.25)
- **Expo Router** for file-based navigation
- **react-native-maps** for map visualization
- **AsyncStorage** for offline data persistence
- **TypeScript** for type safety

### Backend
- **Node.js** with **Express.js**
- **Google Gemini API** for AI safety advice
- **Firebase Firestore** for threat data storage
- **Google Cloud Run** for serverless deployment

## Project Structure

```
react-native-node-project/
├── frontend/              # React Native mobile app
│   ├── app/              # Expo Router screens
│   │   ├── (tabs)/       # Tab navigation
│   │   │   ├── index.tsx      # Map screen
│   │   │   ├── explore.tsx    # Safety assistant
│   │   │   └── offline-maps.tsx  # Offline maps list
│   │   └── offline-map-viewer.tsx
│   ├── components/       # Reusable components
│   ├── services/         # API and storage services
│   └── hooks/            # Custom React hooks
│
└── backend/              # Express.js API server
    ├── index.js          # Main server file
    ├── threats.json      # Seed data
    └── Dockerfile        # Container config
```

## Quick Start

### Prerequisites
- Node.js (v18+)
- npm or yarn
- Expo CLI (`npm install -g expo-cli`)
- Google Cloud Platform account (for Gemini API and Cloud Run)
- Google Maps API key

### Frontend Setup

```bash
cd frontend
npm install
npx expo start
```

Then press:
- `i` for iOS simulator
- `a` for Android emulator
- `w` for web browser

### Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file:
```
GEMINI_API_KEY=your_gemini_api_key
PORT=8080
```

Start the server:
```bash
npm start
```

### Environment Variables

**Frontend** (`frontend/.env`):
```
EXPO_PUBLIC_GOOGLE_MAPS_API_KEY=your_maps_api_key
EXPO_PUBLIC_BACKEND_URL=your_backend_url
```

**Backend** (`backend/.env`):
```
GEMINI_API_KEY=your_gemini_api_key
PORT=8080
```

## Screenshots & Features

### Map View
- Interactive map with threat markers
- Color-coded threat levels
- Download area button for offline access
- Threat legend for quick reference

### Safety Assistant
- Chat interface with AI-powered responses
- Attach threat context from map
- New conversation button
- Real-time safety guidance

### Offline Maps
- List of downloaded regions
- View saved threats offline
- Delete unwanted regions
- Download date and threat count

## API Endpoints

### `GET /threats`
Returns all threat data from Firestore.

**Response:**
```json
[
  {
    "id": 1,
    "lat": 31.524,
    "lng": 34.452,
    "threatLevel": "high",
    "type": "Airstrike reported",
    "timestamp": "2025-11-23T01:50:00.000Z"
  }
]
```

### `POST /advise`
Get AI-powered safety advice from Gemini.

**Request:**
```json
{
  "message": "I hear explosions nearby. What should I do?",
  "history": [
    { "role": "user", "content": "Previous message" },
    { "role": "assistant", "content": "Previous response" }
  ]
}
```

**Response:**
```json
{
  "advice": "1. Immediately seek cover in a basement or interior room...\n2. Stay away from windows..."
}
```

## Deployment

### Backend (Google Cloud Run)

1. Build Docker image:
```bash
cd backend
gcloud builds submit --tag gcr.io/PROJECT_ID/civshield-backend
```

2. Deploy to Cloud Run:
```bash
gcloud run deploy civshield-backend \
  --image gcr.io/PROJECT_ID/civshield-backend \
  --platform managed \
  --region us-central1
```

### Frontend (Expo)

Build for production:
```bash
cd frontend
eas build --platform android
eas build --platform ios
```

## Hackathon Highlights

-  **Real-time threat visualization** with interactive maps
-  **AI integration** with Google Gemini for contextual safety advice
-  **Offline functionality** for areas with poor connectivity
-  **Cloud deployment** on Google Cloud Run
-  **Full-stack implementation** in 24 hours
-  **Production-ready** architecture with TypeScript

## Future Enhancements

- Push notifications for nearby threats
- Community reporting system
- Multi-language support with auto-translation
- Historical threat data visualization
- Emergency contact integration
- Route planning to avoid danger zones

## License

Built for hackathon purposes. All rights reserved.

## Team

Built in 24 hours by:
Alexander Williamson  
Sanad Mustafa  
Shayan Khattak  
Alexander Spreer-Pimenta  
Jahangir Khan  

---

**Built for civilian safety and protection**
