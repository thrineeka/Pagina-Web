// src/pages/Contacto.tsx
import React from 'react';

const Contacto: React.FC = () => {
    return (
        <section className="page-content">
            <h1>Contáctanos</h1>

            <div className="contact-info-section">
                <div className="contact-details">
                    <h3>Información de Contacto</h3>
                    <p><i className="fas fa-map-marker-alt"></i> Los Geranios Nro 30 - Urbaniz. Pescaserolli</p>
                    <p><i className="fas fa-phone"></i> (052) 280649</p>
                    <p><i className="fas fa-envelope"></i> ceinco_02@hotmail.com</p>
                    <p><i className="fas fa-clock"></i> Lunes a Viernes, 8:00 - 20:00</p>

                    <button className="btn-agendar" style={{ marginTop: '20px' }}>
                        Agendar Cita Directamente
                    </button>

                    <p style={{ marginTop: '15px' }}>
                        <i className="fab fa-whatsapp"></i> También puedes contactarnos por WhatsApp haciendo click en el ícono flotante.
                    </p>
                </div>

                <div className="contact-map">
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
        </section>
    );
};

export default Contacto;