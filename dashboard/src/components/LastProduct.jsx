function LastProduct({ product, apiBase }) {
  if (!product) {
    return (
      <div className="panel" id="ultimo">
        <h2 className="panel-title">Último producto creado</h2>
        <p style={{ color: 'var(--muted)', fontSize: '0.9rem' }}>No hay productos cargados.</p>
      </div>
    );
  }

  const imageUrl = `${apiBase}${product.image || '/images/placeholder.jpg'}`;
  const fallback = 'https://placehold.co/200x150/D6CFC6/8C8480?text=LuBo';

  return (
    <div className="panel last-product" id="ultimo">
      <h2 className="panel-title">Último producto creado</h2>
      <img
        src={imageUrl}
        alt={product.name}
        className="last-product-img"
        onError={e => { e.target.onerror = null; e.target.src = fallback; }}
      />
      <p className="last-product-category">
        {product.categories?.[0] || 'Sin categoría'}
      </p>
      <h3 className="last-product-name">{product.name}</h3>
      <p className="last-product-desc">
        {product.description?.substring(0, 120)}...
      </p>
    </div>
  );
}

export default LastProduct;