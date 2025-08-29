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

  const getStatusClass = (status, hasError) => {
    if (hasError || status === "error") return "status-error";
    if (status === "connected" || status) return "status-success";
    return "status-warning";
  };

  return (
    <div className="status-summary">
      <h3 className="status-title">🔧 System Status</h3>
      
      <div className="status-grid">
        <div className="status-item">
          <span className="status-icon">{getStatusIcon(backendData, error)}</span>
          <span className="status-label">Backend:</span>
          <span className={`status-text ${getStatusClass(backendData, error)}`}>
            {getStatusText(backendData, error)}
          </span>
        </div>
        
        <div className="status-item">
          <span className="status-icon">{getStatusIcon(databaseStatus, false)}</span>
          <span className="status-label">Database:</span>
          <span className={`status-text ${getStatusClass(databaseStatus, false)}`}>
            {getStatusText(databaseStatus, false)}
          </span>
        </div>
      </div>

      {(error || databaseStatus === "error") && (
        <div className="status-error-message">
          ⚠️ Some services may not be available. Please check your internet connection or try refreshing the page.
        </div>
      )}
    </div>
  );
}

export default StatusSummary;