import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation

const ServicesSection: React.FC = () => {
  return (
    <section style={{
      padding: '4rem 1rem',
      textAlign: 'center',
      backgroundColor: '#fef2f2', // Very light red background, similar to red-50
      fontFamily: 'Inter, sans-serif',
      color: '#333',
    }}>
      <h2 style={{
        fontSize: '2.8rem',
        fontWeight: '700',
        color: '#b91c1c', // Strong red for the main heading, similar to red-700
        marginBottom: '3rem',
      }}>
        Nuestros Servicios
      </h2>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '2rem',
        maxWidth: '1200px',
        margin: '0 auto',
      }}>
        {/* Electrocardiograma */}
        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '10px',
          boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
          padding: '2rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-between',
          textAlign: 'center',
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        }}
        onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-5px)';
            e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.15)';
        }}
        onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
        }}
        >
          <i className="fas fa-heartbeat" style={{
            fontSize: '3.5rem',
            color: '#dc2626', // Red color for icons, similar to red-600
            marginBottom: '1.5rem',
          }}></i>
          <h3 style={{
            fontSize: '1.8rem',
            fontWeight: '600',
            color: '#34495e', // Dark gray for subheadings
            marginBottom: '1rem',
          }}>
            Electrocardiograma
          </h3>
          <div style={{
            marginTop: 'auto',
          }}>
            <Link to="servicios/electrocardiograma" style={{
              display: 'inline-block',
              backgroundColor: '#dc2626', // Red button background, similar to red-600
              color: '#ffffff',
              padding: '0.8rem 1.8rem',
              borderRadius: '50px',
              textDecoration: 'none',
              fontWeight: '500',
              transition: 'background-color 0.3s ease, transform 0.3s ease',
              fontSize: '1rem',
              border: 'none',
              cursor: 'pointer',
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#b91c1c'; // Darker red on hover, similar to red-700
                e.currentTarget.style.transform = 'scale(1.05)';
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#dc2626'; // Original red
                e.currentTarget.style.transform = 'scale(1)';
            }}
            >
              Ver Más
            </Link>
          </div>
        </div>

        {/* Doppler */}
        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '10px',
          boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
          padding: '2rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-between',
          textAlign: 'center',
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        }}
        onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-5px)';
            e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.15)';
        }}
        onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
        }}
        >
          <i className="fas fa-stethoscope" style={{
            fontSize: '3.5rem',
            color: '#dc2626',
            marginBottom: '1.5rem',
          }}></i>
          <h3 style={{
            fontSize: '1.8rem',
            fontWeight: '600',
            color: '#34495e',
            marginBottom: '1rem',
          }}>
            Doppler
          </h3>
          <div style={{
            marginTop: 'auto',
          }}>
            <Link to="servicios/doppler" style={{
              display: 'inline-block',
              backgroundColor: '#dc2626',
              color: '#ffffff',
              padding: '0.8rem 1.8rem',
              borderRadius: '50px',
              textDecoration: 'none',
              fontWeight: '500',
              transition: 'background-color 0.3s ease, transform 0.3s ease',
              fontSize: '1rem',
              border: 'none',
              cursor: 'pointer',
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#b91c1c';
                e.currentTarget.style.transform = 'scale(1.05)';
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#dc2626';
                e.currentTarget.style.transform = 'scale(1)';
            }}
            >
              Ver Más
            </Link>
          </div>
        </div>

        {/* Ecocardiograma */}
        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '10px',
          boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
          padding: '2rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-between',
          textAlign: 'center',
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        }}
        onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-5px)';
            e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.15)';
        }}
        onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
        }}
        >
          <i className="fas fa-wave-square" style={{
            fontSize: '3.5rem',
            color: '#dc2626',
            marginBottom: '1.5rem',
          }}></i>
          <h3 style={{
            fontSize: '1.8rem',
            fontWeight: '600',
            color: '#34495e',
            marginBottom: '1rem',
          }}>
            Ecocardiograma
          </h3>
          <div style={{
            marginTop: 'auto',
          }}>
            <Link to="servicios/ecocardiograma" style={{
              display: 'inline-block',
              backgroundColor: '#dc2626',
              color: '#ffffff',
              padding: '0.8rem 1.8rem',
              borderRadius: '50px',
              textDecoration: 'none',
              fontWeight: '500',
              transition: 'background-color 0.3s ease, transform 0.3s ease',
              fontSize: '1rem',
              border: 'none',
              cursor: 'pointer',
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#b91c1c';
                e.currentTarget.style.transform = 'scale(1.05)';
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#dc2626';
                e.currentTarget.style.transform = 'scale(1)';
            }}
            >
              Ver Más
            </Link>
          </div>
        </div>

        {/* Holter */}
        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '10px',
          boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
          padding: '2rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-between',
          textAlign: 'center',
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        }}
        onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-5px)';
            e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.15)';
        }}
        onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
        }}
        >
          <i className="fas fa-clock" style={{
            fontSize: '3.5rem',
            color: '#dc2626',
            marginBottom: '1.5rem',
          }}></i>
          <h3 style={{
            fontSize: '1.8rem',
            fontWeight: '600',
            color: '#34495e',
            marginBottom: '1rem',
          }}>
            Holter
          </h3>
          <div style={{
            marginTop: 'auto',
          }}>
            <Link to="servicios/holter" style={{
              display: 'inline-block',
              backgroundColor: '#dc2626',
              color: '#ffffff',
              padding: '0.8rem 1.8rem',
              borderRadius: '50px',
              textDecoration: 'none',
              fontWeight: '500',
              transition: 'background-color 0.3s ease, transform 0.3s ease',
              fontSize: '1rem',
              border: 'none',
              cursor: 'pointer',
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#b91c1c';
                e.currentTarget.style.transform = 'scale(1.05)';
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#dc2626';
                e.currentTarget.style.transform = 'scale(1)';
            }}
            >
              Ver Más
            </Link>
          </div>
        </div>

        {/* Prueba de Esfuerzo */}
        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '10px',
          boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
          padding: '2rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-between',
          textAlign: 'center',
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        }}
        onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-5px)';
            e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.15)';
        }}
        onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
        }}
        >
          <i className="fas fa-running" style={{
            fontSize: '3.5rem',
            color: '#dc2626',
            marginBottom: '1.5rem',
          }}></i>
          <h3 style={{
            fontSize: '1.8rem',
            fontWeight: '600',
            color: '#34495e',
            marginBottom: '1rem',
          }}>
            Prueba de Esfuerzo
          </h3>
          <div style={{
            marginTop: 'auto',
          }}>
            <Link to="servicios/prueba-esfuerzo" style={{
              display: 'inline-block',
              backgroundColor: '#dc2626',
              color: '#ffffff',
              padding: '0.8rem 1.8rem',
              borderRadius: '50px',
              textDecoration: 'none',
              fontWeight: '500',
              transition: 'background-color 0.3s ease, transform 0.3s ease',
              fontSize: '1rem',
              border: 'none',
              cursor: 'pointer',
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#b91c1c';
                e.currentTarget.style.transform = 'scale(1.05)';
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#dc2626';
                e.currentTarget.style.transform = 'scale(1)';
            }}
            >
              Ver Más
            </Link>
          </div>
        </div>

        {/* MAPA */}
        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '10px',
          boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
          padding: '2rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-between',
          textAlign: 'center',
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        }}
        onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-5px)';
            e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.15)';
        }}
        onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
        }}
        >
          <i className="fas fa-map-marked-alt" style={{
            fontSize: '3.5rem',
            color: '#dc2626',
            marginBottom: '1.5rem',
          }}></i>
          <h3 style={{
            fontSize: '1.8rem',
            fontWeight: '600',
            color: '#34495e',
            marginBottom: '1rem',
          }}>
            MAPA
          </h3>
          <div style={{
            marginTop: 'auto',
          }}>
            <Link to="servicios/mapa" style={{
              display: 'inline-block',
              backgroundColor: '#dc2626',
              color: '#ffffff',
              padding: '0.8rem 1.8rem',
              borderRadius: '50px',
              textDecoration: 'none',
              fontWeight: '500',
              transition: 'background-color 0.3s ease, transform 0.3s ease',
              fontSize: '1rem',
              border: 'none',
              cursor: 'pointer',
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#b91c1c';
                e.currentTarget.style.transform = 'scale(1.05)';
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#dc2626';
                e.currentTarget.style.transform = 'scale(1)';
            }}
            >
              Ver Más
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;