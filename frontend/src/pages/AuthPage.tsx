import React, { useState, createContext, useContext } from 'react';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate
import '../styles/AuthPage.css'; // Asegúrate de que este CSS esté en su lugar

// --- 1. Crear un Contexto para el estado de autenticación ---
interface AuthContextType {
    isAuthenticated: boolean;
    userRole: 'patient' | 'admin' | null;
    login: (role: 'patient' | 'admin') => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Hook personalizado para usar el contexto de autenticación
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

// Componente proveedor de autenticación
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [userRole, setUserRole] = useState<'patient' | 'admin' | null>(null);

    const login = (role: 'patient' | 'admin') => {
        setIsAuthenticated(true);
        setUserRole(role);
        // En una aplicación real, aquí guardarías el token de autenticación en localStorage/sessionStorage
    };

    const logout = () => {
        setIsAuthenticated(false);
        setUserRole(null);
        // En una aplicación real, aquí limpiarías el token de autenticación
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, userRole, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
// --- Fin del Contexto de Autenticación ---

const AuthPage: React.FC = () => {
    const { login } = useAuth(); // Usamos el hook useAuth para acceder a la función login del contexto
    const navigate = useNavigate(); // Inicializa el hook useNavigate

    const [view, setView] = useState<'login' | 'register' | 'forgot-password'>('login');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');

    // --- Nuevos estados para el formulario de registro ---
    const [name, setName] = useState('');
    const [paternalLastName, setPaternalLastName] = useState('');
    const [maternalLastName, setMaternalLastName] = useState('');
    const [phone, setPhone] = useState('');
    const [documentType, setDocumentType] = useState<'DNI' | 'Otro'>('DNI'); // Default a DNI
    const [documentNumber, setDocumentNumber] = useState('');
    const [gender, setGender] = useState<'Masculino' | 'Femenino' | 'Otro' | ''>(''); // Campo de selección, inicial vacío
    // --------------------------------------------------

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setMessage('Iniciando sesión...');

        console.log('Intento de Login:', { email, password });
        setTimeout(() => {
            if (email === 'patient@example.com' && password === 'password123') {
                setMessage('¡Simulación de inicio de sesión de Paciente exitosa!');
                login('patient'); // Llama a la función login del contexto para establecer el rol
                // Redirige al dashboard del paciente después de un pequeño retraso
                setTimeout(() => {
                    navigate('/patien/dashboard'); // Redirige al dashboard del paciente
                }, 500); // Pequeño retraso para que el mensaje sea visible
            } else if (email === 'admin@example.com' && password === 'admin123') {
                setMessage('¡Simulación de inicio de sesión de Admin exitosa!');
                login('admin'); // Llama a la función login del contexto para establecer el rol
                // Redirige al dashboard del admin después de un pequeño retraso
                setTimeout(() => {
                    navigate('/admin/dashboard'); // Redirige al dashboard del administrador
                }, 500); // Pequeño retraso para que el mensaje sea visible
            } else {
                setMessage('Error: Credenciales incorrectas. Intenta "patient@example.com" y "password123" o "admin@example.com" y "admin123" para simular.');
            }
        }, 1500);
    };

    const handleRegister = (e: React.FormEvent) => {
        e.preventDefault();
        setMessage('Registrando usuario...');

        if (password !== confirmPassword) {
            setMessage('Error: Las contraseñas no coinciden.');
            return;
        }
        if (!gender) {
            setMessage('Error: Por favor, selecciona tu género.');
            return;
        }
        if (!name || !paternalLastName || !maternalLastName || !phone || !documentNumber || !email) {
            setMessage('Error: Por favor, completa todos los campos requeridos.');
            return;
        }

        console.log('Intento de Registro:', {
            name,
            paternalLastName,
            maternalLastName,
            phone,
            documentType,
            documentNumber,
            email,
            gender,
            password
        });

        setTimeout(() => {
            setMessage('¡Simulación de registro exitoso! Por favor, "inicia sesión" con tus nuevas credenciales.');
            setView('login');
            // Limpia los campos después de la simulación de registro exitosa
            setEmail('');
            setPassword('');
            setConfirmPassword('');
            setName('');
            setPaternalLastName('');
            setMaternalLastName('');
            setPhone('');
            setDocumentType('DNI');
            setDocumentNumber('');
            setGender('');
        }, 2000);
    };

    const handleForgotPassword = (e: React.FormEvent) => {
        e.preventDefault();
        setMessage('Enviando instrucciones de recuperación...');

        console.log('Recuperación de contraseña para:', { email });
        setTimeout(() => {
            setMessage('Simulación: Si tu email está registrado, recibirás un enlace de recuperación.');
            setView('login');
        }, 2000);
    };

    const renderForm = () => {
        switch (view) {
            case 'login':
                return (
                    <form onSubmit={handleLogin}>
                        <h2>Iniciar Sesión</h2>
                        <div className="form-group">
                            <label htmlFor="email">Correo Electrónico</label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Contraseña</label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" className="auth-btn">Iniciar Sesión</button>
                        <p className="auth-options">
                            <span onClick={() => setView('forgot-password')}>¿Olvidaste tu contraseña?</span>
                        </p>
                        <p className="auth-options">
                            ¿No tienes cuenta? <span onClick={() => setView('register')}>Regístrate aquí</span>
                        </p>
                    </form>
                );
            case 'register':
                return (
                    <form onSubmit={handleRegister}>
                        <h2>Registrarse</h2>
                        <div className="form-group">
                            <label htmlFor="name">Nombre</label>
                            <input
                                type="text"
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="paternal-lastname">Apellido Paterno</label>
                            <input
                                type="text"
                                id="paternal-lastname"
                                value={paternalLastName}
                                onChange={(e) => setPaternalLastName(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="maternal-lastname">Apellido Materno</label>
                            <input
                                type="text"
                                id="maternal-lastname"
                                value={maternalLastName}
                                onChange={(e) => setMaternalLastName(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="phone">Teléfono</label>
                            <input
                                type="tel"
                                id="phone"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Tipo de Documento</label>
                            <div className="radio-group">
                                <label>
                                    <input
                                        type="radio"
                                        value="DNI"
                                        checked={documentType === 'DNI'}
                                        onChange={() => setDocumentType('DNI')}
                                    /> DNI
                                </label>
                                <label>
                                    <input
                                        type="radio"
                                        value="Otro"
                                        checked={documentType === 'Otro'}
                                        onChange={() => setDocumentType('Otro')}
                                    /> Otro
                                </label>
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="document-number">Número de Documento</label>
                            <input
                                type="text"
                                id="document-number"
                                value={documentNumber}
                                onChange={(e) => setDocumentNumber(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="register-email">Correo Electrónico</label>
                            <input
                                type="email"
                                id="register-email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="gender">Género</label>
                            <select
                                id="gender"
                                value={gender}
                                onChange={(e) => setGender(e.target.value as 'Masculino' | 'Femenino' | 'Otro')}
                                required
                            >
                                <option value="">Selecciona...</option>
                                <option value="Masculino">Masculino</option>
                                <option value="Femenino">Femenino</option>
                                <option value="Otro">Otro</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="register-password">Contraseña</label>
                            <input
                                type="password"
                                id="register-password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="confirm-password">Confirmar Contraseña</label>
                            <input
                                type="password"
                                id="confirm-password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" className="auth-btn">Registrarse</button>
                        <p className="auth-options">
                            ¿Ya tienes cuenta? <span onClick={() => setView('login')}>Inicia sesión aquí</span>
                        </p>
                    </form>
                );
            case 'forgot-password':
                return (
                    <form onSubmit={handleForgotPassword}>
                        <h2>Recuperar Contraseña</h2>
                        <div className="form-group">
                            <label htmlFor="email">Correo Electrónico</label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" className="auth-btn">Enviar Enlace</button>
                        <p className="auth-options">
                            <span onClick={() => setView('login')}>Volver a Iniciar Sesión</span>
                        </p>
                    </form>
                );
            default:
                return null;
        }
    };

    return (
        <div className="auth-page-container">
            <div className="auth-form-card">
                {message && <div className={`auth-message ${message.includes('Error') || message.includes('incorrectas') ? 'error' : 'success'}`}>{message}</div>}
                {renderForm()}
            </div>
        </div>
    );
};

export default AuthPage;