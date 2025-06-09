import React, { useState } from 'react';
import API_BASE_URL from '../api'; // Asegúrate de tener este archivo y su contenido

// --- Interfaces de TypeScript ---

// Interfaz para los datos del formulario de Registro
interface RegistroFormData {
    nombre_usuario: string;
    contrasena: string;
    confirmar_contrasena: string;
    rol: 'Administrador' | 'Especialista' | 'Paciente';
    primer_nombre: string;
    apellido_paterno: string;
    apellido_materno: string;
    telefono: string;
    tipo_documento: 'DNI' | 'Pasaporte' | 'Carnet de Extranjería' | 'Otro';
    numero_documento: string;
    email: string;
    genero: 'Masculino' | 'Femenino' | 'Otro' | '';
}

// Interfaz para los datos del formulario de Login
interface LoginFormData {
    nombre_usuario: string;
    contrasena: string;
}

// Interfaz para los datos del formulario de Recuperar Contraseña
interface RecuperarContrasenaFormData {
    email: string;
}

// Interfaz para la respuesta exitosa de Login
interface LoginSuccessResponse {
    mensaje: string;
    token: string;
    usuario: {
        id_usuario: number;
        nombre_usuario: string;
        rol: string;
        primer_nombre: string;
        email: string;
    };
}

// Interfaz para la respuesta de error de la API
interface ErrorResponse {
    error: string;
}

// --- Estilos Básicos (pueden ser movidos a un archivo CSS o módulo CSS) ---
const formContainerStyle: React.CSSProperties = {
    maxWidth: '400px',
    margin: '50px auto',
    padding: '20px',
    boxShadow: '0 0 10px rgba(0,0,0,0.1)',
    borderRadius: '8px',
    backgroundColor: '#fff'
};

const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '10px',
    marginBottom: '15px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    boxSizing: 'border-box'
};

const buttonStyle: React.CSSProperties = {
    width: '100%',
    padding: '12px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px'
};

const linkStyle: React.CSSProperties = {
    color: '#007bff',
    textDecoration: 'none',
    cursor: 'pointer'
};

const errorMessageStyle: React.CSSProperties = {
    color: 'red',
    marginBottom: '10px'
};

const successMessageStyle: React.CSSProperties = {
    color: 'green',
    marginBottom: '10px'
};

// --- Componente de Registro ---
interface RegistroProps {
    setView: (view: 'login' | 'registro' | 'recuperarContrasena') => void;
}

