const fs = require('fs');
const path = require('path');

const folders = [
  'server/src/config',
  'server/src/models',
  'server/src/controllers',
  'server/src/services',
  'server/src/middleware',
  'server/src/routes',
  'client/public',
  'client/src/assets',
  'client/src/components/ui',
  'client/src/components/interview',
  'client/src/components/feedback',
  'client/src/components/dashboard',
  'client/src/components/layout',
  'client/src/context',
  'client/src/hooks',
  'client/src/pages',
  'client/src/services',
  'client/src/styles',
  'client/src/utils',
];

const files = {
  // server
  'server/src/config/db.js': '// Mongoose connection\n',
  'server/src/config/env.js': '// Centralized env variable exports\n',
  'server/src/models/User.model.js': '// clerkId, name, email, createdAt\n',
  'server/src/models/Session.model.js': '// userId, startedAt, endedAt, avgScore, status\n',
  'server/src/models/Question.model.js': '// text, category, difficulty, tags[]\n',
  'server/src/models/Answer.model.js': '// sessionId, questionId, userId, transcript, feedbackObject, audioUrl, recordedAt\n// feedbackObject{score, clarity, relevance, confidence, strengths[], improvements[], idealAnswer}\n',
  'server/src/controllers/session.controller.js': '// createSession, getSession, endSession, getUserSessions\n',
  'server/src/controllers/answer.controller.js': '// submitAnswer, getAnswersBySession\n',
  'server/src/controllers/question.controller.js': '// getQuestions, getQuestionById, seedQuestions\n',
  'server/src/services/sarvam.service.js': '// transcribeAudio(audioBuffer) → string transcript\n// Accept audio buffer + mimeType\n// POST to Sarvam API as multipart/form-data using axios\n// Return plain transcript string\n',
  'server/src/services/gemini.service.js': '// getFeedback(question, transcript) → JSON feedback object\n// Accept question (string) + transcript (string)\n// Use @google/generative-ai SDK, model: gemini-1.5-flash\n// Send structured prompt requesting ONLY JSON output\n// Parse and return object with: { score, clarity, relevance, confidence, strengths[], improvements[], idealAnswer }\n',
  'server/src/middleware/clerkAuth.middleware.js': '// verifyClerkJWT, attach req.userId\n// Use @clerk/clerk-sdk-node to verify Authorization Bearer token\n// Extract userId from token, attach to req.userId\n// Return 401 if missing or invalid\n',
  'server/src/middleware/errorHandler.middleware.js': '// global error handler\n',
  'server/src/routes/index.js': '// mounts all route files\n',
  'server/src/routes/session.routes.js': '// /api/sessions\n',
  'server/src/routes/answer.routes.js': '// /api/answers\n',
  'server/src/routes/question.routes.js': '// /api/questions\n',
  'server/src/app.js': '// Express app setup, middleware, routes\n',
  'server/.env.example': 'PORT=5000\nMONGODB_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/interviewcoach\nCLERK_SECRET_KEY=sk_test_xxxx\nSARVAM_API_KEY=xxxx\nSARVAM_API_URL=https://api.sarvam.ai/speech-to-text\nGEMINI_API_KEY=xxxx\n',
  'server/.gitignore': 'node_modules/\n.env\n',
  'server/server.js': '// Entry point, starts server on PORT\n',

  // root
  '.gitignore': 'node_modules/\n.env\ndist/\n.DS_Store\n*.log\n',
  'README.md': '# InterviewCoach AI\n\nA voice-based AI interview simulator.\n',

  // client components
  'client/src/components/ui/Button.jsx': '// Reusable button with variants\n',
  'client/src/components/ui/Card.jsx': '// Base card container\n',
  'client/src/components/ui/Badge.jsx': '// Color-coded tag (strength/improvement)\n',
  'client/src/components/ui/Spinner.jsx': '// Loading spinner\n',
  'client/src/components/ui/ProgressRing.jsx': '// SVG circular progress for scores\n// Props: score (0-10), size, strokeWidth\n// Animate stroke-dashoffset on mount with CSS transition\n// Color: green >7, amber 5-7, red <5\n',
  'client/src/components/interview/MicButton.jsx': '// Core mic with state machine animations\n// States: idle | recording | processing | done\n// Trigger startRecording / stopRecording from useAudioRecorder\n',
  'client/src/components/interview/QuestionCard.jsx': '// Displays current question with category badge\n',
  'client/src/components/interview/TranscriptBox.jsx': '// Live/final transcript display\n',
  'client/src/components/interview/SessionProgress.jsx': '// Question X of Y progress indicator\n',
  'client/src/components/feedback/FeedbackPanel.jsx': '// Main feedback wrapper\n',
  'client/src/components/feedback/ScoreCard.jsx': '// Score ring + overall rating\n',
  'client/src/components/feedback/MetricRow.jsx': '// clarity/relevance/confidence row\n',
  'client/src/components/feedback/StrengthsList.jsx': '// Green-tagged strengths\n',
  'client/src/components/feedback/ImprovementsList.jsx': '// Amber-tagged improvements\n',
  'client/src/components/feedback/IdealAnswer.jsx': '// Collapsible ideal answer section\n',
  'client/src/components/dashboard/SessionHistoryCard.jsx': '// Past session summary card\n',
  'client/src/components/dashboard/ScoreChart.jsx': '// Recharts line chart for score history\n',
  'client/src/components/layout/Navbar.jsx': '// Top nav with Clerk UserButton\n',
  'client/src/components/layout/Sidebar.jsx': '// Optional left sidebar for history\n',
  'client/src/components/layout/PageWrapper.jsx': '// Consistent page padding/max-width\n',
  'client/src/context/SessionContext.jsx': '// activeSession, currentQuestion, answers[], micState, dispatch — wraps interview flow\n// State: { session, questions[], currentIndex, answers[], micState }\n// Actions: START_SESSION, NEXT_QUESTION, SAVE_ANSWER, SET_MIC_STATE, END_SESSION\n// useReducer pattern\n',
  'client/src/hooks/useAudioRecorder.js': '// MediaRecorder API — start/stop, returns blob\n// Expose: { isRecording, startRecording, stopRecording, audioBlob, audioUrl }\n// On stop, collect chunks into a single Blob (audio/webm)\n',
  'client/src/hooks/useSession.js': '// Session CRUD via API\n',
  'client/src/hooks/useFeedback.js': '// Submit answer, poll for feedback\n',
  'client/src/pages/LandingPage.jsx': '// Hero, CTA, how it works\n',
  'client/src/pages/DashboardPage.jsx': '// Session history, stats, start new session\n',
  'client/src/pages/InterviewPage.jsx': '// Active interview — mic + question + feedback\n',
  'client/src/pages/ResultsPage.jsx': '// Full session results, score chart, export\n',
  'client/src/services/api.js': '// Axios instance with Clerk JWT interceptor, base URL from env, all API call functions\n',
  'client/src/styles/globals.css': `:root {
  --bg-primary: #0f0f1a;        /* deep navy */
  --bg-card: #1a1a2e;           /* card background */
  --bg-elevated: #16213e;       /* elevated surfaces */
  --accent-primary: #7c3aed;    /* violet - primary CTA */
  --accent-warm: #f59e0b;       /* amber - highlights */
  --accent-coral: #f97316;      /* coral - recording state */
  --text-primary: #f1f5f9;      /* near white */
  --text-muted: #94a3b8;        /* slate gray */
  --success: #10b981;           /* green - strengths */
  --warning: #f59e0b;           /* amber - improvements */
  --error: #ef4444;             /* red - low scores */
}

@tailwind base;
@tailwind components;
@tailwind utilities;
`,
  'client/src/styles/animations.css': '// Keyframe animations (pulse, slide, fade)\n',
  'client/src/utils/formatScore.js': '// Score → color/label mapping\n',
  'client/src/utils/constants.js': '// Category labels, difficulty colors, etc.\n',
  'client/.env.example': 'VITE_CLERK_PUBLISHABLE_KEY=pk_test_xxxx\nVITE_API_BASE_URL=http://localhost:5000\n',
  'client/.gitignore': 'node_modules/\n.env\ndist/\n',
  'client/src/App.jsx': '// Routes setup with React Router\n',
  'client/src/main.jsx': '// Vite entry, ClerkProvider wrapper\n',
  'client/src/index.css': '// Tailwind directives\n',
};

folders.forEach(dir => fs.mkdirSync(dir, { recursive: true }));

Object.entries(files).forEach(([f, content]) => {
  fs.writeFileSync(f, content, 'utf8');
});

console.log("Scaffold completed.");
