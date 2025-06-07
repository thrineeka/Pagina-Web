import React, { useState, useEffect, useRef } from 'react';
interface CarouselImage {
  src: string;
  alt: string;
}

const HeroCarousel: React.FC = () => {
  const carouselImagesData: CarouselImage[] = [
    { src: "/images/banner1.png", alt: "Banner 1" },
    { src: "/images/banner2.png", alt: "Banner 2" },
    { src: "/images/banner3.png", alt: "Banner 3" },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = carouselImagesData.length;
  const carouselRef = useRef<HTMLElement>(null); // Referencia para el elemento hero-carousel

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % totalSlides);
  };

  // Función para retroceder al slide anterior
  const prevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + totalSlides) % totalSlides);
  };

  // Autoplay del carrusel
  useEffect(() => {
    // Aquí es donde TypeScript podría haberte dado el error si tipificabas
    // explícitamente como NodeJS.Timeout. La forma más segura es dejar que TypeScript
    // infiera el tipo o usar 'number' ya que estamos en el navegador.
    let intervalId: number; // <-- Cambiado de NodeJS.Timeout a number

    const startAutoplay = () => {
      intervalId = setInterval(nextSlide, 5000); // Cambia cada 5 segundos
    };

    const stopAutoplay = () => {
      clearInterval(intervalId);
    };

    startAutoplay(); // Inicia el autoplay al montar

    // Pausar/Reanudar autoplay en hover
    const currentCarouselRef = carouselRef.current;
    if (currentCarouselRef) {
      currentCarouselRef.addEventListener('mouseenter', stopAutoplay);
      currentCarouselRef.addEventListener('mouseleave', startAutoplay);
    }

    // Limpieza al desmontar el componente
    return () => {
      stopAutoplay();
      if (currentCarouselRef) {
        currentCarouselRef.removeEventListener('mouseenter', stopAutoplay);
        currentCarouselRef.removeEventListener('mouseleave', startAutoplay);
      }
    };
  }, [totalSlides]); // Dependencia del efecto: solo se ejecuta si cambia el número total de slides

  // Calcula la transformación para el contenedor de imágenes
  // Cada imagen ocupa 100% del ancho del contenedor visible
  const transformValue = `translateX(${-currentSlide * 100}%)`;


  return (
    <section className="hero-carousel" ref={carouselRef}>
      <div className="carousel-images" style={{ transform: transformValue }}>
        {carouselImagesData.map((img, index) => (
          // Para que el carrusel funcione correctamente, cada imagen debería ser un item con su propio ancho
          // Aquí estamos asumiendo que el CSS ya está configurado para que cada imagen ocupe el ancho completo
          // y el contenedor se desplace. Si no, necesitarías envolver cada imagen en un div con ancho fijo.
          <img key={index} src={img.src} alt={img.alt} />
        ))}
      </div>
      <button className="carousel-prev" onClick={prevSlide} aria-label="Anterior">❮</button>
      <button className="carousel-next" onClick={nextSlide} aria-label="Siguiente">❯</button>
      <div className="carousel-nav-dots">
        {carouselImagesData.map((_, index) => (
          <span
            key={index}
            className={`dot ${index === currentSlide ? 'active' : ''}`}
            onClick={() => setCurrentSlide(index)}
            aria-label={`Ir a la diapositiva ${index + 1}`}
          ></span>
        ))}
      </div>
    </section>
  );
};

export default HeroCarousel;