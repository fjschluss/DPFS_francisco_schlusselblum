function LastProduct({ product, apiBase }) {
  if (!product) {
    return (
      <div className="panel">
        <h2 className="panel-title">Último producto creado</h2>
        <p style={{ color: 'var(--muted)', fontSize: '0.9rem' }}>No hay productos cargados.</p>
      </div>
    );
  }

  const imageUrl = `${apiBase}${product.image || '/images/placeholder.jpg'}`;
  const fallback = 'https://placehold.co/200x150/D6CFC6/8C8480?text=LuBo';

  const formatPrice = (price) =>
    new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(price);

  return (
    <div className="panel last-product">
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
      <p className="last-product-price">{formatPrice(product.price)}</p>
      <p className="last-product-desc">
        {product.description?.substring(0, 100)}...
      </p>
      {product.siteUrl && (
        <a
          href={product.siteUrl}
          target="_blank"
          rel="noreferrer"
          className="last-product-link"
        >
          Ver en el sitio →
        </a>
      )}
    </div>
  );
}

export default LastProduct;