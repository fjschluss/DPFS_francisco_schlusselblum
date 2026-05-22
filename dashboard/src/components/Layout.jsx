const NAV_LINKS = [
  { id: 'totales',    label: 'Totales'          },
  { id: 'categorias', label: 'Categorías'        },
  { id: 'ultimo',     label: 'Último producto'   },
  { id: 'productos',  label: 'Productos'         },
  { id: 'usuarios',   label: 'Usuarios'          },
];

function Layout({ children, totalProductos, totalUsuarios, activeSection, onSectionChange }) {
  return (
    <div className="dashboard-wrapper">
      <aside className="sidebar">
        <div className="sidebar-brand">
          <a href="http://localhost:3000" target="_blank" rel="noreferrer" className="sidebar-logo-link">
            <img
              src="http://localhost:3000/images/logo.svg"
              alt="LuBo — Ludmila Borrelli"
              className="sidebar-logo"
            />
          </a>
          <span className="brand-sub">Dashboard</span>
        </div>
        <nav className="sidebar-nav">
          {NAV_LINKS.map(({ id, label }) => (
            <button
              key={id}
              className={`nav-btn${activeSection === id ? ' nav-active' : ''}`}
              onClick={() => onSectionChange(id)}
            >
              {label}
            </button>
          ))}
        </nav>
      </aside>
      <main className="main-content">
        <header className="dash-header">
          <h1>Panel de administración</h1>
          {totalProductos != null && totalUsuarios != null && (
            <p className="dash-subtitle">
              {totalProductos} productos · {totalUsuarios} usuarios
            </p>
          )}
        </header>
        <div className="dash-body">{children}</div>
      </main>
    </div>
  );
}

export default Layout;