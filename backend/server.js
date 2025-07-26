// backend/server.js
console.log("--- Server process starting ---");

const express = require("express");
const cors = require("cors");
const connectDB = require('./config/db');

console.log("--- Dependencies imported ---");

// --- Initialize App ---
const app = express();
console.log("--- Express app initialized ---");


// --- Middleware Configuration ---
const allowedOrigin = process.env.CORS_ORIGIN || 'http://localhost:3000';
const corsOptions = {
  origin: allowedOrigin,
};

// FOR DEBUGGING: Let's temporarily allow all origins to eliminate CORS as a variable.
// We will change this back later.
app.use(cors());

app.use(express.json());
console.log("--- Middleware (CORS, JSON) applied ---");


// --- API Routes ---
app.use('/api', require('./routes/apiRoutes.js'));
console.log("--- API routes wired up ---");


// --- Database Connection ---
// We connect to the DB after setting up routes.
connectDB();

// --- Export for Vercel ---
// This is what Vercel will use.
module.exports = app;

console.log("--- Server module exported ---");