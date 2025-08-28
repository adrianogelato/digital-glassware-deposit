import { useState, useEffect } from "react";
import { getData, generateCharacter, saveCharacter, getAllCharacters, deleteCharacter } from "./api";
import { Navigation, StatusSummary } from "./components";
import { HomePage, AboutPage } from "./pages";


function App() {
  const [currentPage, setCurrentPage] = useState("home");

  // Shared state for HomePage + StatusSummary
  const [backendData, setBackendData] = useState(null);
  const [error, setError] = useState(null);
  const [databaseStatus, setDatabaseStatus] = useState("checking");

  // Character-related state
  const [currentCharacter, setCurrentCharacter] = useState(null);
  const [savedCharacters, setSavedCharacters] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    console.log("VITE_API_URL at runtime:", import.meta.env.VITE_API_URL);

    async function fetchBackend() {
      try {
        const data = await getData();
        setBackendData(data);
      } catch (err) {
        setError(`Failed to fetch backend data: ${err.message}`);
      }
    }

    async function checkDatabaseConnection() {
      try {
        await getAllCharacters();
        setDatabaseStatus("connected");
      } catch {
        setDatabaseStatus("error");
      }
    }

    fetchBackend();
    loadSavedCharacters();
    checkDatabaseConnection();
  }, []);

  const loadSavedCharacters = async () => {
    setIsLoading(true);
    try {
      const response = await getAllCharacters();
      if (response.success) {
        setSavedCharacters(response.characters);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenerateCharacter = async () => {
    setIsGenerating(true);
    try {
      const response = await generateCharacter();
      if (response.success) {
        setCurrentCharacter(response.character);
      }
    } catch (err) {
      setError(`Failed to generate character: ${err.message}`);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSaveCharacter = async () => {
    setIsSaving(true);
    try {
      const response = await saveCharacter();
      if (response.success) {
        setCurrentCharacter(response.character);
        await loadSavedCharacters();
      }
    } catch (err) {
      setError(`Failed to save character: ${err.message}`);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteCharacter = async (id) => {
    if (!window.confirm("Are you sure you want to delete this character?")) return;

    try {
      const response = await deleteCharacter(id);
      if (response.success) {
        await loadSavedCharacters();
        if (currentCharacter && currentCharacter.id === id) {
          setCurrentCharacter(null);
        }
      }
    } catch (err) {
      setError(`Failed to delete character: ${err.message}`);
    }
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif", maxWidth: "1200px", margin: "0 auto" }}>
      <Navigation currentPage={currentPage} setCurrentPage={setCurrentPage} />

      {currentPage === "home" ? (
        <HomePage
          currentCharacter={currentCharacter}
          savedCharacters={savedCharacters}
          isGenerating={isGenerating}
          isSaving={isSaving}
          isLoading={isLoading}
          handleGenerateCharacter={handleGenerateCharacter}
          handleSaveCharacter={handleSaveCharacter}
          handleDeleteCharacter={handleDeleteCharacter}
          loadSavedCharacters={loadSavedCharacters}
        />
      ) : (
        <AboutPage />
      )}

      {currentPage === "home" && (
        <StatusSummary backendData={backendData} error={error} databaseStatus={databaseStatus} />
      )}
    </div>
  );
}

export default App;
