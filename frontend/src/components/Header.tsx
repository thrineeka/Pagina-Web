// Header.tsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Header: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isServicesSubmenuOpen, setIsServicesSubmenuOpen] = useState(false);
    const navigate = useNavigate();

    const handleToggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
        // Cierra el submenú de servicios cuando se cierra el menú principal
        if (isMenuOpen && isServicesSubmenuOpen) {
            setIsServicesSubmenuOpen(false);
        }
    };

    // Nueva función para manejar el click en el enlace "Servicios"
    const handleServicesLinkClick = (e: React.MouseEvent) => {
        // Cierra el menú principal (si es móvil)
        handleLinkClick();

        // Si es móvil, evita la navegación y solo abre/cierra el submenú
        if (window.innerWidth <= 768) {
            e.preventDefault(); // Previene la navegación si se hace clic en móvil para abrir/cerrar submenú
            setIsServicesSubmenuOpen(!isServicesSubmenuOpen);
        } else {
            // En escritorio, si el submenú está abierto, simplemente ciérralo
            // Si está cerrado, permite la navegación a la página general de servicios
            // o podrías optar por solo usar hover para abrir en escritorio
            setIsServicesSubmenuOpen(false); // Cierra el submenú si se hace clic
            navigate('/servicios'); // Navega a la página general de servicios
        }
    };

    // Función para manejar el click en la flecha del submenú (solo para el toggle en móvil)
    const handleServicesChevronClick = (e: React.MouseEvent) => {
        e.preventDefault(); // Siempre previene la navegación del <a>
        e.stopPropagation(); // Evita que el evento se propague al padre <li> o <Link>
        setIsServicesSubmenuOpen(!isServicesSubmenuOpen);
    };

    const handleAgendarCita = () => {
        navigate('/auth'); // <--- CAMBIAR ESTO DE '/contacto' A '/auth'
        setIsMenuOpen(false); // Cierra el menú móvil al navegar
        setIsServicesSubmenuOpen(false); // Cierra el submenú también
    };


    // Cierra el menú móvil y el submenú cuando el tamaño de la ventana es > 768px
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 768) {
                if (isMenuOpen) setIsMenuOpen(false);
                if (isServicesSubmenuOpen) setIsServicesSubmenuOpen(false);
            }
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [isMenuOpen, isServicesSubmenuOpen]);

    // Función para cerrar el menú móvil y el submenú al hacer clic en cualquier Link interno
    const handleLinkClick = () => {
        setIsMenuOpen(false);
        setIsServicesSubmenuOpen(false);
    };

    return (
        <header className="site-header">
            <div className="header-container">
                <div className="logo">
                    <Link to="/" onClick={handleLinkClick}>
                        <img src="/images/logo.png" alt="Logo de Ceinco" />
                    </Link>
                </div>
                <nav className="main-nav">
                    <button className="nav-toggle" aria-label="Abrir menú" onClick={handleToggleMenu}>
                        <i className="fas fa-bars"></i>
                    </button>
                    <ul className={`nav-menu ${isMenuOpen ? 'menu-open' : ''}`}>
                        <li><Link to="/" onClick={handleLinkClick}>Inicio</Link></li>
                        <li><Link to="/nosotros" onClick={handleLinkClick}>Nosotros</Link></li>
                        <li
                            className={`has-submenu ${isServicesSubmenuOpen ? 'active' : ''}`}
                            onMouseEnter={() => window.innerWidth > 768 && setIsServicesSubmenuOpen(true)} // Abre con hover en escritorio
                            onMouseLeave={() => window.innerWidth > 768 && setIsServicesSubmenuOpen(false)} // Cierra con leave en escritorio
                        >
                            {/* Este Link ahora navega a la página general de servicios */}
                            <Link to="/servicios" onClick={handleServicesLinkClick} className="services-parent-link">
                                Servicios
                                {/* El ícono de la flecha tiene su propio onClick para toggle en móvil */}
                                <i className="fas fa-chevron-down" onClick={handleServicesChevronClick}></i>
                            </Link>
                            <ul className={`submenu ${isServicesSubmenuOpen ? 'submenu-open' : ''}`} onClick={(e) => e.stopPropagation()}>
                                <li><Link to="/servicios/electrocardiograma" onClick={handleLinkClick}>Electrocardiograma</Link></li>
                                <li><Link to="/servicios/doppler" onClick={handleLinkClick}>Doppler</Link></li>
                                <li><Link to="/servicios/ecocardiograma" onClick={handleLinkClick}>Ecocardiograma</Link></li>
                                <li><Link to="/servicios/holter" onClick={handleLinkClick}>Holter</Link></li>
                                <li><Link to="/servicios/prueba-esfuerzo" onClick={handleLinkClick}>Prueba de Esfuerzo</Link></li>
                                <li><Link to="/servicios/mapa" onClick={handleLinkClick}>MAPA</Link></li>
                            </ul>
                        </li>
                        <li><Link to="/contacto" onClick={handleLinkClick}>Contacto</Link></li>
                        <li><button className="btn-agendar" onClick={handleAgendarCita}>Agendar Cita</button></li>
                        {isMenuOpen && (
                            <button className="close-menu" aria-label="Cerrar menú" onClick={handleToggleMenu} style={{ position: 'absolute', top: '20px', right: '20px', background: 'none', border: 'none', fontSize: '1.8rem', color: 'var(--color-primary)' }}>
                                <i className="fas fa-times"></i>
                            </button>
                        )}
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;