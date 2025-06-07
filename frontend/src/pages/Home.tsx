import React from 'react';
import HeroCarousel from '../components/HeroCarousel';
import ServicesGrid from '../components/ServicesGrid';
import ReviewsSection from '../components/ReviewSection';

const Home: React.FC = () => {
  return (
    <>
      <HeroCarousel />
      <section className="nosotros-section">
      <div className="nosotros-container">
        <div className="nosotros-image">
          <img src="/images/nosotros.png" alt="Imagen representativa de Ceinco" />
        </div>
        <div className="nosotros-text">
          <h2>Sobre Nosotros</h2>
          <p>
            El Centro Integral del Corazón (CEINCO) es una institución de salud altamente especializada, dedicada al cuidado integral del corazón en pacientes de todas las edades, desde niños hasta adultos. Nuestra labor abarca el ciclo completo de la salud cardiovascular: desde la prevención proactiva y el diagnóstico preciso, hasta el tratamiento más avanzado y personalizado.
          </p>
        </div>
      </div>
    </section>
      <ServicesGrid />
      <ReviewsSection />
      
    </>
  );
};

export default Home;