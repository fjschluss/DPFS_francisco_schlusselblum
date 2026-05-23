import { useState } from 'react';

function UserList({ initialUsers, apiBase }) {
  const [users, setUsers] = useState(initialUsers || []);

  if (!users || users.length === 0) {
    return (
      <div className="panel">
        <h2 className="panel-title">Usuarios</h2>
        <p style={{ color: 'var(--muted)' }}>No hay usuarios.</p>
      </div>
    );
  }

  const handleToggleRole = async (id) => {
    try {
      const res = await fetch(`${apiBase}/api/users/${id}/role`, {
        method: 'PUT',
        credentials: 'include'
      });
      if (!res.ok) { alert('No se pudo cambiar el rol.'); return; }
      const updated = await res.json();
      setUsers(prev => prev.map(u => u.id === id ? { ...u, category: updated.category } : u));
    } catch {
      alert('Error de conexión.');
    }
  };

  const handleDelete = async (id, name) => {
    if (!window.confirm(`¿Eliminar a ${name}?`)) return;
    try {
      const res = await fetch(`${apiBase}/api/users/${id}`, {
        method: 'DELETE',
        credentials: 'include'
      });
      if (!res.ok) { alert('No se pudo eliminar el usuario.'); return; }
      setUsers(prev => prev.filter(u => u.id !== id));
    } catch {
      alert('Error de conexión.');
    }
  };

  return (
    <div className="panel">
      <h2 className="panel-title">Gestión de usuarios ({users.length})</h2>
      <div className="table-wrapper">
        <table className="products-table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Email</th>
              <th>Rol</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {users.map(u => (
              <tr key={u.id}>
                <td className="td-name">{u.name}</td>
                <td>{u.email}</td>
                <td>
                  <span className={`dash-role-badge dash-role-${u.category}`}>
                    {u.category}
                  </span>
                </td>
                <td className="td-user-actions">
                  <button
                    className="dash-btn-sm"
                    onClick={() => handleToggleRole(u.id)}
                  >
                    {u.category === 'admin' ? 'Quitar admin' : 'Hacer admin'}
                  </button>
                  <button
                    className="dash-btn-sm dash-btn-danger"
                    onClick={() => handleDelete(u.id, u.name)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UserList;