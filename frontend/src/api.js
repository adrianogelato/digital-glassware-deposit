const API_URL = import.meta.env.VITE_API_URL;

export async function getData() {
  try {
    const response = await fetch(`${API_URL}/api/data`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (err) {
    console.error("Error fetching data:", err);
    throw err;
  }
}
