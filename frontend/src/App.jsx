import { useState, useEffect } from "react";
import { getData } from "./api";

function App() {
  const [count, setCount] = useState(0);
  const [backendData, setBackendData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchBackend() {
      try {
        const response = await fetch('/api/data'); // use relative path to hit Vite proxy
        console.log("Response status:", response.status);
        console.log("Response headers:", [...response.headers.entries()]);

        if (!response.ok) {
          const text = await response.text();
          console.error("Response body:", text);
          throw new Error(`HTTP ${response.status}`);
        }

        const data = await response.json();
        console.log("Backend data:", data);
        setBackendData(data);
      } catch (err) {
        console.error("Fetch error:", err);
        setError(`Failed to fetch backend data: ${err.message}`);
      }
    }

    fetchBackend();
  }, []);

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>My Fullstack Web App</h1>

      <div style={{ marginBottom: "1rem" }}>
        <p>Local Counter: {count}</p>
        <button onClick={() => setCount(count + 1)}>Increase Count</button>
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {!backendData && !error && <p>Loading backend data...</p>}
      {backendData && (
        <div>
          <h2>Backend Response:</h2>
          <pre>{JSON.stringify(backendData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default App;
