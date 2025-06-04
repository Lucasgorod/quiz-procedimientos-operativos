export const questions = [
  {
    id: 'q1',
    type: 'trueFalse',
    title: '1. Verdadero o Falso',
    subtitle: 'Indicá si las siguientes afirmaciones son verdaderas o falsas:',
    options: [
      { 
        id: 'a', 
        text: 'Los procedimientos operativos solo deben desarrollarse una vez que la planta está en funcionamiento.', 
        correct: false 
      },
      { 
        id: 'b', 
        text: 'Un procedimiento operativo bien diseñado debe incluir o referenciar prácticas de trabajo seguro.', 
        correct: true 
      },
      { 
        id: 'c', 
        text: 'La industria aeronáutica ha reducido accidentes gracias a la improvisación en situaciones críticas.', 
        correct: false 
      },
      { 
        id: 'd', 
        text: 'Los procedimientos operativos no son necesarios en situaciones de emergencia.', 
        correct: false 
      }
    ]
  },
  {
    id: 'q2',
    type: 'multiple',
    title: '2. Opción Múltiple',
    subtitle: '¿Cuál de los siguientes factores es una causa frecuente de que no se sigan los procedimientos operativos?',
    options: [
      { id: 'A', text: 'El procedimiento es muy corto' },
      { id: 'B', text: 'El procedimiento está disponible en todo momento' },
      { id: 'C', text: 'No recibí capacitación suficiente', correct: true },
      { id: 'D', text: 'Todos los operadores prefieren seguir los procedimientos' }
    ]
  },
  {
    id: 'q3',
    type: 'match',
    title: '3. Relacionar Columnas',
    subtitle: 'Relacioná cada concepto con su definición:',
    definitions: [
      {
        id: '1',
        text: 'Describe cómo realizar una tarea minimizando riesgos para la salud y seguridad'
      },
      {
        id: '2',
        text: 'Describe cómo operar un sistema o proceso de forma eficiente y controlada'
      }
    ],
    pairs: [
      {
        concept: 'A. Procedimiento Operativo',
        correctAnswer: '2'
      },
      {
        concept: 'B. Práctica de Trabajo Seguro',
        correctAnswer: '1'
      }
    ]
  },
  {
    id: 'q4',
    type: 'open',
    title: '4. Pregunta Abierta',
    subtitle: 'Mencioná dos beneficios de contar con procedimientos operativos bien diseñados en una planta industrial.'
  },
  {
    id: 'q5',
    type: 'fill',
    title: '5. Completar',
    subtitle: 'Completá la frase:',
    text: 'Los procedimientos operativos actúan como ___ en la gestión de riesgos de procesos y son requeridos por ___ y estándares.'
  }
];
