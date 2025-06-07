// src/App.tsx
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom'; // Importa useLocation y Navigate
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
// Asegúrate de que AuthPage.tsx exporta AuthProvider y useAuth
import AuthPage, { AuthProvider, useAuth } from './pages/AuthPage';
// Asumo que LoginPage es lo mismo que AuthPage o un componente intermedio que lleva a AuthPage,
// si LoginPage es tu componente de login principal, debería manejar la autenticación.
// Si AuthPage ya maneja login/register/forgot-password, entonces LoginPage podría ser redundante.
// Para este ejemplo, lo mantendremos como una ruta separada si es lo que tenías en mente,
// pero la autenticación principal sucederá en AuthPage.
import LoginPage from './pages/LoginPage'; // Asumo que existe y lo usarás

import PatientDashboard from './componentslogin/PatienDashboard'; // Ajusta la ruta si es necesario
import AdminDashboard from './componentslogin/AdminDashboard';   // Ajusta la ruta si es necesario


// --- Componente para Rutas Protegidas ---
// Este componente se asegura de que solo los usuarios autenticados con el rol correcto
// puedan acceder a ciertas rutas.
const PrivateRoute: React.FC<{ children: React.ReactNode, allowedRoles: ('patient' | 'admin')[] }> = ({ children, allowedRoles }) => {
    const { isAuthenticated, userRole } = useAuth(); // Obtiene el estado de autenticación y el rol del usuario

    if (!isAuthenticated) {
        // Si no está autenticado, redirige al login
        return <Navigate to="/login" replace />; // O a '/auth' si esa es tu ruta principal de auth
    }

    // Si está autenticado, verifica si el rol del usuario está permitido para esta ruta
    if (userRole && allowedRoles.includes(userRole)) {
        return <>{children}</>; // Si el rol es correcto, renderiza el contenido
    }

    // Si está autenticado pero el rol no es el permitido, redirige a una página de "acceso denegado"
    // o de vuelta al login, dependiendo de tu lógica de UX.
    // Aquí, para simplicidad, redirigimos al home o al login.
    console.warn(`User with role "${userRole}" tried to access a restricted route. Redirecting.`);
    return <Navigate to="/" replace />; // Podrías cambiar a '/login' o a una página de error
};
// --- Fin Componente PrivateRoute ---


// Componente principal que contiene las rutas y la lógica de visibilidad de Header/Footer
const AppContent: React.FC = () => {
    const location = useLocation();

    // Rutas donde el Header y Footer NO deben mostrarse
    // Es crucial que estos paths coincidan exactamente con los `path` en tus <Route>
    const noAuthRoutes = ['/auth', '/login', '/patien/dashboard', '/admin/dashboard'];
    const shouldHideNav = noAuthRoutes.includes(location.pathname);

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

                    {/* Rutas de servicios específicos (generalmente públicas, pero podrías protegerlas) */}
                    <Route path="/servicios/electrocardiograma" element={<Electrocardiograma />} />
                    <Route path="/servicios/doppler" element={<Doppler />} />
                    <Route path="/servicios/ecocardiograma" element={<Ecocardiograma />} />
                    <Route path="/servicios/holter" element={<Holter />} />
                    <Route path="/servicios/prueba-esfuerzo" element={<PruebaEsfuerzo />} />
                    <Route path="/servicios/mapa" element={<Mapa />} />

                    {/* Rutas de autenticación */}
                    <Route path="/auth" element={<AuthPage />} />
                    <Route path="/login" element={<LoginPage />} /> {/* Si LoginPage es distinto de AuthPage */}

                    {/* Rutas Protegidas */}
                    <Route
                        path="/patien/dashboard"
                        element={
                            <PrivateRoute allowedRoles={['patient']}>
                                <PatientDashboard />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/admin/dashboard"
                        element={
                            <PrivateRoute allowedRoles={['admin']}>
                                <AdminDashboard />
                            </PrivateRoute>
                        }
                    />

                    {/* Ruta de fallback para cualquier ruta no definida */}
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