import { useNavigate } from 'react-router-dom';


const Electrocardiograma: React.FC = () => {
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
          Electrocardiograma
        </h1>
        <p style={{
          fontSize: '1.125rem', // Paragraph text size
          color: '#374151', // Dark gray text
          lineHeight: '1.625', // Relaxed line height
          marginBottom: '2rem', // Margin below paragraph
        }}>
          El electrocardiograma (ECG) es una prueba indolora y no invasiva que registra la actividad eléctrica del corazón.
          Es una herramienta fundamental para diagnosticar diversas afecciones cardíacas, como arritmias, isquemia miocárdica,
          y para evaluar el tamaño y la posición de las cámaras cardíacas.
        </p>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr', // Single column by default
          gap: '2rem', // Gap between grid items
          textAlign: 'left',
          // For responsive two columns on larger screens, you'd typically use media queries in an external CSS file:
          // @media (min-width: 768px) { grid-template-columns: 1fr 1fr; }
        }}>
          <div>
            <h2 style={{
              fontSize: '1.875rem', // Section heading text size
              fontWeight: '700', // Bold font
              color: '#1f2937', // Dark gray heading
              marginBottom: '1rem', // Margin below heading
            }}>
              ¿Para qué sirve?
            </h2>
            <ul style={{
              listStyleType: 'disc',
              listStylePosition: 'inside',
              color: '#4b5563', // Gray list text
              lineHeight: '1.5', // Spacing between list items
            }}>
              <li>Detectar arritmias (ritmos cardíacos irregulares).</li>
              <li>Identificar signos de daño al músculo cardíaco (infarto).</li>
              <li>Evaluar la eficacia de medicamentos cardíacos.</li>
              <li>Detectar problemas de suministro de sangre al corazón.</li>
              <li>Monitorear la salud del corazón en pacientes con enfermedades crónicas.</li>
            </ul>
          </div>
          <div>
            <h2 style={{
              fontSize: '1.875rem', // Section heading text size
              fontWeight: '700', // Bold font
              color: '#1f2937', // Dark gray heading
              marginBottom: '1rem', // Margin below heading
            }}>
              ¿Cómo se realiza?
            </h2>
            <p style={{
              color: '#4b5563', // Gray paragraph text
              marginBottom: '1rem', // Margin below paragraph
            }}>
              Se colocan pequeños electrodos adhesivos en el pecho, brazos y piernas. Estos electrodos están conectados a una máquina que
              registra los impulsos eléctricos del corazón en un papel o pantalla. El procedimiento dura solo unos minutos y es completamente seguro.
            </p>
            <img
              src="/images/electrocardiograma.png" // Corrected path to public folder
              alt="Ilustración de Electrocardiograma"
              style={{
                borderRadius: '0.5rem', // Rounded corners for image
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)', // Medium shadow
                margin: '1rem auto 0 auto', // Centered horizontally with top margin
                width: '100%',
                height: 'auto',
                objectFit: 'cover', // Ensures image covers area without distortion
                maxHeight: '15rem', // Max height for the image
              }}
              onError={(e) => { e.currentTarget.src = 'https://placehold.co/400x250/E0F2F7/000000?text=Image+Not+Found'; }}
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

export default Electrocardiograma;