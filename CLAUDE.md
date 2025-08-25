# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Interactive quiz application built in React for "Procedimientos Operativos" educational content. The app supports real-time teacher-student interaction using Firebase Realtime Database, with QR code generation for easy student access.

## Development Commands

### Essential Commands
```bash
npm install          # Install dependencies
npm start           # Start development server (localhost:3000)
npm run build       # Build for production
npm run deploy      # Build and deploy to Netlify
```

### Firebase Setup Required
- Create Firebase project with Realtime Database
- Configure environment variables in `.env`:
  - `REACT_APP_FIREBASE_API_KEY`
  - `REACT_APP_FIREBASE_AUTH_DOMAIN` 
  - `REACT_APP_FIREBASE_DATABASE_URL`
  - `REACT_APP_FIREBASE_PROJECT_ID`
  - `REACT_APP_FIREBASE_STORAGE_BUCKET`
  - `REACT_APP_FIREBASE_MESSAGING_SENDER_ID`
  - `REACT_APP_FIREBASE_APP_ID`

## Architecture Overview

### Core Flow
1. **Landing** → Choose Teacher or Student mode
2. **Teacher View** → Create session, display QR code, monitor responses
3. **Student View** → Join via QR/URL, answer questions, submit
4. **Results View** → Real-time response aggregation and display

### Key Components Architecture
- **App.js**: Main router managing mode states (`landing`, `teacher`, `student`, `results`)
- **useSession hook**: Firebase integration for session management, real-time data sync
- **questions.js**: Question bank with multiple question types (`trueFalse`, `multiple`, `match`, `open`, `fill`)

### Session Management
- Sessions identified by 6-character uppercase codes
- Real-time sync via Firebase listeners
- Response tracking with timestamps
- Automatic session cleanup capabilities

### Question Types Support
- True/False with multiple statements
- Multiple choice
- Column matching (definitions to concepts)  
- Open-ended text responses
- Fill-in-the-blank

### Styling Architecture
- TailwindCSS for utility classes
- Custom dark theme in `src/dark-theme.css`
- Apple-inspired design system
- Responsive mobile-first approach

## Firebase Data Structure
```
sessions/
  {sessionCode}/
    code: string
    createdAt: timestamp
    status: 'active'
    responses/
      {responseId}/
        studentName: string
        answers: object
        submittedAt: timestamp
```

## Key Files
- `src/utils/questions.js` - Question bank and structure definitions
- `src/hooks/useSession.js` - Firebase session management
- `src/config/firebase.js` - Firebase configuration with environment fallbacks
- `src/components/` - UI components for each view mode

## Educational Content Context
Spanish-language quiz focused on "Procedimientos Operativos" (Operational Procedures) in industrial settings. Content includes safety procedures, operational guidelines, and risk management concepts.