// backend/index.js
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

// Allow cross-origin requests (needed for Vercel frontend)
app.use(cors());
app.use(express.json());

// API route
app.get("/api/data", (req, res) => {
  res.json({ message: "Hello from backend" });
});

// Root route for testing / friendly message
app.get("/", (req, res) => {
  res.send("Backend is running! Visit /api/data for API response.");
});

// Start server
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
