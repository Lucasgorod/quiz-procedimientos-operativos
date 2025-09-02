export const questions = [
  {
    id: 'q1',
    type: 'multiple',
    title: '🟦 Parte 1: Opción múltiple',
    subtitle: '¿Cuál de las siguientes afirmaciones describe mejor el concepto de cultura organizacional?',
    options: [
      { id: 'A', text: 'Es el conjunto de normas escritas que regulan el comportamiento.' },
      { id: 'B', text: 'Es lo que las personas hacen cuando no son supervisadas.' },
      { id: 'C', text: 'Son las actitudes y comportamientos compartidos que influyen en cómo se gestiona el riesgo.', correct: true },
      { id: 'D', text: 'Es la forma en que se diseñan los sistemas técnicos.' }
    ]
  },
  {
    id: 'q2',
    type: 'multiple',
    title: '2. Opción múltiple',
    subtitle: '¿Qué elemento NO forma parte del modelo de abordaje cultural presentado en clase?',
    options: [
      { id: 'A', text: 'Contexto' },
      { id: 'B', text: 'Autonomía' },
      { id: 'C', text: 'Liderazgo' },
      { id: 'D', text: 'Productividad', correct: true }
    ]
  },
  {
    id: 'q3',
    type: 'multiple',
    title: '3. Opción múltiple',
    subtitle: '¿Qué práctica contribuye a combatir la normalización de desvíos?',
    options: [
      { id: 'A', text: 'Ignorar desviaciones menores si no generan incidentes.' },
      { id: 'B', text: 'Feedback inmediato ante un comportamiento inseguro.', correct: true },
      { id: 'C', text: 'Premiar la eficiencia operativa por sobre la seguridad.' },
      { id: 'D', text: 'Evitar hablar de errores para no generar miedo.' }
    ]
  },
  {
    id: 'q4',
    type: 'multiple',
    title: '4. Opción múltiple',
    subtitle: '¿Cuál de las siguientes opciones representa una forma adecuada de gestionar el abordaje cultural en una organización?',
    options: [
      { id: 'A', text: 'Implementar campañas de comunicación sin modificar procesos.' },
      { id: 'B', text: 'Aplicar el ciclo PDCA para evaluar, desarrollar y sostener la cultura.', correct: true },
      { id: 'C', text: 'Delegar la cultura exclusivamente al área de RRHH.' },
      { id: 'D', text: 'Medir la cultura una vez al año sin acciones posteriores.' }
    ]
  },
  {
    id: 'q5',
    type: 'trueFalse',
    title: '🟨 Parte 2: Verdadero / Falso',
    subtitle: 'Indicá si las siguientes afirmaciones son verdaderas o falsas:',
    options: [
      { 
        id: 'a', 
        text: 'La cultura organizacional está asociada principalmente a individuos, no a grupos.', 
        correct: false 
      },
      { 
        id: 'b', 
        text: 'El contexto organizacional es modelado por quienes toman decisiones.', 
        correct: true 
      },
      { 
        id: 'c', 
        text: 'La ausencia de consecuencias ante un desvío puede reforzar la percepción de que la práctica es segura.', 
        correct: true 
      }
    ]
  }
];
