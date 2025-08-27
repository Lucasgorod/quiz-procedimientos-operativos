export const questions = [
  {
    id: 'q1',
    type: 'multiple',
    title: '🟦 Parte 1: Opción múltiple',
    subtitle: '¿Cuál de las siguientes características es esencial para un liderazgo efectivo en seguridad de procesos?',
    options: [
      { id: 'A', text: 'Delegar completamente la gestión de riesgos' },
      { id: 'B', text: 'Estar presente en el terreno', correct: true },
      { id: 'C', text: 'Evitar involucrarse en decisiones técnicas' },
      { id: 'D', text: 'Priorizar la producción sobre la seguridad' }
    ]
  },
  {
    id: 'q2',
    type: 'multiple',
    title: '2. Opción múltiple',
    subtitle: '¿Qué acción refleja coherencia entre el discurso y la práctica del liderazgo?',
    options: [
      { id: 'A', text: 'Comunicar la importancia de la seguridad sin participar en auditorías' },
      { id: 'B', text: 'Reconocer buenas prácticas solo en reportes anuales' },
      { id: 'C', text: 'Liderar con el ejemplo en recorridas de seguridad', correct: true },
      { id: 'D', text: 'Delegar la cultura de seguridad al área de RRHH' }
    ]
  },
  {
    id: 'q3',
    type: 'multiple',
    title: '3. Opción múltiple',
    subtitle: '¿Cuál de estas prácticas fortalece la cultura de seguridad?',
    options: [
      { id: 'A', text: 'Sancionar sin explicar' },
      { id: 'B', text: 'Compartir aprendizajes de incidentes', correct: true },
      { id: 'C', text: 'Evitar hablar de errores' },
      { id: 'D', text: 'Centralizar la toma de decisiones' }
    ]
  },
  {
    id: 'q4',
    type: 'trueFalse',
    title: '🟨 Parte 2: Verdadero / Falso',
    subtitle: 'Indicá si las siguientes afirmaciones son verdaderas o falsas:',
    options: [
      { 
        id: 'a', 
        text: 'La credibilidad del líder se construye solo con conocimiento técnico.', 
        correct: false 
      },
      { 
        id: 'b', 
        text: 'La retroalimentación genuina y el reconocimiento son parte de las características del liderazgo efectivo.', 
        correct: true 
      },
      { 
        id: 'c', 
        text: 'Un líder en seguridad de procesos debe actuar como guardián cultural, reforzando valores en cada decisión.', 
        correct: true 
      },
      { 
        id: 'd', 
        text: 'La consistencia entre lo que se dice y lo que se hace no es relevante si se cumplen los indicadores.', 
        correct: false 
      }
    ]
  },
  {
    id: 'q5',
    type: 'fill',
    title: '🟩 Parte 3: Completar la frase',
    subtitle: 'Completá las siguientes frases con las palabras correctas:',
    options: [
      {
        id: 'a',
        text: 'El liderazgo efectivo en seguridad de procesos requiere __________ activa en el terreno.',
        correct: 'presencia',
        alternatives: ['presencia']
      },
      {
        id: 'b', 
        text: 'Para generar sentido en los colaboradores, el líder debe __________ el propósito de la seguridad.',
        correct: 'comunicar',
        alternatives: ['comunicar']
      },
      {
        id: 'c',
        text: 'La __________ genuina fortalece la confianza y el compromiso del equipo.',
        correct: 'retroalimentación',
        alternatives: ['retroalimentación', 'retroalimentacion']
      },
      {
        id: 'd',
        text: 'Un líder creíble __________ con el ejemplo en temas de seguridad.',
        correct: 'lidera',
        alternatives: ['lidera']
      },
      {
        id: 'e',
        text: 'La cultura de seguridad se refuerza cuando el liderazgo es __________ y consistente.',
        correct: 'visible',
        alternatives: ['visible']
      }
    ]
  }
];
