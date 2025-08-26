// Base URL for backend (local = http://localhost:5001, production = your Render URL)
const API_URL = import.meta.env.VITE_API_URL;

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