const Registro: React.FC<RegistroProps> = ({ setView }) => {
    const [formData, setFormData] = useState<RegistroFormData>({
        nombre_usuario: '',
        contrasena: '',
        confirmar_contrasena: '',
        rol: 'Paciente',
        primer_nombre: '',
        apellido_paterno: '',
        apellido_materno: '',
        telefono: '',
        tipo_documento: 'DNI',
        numero_documento: '',
        email: '',
        genero: ''
    });
    const [message, setMessage] = useState<string>('');
    const [error, setError] = useState<string>('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        // Asumiendo que el tipo 'radio' también devuelve el valor directamente
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage('');
        setError('');

        if (formData.contrasena !== formData.confirmar_contrasena) {
            setError('Las contraseñas no coinciden.');
            return;
        }

        try {
            const response = await fetch(`${API_BASE_URL}/usuarios/registro`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    nombre_usuario: formData.nombre_usuario,
                    contrasena: formData.contrasena,
                    rol: formData.rol,
                    primer_nombre: formData.primer_nombre,
                    apellido_paterno: formData.apellido_paterno,
                    apellido_materno: formData.apellido_materno,
                    email: formData.email,
                    telefono: formData.telefono,
                    tipo_documento: formData.tipo_documento,
                    numero_documento: formData.numero_documento,
                    genero: formData.genero
                }),
            });

            const data: { mensaje?: string; error?: string } = await response.json();

            if (response.ok) {
                setMessage(data.mensaje || 'Usuario registrado exitosamente');
                // Limpiar formulario o redirigir
                setFormData({
                    nombre_usuario: '',
                    contrasena: '',
                    confirmar_contrasena: '',
                    rol: 'Paciente',
                    primer_nombre: '',
                    apellido_paterno: '',
                    apellido_materno: '',
                    telefono: '',
                    tipo_documento: 'DNI',
                    numero_documento: '',
                    email: '',
                    genero: ''
                });
                setTimeout(() => setView('login'), 2000); // Redirigir al login después de 2 segundos
            } else {
                setError(data.error || 'Error al registrar el usuario.');
            }
        } catch (err) {
            console.error('Error de red:', err);
            setError('Error de conexión con el servidor.');
        }
    };

    return (
        <div style={formContainerStyle}>
            <h2>Registrarse</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="nombre_usuario"
                    placeholder="Nombre de Usuario"
                    value={formData.nombre_usuario}
                    onChange={handleChange}
                    style={inputStyle}
                    required
                />
                <input
                    type="password"
                    name="contrasena"
                    placeholder="Contraseña"
                    value={formData.contrasena}
                    onChange={handleChange}
                    style={inputStyle}
                    required
                />
                <input
                    type="password"
                    name="confirmar_contrasena"
                    placeholder="Confirmar Contraseña"
                    value={formData.confirmar_contrasena}
                    onChange={handleChange}
                    style={inputStyle}
                    required
                />
                <select
                    name="rol"
                    value={formData.rol}
                    onChange={handleChange}
                    style={inputStyle}
                    required
                >
                    <option value="Paciente">Paciente</option>
                    <option value="Especialista">Especialista</option>
                    <option value="Administrador">Administrador</option>
                </select>
                <input
                    type="text"
                    name="primer_nombre"
                    placeholder="Nombre"
                    value={formData.primer_nombre}
                    onChange={handleChange}
                    style={inputStyle}
                    required
                />
                <input
                    type="text"
                    name="apellido_paterno"
                    placeholder="Apellido Paterno"
                    value={formData.apellido_paterno}
                    onChange={handleChange}
                    style={inputStyle}
                    required
                />
                <input
                    type="text"
                    name="apellido_materno"
                    placeholder="Apellido Materno (opcional)"
                    value={formData.apellido_materno}
                    onChange={handleChange}
                    style={inputStyle}
                />
                <input
                    type="text"
                    name="telefono"
                    placeholder="Teléfono (opcional)"
                    value={formData.telefono}
                    onChange={handleChange}
                    style={inputStyle}
                />
                <label style={{ display: 'block', marginBottom: '10px' }}>Tipo de Documento:</label>
                <div style={{ display: 'flex', gap: '15px', marginBottom: '15px' }}>
                    <label>
                        <input type="radio" name="tipo_documento" value="DNI" checked={formData.tipo_documento === 'DNI'} onChange={handleChange} /> DNI
                    </label>
                    <label>
                        <input type="radio" name="tipo_documento" value="Pasaporte" checked={formData.tipo_documento === 'Pasaporte'} onChange={handleChange} /> Pasaporte
                    </label>
                    <label>
                        <input type="radio" name="tipo_documento" value="Carnet de Extranjería" checked={formData.tipo_documento === 'Carnet de Extranjería'} onChange={handleChange} /> Carnet de Extranjería
                    </label>
                    <label>
                        <input type="radio" name="tipo_documento" value="Otro" checked={formData.tipo_documento === 'Otro'} onChange={handleChange} /> Otro
                    </label>
                </div>
                <input
                    type="text"
                    name="numero_documento"
                    placeholder="Número de Documento (opcional)"
                    value={formData.numero_documento}
                    onChange={handleChange}
                    style={inputStyle}
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Correo Electrónico"
                    value={formData.email}
                    onChange={handleChange}
                    style={inputStyle}
                    required
                />
                <select
                    name="genero"
                    value={formData.genero}
                    onChange={handleChange}
                    style={inputStyle}
                >
                    <option value="">Selecciona Género (opcional)</option>
                    <option value="Masculino">Masculino</option>
                    <option value="Femenino">Femenino</option>
                    <option value="Otro">Otro</option>
                </select>

                {error && <p style={errorMessageStyle}>{error}</p>}
                {message && <p style={successMessageStyle}>{message}</p>}

                <button type="submit" style={buttonStyle}>Registrarse</button>
                <p style={{ textAlign: 'center', marginTop: '15px' }}>
                    ¿Ya tienes cuenta? <a onClick={() => setView('login')} style={linkStyle}>Inicia sesión aquí</a>
                </p>
            </form>
        </div>
    );
};

// --- Componente de Login ---
interface LoginProps {
    setView: (view: 'login' | 'registro' | 'recuperarContrasena') => void;
    onLoginSuccess: (token: string, user: LoginSuccessResponse['usuario']) => void;
}

