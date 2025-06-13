import React, { useState } from 'react';
import axios from 'axios';
import type { User, AuthResponse } from '../../App'; // Assuming User and AuthResponse interfaces are in AuthApp.tsx or a shared types file
 // Assuming User and AuthResponse interfaces are in AuthApp.tsx or a shared types file

interface LoginProps {
  onLoginSuccess: (user: User, token: string) => void;
  onNavigateToRegister: () => void;
  onNavigateToForgotPassword: () => void;
}

const Login: React.FC<LoginProps> = ({ onLoginSuccess, onNavigateToRegister, onNavigateToForgotPassword }) => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const API_AUTH_BASE_URL = 'http://localhost:5000/api/auth';

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await axios.post<AuthResponse>(`${API_AUTH_BASE_URL}/login`, {
        username,
        password,
      });

      const data = response.data;

      if (data.token && data.user) {
        onLoginSuccess(data.user, data.token); // Pass the token as well
      } else {
        setError('Inicio de sesión exitoso, pero no se recibió token o datos de usuario completos.');
      }
    } catch (err: any) {
      if (axios.isAxiosError(err) && err.response) {
        setError(err.response.data.message || 'Credenciales inválidas. Inténtalo de nuevo.');
      } else {
        setError('Error de conexión con el servidor. Por favor, verifica que el backend esté corriendo.');
        console.error('Login error:', err);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Iniciar Sesión</h2>
        <form onSubmit={handleLogin} className="login-form">
          <div className="form-group">
            <label htmlFor="username" className="form-label">Usuario:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="form-input"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password" className="form-label">Contraseña:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-input"
              required
            />
          </div>
          {error && <p className="error-message">{error}</p>}
          <button
            type="submit"
            className="login-button"
            disabled={loading}
          >
            {loading ? (
              <svg className="spinner" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : null}
            {loading ? 'Iniciando Sesión...' : 'Login'}
          </button>
        </form>
        <div className="login-links">
          <button
            onClick={onNavigateToForgotPassword}
            className="link-button"
          >
            ¿Olvidaste tu contraseña?
          </button>
          <p className="register-text">
            ¿No tienes una cuenta?{' '}
            <button
              onClick={onNavigateToRegister}
              className="link-button font-medium"
            >
              Regístrate aquí
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;