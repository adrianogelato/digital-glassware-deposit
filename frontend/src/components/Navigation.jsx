function Navigation({ currentPage, setCurrentPage }) {
  return (
    <nav className="navigation">
      <div className="navigation-content">
        <h1 className="navigation-title">Character Generator</h1>
        <div className="navigation-buttons">
          <button
            onClick={() => setCurrentPage("home")}
            className={`nav-button ${currentPage === "home" ? "nav-button-active" : ""}`}
          >
            🏠 Home
          </button>
          <button
            onClick={() => setCurrentPage("about")}
            className={`nav-button ${currentPage === "about" ? "nav-button-active" : ""}`}
          >
            ℹ️ About
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;