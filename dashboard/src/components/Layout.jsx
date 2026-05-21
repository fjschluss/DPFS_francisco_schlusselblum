function Layout({ children }) {
  return (
    <div className="dashboard-wrapper">
      <aside className="sidebar">
        <div className="sidebar-brand">
          <span className="brand-name">LuBo</span>
          <span className="brand-sub">Dashboard</span>
        </div>
        <nav className="sidebar-nav">
          <a href="#totales">Totales</a>
          <a href="#categorias">Categorías</a>
          <a href="#ultimo">Último producto</a>
          <a href="#productos">Productos</a>
        </nav>
      </aside>
      <main className="main-content">
        <header className="dash-header">
          <h1>Panel de administración</h1>
        </header>
        <div className="dash-body">{children}</div>
      </main>
    </div>
  );
}

export default Layout;