const Login: React.FC<LoginProps> = ({ setView, onLoginSuccess }) => {
    const [formData, setFormData] = useState<LoginFormData>({
        nombre_usuario: '',
        contrasena: ''
    });
    const [error, setError] = useState<string>('');
    const [message, setMessage] = useState<string>('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setMessage('');

        try {
            const response = await fetch(`${API_BASE_URL}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data: LoginSuccessResponse | ErrorResponse = await response.json();

            if (response.ok) {
                const successData = data as LoginSuccessResponse;
                setMessage(successData.mensaje);
                localStorage.setItem('token', successData.token);
                localStorage.setItem('user', JSON.stringify(successData.usuario));
                onLoginSuccess(successData.token, successData.usuario);
                // Opcional: Redirigir o cambiar de vista
                // window.location.href = '/dashboard';
            } else {
                const errorData = data as ErrorResponse;
                setError(errorData.error || 'Error al iniciar sesión.');
            }
        } catch (err) {
            console.error('Error de red:', err);
            setError('Error de conexión con el servidor.');
        }
    };

    return (
        <div style={formContainerStyle}>
            <h2>Iniciar Sesión</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="nombre_usuario"
                    placeholder="Nombre de Usuario"
                    value={formData.nombre_usuario}
                    onChange={handleChange}
                    style={inputStyle}
                    required
                />
                <input
                    type="password"
                    name="contrasena"
                    placeholder="Contraseña"
                    value={formData.contrasena}
                    onChange={handleChange}
                    style={inputStyle}
                    required
                />
                {error && <p style={errorMessageStyle}>{error}</p>}
                {message && <p style={successMessageStyle}>{message}</p>}
                <button type="submit" style={buttonStyle}>Iniciar Sesión</button>
                <p style={{ textAlign: 'center', marginTop: '15px' }}>
                    <a onClick={() => setView('recuperarContrasena')} style={linkStyle}>¿Olvidaste tu contraseña?</a>
                </p>
                <p style={{ textAlign: 'center' }}>
                    ¿No tienes cuenta? <a onClick={() => setView('registro')} style={linkStyle}>Regístrate aquí</a>
                </p>
            </form>
        </div>
    );
};

// --- Componente de Recuperar Contraseña ---
interface RecuperarContrasenaProps {
    setView: (view: 'login' | 'registro' | 'recuperarContrasena') => void;
}

const RecuperarContrasena: React.FC<RecuperarContrasenaProps> = ({ setView }) => {
    const [formData, setFormData] = useState<RecuperarContrasenaFormData>({ email: '' });
    const [message, setMessage] = useState<string>('');
    const [error, setError] = useState<string>('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage('');
        setError('');

        try {
            const response = await fetch(`${API_BASE_URL}/auth/recuperar-contrasena`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data: { mensaje?: string; error?: string } = await response.json();

            if (response.ok) {
                setMessage(data.mensaje || 'Si el correo electrónico está registrado, se le ha enviado un enlace para restablecer su contraseña.');
            } else {
                setError(data.error || 'Error al solicitar recuperación de contraseña.');
            }
        } catch (err) {
            console.error('Error de red:', err);
            setError('Error de conexión con el servidor.');
        }
    };

    return (
        <div style={formContainerStyle}>
            <h2>Recuperar Contraseña</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    name="email"
                    placeholder="Correo Electrónico"
                    value={formData.email}
                    onChange={handleChange}
                    style={inputStyle}
                    required
                />
                {error && <p style={errorMessageStyle}>{error}</p>}
                {message && <p style={successMessageStyle}>{message}</p>}
                <button type="submit" style={buttonStyle}>Enviar Enlace</button>
                <p style={{ textAlign: 'center', marginTop: '15px' }}>
                    <a onClick={() => setView('login')} style={linkStyle}>Volver a Iniciar Sesión</a>
                </p>
            </form>
        </div>
    );
};

// --- Componente Padre (AuthPage) que orquesta las vistas ---
type AuthView = 'login' | 'registro' | 'recuperarContrasena';

const AuthPage: React.FC = () => {
    // Estado para controlar qué vista se muestra
    const [currentView, setCurrentView] = useState<AuthView>('login'); // Iniciar en la vista de login

    const handleLoginSuccess = (token: string, user: LoginSuccessResponse['usuario']) => {
        console.log('Login exitoso:', user);
        alert(`¡Bienvenido, ${user.primer_nombre}! Has iniciado sesión como ${user.rol}.`);
        // Aquí podrías redirigir al usuario a un dashboard o a otra parte de la aplicación
        // Por ejemplo, usando react-router-dom o un contexto de autenticación
        // history.push('/dashboard'); // Si usas useHistory de react-router-dom
    };

    const renderView = () => {
        switch (currentView) {
            case 'registro':
                return <Registro setView={setCurrentView} />;
            case 'login':
                return <Login setView={setCurrentView} onLoginSuccess={handleLoginSuccess} />;
            case 'recuperarContrasena':
                return <RecuperarContrasena setView={setCurrentView} />;
            default:
                return <Login setView={setCurrentView} onLoginSuccess={handleLoginSuccess} />;
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: '#f0f2f5' }}>
            {renderView()}
        </div>
    );
};

export default AuthPage;