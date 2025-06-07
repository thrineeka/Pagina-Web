import { useNavigate } from 'react-router-dom';

const Holter: React.FC = () => {
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
      backgroundColor: '#f9f9f9', // A very light gray background
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
          color: '#b91c1c', // A strong red for the main title (red-700 equivalent)
          marginBottom: '1.5rem', // mb-6
        }}>
          Holter
        </h1>
        <p style={{
          fontSize: '1.125rem', // text-lg
          color: '#374151', // text-gray-700
          lineHeight: '1.625', // leading-relaxed
          marginBottom: '2rem', // mb-8
        }}>
          El monitoreo Holter es un dispositivo portátil que registra continuamente la actividad eléctrica del corazón
          durante 24 a 48 horas, o incluso más tiempo. Es útil para detectar arritmias que no se presentan durante un
          electrocardiograma de rutina, ya que estas pueden ser intermitentes.
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
              ¿Cuándo se recomienda?
            </h2>
            <ul style={{
              listStyleType: 'disc',
              listStylePosition: 'inside',
              color: '#4b5563', // text-gray-600
              lineHeight: '1.5', // space-y-2 (approximate)
            }}>
              <li>Si experimenta palpitaciones, mareos, desmayos o dolor en el pecho inexplicables.</li>
              <li>Para evaluar la eficacia de tratamientos para arritmias.</li>
              <li>Después de un ataque cardíaco para monitorear el ritmo cardíaco.</li>
              <li>En pacientes con riesgo de arritmias graves.</li>
            </ul>
          </div>
          <div style={{ /* No specific style for this div needed beyond grid layout */ }}>
            <h2 style={{
              fontSize: '1.875rem', // text-3xl
              fontWeight: '700', // font-bold
              color: '#1f2937', // text-gray-800
              marginBottom: '1rem', // mb-4
            }}>
              Durante el monitoreo:
            </h2>
            <p style={{
              color: '#4b5563', // text-gray-600
              marginBottom: '1rem', // mb-4
            }}>
              Se le colocarán pequeños electrodos en el pecho, conectados a un pequeño dispositivo de grabación que
              puede llevar en el bolsillo o en un cinturón. Deberá llevar un diario de sus actividades y síntomas
              durante el período de monitoreo para ayudar al médico a correlacionar los eventos con los cambios en el ECG.
            </p>
            <img
              src="/images/holter.png" // Corrected path to be relative to the public folder
              alt="Ilustración de monitor Holter"
              style={{
                borderRadius: '0.5rem', // rounded-lg
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)', // shadow-md
                margin: '1rem auto 0 auto', // mx-auto mt-4
                width: '100%',
                height: 'auto',
                objectFit: 'cover',
                maxHeight: '15rem', // max-h-60
              }}
              onError={(e) => { e.currentTarget.src = 'https://placehold.co/400x250/F7E0E0/000000?text=Image+Not+Found'; }}
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

export default Holter;