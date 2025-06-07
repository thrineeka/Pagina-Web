import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Servicios.css';

const Servicios: React.FC = () => {
  const serviceList = [
    {
      name: 'Electrocardiograma',
      path: '/servicios/electrocardiograma',
      description: 'Estudio que registra la actividad eléctrica del corazón para detectar arritmias, isquemias y otros problemas cardíacos.',
      icon: 'fas fa-heartbeat' // Icono de Font Awesome
    },
    {
      name: 'Doppler',
      path: '/servicios/doppler',
      description: 'Técnica de ultrasonido que evalúa el flujo sanguíneo en vasos arteriales y venosos, útil para detectar trombosis, estenosis o insuficiencias.',
      icon: 'fas fa-lungs' // Puedes cambiar el icono por uno más adecuado si encuentras
    },
    {
      name: 'Ecocardiograma',
      path: '/servicios/ecocardiograma',
      description: 'Estudio por ultrasonido que permite visualizar las estructuras del corazón y su funcionamiento en tiempo real.',
      icon: 'fas fa-heart'
    },
    {
      name: 'Holter',
      path: '/servicios/holter',
      description: 'Monitoreo ambulatorio de la actividad eléctrica del corazón durante 24 o 48 horas para diagnosticar arritmias intermitentes.',
      icon: 'fas fa-monitor-heart-rate'
    },
    {
      name: 'Prueba de Esfuerzo',
      path: '/servicios/prueba-esfuerzo',
      description: 'Examen que evalúa la respuesta del corazón al ejercicio físico, útil para diagnosticar cardiopatía isquémica y evaluar la capacidad funcional.',
      icon: 'fas fa-running'
    },
    {
      name: 'MAPA',
      path: '/servicios/mapa',
      description: 'Monitoreo Ambulatorio de Presión Arterial, que registra la presión arterial durante 24 horas para un diagnóstico preciso de hipertensión.',
      icon: 'fas fa-chart-line' // O un icono más específico para presión arterial
    },
  ];

  return (
    <div className="servicios-page-container">
      <h1>Nuestros Servicios</h1>
      <p className="servicios-intro">
        En CEINCO encontrarás servicios destinados a la prevención, diagnóstico y tratamiento de las enfermedades cardiovasculares. Contamos con equipamiento biomédico de alta precisión, lo que nos permite realizar diferentes exámenes de diagnóstico no invasivo como: Prueba de Esfuerzo (Ergometría), Ecocardiografía Doppler Color, Electrocardiografía de 24 o 48 horas, hasta 7 días (Holter), Presión Arterial de 24 horas (MAPA), Electrocardiografía convencional y digital, Ultrasonido Vascular.
      </p>

      <div className="servicios-grid">
        {serviceList.map((service, index) => (
          <div key={index} className="servicio-card">
            <div className="servicio-icon">
              <i className={service.icon}></i>
            </div>
            <h2>{service.name}</h2>
            <p>{service.description}</p>
            <Link to={service.path} className="btn-ver-mas">
              Ver más detalles
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Servicios;