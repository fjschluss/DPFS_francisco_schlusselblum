function StatCard({ label, value, icon }) {
  return (
    <div className="stat-card">
      <span className="stat-icon">{icon}</span>
      <div className="stat-body">
        <p className="stat-label">{label}</p>
        <p className="stat-value">{value ?? '-'}</p>
      </div>
    </div>
  );
}

export default StatCard;