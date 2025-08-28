// frontend/src/api.js
// Base URL for backend (local = http://localhost:5001, production = your Render URL)
const API_URL = import.meta.env.VITE_API_URL;

// Original function
export async function getData() {
  if (!API_URL) {
    console.error("VITE_API_URL is not defined! Check your .env file or Vercel project settings.");
    throw new Error("Missing API base URL");
  }
  try {
    console.log("Fetching from:", `${API_URL}/api/data`);
    const response = await fetch(`${API_URL}/api/data`);
    if (!response.ok) {
      const text = await response.text();
      console.error("Backend error response:", text);
      throw new Error(`HTTP ${response.status}`);
    }
    return await response.json();
  } catch (err) {
    console.error("Error fetching data:", err);
    throw err;
  }
}

// Generate a random character (without saving)
export async function generateCharacter() {
  if (!API_URL) {
    throw new Error("Missing API base URL");
  }
  try {
    const response = await fetch(`${API_URL}/api/character/generate`);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    return await response.json();
  } catch (err) {
    console.error("Error generating character:", err);
    throw err;
  }
}

// Generate and save a random character to database
export async function saveCharacter() {
  if (!API_URL) {
    throw new Error("Missing API base URL");
  }
  try {
    const response = await fetch(`${API_URL}/api/character/save`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    return await response.json();
  } catch (err) {
    console.error("Error saving character:", err);
    throw err;
  }
}

// Get all saved characters
export async function getAllCharacters() {
  if (!API_URL) {
    throw new Error("Missing API base URL");
  }
  try {
    const response = await fetch(`${API_URL}/api/characters`);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    return await response.json();
  } catch (err) {
    console.error("Error fetching characters:", err);
    throw err;
  }
}

// Delete a character
export async function deleteCharacter(id) {
  if (!API_URL) {
    throw new Error("Missing API base URL");
  }
  try {
    const response = await fetch(`${API_URL}/api/character/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    return await response.json();
  } catch (err) {
    console.error("Error deleting character:", err);
    throw err;
  }
}