//      componentslogin/PatienDashboard.tsx

import React from 'react';
import { useAuth } from '../pages/AuthPage'; // Ajusta la ruta si AuthPage.tsx está en un directorio diferente
import '../styles/Dashboard.css'; // Asegúrate de que este CSS esté en su lugar

const PatientDashboard: React.FC = () => {
    const { userRole, logout } = useAuth();

    return (
        <div className="dashboard-container">
            <header className="dashboard-header">
                <h1>¡Bienvenido, Paciente!</h1>
                <p>Tu rol: <strong>{userRole === 'patient' ? 'Paciente' : userRole}</strong></p> {/* Muestra "Paciente" si el rol es 'patient' */}
                <button onClick={logout} className="logout-button">Cerrar Sesión</button>
            </header>
            <main className="dashboard-content">
                <section className="dashboard-section">
                    <h2>Tus Citas</h2>
                    <p>Aquí puedes ver tus próximas citas y agendar nuevas, incluyendo consultas y exámenes cardiológicos.</p>
                    <div className="appointment-list">
                        {/* Ejemplo de cita */}
                        <div className="appointment-item">
                            <h3>Consulta Cardiológica</h3>
                            <p>Fecha: 15 de Junio, 2025</p>
                            <p>Hora: 10:00 AM</p>
                            <p>Médico: Dr. Ricardo Pérez</p>
                        </div>
                        <div className="appointment-item">
                            <h3>Examen de Ecocardiograma</h3>
                            <p>Fecha: 20 de Junio, 2025</p>
                            <p>Hora: 02:30 PM</p>
                            <p>Médico: Dra. Sofía Gómez</p>
                        </div>
                        <button className="action-button">Agendar Nueva Cita</button>
                    </div>
                </section>
                <section className="dashboard-section">
                    <h2>Tu Historial Clínico Cardiológico</h2>
                    <p>Accede a tus consultas pasadas, recetas, resultados de pruebas cardíacas y otros registros médicos.</p>
                    <button className="action-button">Ver Expediente Médico</button>
                </section>
            </main>
        </div>
    );
};

export default PatientDashboard;