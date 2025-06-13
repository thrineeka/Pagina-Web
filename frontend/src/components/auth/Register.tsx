import React, { useState } from 'react';
import axios from 'axios';
// Assuming User interface is available globally or imported from AuthApp.tsx/types file

interface RegisterProps {
  onNavigateToLogin: () => void;
}

const Register: React.FC<RegisterProps> = ({ onNavigateToLogin }) => {
  const [formData, setFormData] = useState({
    nombre_usuario: '',
    contrasena: '',
    primer_nombre: '',
    apellido_paterno: '',
    apellido_materno: '',
    email: '',
    telefono: '',
    tipo_documento: '',
    numero_documento: '',
  });
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const API_USER_BASE_URL = 'http://localhost:5000/api/usuarios';

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);
    setLoading(true);

    try {
      const payload = {
        nombre_usuario: formData.nombre_usuario,
        contrasena: formData.contrasena,
        rol: 'Paciente', // Default role for public registration
        primer_nombre: formData.primer_nombre,
        apellido_paterno: formData.apellido_paterno,
        ...(formData.apellido_materno && { apellido_materno: formData.apellido_materno }),
        email: formData.email,
        ...(formData.telefono && { telefono: formData.telefono }),
        ...(formData.tipo_documento && { tipo_documento: formData.tipo_documento }),
        ...(formData.numero_documento && { numero_documento: formData.numero_documento }),
      };

      const response = await axios.post(`${API_USER_BASE_URL}/registro`, payload);

      if (response.status === 201 || response.status === 200) {
        setSuccessMessage('¡Registro exitoso! Ahora puedes iniciar sesión.');
        setFormData({
          nombre_usuario: '',
          contrasena: '',
          primer_nombre: '',
          apellido_paterno: '',
          apellido_materno: '',
          email: '',
          telefono: '',
          tipo_documento: '',
          numero_documento: '',
        });
        setTimeout(onNavigateToLogin, 2000);
      }
    } catch (err: any) {
      if (axios.isAxiosError(err) && err.response) {
        setError(err.response.data.message || 'Error en el registro. Inténtalo de nuevo.');
      } else {
        setError('Error de conexión con el servidor. Por favor, verifica que el backend esté corriendo.');
        console.error('Registration error:', err);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <h2 className="register-title">Registrarse</h2>
        <form onSubmit={handleRegister} className="register-form">
          <div className="form-group">
            <label htmlFor="nombre_usuario" className="form-label">Nombre de Usuario:</label>
            <input type="text" id="nombre_usuario" value={formData.nombre_usuario} onChange={handleChange} className="form-input" required />
          </div>
          <div className="form-group">
            <label htmlFor="contrasena" className="form-label">Contraseña:</label>
            <input type="password" id="contrasena" value={formData.contrasena} onChange={handleChange} className="form-input" required />
          </div>
          <div className="form-group">
            <label htmlFor="primer_nombre" className="form-label">Primer Nombre:</label>
            <input type="text" id="primer_nombre" value={formData.primer_nombre} onChange={handleChange} className="form-input" required />
          </div>
          <div className="form-group">
            <label htmlFor="apellido_paterno" className="form-label">Apellido Paterno:</label>
            <input type="text" id="apellido_paterno" value={formData.apellido_paterno} onChange={handleChange} className="form-input" required />
          </div>
          <div className="form-group">
            <label htmlFor="apellido_materno" className="form-label">Apellido Materno (opcional):</label>
            <input type="text" id="apellido_materno" value={formData.apellido_materno} onChange={handleChange} className="form-input" />
          </div>
          <div className="form-group">
            <label htmlFor="email" className="form-label">Email:</label>
            <input type="email" id="email" value={formData.email} onChange={handleChange} className="form-input" required />
          </div>
          <div className="form-group">
            <label htmlFor="telefono" className="form-label">Teléfono (opcional):</label>
            <input type="text" id="telefono" value={formData.telefono} onChange={handleChange} className="form-input" />
          </div>
          <div className="form-group">
            <label htmlFor="tipo_documento" className="form-label">Tipo de Documento (opcional):</label>
            <input type="text" id="tipo_documento" value={formData.tipo_documento} onChange={handleChange} className="form-input" />
          </div>
          <div className="form-group">
            <label htmlFor="numero_documento" className="form-label">Número de Documento (opcional):</label>
            <input type="text" id="numero_documento" value={formData.numero_documento} onChange={handleChange} className="form-input" />
          </div>
          {error && <p className="error-message col-span-2">{error}</p>}
          {successMessage && <p className="success-message col-span-2">{successMessage}</p>}
          <button
            type="submit"
            className="register-button col-span-2"
            disabled={loading}
          >
            {loading ? (
              <svg className="spinner" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : null}
            {loading ? 'Registrando...' : 'Registrarse'}
          </button>
        </form>
        <p className="register-login-text">
          ¿Ya tienes una cuenta?{' '}
          <button
            onClick={onNavigateToLogin}
            className="link-button font-medium"
          >
            Inicia sesión aquí
          </button>
        </p>
      </div>
    </div>
  );
};

export default Register;