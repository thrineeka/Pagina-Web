import React, { useState, useEffect, createContext, useContext, type ReactNode, useCallback } from 'react';
import axios from 'axios';
import '@fortawesome/fontawesome-free/css/all.min.css';

// Importa el CSS global (si lo tienes) o el CSS específico de login
import './styles/login.css'; // Asegúrate de que esta ruta sea correcta

// --- Interfaces para el Contexto de Autenticación ---
// 'Usuario' se elimina de User y AuthContextType si ya no es un rol en tu DB.
// Si 'Usuario' es un rol genérico para pacientes, considera usar solo 'Paciente'.
// Si 'Usuario' es un rol intermedio o por defecto, déjalo y asegúrate de que tu backend lo maneje.
// Para este ejemplo, lo mantendré para PrivateRoute pero lo quitaré de la interfaz 'User'
// si 'Paciente' es el único rol para usuarios no admin.
export interface User {
    id: string;
    username: string;
    email: string;
    rol: 'Paciente' | 'Administrador'; // Aquí has quitado 'Usuario'
    primer_nombre?: string;
    apellido_paterno?: string;
    apellido_materno?: string;
    telefono?: string;
    tipo_documento?: string;
    numero_documento?: string;
}

export interface AuthResponse {
    token: string;
    user: User;
    message: string;
}

interface AuthContextType {
    isAuthenticated: boolean;
    user: User | null;
    // Aquí 'Usuario' también debe reflejar los roles que realmente pueden existir
    userRole: 'Paciente' | 'Administrador' | null;
    login: (userData: User, token: string) => void;
    logout: () => void;
    isLoadingAuth: boolean;
}

// --- Contexto de Autenticación ---
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [user, setUser] = useState<User | null>(null);
    // El tipo de userRole debe ser coherente con la interfaz User y el contexto.
    // Si 'Usuario' no es un rol válido en tu backend, elimínalo de aquí también.
    const [userRole, setUserRole] = useState<'Paciente' | 'Administrador' | null>(null); // Corregido: eliminado 'Usuario' si no es un rol DB

    const [isLoadingAuth, setIsLoadingAuth] = useState<boolean>(true); // Para manejar el estado de carga inicial

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        const storedUser = localStorage.getItem('user');

        if (storedToken && storedUser) {
            try {
                const parsedUser: User = JSON.parse(storedUser);
                setIsAuthenticated(true);
                setUser(parsedUser);
                setUserRole(parsedUser.rol);
                axios.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
            } catch (e) {
                console.error("Failed to parse user from localStorage", e);
                // Si hay un error de parseo, asumimos que los datos están corruptos y deslogeamos.
                setIsAuthenticated(false);
                setUser(null);
                setUserRole(null);
                localStorage.removeItem('token');
                localStorage.removeItem('user');
            }
        }
        setIsLoadingAuth(false);
    }, []);

    const login = useCallback((userData: User, token: string) => {
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(userData));
        setIsAuthenticated(true);
        setUser(userData);
        setUserRole(userData.rol);
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }, []);

    const logout = useCallback(() => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setIsAuthenticated(false);
        setUser(null);
        setUserRole(null);
        delete axios.defaults.headers.common['Authorization'];
    }, []);

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, userRole, login, logout, isLoadingAuth }}>
            {children}
        </AuthContext.Provider>
    );
};
// --- Fin Contexto de Autenticación ---

// --- Importación de Componentes de Autenticación ---
// Asumo que ahora estos componentes están en 'src/components/auth/'
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import ForgotPassword from './components/auth/ForgotPassword';
import AdminDashboard from './components/auth/AdminDashboard';
import PatientDashboard from './components/auth/PatientDashboard';

// --- Componente AuthApp (ahora en App.tsx) ---
// Este componente manejará la vista de autenticación (Login, Register, ForgotPassword)
// y redirigirá a los dashboards si el usuario ya está autenticado.
const AuthApp: React.FC = () => {
    // Correcto: Extraer login y logout directamente de useAuth
    const { isAuthenticated, user, userRole, login, logout } = useAuth();
    const [currentView, setCurrentView] = useState<'login' | 'register' | 'forgotPassword'>(
        'login'
    );

    // No necesitas este useEffect si el manejo de redirección se hace en AppContent
    // o si AuthApp solo se renderiza cuando no está autenticado.
    // Si la ruta ya es /patien/dashboard o /admin/dashboard, AuthApp no debería ni montarse aquí.
    // Lo comento porque el useEffect en AppContent ya maneja la redirección.
    /*
    useEffect(() => {
        if (isAuthenticated && userRole) {
            if (userRole === 'Paciente') {
                setCurrentView('login'); // Redirige internamente para mostrar el PatientDashboard
            } else if (userRole === 'Administrador') {
                setCurrentView('login'); // Redirige internamente para mostrar el AdminDashboard
            }
        }
    }, [isAuthenticated, userRole]);
    */

    // Si ya está autenticado y tiene un rol, muestra el dashboard adecuado.
    // Esta lógica es esencialmente lo que PrivateRoute debería decidir.
    // Aquí, AuthApp está siendo usado como un "wrapper" para dashboards protegidos.
    if (isAuthenticated && user && userRole) {
        if (userRole === 'Paciente') {
            return <PatientDashboard user={user} onLogout={logout} />;
        } else if (userRole === 'Administrador') {
            return <AdminDashboard user={user} onLogout={logout} />;
        }
    }

    // Si no está autenticado, muestra el formulario de login/registro/recuperación
    // `login` es la función del contexto para el éxito del login
    switch (currentView) {
        case 'register':
            return <Register onNavigateToLogin={() => setCurrentView('login')} />;
        case 'forgotPassword':
            return <ForgotPassword onNavigateToLogin={() => setCurrentView('login')} />;
        case 'login':
        default:
            return (
                <Login
                    onLoginSuccess={login} // Pasa la función `login` del contexto
                    onNavigateToRegister={() => setCurrentView('register')}
                    onNavigateToForgotPassword={() => setCurrentView('forgotPassword')}
                />
            );
    }
};

