import React, { useState, useEffect } from 'react';
import { CheckCircle, ChevronRight } from 'lucide-react';
import { questions } from '../utils/questions';
import { useSession } from '../hooks/useSession';

const StudentView = ({ sessionCode: initialSessionCode }) => {
  const [studentName, setStudentName] = useState('');
  const [sessionInput, setSessionInput] = useState(initialSessionCode || '');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({
    q1: {},
    q2: '',
    q3: {},
    q4: '',
    q5: { blank1: '', blank2: '' }
  });
  const [submitted, setSubmitted] = useState(false);
  const [showNameForm, setShowNameForm] = useState(true);

  const { submitResponse } = useSession(sessionInput);

  const handleStartQuiz = () => {
    if (studentName.trim()) {
      setShowNameForm(false);
    }
  };

  // --- Utilidades para mapear claves seguras para Firebase ---
  const matchKeyMap = {
    'A. Procedimiento Operativo': 'A',
    'B. Práctica de Trabajo Seguro': 'B'
  };
  const matchKeyReverseMap = {
    'A': 'A. Procedimiento Operativo',
    'B': 'B. Práctica de Trabajo Seguro'
  };

  // --- Al guardar respuestas, convertir claves peligrosas a seguras ---
  const handleSubmit = async () => {
    let safeAnswers = { ...answers };
    if (safeAnswers.q3) {
      const safeQ3 = {};
      Object.entries(safeAnswers.q3).forEach(([k, v]) => {
        const safeKey = matchKeyMap[k] || k;
        safeQ3[safeKey] = v;
      });
      safeAnswers.q3 = safeQ3;
    }
    await submitResponse(studentName, safeAnswers);
    setSubmitted(true);
  };

  if (showNameForm) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <h1 className="text-4xl font-semibold text-center mb-8 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
            Unirse al Quiz
          </h1>
          
          <div className="bg-gray-900 rounded-3xl p-8">
            <label className="block text-sm text-gray-400 mb-2">Tu nombre</label>
            <input
              type="text"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              className="w-full px-4 py-3 bg-black rounded-2xl border border-gray-800 focus:border-blue-500 focus:outline-none transition-colors mb-6"
              placeholder="Ingresá tu nombre"
            />
            
            <label className="block text-sm text-gray-400 mb-2">Código de sesión</label>
            <input
              type="text"
              value={sessionInput}
              onChange={(e) => setSessionInput(e.target.value.toUpperCase())}
              className="w-full px-4 py-3 bg-black rounded-2xl border border-gray-800 focus:border-blue-500 focus:outline-none transition-colors mb-6"
              placeholder="Ej: ABC123"
            />
            
            <button
              onClick={handleStartQuiz}
              disabled={!studentName.trim() || !sessionInput.trim()}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full py-4 font-medium hover:opacity-90 transition-opacity flex items-center justify-center gap-2 disabled:opacity-50"
            >
              Comenzar <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
        <div className="text-center">
          <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-4" />
          <h2 className="text-3xl font-semibold mb-2">¡Respuestas enviadas!</h2>
          <p className="text-gray-400 mb-6">Gracias por participar, {studentName}</p>
          <p className="text-gray-500">Esperá a que el profesor muestre los resultados</p>
        </div>
      </div>
    );
  }

  const question = questions[currentQuestion];

  return (
    <div className="min-h-screen bg-black text-white p-4">
      <div className="max-w-2xl mx-auto">
        {/* Progress bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-400 mb-2">
            <span>Pregunta {currentQuestion + 1} de {questions.length}</span>
            <span>{studentName}</span>
          </div>
          <div className="bg-gray-800 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-blue-500 to-purple-600 h-full rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Question */}
        <div className="bg-gray-900 rounded-3xl p-8 mb-6">
          <h2 className="text-2xl font-semibold mb-2">{question.title}</h2>
          <p className="text-gray-400 mb-6">{question.subtitle}</p>

          {/* True/False */}
          {question.type === 'trueFalse' && (
            <div className="space-y-4">
              {question.options.map(opt => (
                <div key={opt.id} className="space-y-2">
                  <p className="text-gray-300">{opt.id}) {opt.text}</p>
                  <div className="flex gap-3">
                    <button
                      onClick={() => setAnswers({ ...answers, q1: { ...answers.q1, [opt.id]: true }})}
                      className={`px-6 py-2 rounded-full transition-all ${
                        answers.q1[opt.id] === true 
                          ? 'bg-green-500 text-white' 
                          : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                      }`}
                    >
                      Verdadero
                    </button>
                    <button
                      onClick={() => setAnswers({ ...answers, q1: { ...answers.q1, [opt.id]: false }})}
                      className={`px-6 py-2 rounded-full transition-all ${
                        answers.q1[opt.id] === false 
                          ? 'bg-red-500 text-white' 
                          : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                      }`}
                    >
                      Falso
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Multiple Choice */}
          {question.type === 'multiple' && (
            <div className="space-y-3">
              {question.options.map(opt => (
                <button
                  key={opt.id}
                  onClick={() => setAnswers({ ...answers, q2: opt.id })}
                  className={`w-full text-left p-4 rounded-2xl transition-all ${
                    answers.q2 === opt.id
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-800 hover:bg-gray-700'
                  }`}
                >
                  <span className="font-medium">{opt.id}.</span> {opt.text}
                </button>
              ))}
            </div>
          )}

          {/* Match */}
          {question.type === 'match' && (
            <div className="space-y-6">
              {question.pairs.map((pair, idx) => {
                // Usar clave segura para el estado
                const safeKey = matchKeyMap[pair.concept];
                return (
                  <div key={idx} className="space-y-3">
                    <p className="font-medium">{pair.concept}</p>
                    <div className="flex gap-3">
                      <button
                        onClick={() => setAnswers({ ...answers, q3: { ...answers.q3, [pair.concept]: '1' }})}
                        className={`px-6 py-2 rounded-full transition-all ${
                          answers.q3[pair.concept] === '1'
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-800 hover:bg-gray-700'
                        }`}
                      >
                        Definición 1
                      </button>
                      <button
                        onClick={() => setAnswers({ ...answers, q3: { ...answers.q3, [pair.concept]: '2' }})}
                        className={`px-6 py-2 rounded-full transition-all ${
                          answers.q3[pair.concept] === '2'
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-800 hover:bg-gray-700'
                        }`}
                      >
                        Definición 2
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Open */}
          {question.type === 'open' && (
            <textarea
              value={answers.q4}
              onChange={(e) => setAnswers({ ...answers, q4: e.target.value })}
              className="w-full h-32 px-4 py-3 bg-gray-800 rounded-2xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Escribí tu respuesta aquí..."
            />
          )}

          {/* Fill */}
          {question.type === 'fill' && (
            <div className="space-y-4">
              <p className="text-lg">
                Los procedimientos operativos actúan como{' '}
                <input
                  type="text"
                  value={answers.q5.blank1}
                  onChange={(e) => setAnswers({ ...answers, q5: { ...answers.q5, blank1: e.target.value }})}
                  className="inline-block w-40 px-3 py-1 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />{' '}
                en la gestión de riesgos de procesos y son requeridos por{' '}
                <input
                  type="text"
                  value={answers.q5.blank2}
                  onChange={(e) => setAnswers({ ...answers, q5: { ...answers.q5, blank2: e.target.value }})}
                  className="inline-block w-40 px-3 py-1 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />{' '}
                y estándares.
              </p>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="flex justify-between gap-4">
          <button
            onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
            disabled={currentQuestion === 0}
            className={`px-8 py-3 rounded-full font-medium transition-all ${
              currentQuestion === 0
                ? 'bg-gray-800 text-gray-600 cursor-not-allowed'
                : 'bg-gray-800 hover:bg-gray-700'
            }`}
          >
            Anterior
          </button>
          
          {currentQuestion === questions.length - 1 ? (
            <button
              onClick={handleSubmit}
              className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full font-medium hover:opacity-90 transition-opacity"
            >
              Enviar respuestas
            </button>
          ) : (
            <button
              onClick={() => setCurrentQuestion(currentQuestion + 1)}
              className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full font-medium hover:opacity-90 transition-opacity flex items-center gap-2"
            >
              Siguiente <ChevronRight className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentView;
