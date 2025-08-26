// frontend/src/api.js

// Uses VITE_API_URL if set (production), otherwise relative path for dev proxy
const API_URL = import.meta.env.VITE_API_URL || '';

export async function getData() {
  try {
    const response = await fetch(`${API_URL}/api/data`);
    if (!response.ok) throw new Error('Network response was not ok');
    return await response.json();
  } catch (err) {
    console.error('API call failed:', err);
    throw err;
  }
}

