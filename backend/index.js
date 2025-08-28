// backend/index.js
require('dotenv').config();
const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");
const app = express();
const PORT = process.env.PORT || 5001;

// PostgreSQL connection (Supabase) - Enhanced for production deployment
const isProduction = process.env.NODE_ENV === 'production';
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DATABASE_URL?.includes('supabase.co') ? { 
    rejectUnauthorized: false,
    // Force SSL for production
    require: isProduction 
  } : false,
  // Connection pool settings for production
  max: isProduction ? 20 : 5,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 10000,
});

// Allow cross-origin requests (needed for Vercel frontend)
app.use(cors());
app.use(express.json());

// Character names arrays for random generation
const firstNames = [
  "Aiden", "Luna", "Zara", "Kai", "Nova", "Rex", "Ivy", "Orion", "Sage", "Phoenix",
  "Raven", "Atlas", "Echo", "Storm", "Vale", "Zion", "Nyx", "Blade", "Star", "Ash"
];

const lastNames = [
  "Stormwind", "Nightshade", "Ironforge", "Starweaver", "Shadowmere", "Brightbane",
  "Frostborn", "Emberfall", "Moonwhisper", "Dragonheart", "Silvercrest", "Darkwood",
  "Goldleaf", "Stormcaller", "Firebrand", "Icevein", "Thornfield", "Swiftarrow",
  "Bloodmoon", "Lightbringer"
];

// Character avatar URLs (using placeholder service)
const avatarUrls = [
  "https://api.dicebear.com/7.x/adventurer/svg?seed=character1",
  "https://api.dicebear.com/7.x/adventurer/svg?seed=character2",
  "https://api.dicebear.com/7.x/adventurer/svg?seed=character3",
  "https://api.dicebear.com/7.x/adventurer/svg?seed=character4",
  "https://api.dicebear.com/7.x/adventurer/svg?seed=character5",
  "https://api.dicebear.com/7.x/adventurer/svg?seed=character6",
  "https://api.dicebear.com/7.x/adventurer/svg?seed=character7",
  "https://api.dicebear.com/7.x/adventurer/svg?seed=character8",
  "https://api.dicebear.com/7.x/adventurer/svg?seed=character9",
  "https://api.dicebear.com/7.x/adventurer/svg?seed=character10"
];

// Helper function to generate random character
function generateRandomCharacter() {
  const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
  const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
  const level = Math.floor(Math.random() * 100) + 1; // Level 1-100
  const picture = avatarUrls[Math.floor(Math.random() * avatarUrls.length)];
  
  return {
    name: `${firstName} ${lastName}`,
    level,
    picture
  };
}

// Initialize database table
async function initDatabase() {
  try {
    console.log('🔄 Attempting to connect to database...');
    console.log('Database URL configured:', process.env.DATABASE_URL ? 'Yes' : 'No');
    
    // Test connection first
    const client = await pool.connect();
    console.log('✅ Database connection successful');
    client.release();
    
    await pool.query(`
      CREATE TABLE IF NOT EXISTS characters (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        level INTEGER NOT NULL,
        picture_url TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log("✅ Database table initialized");
  } catch (err) {
    console.error("❌ Error initializing database:", err.message);
    console.error("❌ Error code:", err.code);
    console.error("❌ Error details:", err);
  }
}

// Initialize database on startup
initDatabase();

// Original API route
app.get("/api/data", (req, res) => {
  res.json({ message: "Hello from backend" });
});

// Generate random character (without saving)
app.get("/api/character/generate", (req, res) => {
  try {
    const character = generateRandomCharacter();
    res.json({ success: true, character });
  } catch (error) {
    console.error("Error generating character:", error);
    res.status(500).json({ success: false, error: "Failed to generate character" });
  }
});

// Save character to database
app.post("/api/character/save", async (req, res) => {
  try {
    const character = generateRandomCharacter();
    
    const result = await pool.query(
      "INSERT INTO characters (name, level, picture_url) VALUES ($1, $2, $3) RETURNING *",
      [character.name, character.level, character.picture]
    );
    
    const savedCharacter = result.rows[0];
    res.json({ 
      success: true, 
      character: {
        id: savedCharacter.id,
        name: savedCharacter.name,
        level: savedCharacter.level,
        picture: savedCharacter.picture_url,
        created_at: savedCharacter.created_at
      }
    });
  } catch (error) {
    console.error("Error saving character:", error);
    res.status(500).json({ success: false, error: "Failed to save character" });
  }
});

// Get all saved characters
app.get("/api/characters", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT id, name, level, picture_url, created_at FROM characters ORDER BY created_at DESC"
    );
    
    const characters = result.rows.map(row => ({
      id: row.id,
      name: row.name,
      level: row.level,
      picture: row.picture_url,
      created_at: row.created_at
    }));
    
    res.json({ success: true, characters });
  } catch (error) {
    console.error("Error fetching characters:", error);
    res.status(500).json({ success: false, error: "Failed to fetch characters" });
  }
});

// Delete a character
app.delete("/api/character/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query("DELETE FROM characters WHERE id = $1 RETURNING *", [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, error: "Character not found" });
    }
    
    res.json({ success: true, message: "Character deleted successfully" });
  } catch (error) {
    console.error("Error deleting character:", error);
    res.status(500).json({ success: false, error: "Failed to delete character" });
  }
});

// Root route for testing / friendly message
app.get("/", (req, res) => {
  res.send("Character Generator Backend is running! Visit /api/data for API response.");
});

// Start server
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});