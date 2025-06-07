// src/pages/Nosotros.tsx
import React from 'react';

const Nosotros: React.FC = () => {
  return (
    <section className="page-content">
      <div className="container">
        <h1>Sobre Nosotros</h1>
        <img
          src="/images/nosotros.png" 
          alt="Imagen de la empresa"
          style={{
            float: 'right',
            margin: '0 0 20px 20px',
            maxWidth: '400px',
            height: 'auto' 
          }}
        />
        <p>El Centro Integral del Corazón (CEINCO) es una organización de salud altamente especializada dedicada a la atención de pacientes con enfermedades cardíacas. Nuestra área de trabajo abarca la prevención, el diagnóstico y el tratamiento, con un enfoque particular en las enfermedades cardiovasculares que afectan tanto a adultos como a niños.</p>
        <p>Nuestra filosofía se centra en brindar una atención al paciente que combine la calidad con la calidez humana, fortalecida constantemente a través de la innovación y el liderazgo científico y tecnológico. Contamos con un equipo de profesionales (médicos, técnicos y administrativos) altamente capacitado y comprometido con el bienestar de cada paciente, ofreciendo una atención de primer nivel.</p>
        <p>En CEINCO, incorporamos los avances tecnológicos más recientes para realizar diagnósticos y pronósticos de enfermedades cardiovasculares con alta precisión. Creemos firmemente en complementar la ciencia con el humanismo, tratando a cada paciente no solo con el conocimiento médico experto, sino también con la calidez y empatía que merecen.</p>

        <h3>Nuestra Misión</h3>
        <p>Ser un centro integral de salud cardiovascular altamente especializado, dedicado a la prevención, diagnóstico y tratamiento de enfermedades del corazón en adultos y niños, brindando atención de calidad y calidez humana, impulsada por la innovación y el liderazgo científico-tecnológico, y comprometida con el bienestar integral del paciente.</p>

        <h3>Nuestra Visión</h3>
        <p>Ser reconocidos como el centro integral del corazón líder y referente en Tacna, destacado por nuestra excelencia médica, vanguardia tecnológica y atención humanística, contribuyendo activamente a la mejora de la salud cardiovascular y la calidad de vida de la población.</p>

        <h3>Valores</h3>
        <ul>
          <li>Profesionalismo</li>
          <li>Empatía</li>
          <li>Innovación</li>
          <li>Confianza</li>
          <li>Calidad</li>
          <li>Humanismo</li>
        </ul>
      </div>
    </section>
  );
};

export default Nosotros;