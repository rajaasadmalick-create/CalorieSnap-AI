# CalorieSnap AI

CalorieSnap AI is a full-stack, AI-powered nutrition tracking application. Stop guessing the nutritional value of your meals—simply snap a photo, and the application instantly analyzes calories, proteins, carbohydrates, fats, and key vitamins using advanced Vision-Language Models.

## Features

- **Instant Vision Analysis:** Identifies meals and ingredients from photos instantly.
- **Full Macro Breakdown:** Precise estimates for calories, proteins, carbohydrates, and fats.
- **Actionable AI Insights:** Personalized suggestions to improve your meal's nutritional balance.
- **Meal History Tracking:** A persistent visual diary of all your scanned meals backed by Firestore.
- **Secure Authentication:** Easy and secure Google Login via Firebase Authentication.

## Tech Stack

- **Frontend:** React 18, Vite, TypeScript, Tailwind CSS, shadcn/ui.
- **Backend:** Express.js (integrated with Vite via middleware in development).
- **AI Processing:** OpenRouter API (using `openai` SDK to call Google's Gemini Flash model).
- **Database & Auth:** Firebase (Firestore Enterprise, Google Provider Authentication).

## Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/en/) (v18 or higher recommended)
- [npm](https://www.npmjs.com/)

You will also need:
- An [OpenRouter API Key](https://openrouter.ai/) for the vision model.
- A Firebase project with Firestore Data and Google Authentication enabled.

## Complete Local Setup

### 1. Install Dependencies

In the root folder of the project, run:

```bash
npm install
```

### 2. Environment Variables

Create a new file named `.env` in the root of your project by copying `.env.example`:

```bash
cp .env.example .env
```

Open the `.env` file and add your OpenRouter API key:

```env
OPENROUTER_API_KEY="your_openrouter_api_key_here"
```

### 3. Firebase Configuration

Make sure your `firebase-applet-config.json` is properly populated with your Firebase project credentials. It should look like this:

```json
{
  "apiKey": "AIzaSy...",
  "authDomain": "your-project-id.firebaseapp.com",
  "projectId": "your-project-id",
  "storageBucket": "your-project-id.appspot.com",
  "messagingSenderId": "1234567890",
  "appId": "1:1234567890:web:abcdef",
  "firestoreDatabaseId": "(default)" 
}
```

Deploy the Firestore security rules via the Firebase console or Firebase CLI (`firebase deploy --only firestore:rules`) using the provided `firestore.rules` file in the project.

### 4. Run the Development Server

Start the application using the full-stack development script:

```bash
npm run dev
```

The application will start handling both the API backend and the Vite frontend simultaneously. 

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

## Building for Production

To build the application for production, run:

```bash
npm run build
```

This will run the TypeScript compiler and Vite build process, generating the static frontend files in the `dist/` directory.

To test the production build locally:

```bash
npm start
```

This starts the Express server which will serve the API endpoints and the static files from the `dist/` folder.

## Folder Structure

- `/src`: Contains the React frontend code (Pages, Components, Contexts, Layouts).
- `/server.ts`: The Express backend entry point that handles the API routes (e.g., `/api/analyze-meal`).
- `/components`: shadcn/ui React components.
- `/firestore.rules`: Security rules for the Firebase Firestore database.
