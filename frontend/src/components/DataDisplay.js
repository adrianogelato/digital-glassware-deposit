// frontend/src/components/DataDisplay.js
import { useState, useEffect } from "react";
import { getData } from "../api";

function DataDisplay() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    getData()
      .then(setData)
      .catch(err => {
        console.error(err);
        setError("Failed to fetch data");
      });
  }, []);

  if (error) return <div>{error}</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <div>
      <h2>Backend Data:</h2>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}

export default DataDisplay;
