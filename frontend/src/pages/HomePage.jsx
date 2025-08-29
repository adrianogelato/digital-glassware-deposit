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
    <div className="homepage">
      {/* Character Generator */}
      <div className="character-generator-section">
        <h2 className="section-title">🎲 Character Generator</h2>
        
        <div className="generator-buttons">
          <button
            onClick={handleGenerateCharacter}
            disabled={isGenerating}
            className={`button-primary generator-button ${isGenerating ? 'button-disabled' : ''}`}
          >
            {isGenerating ? "Generating..." : "🎲 Generate Random Character"}
          </button>

          <button
            onClick={handleSaveCharacter}
            disabled={isSaving}
            className={`button-secondary generator-button ${isSaving ? 'button-disabled' : ''}`}
          >
            {isSaving ? "Saving..." : "💾 Generate & Save Character"}
          </button>
        </div>

        {/* Current Character */}
        {currentCharacter && (
          <div className="current-character-card">
            <h3 className="character-card-title">✨ Current Character</h3>
            <div className="character-display">
              <img 
                src={currentCharacter.picture} 
                alt={currentCharacter.name} 
                className="character-avatar character-avatar-large"
              />
              <div className="character-details">
                <p><strong>Name:</strong> {currentCharacter.name}</p>
                <p><strong>Level:</strong> {currentCharacter.level}</p>
                {currentCharacter.id && <p><strong>ID:</strong> {currentCharacter.id}</p>}
                {currentCharacter.created_at && (
                  <p><strong>Created:</strong> {new Date(currentCharacter.created_at).toLocaleString()}</p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Saved Characters */}
      <div className="saved-characters-section">
        <div className="section-header">
          <h2 className="section-title">💾 Saved Characters ({savedCharacters.length})</h2>
          <button
            onClick={loadSavedCharacters}
            disabled={isLoading}
            className={`button-warning refresh-button ${isLoading ? 'button-disabled' : ''}`}
          >
            {isLoading ? "Loading..." : "🔄 Refresh"}
          </button>
        </div>

        {isLoading ? (
          <p className="loading-text">Loading saved characters...</p>
        ) : savedCharacters.length === 0 ? (
          <p className="empty-state">No characters saved yet. Generate and save some characters to see them here!</p>
        ) : (
          <div className="characters-grid">
            {savedCharacters.map((character) => (
              <div key={character.id} className="character-card">
                <div className="character-card-content">
                  <img 
                    src={character.picture} 
                    alt={character.name} 
                    className="character-avatar"
                  />
                  <div className="character-info">
                    <h4 className="character-name">{character.name}</h4>
                    <p className="character-stats">
                      Level {character.level} • ID: {character.id}
                    </p>
                    <p className="character-date">
                      {new Date(character.created_at).toLocaleString()}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => handleDeleteCharacter(character.id)}
                  className="button-danger delete-button"
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