// C:\xampp\htdocs\romina\Pagina-Web\Frontend\src\components\AuthPage.tsx

import React, { useState, createContext, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/AuthPage.css';


// --- 1. Crear un Contexto para el estado de autenticación ---
interface AuthContextType {
    isAuthenticated: boolean;
    userRole: 'Paciente' | 'Especialista' | 'Administrador' | null; 
    login: (userData: { id_usuario: number; nombre_usuario: string; rol: 'Paciente' | 'Especialista' | 'Administrador'; email?: string; primer_nombre?: string }) => void;
    logout: () => void;
    currentUser: any; // Para almacenar todos los datos del usuario logueado
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
    const [userRole, setUserRole] = useState<'Paciente' | 'Especialista' | 'Administrador' | null>(null);
    const [currentUser, setCurrentUser] = useState<any>(null); // Nuevo estado para el usuario completo

    const login = (userData: { id_usuario: number; nombre_usuario: string; rol: 'Paciente' | 'Especialista' | 'Administrador'; email?: string; primer_nombre?: string }) => {
        setIsAuthenticated(true);
        setUserRole(userData.rol);
        setCurrentUser(userData); // Guarda todos los datos del usuario
        // En una aplicación real, aquí guardarías el token de autenticación y los datos del usuario en localStorage/sessionStorage
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('userRole', userData.rol);
        localStorage.setItem('currentUser', JSON.stringify(userData));
    };

    const logout = () => {
        setIsAuthenticated(false);
        setUserRole(null);
        setCurrentUser(null);
        // En una aplicación real, aquí limpiarías el token de autenticación
        localStorage.removeItem('isAuthenticated');
        localStorage.removeItem('userRole');
        localStorage.removeItem('currentUser');
    };

    // Rehidratar el estado desde localStorage al cargar la app
    React.useEffect(() => {
        const storedAuth = localStorage.getItem('isAuthenticated');
        const storedRole = localStorage.getItem('userRole') as 'Paciente' | 'Especialista' | 'Administrador' | null;
        const storedUser = localStorage.getItem('currentUser');
        if (storedAuth === 'true' && storedRole && storedUser) {
            setIsAuthenticated(true);
            setUserRole(storedRole);
            setCurrentUser(JSON.parse(storedUser));
        }
    }, []);

    return (
        <AuthContext.Provider value={{ isAuthenticated, userRole, login, logout, currentUser }}>
            {children}
        </AuthContext.Provider>
    );
};
// --- Fin del Contexto de Autenticación ---















const AuthPage: React.FC = () => {
    const { login } = useAuth();
    const navigate = useNavigate();

    




    // *** IMPORTANTE: Asegúrate de que API_URL coincida con el puerto de tu backend (9000) ***
    const API_URL = 'http://localhost:9000';

    const [view, setView] = useState<'login' | 'register' | 'forgot-password'>('login');
    const [nombreUsuario, setNombreUsuario] = useState(''); // Para el campo de nombre de usuario en login y registro
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');

    // --- Estados para el formulario de registro, mapeados a nombres de la DB ---
    const [primerNombre, setPrimerNombre] = useState('');
    const [apellidoPaterno, setApellidoPaterno] = useState('');
    const [apellidoMaterno, setApellidoMaterno] = useState('');
    const [telefono, setTelefono] = useState('');
    const [tipoDocumento, setTipoDocumento] = useState<'DNI' | 'Pasaporte' | 'Carnet de Extranjería' | 'Otro'>('DNI');
    const [numeroDocumento, setNumeroDocumento] = useState('');
    const [emailRegistro, setEmailRegistro] = useState(''); // Usar un nombre diferente para el email de registro
    const [genero, setGenero] = useState<'Masculino' | 'Femenino' | 'Otro' | ''>('');
    const [rolRegistro, setRolRegistro] = useState<'Paciente' | 'Especialista' | 'Administrador'>('Paciente'); // Default a Paciente
    // ----------------------------------------------------------------------

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage('Iniciando sesión...');

        try {
            // *** RUTA CAMBIADA A /api/login ***
            const response = await fetch(`${API_URL}/api/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    nombre_usuario: nombreUsuario,
                    contrasena: password
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Error en el inicio de sesión. Por favor, verifica tus credenciales.');
            }

            setMessage(data.message || 'Inicio de sesión exitoso.');
            login(data.user); // Llama a la función login 

            // Redirigir según el rol
            setTimeout(() => {
                if (data.user.rol === 'Paciente') {
                    navigate('/patient/dashboard');
                } else if (data.user.rol === 'Administrador') {
                    navigate('/admin/dashboard');
                } else if (data.user.rol === 'Especialista') {
                    navigate('/specialist/dashboard');
                } else {
                    navigate('/'); // Ruta por defecto si el rol no es reconocido
                }
            }, 500);

        } catch (error: any) {
            console.error("Error al iniciar sesión:", error);
            setMessage(`Error: ${error.message}`);
        }
    };

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage('Registrando usuario...');

        if (password !== confirmPassword) {
            setMessage('Error: Las contraseñas no coinciden.');
            return;
        }
        if (!genero) {
            setMessage('Error: Por favor, selecciona tu género.');
            return;
        }
        if (!primerNombre || !apellidoPaterno || !apellidoMaterno || !telefono || !numeroDocumento || !emailRegistro || !nombreUsuario || !password) {
            setMessage('Error: Por favor, completa todos los campos requeridos.');
            return;
        }

        try {
            // *** RUTA CAMBIADA A /api/usuarios ***
            const response = await fetch(`${API_URL}/api/usuarios`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    nombre_usuario: nombreUsuario,
                    contrasena: password,
                    rol: rolRegistro,
                    primer_nombre: primerNombre,
                    apellido_paterno: apellidoPaterno,
                    apellido_materno: apellidoMaterno,
                    telefono: telefono,
                    tipo_documento: tipoDocumento,
                    numero_documento: numeroDocumento,
                    email: emailRegistro,
                    genero: genero
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Error al registrar usuario.');
            }

            setMessage(data.message || '¡Registro exitoso! Ahora puedes iniciar sesión.');
            setView('login'); // Redirige al formulario de login después del registro exitoso
            // Limpia los campos después de la simulación de registro exitosa
            setNombreUsuario('');
            setPassword('');
            setConfirmPassword('');
            setPrimerNombre('');
            setApellidoPaterno('');
            setApellidoMaterno('');
            setTelefono('');
            setTipoDocumento('DNI');
            setNumeroDocumento('');
            setEmailRegistro('');
            setGenero('');
            setRolRegistro('Paciente'); // Restablecer a paciente por defecto
        } catch (error: any) {
            console.error("Error al registrar usuario:", error);
            setMessage(`Error: ${error.message}`);
        }
    };

    const handleForgotPassword = (e: React.FormEvent) => {
        e.preventDefault();
        setMessage('Enviando instrucciones de recuperación...');

        console.log('Recuperación de contraseña para:', { email: emailRegistro });
        setTimeout(() => {
            setMessage('Simulación: Si tu email está registrado, recibirás un enlace de recuperación. (Esta funcionalidad aún no se conecta a un endpoint real en el backend).');
            setView('login');
            setEmailRegistro('');
        }, 2000);
    };

    const renderForm = () => {
        switch (view) {
            case 'login':
                return (
                    <form onSubmit={handleLogin}>
                        <h2>Iniciar Sesión</h2>
                        <div className="form-group">
                            <label htmlFor="nombre_usuario">Nombre de Usuario</label>
                            <input
                                type="text"
                                id="nombre_usuario"
                                value={nombreUsuario}
                                onChange={(e) => setNombreUsuario(e.target.value)}
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
                            <label htmlFor="nombre_usuario_reg">Nombre de Usuario</label>
                            <input
                                type="text"
                                id="nombre_usuario_reg"
                                value={nombreUsuario}
                                onChange={(e) => setNombreUsuario(e.target.value)}
                                required
                            />
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
                        <div className="form-group">
                            <label htmlFor="rolRegistro">Tipo de Usuario</label>
                            <select
                                id="rolRegistro"
                                value={rolRegistro}
                                onChange={(e) => setRolRegistro(e.target.value as 'Paciente' | 'Especialista' | 'Administrador')}
                                required
                            >
                                <option value="Paciente">Paciente</option>
                                <option value="Especialista">Especialista</option>
                                <option value="Administrador">Administrador</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="primer-nombre">Nombre</label>
                            <input
                                type="text"
                                id="primer-nombre"
                                value={primerNombre}
                                onChange={(e) => setPrimerNombre(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="apellido-paterno">Apellido Paterno</label>
                            <input
                                type="text"
                                id="apellido-paterno"
                                value={apellidoPaterno}
                                onChange={(e) => setApellidoPaterno(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="apellido-materno">Apellido Materno</label>
                            <input
                                type="text"
                                id="apellido-materno"
                                value={apellidoMaterno}
                                onChange={(e) => setApellidoMaterno(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="telefono">Teléfono</label>
                            <input
                                type="tel"
                                id="telefono"
                                value={telefono}
                                onChange={(e) => setTelefono(e.target.value)}
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
                                        checked={tipoDocumento === 'DNI'}
                                        onChange={() => setTipoDocumento('DNI')}
                                    /> DNI
                                </label>
                                <label>
                                    <input
                                        type="radio"
                                        value="Pasaporte"
                                        checked={tipoDocumento === 'Pasaporte'}
                                        onChange={() => setTipoDocumento('Pasaporte')}
                                    /> Pasaporte
                                </label>
                                <label>
                                    <input
                                        type="radio"
                                        value="Carnet de Extranjería"
                                        checked={tipoDocumento === 'Carnet de Extranjería'}
                                        onChange={() => setTipoDocumento('Carnet de Extranjería')}
                                    /> Carnet de Extranjería
                                </label>
                                <label>
                                    <input
                                        type="radio"
                                        value="Otro"
                                        checked={tipoDocumento === 'Otro'}
                                        onChange={() => setTipoDocumento('Otro')}
                                    /> Otro
                                </label>
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="numero-documento">Número de Documento</label>
                            <input
                                type="text"
                                id="numero-documento"
                                value={numeroDocumento}
                                onChange={(e) => setNumeroDocumento(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email-registro">Correo Electrónico</label>
                            <input
                                type="email"
                                id="email-registro"
                                value={emailRegistro}
                                onChange={(e) => setEmailRegistro(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="genero">Género</label>
                            <select
                                id="genero"
                                value={genero}
                                onChange={(e) => setGenero(e.target.value as 'Masculino' | 'Femenino' | 'Otro')}
                                required
                            >
                                <option value="">Selecciona...</option>
                                <option value="Masculino">Masculino</option>
                                <option value="Femenino">Femenino</option>
                                <option value="Otro">Otro</option>
                            </select>
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
                            <label htmlFor="email-forgot">Correo Electrónico</label>
                            <input
                                type="email"
                                id="email-forgot"
                                value={emailRegistro}
                                onChange={(e) => setEmailRegistro(e.target.value)}
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
                {message && <div className={`auth-message ${message.includes('Error') || message.includes('inválidas') ? 'error' : 'success'}`}>{message}</div>}
                {renderForm()}
            </div>
        </div>
    );
};

export default AuthPage;