import React from 'react';
import { useNavigate } from 'react-router-dom';

const Doppler: React.FC = () => {
  const navigate = useNavigate();

  const handleAgendarCita = () => {
    navigate('/auth'); // Navigates to the '/auth' route
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#f5f7fa', // A very light blue-gray background
      padding: '2rem',
      paddingTop: '5rem', // Top padding for potential fixed header
      fontFamily: 'Inter, sans-serif', // Assuming 'Inter' font is available
    }}>
      <div style={{
        backgroundColor: '#ffffff', // White background for the card
        borderRadius: '0.75rem', // Large rounded corners
        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)', // XL shadow
        padding: '2.5rem', // Generous padding
        maxWidth: '56rem', // Max width for content
        width: '100%',
        textAlign: 'center',
      }}>
        <h1 style={{
          fontSize: '3rem', // Large title text
          fontWeight: '800', // Extra bold font
          color: '#1d4ed8', // Strong blue for the main title
          marginBottom: '1.5rem', // Margin below title
        }}>
          Doppler
        </h1>
        <p style={{
          fontSize: '1.125rem', // text-lg
          color: '#374151', // text-gray-700
          lineHeight: '1.625', // leading-relaxed
          marginBottom: '2rem', // mb-8
        }}>
          El estudio Doppler es una técnica de ultrasonido que utiliza ondas sonoras para evaluar el flujo sanguíneo
          a través de los vasos sanguíneos (arterias y venas). Es crucial para detectar obstrucciones, coágulos,
          aneurismas y otras anomalías vasculares.
        </p>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr', // grid-cols-1 (default for small screens)
          gap: '2rem', // gap-8
          textAlign: 'left',
          // For responsive two columns on larger screens, you'd typically use media queries in an external CSS file:
          // @media (min-width: 768px) { grid-template-columns: 1fr 1fr; }
        }}>
          <div>
            <h2 style={{
              fontSize: '1.875rem', // text-3xl
              fontWeight: '700', // font-bold
              color: '#1f2937', // text-gray-800
              marginBottom: '1rem', // mb-4
            }}>
              Tipos de Doppler y Usos:
            </h2>
            <ul style={{
              listStyleType: 'disc',
              listStylePosition: 'inside',
              color: '#4b5563', // text-gray-600
              lineHeight: '1.5', // space-y-2 (approximate)
            }}>
              <li>
                <span style={{ fontWeight: '600' }}>Doppler Carotídeo:</span> Evalúa las arterias del cuello para detectar riesgo de accidente cerebrovascular.
              </li>
              <li>
                <span style={{ fontWeight: '600' }}>Doppler Venoso de Miembros Inferiores:</span> Busca coágulos sanguíneos (trombosis venosa profunda).
              </li>
              <li>
                <span style={{ fontWeight: '600' }}>Doppler Arterial de Miembros Inferiores:</span> Diagnostica enfermedad arterial periférica.
              </li>
              <li>
                <span style={{ fontWeight: '600' }}>Doppler Renal:</span> Evalúa el flujo sanguíneo a los riñones.
              </li>
            </ul>
          </div>
          <div>
            <h2 style={{
              fontSize: '1.875rem', // text-3xl
              fontWeight: '700', // font-bold
              color: '#1f2937', // text-gray-800
              marginBottom: '1rem', // mb-4
            }}>
              Beneficios:
            </h2>
            <p style={{
              color: '#4b5563', // text-gray-600
              marginBottom: '1rem', // mb-4
            }}>
              Es un procedimiento no invasivo, indoloro y seguro, que no utiliza radiación. Proporciona imágenes en tiempo real
              del flujo sanguíneo, permitiendo un diagnóstico preciso y temprano de problemas vasculares.
            </p>
            <img
              src="/images/doppler.png" // Corrected path to be relative to the public folder
              alt="Ilustración de estudio Doppler"
              style={{
                borderRadius: '0.5rem', // rounded-lg
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)', // shadow-md
                margin: '1rem auto 0 auto', // mx-auto mt-4
                width: '100%',
                height: 'auto',
                objectFit: 'cover',
                maxHeight: '15rem', // max-h-60
              }}
              onError={(e) => { e.currentTarget.src = 'https://placehold.co/400x250/E6F7E0/000000?text=Image+Not+Found'; }}
            />
          </div>
        </div>
        <button
          onClick={handleAgendarCita}
          style={{
            marginTop: '2.5rem', // mt-10
            backgroundColor: '#2563eb', // A strong blue for the button (similar to blue-600)
            color: '#ffffff', // text-white
            fontWeight: '700', // font-bold
            padding: '0.75rem 2rem', // py-3 px-8
            borderRadius: '9999px', // rounded-full
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)', // shadow-lg
            border: 'none',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease, transform 0.3s ease', // transition-colors duration-300 transform
          }}
          // Basic hover effects for inline style
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#1d4ed8'} // hover:bg-indigo-700 -> darker blue
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#2563eb'}
          // For transform: hover:scale-105, typically needs a class or more complex JS
        >
          Agendar Cita
        </button>
      </div>
    </div>
  );
};

export default Doppler;