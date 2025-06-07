import { useNavigate } from 'react-router-dom';

const PruebaEsfuerzo: React.FC = () => {
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
          Prueba de Esfuerzo
        </h1>
        <p style={{
          fontSize: '1.125rem', // text-lg
          color: '#374151', // text-gray-700
          lineHeight: '1.625', // leading-relaxed
          marginBottom: '2rem', // mb-8
        }}>
          La prueba de esfuerzo, también conocida como ergometría, es un examen que evalúa cómo funciona el corazón
          cuando se le exige un mayor esfuerzo, generalmente caminando en una cinta o pedaleando en una bicicleta estática.
          Ayuda a diagnosticar la enfermedad de las arterias coronarias y a evaluar la capacidad física del paciente.
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
              ¿Qué se monitorea?
            </h2>
            <ul style={{
              listStyleType: 'disc',
              listStylePosition: 'inside',
              color: '#4b5563', // text-gray-600
              lineHeight: '1.5', // space-y-2 (approximate)
            }}>
              <li>Ritmo cardíaco y presión arterial durante el ejercicio.</li>
              <li>Cambios en el electrocardiograma (ECG) que puedan indicar isquemia.</li>
              <li>Síntomas como dolor en el pecho, falta de aliento o mareos.</li>
              <li>La capacidad de ejercicio del paciente.</li>
            </ul>
          </div>
          <div style={{ /* No specific style for this div needed beyond grid layout */ }}>
            <h2 style={{
              fontSize: '1.875rem', // text-3xl
              fontWeight: '700', // font-bold
              color: '#1f2937', // text-gray-800
              marginBottom: '1rem', // mb-4
            }}>
              Preparación y Proceso:
            </h2>
            <p style={{
              color: '#4b5563', // text-gray-600
              marginBottom: '1rem', // mb-4
            }}>
              Se le pedirá que use ropa cómoda y calzado deportivo. Se conectarán electrodos al pecho para monitorear el ECG,
              y un manguito de presión arterial se colocará en su brazo. Se le indicará que camine o pedalee a un ritmo
              gradualmente creciente. Un médico supervisará la prueba en todo momento.
            </p>
            <img
              src="/images/pruebadeesfuerzo.png"
              alt="Ilustración de Prueba de Esfuerzo"
              style={{
                borderRadius: '0.5rem', // rounded-lg
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)', // shadow-md
                margin: '1rem auto 0 auto', // mx-auto mt-4
                width: '100%',
                height: 'auto',
                objectFit: 'cover',
                maxHeight: '15rem', // max-h-60
              }}
              onError={(e) => { e.currentTarget.src = 'https://placehold.co/400x250/F7F2E0/000000?text=Image+Not+Found'; }}
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

export default PruebaEsfuerzo;