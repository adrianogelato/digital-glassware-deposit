const API_URL = import.meta.env.VITE_API_URL;

export async function getData() {
  const response = await fetch(`${API_URL}/api/data`);
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  return response.json();
}
