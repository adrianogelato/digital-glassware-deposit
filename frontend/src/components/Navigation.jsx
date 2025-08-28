function Navigation({ currentPage, setCurrentPage }) {
  return (
    <nav style={{ padding: "1rem 0", borderBottom: "2px solid #ddd", marginBottom: "2rem" }}>
      <div style={{ display: "flex", gap: "2rem", alignItems: "center" }}>
        <h1 style={{ margin: 0, color: "#333" }}>Character Generator</h1>
        <div style={{ display: "flex", gap: "1rem" }}>
          <button
            onClick={() => setCurrentPage("home")}
            style={{
              padding: "8px 16px",
              backgroundColor: currentPage === "home" ? "#4CAF50" : "#f0f0f0",
              color: currentPage === "home" ? "white" : "#333",
              border: "1px solid #ddd",
              borderRadius: "4px",
              cursor: "pointer",
              fontWeight: currentPage === "home" ? "bold" : "normal",
            }}
          >
            🏠 Home
          </button>
          <button
            onClick={() => setCurrentPage("about")}
            style={{
              padding: "8px 16px",
              backgroundColor: currentPage === "about" ? "#4CAF50" : "#f0f0f0",
              color: currentPage === "about" ? "white" : "#333",
              border: "1px solid #ddd",
              borderRadius: "4px",
              cursor: "pointer",
              fontWeight: currentPage === "about" ? "bold" : "normal",
            }}
          >
            ℹ️ About
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
