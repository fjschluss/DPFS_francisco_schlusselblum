function ProductList({ products }) {
  if (!products || products.length === 0) {
    return (
      <div className="panel">
        <h2 className="panel-title">Productos</h2>
        <p style={{ color: 'var(--muted)' }}>No hay productos.</p>
      </div>
    );
  }

  return (
    <div className="panel" id="productos">
      <h2 className="panel-title">Listado de productos ({products.length})</h2>
      <div className="table-wrapper">
        <table className="products-table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Categoría</th>
            </tr>
          </thead>
          <tbody>
            {products.map(p => (
              <tr key={p.id}>
                <td className="td-name">{p.name}</td>
                <td className="td-desc">{p.description?.substring(0, 80)}...</td>
                <td>{p.categories?.[0] || '—'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ProductList;