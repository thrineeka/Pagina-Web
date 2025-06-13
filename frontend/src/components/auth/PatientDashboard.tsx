import React from 'react';
import type { User } from '../../App'; // Assuming User interface is available globally or imported
 // Assuming User interface is available globally or imported

interface PatientDashboardProps {
  user: User;
  onLogout: () => void;
}

const PatientDashboard: React.FC<PatientDashboardProps> = ({ user, onLogout }) => {
  return (
    <div className="patient-dashboard-container">
      <div className="patient-dashboard-card">
        <h2 className="patient-dashboard-title">¡Bienvenido, Paciente!</h2>
        <p className="patient-dashboard-greeting">Hola, <span className="font-semibold">{user.primer_nombre} {user.apellido_paterno}</span>.</p>
        <p className="patient-dashboard-role">Tu rol: <span className="font-bold">{user.rol}</span></p>
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

export default PatientDashboard;