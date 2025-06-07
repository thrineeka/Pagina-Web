import React from 'react';
import { useAuth } from '../pages/AuthPage'; // Ajusta la ruta si AuthPage.tsx está en un directorio diferente
import '../styles/Dashboard.css'; // Asegúrate de que este CSS esté en su lugar

const AdminDashboard: React.FC = () => {
    const { userRole, logout } = useAuth();

    return (
        <div className="dashboard-container">
            <header className="dashboard-header">
                <h1>¡Bienvenido, Administrador!</h1>
                <p>Tu rol: <strong>{userRole === 'admin' ? 'Administrador' : userRole}</strong></p> {/* Muestra "Administrador" si el rol es 'admin' */}
                <button onClick={logout} className="logout-button">Cerrar Sesión</button>
            </header>
            <main className="dashboard-content">
                <section className="dashboard-section">
                    <h2>Gestión de Horarios de Especialistas</h2>
                    <p>Visualiza y edita la disponibilidad de los cardiólogos y otros especialistas.</p>
                    <div className="admin-actions">
                        <button className="action-button">Editar Horarios de Cardiólogos</button>
                        <button className="action-button">Editar Horarios de Otros Especialistas</button> {/* O podrías especificar "Terapeutas" si aplica */}
                    </div>
                </section>
                <section className="dashboard-section">
                    <h2>Gestión de Usuarios</h2>
                    <p>Agrega, edita o elimina cuentas de pacientes y personal del consultorio.</p>
                    <div className="admin-actions">
                        <button className="action-button">Gestionar Pacientes</button>
                        <button className="action-button">Gestionar Personal</button>
                    </div>
                </section>
                <section className="dashboard-section">
                    <h2>Resumen de Citas</h2>
                    <p>Monitorea todas las citas próximas y pasadas del consultorio.</p>
                    <button className="action-button">Ver Todas las Citas</button>
                </section>
                <section className="dashboard-section">
                    <h2>Informes y Análisis</h2>
                    <p>Genera informes sobre el uso del sistema, datos de pacientes cardiológicos y más.</p>
                    <button className="action-button">Generar Informes</button>
                </section>
            </main>
        </div>
    );
};

export default AdminDashboard;