// Componentes de navegación y pie de página
import Header from './components/Header';
import Footer from './components/Footer';

// Páginas públicas
import Home from './pages/Home';
import Nosotros from './pages/Nosotros';
import Contacto from './pages/Contacto';
import Servicios from './pages/Servicios';

// Páginas de servicios específicos
import Electrocardiograma from './servicios/Electrocardiograma';
import Doppler from './servicios/Doppler';
import Ecocardiograma from './servicios/Ecocardiograma';
import Holter from './servicios/Holter';
import PruebaEsfuerzo from './servicios/PruebaEsfuerzo';
import Mapa from './servicios/Mapa';

// Importa BrowserRouter como Router para evitar conflictos de nombres
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';


const PrivateRoute: React.FC<{ children: React.ReactNode, allowedRoles: ('Paciente' | 'Administrador')[] }> = ({ children, allowedRoles }) => {
    const { isAuthenticated, userRole, isLoadingAuth } = useAuth();

    if (isLoadingAuth) {
        return <div>Cargando autenticación...</div>;
    }

    if (!isAuthenticated) {
        return <Navigate to="/auth" replace />;
    }

    // Corregido: `userRole` en `PrivateRoute` debe coincidir con `AuthContextType` y `User`
    // Si 'Usuario' ya no es un rol en tu DB, quítalo de aquí.
    // Si 'Paciente' es el único rol para usuarios "no admin", asegúrate de que allowedRoles lo refleje.
    if (userRole && allowedRoles.includes(userRole)) {
        return <>{children}</>;
    }

    console.warn(`Usuario con rol "${userRole}" intentó acceder a una ruta restringida. Redirigiendo a /.`);
    return <Navigate to="/" replace />;
};

// Componente principal que contiene las rutas y la lógica de visibilidad de Header/Footer.
const AppContent: React.FC = () => {
    const location = useLocation();
    const { isAuthenticated, userRole, isLoadingAuth } = useAuth();

    const noAuthRoutes = ['/auth'];
    const shouldHideNav = noAuthRoutes.includes(location.pathname);

    // Redirección si un usuario autenticado intenta ir a /auth
    useEffect(() => {
        if (!isLoadingAuth && isAuthenticated && userRole && location.pathname === '/auth') {
            if (userRole === 'Paciente') { // Corregido: eliminando 'Usuario' si no es un rol distinto
                // console.log("Usuario autenticado (Paciente) en /auth, redirigiendo a /patien/dashboard");
                // navigate("/patien/dashboard", { replace: true }); // Preferible usar `useNavigate`
            } else if (userRole === 'Administrador') {
                // console.log("Usuario autenticado (Administrador) en /auth, redirigiendo a /admin/dashboard");
                // navigate("/admin/dashboard", { replace: true }); // Preferible usar `useNavigate`
            }
        }
    }, [isLoadingAuth, isAuthenticated, userRole, location.pathname]); // No necesitas navigate aquí si ya lo manejas con <Navigate>

    // Redirección si un usuario autenticado intenta ir a /auth
    if (!isLoadingAuth && isAuthenticated && userRole && location.pathname === '/auth') {
        if (userRole === 'Paciente') {
            return <Navigate to="/patien/dashboard" replace />;
        } else if (userRole === 'Administrador') {
            return <Navigate to="/admin/dashboard" replace />;
        }
    }

    return (
        <>
            {!shouldHideNav && <Header />}

            <main>
                <Routes>
                    {/* Rutas públicas */}
                    <Route path="/" element={<Home />} />
                    <Route path="/nosotros" element={<Nosotros />} />
                    <Route path="/contacto" element={<Contacto />} />
                    <Route path="/servicios" element={<Servicios />} />

                    {/* Rutas de servicios específicos */}
                    <Route path="/servicios/electrocardiograma" element={<Electrocardiograma />} />
                    <Route path="/servicios/doppler" element={<Doppler />} />
                    <Route path="/servicios/ecocardiograma" element={<Ecocardiograma />} />
                    <Route path="/servicios/holter" element={<Holter />} />
                    <Route path="/servicios/prueba-esfuerzo" element={<PruebaEsfuerzo />} />
                    <Route path="/servicios/mapa" element={<Mapa />} />

                    {/* Ruta de autenticación principal */}
                    <Route path="/auth" element={<AuthApp />} />

                    {/* Rutas Protegidas */}
                    <Route
                        path="/patien/dashboard"
                        element={
                            <PrivateRoute allowedRoles={['Paciente']}> {/* Corregido: eliminando 'Usuario' de allowedRoles */}
                                <AuthApp />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/admin/dashboard"
                        element={
                            <PrivateRoute allowedRoles={['Administrador']}>
                                <AuthApp />
                            </PrivateRoute>
                        }
                    />

                    {/* Ruta de fallback */}
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </main>

            {!shouldHideNav && <Footer />}
        </>
    );
};

// El componente App principal que envuelve todo con Router y AuthProvider.
function App() {
    return (
        <Router> {/* Corregido: <Router> no necesita props location o navigator */}
            <AuthProvider>
                <AppContent />
            </AuthProvider>
        </Router>
    );
}

export default App;