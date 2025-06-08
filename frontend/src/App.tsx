// src/App.tsx
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';

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

// Componentes de autenticación y paneles de control
import AuthPage, { AuthProvider, useAuth } from './pages/AuthPage';
// Si LoginPage es idéntico a AuthPage, o si AuthPage maneja ambos (login/registro),
// podrías considerar eliminar LoginPage y solo usar AuthPage.
// Para este ejemplo, asumiremos que LoginPage es solo una ruta de acceso a AuthPage
// o un componente de login alternativo.
import LoginPage from './pages/LoginPage'; // Asegúrate de que este componente existe y funciona como esperas

import PatientDashboard from './componentslogin/PatienDashboard';
import AdminDashboard from './componentslogin/AdminDashboard';


// --- Componente para Rutas Protegidas ---
const PrivateRoute: React.FC<{ children: React.ReactNode, allowedRoles: ('Paciente' | 'Administrador')[] }> = ({ children, allowedRoles }) => {
    const { isAuthenticated, userRole } = useAuth(); // Obtiene el estado de autenticación y el rol del usuario

    // Log para depuración
    // console.log('PrivateRoute: isAuthenticated', isAuthenticated, 'userRole', userRole, 'allowedRoles', allowedRoles);

    if (!isAuthenticated) {
        // Si no está autenticado, redirige al login (puedes usar '/auth' si es tu punto de entrada único)
        // Usamos '/login' aquí porque tienes esa ruta. Si siempre es AuthPage, podrías redirigir a '/auth'.
        return <Navigate to="/login" replace />;
    }

    // Si está autenticado, verifica si el rol del usuario está permitido para esta ruta
    // Importante: Los roles en `allowedRoles` deben coincidir con los roles que tu backend envía (ej. 'Paciente', 'Administrador')
    if (userRole && allowedRoles.includes(userRole)) {
        return <>{children}</>; // Si el rol es correcto, renderiza el contenido
    }

    // Si está autenticado pero el rol no es el permitido, redirige al home o a una página de "acceso denegado"
    console.warn(`Usuario con rol "${userRole}" intentó acceder a una ruta restringida. Redirigiendo a /.`);
    return <Navigate to="/" replace />; // Redirige al home si el rol no es autorizado para esta ruta
};
// --- Fin Componente PrivateRoute ---


// Componente principal que contiene las rutas y la lógica de visibilidad de Header/Footer
const AppContent: React.FC = () => {
    const location = useLocation();
    const { isAuthenticated, userRole } = useAuth(); // Para manejar la redirección de usuarios logueados

    // Rutas donde el Header y Footer NO deben mostrarse
    // Es crucial que estos paths coincidan exactamente con los `path` en tus <Route>
    // y con los paths a los que se redirige.
    // He ajustado 'patien/dashboard' para que coincida con la ruta definida abajo.
    const noAuthRoutes = ['/auth', '/login', '/patien/dashboard', '/admin/dashboard'];
    const shouldHideNav = noAuthRoutes.includes(location.pathname);

    // Lógica para redirigir si el usuario ya está logueado y trata de ir a /auth o /login
    // Esta lógica debe ir antes de las rutas para que se evalúe primero
    if (isAuthenticated) {
        if (location.pathname === '/auth' || location.pathname === '/login') {
            if (userRole === 'Paciente') {
                return <Navigate to="/patien/dashboard" replace />;
            } else if (userRole === 'Administrador') {
                return <Navigate to="/admin/dashboard" replace />;
            }
            // Si hay otros roles o un rol desconocido, podrías redirigir a una página predeterminada
            // o simplemente permitir que la lógica de la ruta AuthPage maneje un estado "ya logueado".
            // Para simplicidad, podemos dejar que caiga por las rutas si no es ni paciente ni admin.
        }
    }


    return (
        <>
            {/* El Header se renderiza condicionalmente */}
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

                    {/* Rutas de autenticación */}
                    {/* AuthPage se mostrará si el usuario no está autenticado. */}
                    {/* Si isAuthenticated es true, la lógica de redirección de arriba ya habrá actuado. */}
                    <Route path="/auth" element={<AuthPage />} />
                    <Route path="/login" element={<LoginPage />} /> {/* Si LoginPage es distinto de AuthPage */}

                    {/* Rutas Protegidas - Asegúrate de que los roles aquí sean los mismos que en tu DB */}
                    <Route
                        path="/patien/dashboard" // Ruta para el dashboard de pacientes
                        element={
                            <PrivateRoute allowedRoles={['Paciente']}> {/* Rol esperado de la DB */}
                                <PatientDashboard />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/admin/dashboard" // Ruta para el dashboard de administradores
                        element={
                            <PrivateRoute allowedRoles={['Administrador']}> {/* Rol esperado de la DB */}
                                <AdminDashboard />
                            </PrivateRoute>
                        }
                    />

                    {/* Ruta de fallback para cualquier ruta no definida que no sea manejada por la lógica de redirección */}
                    {/* Podrías querer que redirija a /auth o /login si el usuario no está logueado */}
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </main>

            {/* El Footer se renderiza condicionalmente */}
            {!shouldHideNav && <Footer />}
        </>
    );
};

// El componente App principal que envuelve todo con Router y AuthProvider
function App() {
    return (
        <Router>
            <AuthProvider> {/* AuthProvider debe envolver todo lo que necesite el contexto de autenticación */}
                <AppContent />
            </AuthProvider>
        </Router>
    );
}

export default App;