export const questions = [
  {
    id: 'q1',
    type: 'trueFalse',
    title: '1. Verdadero o Falso',
    subtitle: 'Indicá si las siguientes afirmaciones son verdaderas o falsas:',
    options: [
      { 
        id: 'a', 
        text: 'La seguridad de procesos está mencionada explícitamente en los Objetivos de Desarrollo Sostenible.', 
        correct: false 
      },
      { 
        id: 'b', 
        text: 'El componente "Social" de ESG incluye salud y seguridad de los trabajadores.', 
        correct: true 
      },
      { 
        id: 'c', 
        text: 'La sostenibilidad solo se refiere al impacto ambiental.', 
        correct: false 
      },
      { 
        id: 'd', 
        text: 'La reputación corporativa no se ve afectada por incidentes de seguridad de procesos.', 
        correct: false 
      }
    ]
  },
  {
    id: 'q2',
    type: 'multiple',
    title: '2. Opción Múltiple',
    subtitle: '¿Cuál de los siguientes estándares está relacionado con la medición de ESG?',
    options: [
      { id: 'A', text: 'API 754' },
      { id: 'B', text: 'GRI', correct: true },
      { id: 'C', text: 'ISO 9001' },
      { id: 'D', text: 'OSHA 1910.119' }
    ]
  },
  {
    id: 'q3',
    type: 'multiple',
    title: '3. Opción Múltiple',
    subtitle: '¿Qué evento fue un catalizador para el desarrollo del enfoque PSM?',
    options: [
      { id: 'A', text: 'Deepwater Horizon' },
      { id: 'B', text: 'Seveso' },
      { id: 'C', text: 'Exxon Valdez' },
      { id: 'D', text: 'Bhopal', correct: true }
    ]
  },
  {
    id: 'q4',
    type: 'multiple',
    title: '4. Opción Múltiple',
    subtitle: '¿Cuál de estos ODS está más directamente vinculado a la prevención de liberaciones químicas peligrosas?',
    options: [
      { id: 'A', text: 'ODS 3', correct: true },
      { id: 'B', text: 'ODS 8' },
      { id: 'C', text: 'ODS 11' },
      { id: 'D', text: 'ODS 17' }
    ]
  },
  {
    id: 'q5',
    type: 'multiple',
    title: '5. Opción Múltiple',
    subtitle: '¿Qué paso de la integración estratégica busca asegurar que PSM esté en la toma de decisiones?',
    options: [
      { id: 'A', text: 'Diagnóstico y alineación' },
      { id: 'B', text: 'Cultura y liderazgo' },
      { id: 'C', text: 'Integración en la gobernanza', correct: true },
      { id: 'D', text: 'Medición y comunicación' }
    ]
  },
  {
    id: 'q6',
    type: 'multiple',
    title: '6. Opción Múltiple',
    subtitle: '¿Cuál es una de las oportunidades de la implementación conjunta de PSM + Sustentabilidad?',
    options: [
      { id: 'A', text: 'Fragmentación organizacional' },
      { id: 'B', text: 'Mayor eficiencia operativa', correct: true },
      { id: 'C', text: 'Complejidad regulatoria' },
      { id: 'D', text: 'Gestión de datos limitada' }
    ]
  }
];
