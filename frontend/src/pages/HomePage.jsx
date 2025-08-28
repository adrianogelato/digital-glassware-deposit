function HomePage({
  currentCharacter,
  savedCharacters,
  isGenerating,
  isSaving,
  isLoading,
  handleGenerateCharacter,
  handleSaveCharacter,
  handleDeleteCharacter,
  loadSavedCharacters,
}) {
  return (
    <div>
      {/* Character Generator */}
      <div style={{ marginBottom: "2rem", padding: "1rem", border: "2px solid #4CAF50", borderRadius: "8px" }}>
        <h2>🎲 Character Generator</h2>
        
        <div style={{ marginBottom: "1rem" }}>
          <button
            onClick={handleGenerateCharacter}
            disabled={isGenerating}
            style={{
              padding: "12px 24px",
              fontSize: "16px",
              backgroundColor: "#4CAF50",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: isGenerating ? "not-allowed" : "pointer",
              marginRight: "10px",
            }}
          >
            {isGenerating ? "Generating..." : "🎲 Generate Random Character"}
          </button>

          <button
            onClick={handleSaveCharacter}
            disabled={isSaving}
            style={{
              padding: "12px 24px",
              fontSize: "16px",
              backgroundColor: "#2196F3",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: isSaving ? "not-allowed" : "pointer",
            }}
          >
            {isSaving ? "Saving..." : "💾 Generate & Save Character"}
          </button>
        </div>

        {/* Current Character */}
        {currentCharacter && (
          <div style={{ border: "1px solid #ddd", borderRadius: "8px", padding: "1rem", backgroundColor: "#f9f9f9", marginBottom: "1rem" }}>
            <h3>✨ Current Character</h3>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <img src={currentCharacter.picture} alt={currentCharacter.name} style={{ width: "80px", height: "80px", borderRadius: "8px" }} />
              <div>
                <p><strong>Name:</strong> {currentCharacter.name}</p>
                <p><strong>Level:</strong> {currentCharacter.level}</p>
                {currentCharacter.id && <p><strong>ID:</strong> {currentCharacter.id}</p>}
                {currentCharacter.created_at && <p><strong>Created:</strong> {new Date(currentCharacter.created_at).toLocaleString()}</p>}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Saved Characters */}
      <div style={{ marginBottom: "2rem", padding: "1rem", border: "1px solid #ddd", borderRadius: "8px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
          <h2>💾 Saved Characters ({savedCharacters.length})</h2>
          <button
            onClick={loadSavedCharacters}
            disabled={isLoading}
            style={{
              padding: "8px 16px",
              backgroundColor: "#FF9800",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: isLoading ? "not-allowed" : "pointer",
            }}
          >
            {isLoading ? "Loading..." : "🔄 Refresh"}
          </button>
        </div>

        {isLoading ? (
          <p>Loading saved characters...</p>
        ) : savedCharacters.length === 0 ? (
          <p>No characters saved yet. Generate and save some characters to see them here!</p>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1rem" }}>
            {savedCharacters.map((character) => (
              <div key={character.id} style={{ border: "1px solid #ddd", borderRadius: "8px", padding: "1rem", backgroundColor: "#f9f9f9" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "10px" }}>
                  <img src={character.picture} alt={character.name} style={{ width: "60px", height: "60px", borderRadius: "8px" }} />
                  <div style={{ flex: 1 }}>
                    <h4 style={{ margin: "0 0 5px 0" }}>{character.name}</h4>
                    <p style={{ margin: "0", fontSize: "14px", color: "#666" }}>
                      Level {character.level} • ID: {character.id}
                    </p>
                    <p style={{ margin: "5px 0 0 0", fontSize: "12px", color: "#888" }}>
                      {new Date(character.created_at).toLocaleString()}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => handleDeleteCharacter(character.id)}
                  style={{
                    padding: "6px 12px",
                    backgroundColor: "#f44336",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                    fontSize: "12px",
                  }}
                >
                  🗑️ Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default HomePage;
