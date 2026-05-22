function CategoryPanel({ countByCategory }) {
  if (!countByCategory) return null;

  const entries  = Object.entries(countByCategory);
  const maxCount = Math.max(...entries.map(([, v]) => v), 1);

  return (
    <div className="panel" id="categorias">
      <h2 className="panel-title">Productos por categoría</h2>
      <ul className="category-list">
        {entries.map(([name, count]) => (
          <li key={name} className="category-item">
            <div className="category-header">
              <span className="category-name">{name}</span>
              <span className="category-count">{count}</span>
            </div>
            <div className="category-bar-bg">
              <div
                className="category-bar-fill"
                style={{ width: `${(count / maxCount) * 100}%` }}
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CategoryPanel;