import React, { useState } from 'react';
import axios from 'axios';

interface ForgotPasswordProps {
  onNavigateToLogin: () => void;
}

const ForgotPassword: React.FC<ForgotPasswordProps> = ({ onNavigateToLogin }) => {
  const [email, setEmail] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const API_AUTH_BASE_URL = 'http://localhost:5000/api/auth';

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);
    setLoading(true);

    try {
      const response = await axios.post(`${API_AUTH_BASE_URL}/recuperar-contrasena`, { email });
      if (response.status === 200) {
        setSuccessMessage('Si tu email está registrado, recibirás un enlace para restablecer tu contraseña.');
      }
    } catch (err: any) {
      if (axios.isAxiosError(err) && err.response) {
        setError(err.response.data.message || 'Error al solicitar recuperación de contraseña.');
      } else {
        setError('Error de conexión con el servidor. Por favor, verifica que el backend esté corriendo.');
        console.error('Forgot password error:', err);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="forgot-password-container">
      <div className="forgot-password-card">
        <h2 className="forgot-password-title">Recuperar Contraseña</h2>
        <form onSubmit={handleForgotPassword} className="forgot-password-form">
          <div className="form-group">
            <label htmlFor="email" className="form-label">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-input"
              required
            />
          </div>
          {error && <p className="error-message">{error}</p>}
          {successMessage && <p className="success-message">{successMessage}</p>}
          <button
            type="submit"
            className="forgot-password-button"
            disabled={loading}
          >
            {loading ? (
              <svg className="spinner" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : null}
            {loading ? 'Enviando...' : 'Restablecer Contraseña'}
          </button>
        </form>
        <p className="forgot-password-login-text">
          <button
            onClick={onNavigateToLogin}
            className="link-button"
          >
            Volver al inicio de sesión
          </button>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;