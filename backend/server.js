// backend/server.js
const express = require("express");
const cors = require("cors");
const connectDB = require('./config/db');

// Connect to the database first.
connectDB();

// Initialize the Express App
const app = express();

// --- Middleware Configuration ---

// 1. Configure CORS options
const allowedOrigin = process.env.CORS_ORIGIN || 'http://localhost:3000';
const corsOptions = {
  origin: allowedOrigin,
};

// 2. THIS IS THE FIX: Enable CORS pre-flight across-the-board.
// This tells Express to respond to all OPTIONS requests with the CORS headers.
app.options('*', cors(corsOptions));

// 3. Use the CORS middleware for all other requests.
app.use(cors(corsOptions));

// 4. Use the body parser middleware.
app.use(express.json());

// --- API Routes ---
// Wire up the routes AFTER all middleware.
app.use('/api', require('./routes/apiRoutes.js'));

// --- Start Server ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

// Export the app for Vercel's serverless environment.
module.exports = app;