import { useState, useEffect } from 'react';
import Layout from './components/Layout';
import StatCard from './components/StatCard';
import CategoryPanel from './components/CategoryPanel';
import LastProduct from './components/LastProduct';
import ProductList from './components/ProductList';
import './App.css';

const API = process.env.REACT_APP_API_URL || 'http://localhost:3000';

function App() {
  const [usersData,       setUsersData]       = useState(null);
  const [productsData,    setProductsData]    = useState(null);
  const [loading,         setLoading]         = useState(true);
  const [error,           setError]           = useState(null);
  const [activeSection,   setActiveSection]   = useState('totales');

  useEffect(() => {
    Promise.all([
      fetch(`${API}/api/users`,    { credentials: 'include' }).then(r => r.json()),
      fetch(`${API}/api/products`, { credentials: 'include' }).then(r => r.json())
    ])
    .then(([users, products]) => {
      setUsersData(users);
      setProductsData(products);
      setLoading(false);
    })
    .catch(() => {
      setError('No se pudo conectar con la API. Asegurate de que el servidor esté corriendo.');
      setLoading(false);
    });
  }, []);

  if (loading) return (
    <Layout activeSection={activeSection} onSectionChange={setActiveSection}>
      <p className="loading">Cargando datos...</p>
    </Layout>
  );
  if (error) return (
    <Layout activeSection={activeSection} onSectionChange={setActiveSection}>
      <p className="error-msg">{error}</p>
    </Layout>
  );

  const totalCategorias = Object.keys(productsData.countByCategory || {}).length;
  const lastProduct     = productsData.products?.[0] || null;

  return (
    <Layout
      totalProductos={productsData.count}
      totalUsuarios={usersData.count}
      activeSection={activeSection}
      onSectionChange={setActiveSection}
    >
      {activeSection === 'totales' && (
        <section className="stats-grid">
          <StatCard label="Total Productos" value={productsData.count} icon="📦" />
          <StatCard label="Total Usuarios"  value={usersData.count}    icon="👥" />
          <StatCard label="Categorías"      value={totalCategorias}    icon="🗂️" />
        </section>
      )}

      {activeSection === 'categorias' && (
        <CategoryPanel countByCategory={productsData.countByCategory} />
      )}

      {activeSection === 'ultimo' && (
        <LastProduct product={lastProduct} apiBase={API} />
      )}

      {activeSection === 'productos' && (
        <ProductList products={productsData.products} />
      )}

    </Layout>
  );
}

export default App;