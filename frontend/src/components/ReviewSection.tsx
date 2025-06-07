import React, { useState, useEffect } from 'react';

// Define una interfaz para la estructura de una reseña (opcional, pero buena práctica con TypeScript)
interface Review {
  id: number;
  text: string;
  reviewer: string;
}

const ReviewsSection: React.FC = () => {
  // Datos de las reseñas: Es mejor que estén en un array para poder iterarlos.
  const reviewsData: Review[] = [
    { id: 1, text: "Excelente atención y profesionalismo. El Dr. Apaza explicó todo detalladamente. ¡Muy recomendable!", reviewer: "- María G." },
    { id: 2, text: "Las instalaciones son modernas y el personal es muy amable. El proceso para mi ecocardiograma fue rápido y eficiente.", reviewer: "- Juan P." },
    { id: 3, text: "Me sentí muy cómodo y seguro durante mi prueba de esfuerzo. El equipo de Ceinco es de primera.", reviewer: "- Ana L." },
    // Puedes añadir más reseñas aquí
  ];

  const [currentReview, setCurrentReview] = useState(0);
  const totalReviews = reviewsData.length;

  // Función para ir a la siguiente reseña
  const nextReview = () => {
    setCurrentReview((prevIndex) => (prevIndex + 1) % totalReviews);
  };

  // Función para ir a la reseña anterior
  const prevReview = () => {
    setCurrentReview((prevIndex) => (prevIndex - 1 + totalReviews) % totalReviews);
  };

  useEffect(() => {
    if (totalReviews > 1) {
      const intervalId = setInterval(() => {
        nextReview(); 
      }, 7000); 
      return () => clearInterval(intervalId);
    }
  }, [totalReviews, nextReview]); 

  if (totalReviews === 0) {
    return null;
  }

  return (
    <section className="reviews-section">
      <div className="reviews-background">
        <img src="/images/fondo.png" alt="Fondo transparente de reseñas" />
      </div>
      <h2>Lo que dicen nuestros pacientes</h2>
      <div className="reviews-container">
        {reviewsData.map((review, index) => (
          <div
            key={review.id} // Siempre usa una 'key' única cuando mapeas listas en React
            className={`review-item ${index === currentReview ? 'active' : ''}`}
          >
            <p className="review-text">"{review.text}"</p>
            <p className="reviewer">{review.reviewer}</p>
          </div>
        ))}
      </div>
      {/* Mostrar los botones solo si hay más de una reseña para navegar */}
      {totalReviews > 1 && (
        <>
          <button className="review-prev" onClick={prevReview} aria-label="Reseña anterior">
            <i className="fas fa-chevron-left"></i>
          </button>
          <button className="review-next" onClick={nextReview} aria-label="Siguiente reseña">
            <i className="fas fa-chevron-right"></i>
          </button>
        </>
      )}
    </section>
  );
};

export default ReviewsSection;