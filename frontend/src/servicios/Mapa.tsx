import { useNavigate } from 'react-router-dom';

const Mapa: React.FC = () => {
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
      backgroundColor: '#f8fafc', // A very light gray-blue, similar to bg-gray-100
      padding: '2rem',
      paddingTop: '5rem', // pt-20
      fontFamily: 'Inter, sans-serif', // Assuming 'Inter' font is available
    }}>
      <div style={{
        backgroundColor: '#ffffff', // bg-white
        borderRadius: '0.75rem', // rounded-xl
        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)', // shadow-xl
        padding: '2.5rem', // p-10
        maxWidth: '56rem', // max-w-4xl (approx 896px)
        width: '100%',
        textAlign: 'center',
      }}>
        <h1 style={{
          fontSize: '3rem', // text-5xl
          fontWeight: '800', // font-extrabold
          color: '#dc2626', // A strong red for the main title (similar to red-600/700)
          marginBottom: '1.5rem', // mb-6
        }}>
          MAPA
        </h1>
        <p style={{
          fontSize: '1.125rem', // text-lg
          color: '#374151', // text-gray-700
          lineHeight: '1.625', // leading-relaxed
          marginBottom: '2rem', // mb-8
        }}>
          El Monitoreo Ambulatorio de Presión Arterial (MAPA) es un método para medir la presión arterial de forma
          automática y continua durante 24 horas, mientras el paciente realiza sus actividades diarias normales,
          incluyendo el sueño. Esto proporciona una imagen más precisa de la presión arterial real que las mediciones
          en la clínica.
        </p>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr', // grid-cols-1
          gap: '2rem', // gap-8
          textAlign: 'left',
        }}>
          <div style={{ /* No specific style for this div needed beyond grid layout */ }}>
            <h2 style={{
              fontSize: '1.875rem', // text-3xl
              fontWeight: '700', // font-bold
              color: '#1f2937', // text-gray-800
              marginBottom: '1rem', // mb-4
            }}>
              ¿Por qué es importante?
            </h2>
            <ul style={{
              listStyleType: 'disc',
              listStylePosition: 'inside',
              color: '#4b5563', // text-gray-600
              lineHeight: '1.5', // space-y-2 (approximate)
            }}>
              <li>Diagnóstico de hipertensión de "bata blanca".</li>
              <li>Identificación de hipertensión enmascarada.</li>
              <li>Evaluación de la eficacia del tratamiento antihipertensivo.</li>
              <li>Detección de patrones de presión arterial nocturna anormales.</li>
              <li>Mejor predicción de riesgo cardiovascular.</li>
            </ul>
          </div>
          <div style={{ /* No specific style for this div needed beyond grid layout */ }}>
            <h2 style={{
              fontSize: '1.875rem', // text-3xl
              fontWeight: '700', // font-bold
              color: '#1f2937', // text-gray-800
              marginBottom: '1rem', // mb-4
            }}>
              ¿Cómo funciona?
            </h2>
            <p style={{
              color: '#4b5563', // text-gray-600
              marginBottom: '1rem', // mb-4
            }}>
              Se le colocará un manguito de presión arterial en el brazo, conectado a un pequeño dispositivo portátil
              que registrará las lecturas a intervalos regulares durante el día y la noche. Puede llevar el dispositivo
              en un cinturón o en el bolsillo. Es importante llevar un diario de sus actividades y síntomas.
            </p>
            <img
              src="/images/mapa.png" // Corrected path to be relative to the public folder
              alt="Ilustración de monitoreo MAPA"
              style={{
                borderRadius: '0.5rem', // rounded-lg
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)', // shadow-md
                margin: '1rem auto 0 auto', // mx-auto mt-4
                width: '100%',
                height: 'auto',
                objectFit: 'cover',
                maxHeight: '15rem', // max-h-60
              }}
              onError={(e) => { e.currentTarget.src = 'https://placehold.co/400x250/E0E2F7/000000?text=Image+Not+Found'; }}
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

export default Mapa;