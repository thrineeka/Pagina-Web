import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="site-footer">
            <div className="footer-container">
                <div className="footer-column">
                    <div className="footer-logo">
                        <img src="/images/logo.png" alt="Logo de Ceinco" />
                    </div>
                    <ul className="footer-nav">
                        <li><Link to="/">Inicio</Link></li>
                        <li><Link to="/nosotros">Nosotros</Link></li>
                        <li><Link to="/servicios">Servicios</Link></li>
                        <li><Link to="/contacto">Contacto</Link></li>
                    </ul>
                </div>

                <div className="footer-column">
                    <h3>Contacto</h3>
                    <p><i className="fas fa-map-marker-alt"></i> Los Geranios Nro 30 - Urbaniz. Pescaserolli</p>
                    <p><i className="fas fa-phone"></i> (052) 280649</p>
                    <p><i className="fas fa-envelope"></i> ceinco_02@hotmail.com</p>
                    <p><i className="fas fa-clock"></i> Lunes a Viernes, 8:00 - 20:00</p>
                </div>

                <div className="footer-column">
                    <h3>Ubícanos</h3>
                    <div className="footer-map">
                        <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4663.926249622462!2d-70.23930882482061!3d-18.007528482989354!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x915ac58641342a6d%3A0xaf274838b90819da!2sCentro%20Integral%20del%20Coraz%C3%B3n%20CEINCO!5e1!3m2!1ses!2spe!4v1748355788332!5m2!1ses!2spe"
                        width="400"
                        height="300"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    />
                    </div>
                </div>

                <div className="footer-column">
                    <h3>Síguenos</h3>
                    <div className="social-icons">
                        <a href="https://www.facebook.com/share/17dyNvcWn4/" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><i className="fab fa-facebook-f"></i></a>
                        <a href="https://www.tiktok.com/@ceinco_" target="_blank" rel="noopener noreferrer" aria-label="TikTok"><i className="fab fa-tiktok"></i></a>
                        <a href="https://www.instagram.com/ceinco.tacna/" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
                        <a href="https://www.youtube.com/@tu-canal-de-youtube" target="_blank" rel="noopener noreferrer" aria-label="YouTube"><i className="fab fa-youtube"></i></a> {/* Reemplaza con tu ID de canal real */}
                    </div>
                </div>
            </div>

            <div className="copyright">
                <p>© <span id="current-year-footer">{currentYear}</span> Ceinco. Todos los derechos reservados.</p>
            </div>

            <a href="https://wa.me/51990549959" className="whatsapp-bubble" target="_blank" rel="noopener noreferrer" aria-label="Enviar mensaje por WhatsApp">
                <i className="fab fa-whatsapp"></i>
            </a>
        </footer>
    );
};

export default Footer;