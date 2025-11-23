# CIVshield Mobile App 🛡️

A mobile security and safety application built with React Native (Expo) that provides real-time safety assistance, danger zone mapping, and AI-powered safety guidance using Google Gemini.

## 📱 Project Overview

CIVshield is a comprehensive safety application designed to help civilians navigate dangerous situations by providing:
- **AI-powered safety assistant** using Google Gemini
- **Real-time danger zone mapping** with Google Maps
- **Offline safety manual** for critical situations
- **Multi-language support** with automatic translation
- **Emergency scenario guidance** for various threat types

## 🏗️ Architecture

### Frontend (Mobile App)
- **Framework**: React Native with Expo
- **Styling**: Tailwind CSS (via NativeWind or similar)
- **Key Features**:
  - Google Gemini safety assistant integration
  - Offline safety manual
  - Interactive map displaying danger zones
  - Real-time risk dashboard

### Backend
- **Framework**: Express.js (Node.js)
- **Deployment**: Google Cloud Run
- **Functionality**:
  - Receives and reviews user scenarios
  - Provides safety suggestions using Gemini API
  - Handles translation requests
  - Manages safe zones and reports (optional Firestore integration)

### Data Flow

```
Mobile App (React Native)
    |
    | axios POST
    v
Express Backend (Node.js)
    |
    | API Request
    v
Gemini API
    ├── Safety Instructions
    └── Translation Services
    |
    | (optional)
    v
Firestore
    ├── Safe zones
    └── Reports
```

### External Services
- **Google Maps JS API**: Frontend map visualization
- **Google Gemini API**: AI safety assistant and translation
- **Google Cloud Run**: Backend hosting
- **Firestore** (optional): Safe zones and reports storage

## ✨ Core MVP Features

### 1. Real-time Risk Dashboard (3 hours)
- Display crisis data on an interactive map
- Use static dataset or mock data for MVP
- Google Maps API integration
- Visual representation of danger zones

### 2. Gemini "What Should I Do?" Safety Assistant (1-2 hours)
- Single endpoint: send threat type → receive safety steps
- Example prompt: *"Gemini, provide step-by-step safety instructions for civilians in a warzone when they hear explosions."*
- High-impact, easy-to-implement feature

### 3. War Scenario Action Generator + Safety UI (2 hours)
- Chat-like interface or quick-select buttons for common scenarios:
  - "Airstrike nearby"
  - "Gunfire heard"
  - "Roadblock reported"
- Gemini returns contextual safety actions

### 4. Multi-language Auto-translation (30 minutes)
- Leverage Gemini's built-in translation capabilities
- ~20 lines of code integration
- Automatic language detection and translation

### 5. GCP Deployment (2-3 hours)
- Cloud Run hosting for backend
- Firebase/Firestore for shelter locations and reports
- Production-ready deployment setup

**Total MVP Development Time: ~24 hours**

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Expo CLI
- Google Cloud Platform account (for Gemini API and Cloud Run)
- Google Maps API key

### Installation

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Start the development server**
   ```bash
   npx expo start
   ```

3. **Run on your preferred platform**
   ```bash
   # iOS
   npm run ios
   
   # Android
   npm run android
   
   # Web
   npm run web
   ```

### Environment Setup

Create a `.env` file in the root directory:
```
GOOGLE_MAPS_API_KEY=your_maps_api_key
GEMINI_API_KEY=your_gemini_api_key
BACKEND_URL=your_backend_url
```

## 📁 Project Structure

```
civshield-mobile/
├── app/                    # Expo Router pages
│   ├── (tabs)/            # Tab navigation screens
│   │   ├── index.tsx      # Home screen
│   │   └── explore.tsx    # Explore/Safety features
│   ├── _layout.tsx        # Root layout
│   └── modal.tsx          # Modal screens
├── components/            # Reusable components
│   ├── ui/               # UI components
│   └── ...               # Other components
├── hooks/                # Custom React hooks
├── constants/            # App constants and themes
└── assets/              # Images and static assets
```

## 🔧 Development

### Key Technologies
- **React Native**: 0.81.5
- **Expo**: ~54.0.25
- **Expo Router**: ~6.0.15 (file-based routing)
- **React**: 19.1.0
- **TypeScript**: ~5.9.2

### Available Scripts
- `npm start` - Start Expo development server
- `npm run ios` - Run on iOS simulator
- `npm run android` - Run on Android emulator
- `npm run web` - Run on web browser
- `npm run lint` - Run ESLint

## 🌐 API Integration

### Gemini API Usage
The app uses Google Gemini API for:
- **Safety Instructions**: Context-aware safety guidance based on user scenarios
- **Translation**: Multi-language support for global accessibility

Example integration:
```typescript
// Send user scenario to backend
const response = await axios.post(`${BACKEND_URL}/safety-assistant`, {
  scenario: "Airstrike nearby",
  language: "en"
});

// Backend processes with Gemini API
// Returns step-by-step safety instructions
```

## 🗺️ Map Integration

Google Maps JS API is used to:
- Display real-time danger zones
- Show safe zones and shelters
- Provide location-based safety information
- Visualize risk areas on interactive map

## 📝 Features Roadmap

### MVP (Current)
- ✅ Basic UI with CivShield branding
- ⏳ Real-time risk dashboard
- ⏳ Gemini safety assistant
- ⏳ Scenario action generator
- ⏳ Multi-language translation
- ⏳ GCP deployment

### Future Enhancements
- Offline mode with cached safety manual
- Push notifications for nearby threats
- Community reporting system
- Emergency contact integration
- Historical threat data visualization

## 🤝 Contributing

This is a private project. For questions or contributions, please contact the development team.

## 📄 License

Private project - All rights reserved

## 🔗 Resources

- [Expo Documentation](https://docs.expo.dev/)
- [React Native Documentation](https://reactnative.dev/)
- [Google Gemini API](https://ai.google.dev/)
- [Google Maps API](https://developers.google.com/maps)
- [Google Cloud Run](https://cloud.google.com/run)

---

**Built with ❤️ for civilian safety and protection**
