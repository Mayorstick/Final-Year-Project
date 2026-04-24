# Accessibility Explainer 🌐

A web-based learning application that helps students and developers understand web accessibility issues through gamification, AI-powered feedback, and interactive missions.

🔗 **Live Demo:** [final-year-project-mocha-phi.vercel.app](https://final-year-project-mocha-phi.vercel.app)

---

## Features

- 🎭 **Persona System** : Experience accessibility issues from the perspective of real users (screen reader, low vision, keyboard-only, situational)
- 🏆 **Gamified Missions** : Complete interactive accessibility challenges and earn XP
- 🤖 **AI Feedback Explainer** : Paste real accessibility audit feedback and get a simple AI-powered explanation
- 💬 **Word Tooltip** : Highlight any word on any page to get an instant AI explanation in plain English
- 📊 **Leaderboard** : Compete with other users based on XP earned
- 🌙 **Dark Mode** : Full dark mode support
- 📱 **Responsive** : Works on desktop and mobile

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React, Vite, TypeScript, Tailwind CSS |
| Backend | Node.js, Express, TypeScript |
| Database | Firebase Firestore |
| Authentication | Firebase Auth |
| AI | OpenAI GPT-4o-mini |
| Hosting (Frontend) | Vercel |
| Hosting (Backend) | Railway |

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org) v18 or higher
- [Git](https://git-scm.com)
- An [OpenAI API key](https://platform.openai.com/api-keys)

### Installation

**1. Clone the repository**
```bash
git clone https://github.com/Mayorstick/Final-Year-Project.git
cd Final-Year-Project
```

**2. Set up the backend**
```bash
cd server
npm install
```

Create a `.env` file inside the `server` folder:
```
OPENAI_API_KEY=your_openai_api_key_here
PORT=5001
```

Start the backend:
```bash
npm run dev
```

**3. Set up the frontend**

Open a second terminal:
```bash
cd accessibility-feedback
npm install --legacy-peer-deps
npm run dev
```

The app will be available at **http://localhost:5173**

> ⚠️ For local development, update the backend URL in `src/pages/ExplainFeedback.tsx` and `src/components/WordExplainer.tsx` from the Railway URL to `http://localhost:5001`

---

## Project Structure

```
Final-Year-Project/
│
├── accessibility-feedback/         # React frontend
│   ├── public/
│   │   └── videos/                 # Persona demo videos
│   ├── src/
│   │   ├── components/             # Reusable UI components
│   │   │   ├── demos/              # Interactive accessibility demos
│   │   │   │   ├── HappyCycleDemo.tsx
│   │   │   │   ├── HappyCycleMission2Demo.tsx
│   │   │   │   ├── KeyboardDemo.tsx
│   │   │   │   ├── KeyboardMission2Demo.tsx
│   │   │   │   ├── LowVisionDemo.tsx
│   │   │   │   ├── MissingAltTextDemo.tsx
│   │   │   │   ├── SunlightDemo.tsx
│   │   │   │   └── UnlabeledCheckoutButtonDemo.tsx
│   │   │   ├── BadgesCard.tsx
│   │   │   ├── ContinueJourneyCard.tsx
│   │   │   ├── DemoSiteFrame.tsx
│   │   │   ├── EncouragementBanner.tsx
│   │   │   ├── PersonaCardRow.tsx
│   │   │   ├── ProgressCard.tsx
│   │   │   ├── ProtectedRoute.tsx
│   │   │   ├── StatsCard.tsx
│   │   │   ├── WelcomeAnimation.tsx
│   │   │   └── WordExplainer.tsx
│   │   ├── context/                # React context providers
│   │   ├── data/                   # Static mission and issue data
│   │   │   ├── issue.ts
│   │   │   ├── missions.ts
│   │   │   └── quickChecks.ts
│   │   ├── firebase/               # Firebase configuration
│   │   ├── hooks/                  # Custom React hooks
│   │   │   └── useUserProfile.tsx
│   │   ├── layouts/                # Page layout components
│   │   │   ├── AppLayout.tsx
│   │   │   └── Navbar.tsx
│   │   ├── pages/                  # Application pages
│   │   ├── routes/                 # Route definitions
│   │   ├── services/               # API service functions
│   │   ├── types/                  # TypeScript type definitions
│   │   │   ├── aiMission.ts
│   │   │   └── generatedIssue.ts
│   │   └── utils/                  # Utility functions
│   │       ├── feedbackGenerator.ts
│   │       ├── progress.ts
│   │       └── progressUpdate.ts
│   ├── App.tsx
│   ├── main.tsx
│   ├── firebase.json
│   └── package.json
│
└── server/                         # Node.js backend
    ├── src/
    │   └── server.ts               # Express server + OpenAI integration
    ├── uploads/                    # Temporary screenshot uploads
    ├── .env                        # Environment variables (not committed)
    ├── package.json
    └── tsconfig.json
```

---

## Environment Variables

### Backend (`server/.env`)

| Variable | Description |
|----------|-------------|
| `OPENAI_API_KEY` | Your OpenAI API key |
| `PORT` | Server port (default: 5001) |

---

## License

This project was developed as a Final Year Project. All rights reserved.
