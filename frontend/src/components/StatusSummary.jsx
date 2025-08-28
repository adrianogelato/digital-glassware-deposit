function StatusSummary({ backendData, error, databaseStatus }) {
  const getStatusIcon = (status, hasError) => {
    if (hasError || status === "error") return "🔴";
    if (status === "connected" || status) return "🟢";
    return "🟡";
  };

  const getStatusText = (status, hasError) => {
    if (hasError || status === "error") return "Connection Error";
    if (status === "connected" || status) return "Connected and Running";
    if (status === "checking") return "Checking Connection...";
    return "Unknown Status";
  };

  return (
    <div style={{ marginTop: "3rem", padding: "1.5rem", backgroundColor: "#f8f9fa", borderRadius: "8px", border: "1px solid #e9ecef" }}>
      <h3 style={{ margin: "0 0 1rem 0", color: "#495057" }}>🔧 System Status</h3>
      <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <span style={{ fontSize: "18px" }}>{getStatusIcon(backendData, error)}</span>
          <span style={{ fontWeight: "500" }}>Backend:</span>
          <span style={{ color: error ? "#dc3545" : backendData ? "#28a745" : "#ffc107" }}>
            {getStatusText(backendData, error)}
          </span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <span style={{ fontSize: "18px" }}>{getStatusIcon(databaseStatus, false)}</span>
          <span style={{ fontWeight: "500" }}>Database:</span>
          <span
            style={{
              color: databaseStatus === "error" ? "#dc3545" : databaseStatus === "connected" ? "#28a745" : "#ffc107",
            }}
          >
            {getStatusText(databaseStatus, false)}
          </span>
        </div>
      </div>

      {(error || databaseStatus === "error") && (
        <div
          style={{
            marginTop: "1rem",
            padding: "0.75rem",
            backgroundColor: "#f8d7da",
            borderRadius: "4px",
            fontSize: "14px",
            color: "#721c24",
          }}
        >
          ⚠️ Some services may not be available. Please check your internet connection or try refreshing the page.
        </div>
      )}
    </div>
  );
}

export default StatusSummary;
