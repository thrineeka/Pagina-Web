import React from 'react';
import type { User } from '../../App'; // Assuming User interface is available globally or imported
 // Assuming User interface is available globally or imported

interface AdminDashboardProps {
  user: User;
  onLogout: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ user, onLogout }) => {
  return (
    <div className="admin-dashboard-container">
      <div className="admin-dashboard-card">
        <h2 className="admin-dashboard-title">¡Bienvenido, Administrador!</h2>
        <p className="admin-dashboard-greeting">Hola, <span className="font-semibold">{user.primer_nombre} {user.apellido_paterno}</span>.</p>
        <p className="admin-dashboard-role">Tu rol: <span className="font-bold">{user.rol}</span></p>
        <button
          onClick={onLogout}
          className="dashboard-logout-button"
        >
          Cerrar Sesión
        </button>
      </div>
    </div>
  );
};

export default AdminDashboard;