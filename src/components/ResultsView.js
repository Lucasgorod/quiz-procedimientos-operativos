import React from 'react';
import { Users } from 'lucide-react';
import { questions } from '../utils/questions';
import { useSession } from '../hooks/useSession';
import { QUIZ_ID } from '../utils/constants';

const ResultsView = ({ sessionCode, onBack }) => {
  const { responses } = useSession(QUIZ_ID, sessionCode);

  // Calcular estadísticas
  const calculateStats = () => {
    const matchKeyReverseMap = {
      'A': 'A. Procedimiento Operativo',
      'B': 'B. Práctica de Trabajo Seguro'
    };
    const stats = {
      q1: { a: { true: 0, false: 0 }, b: { true: 0, false: 0 }, c: { true: 0, false: 0 }, d: { true: 0, false: 0 } },
      q2: { A: 0, B: 0, C: 0, D: 0 },
      q3: { correct: 0, incorrect: 0 },
      q4: [],
      q5: { blank1: {}, blank2: {} }
    };

    responses.forEach(response => {
      const { answers } = response;
      
      // Q1
      if (answers.q1) {
        Object.keys(answers.q1).forEach(key => {
          if (answers.q1[key] === true) stats.q1[key].true++;
          if (answers.q1[key] === false) stats.q1[key].false++;
        });
      }

      // Q2
      if (answers.q2) stats.q2[answers.q2]++;

      // Q3
      if (answers.q3) {
        // Mapear claves seguras a los textos originales para comparar
        const a = answers.q3['A'] || answers.q3['A. Procedimiento Operativo'];
        const b = answers.q3['B'] || answers.q3['B. Práctica de Trabajo Seguro'];
        const correctQ3 = a === '2' && b === '1';
        if (correctQ3) stats.q3.correct++;
        else stats.q3.incorrect++;
      }
      // Q4
      if (answers.q4) stats.q4.push(answers.q4);

      // Q5
      if (answers.q5) {
        if (answers.q5.blank1) {
          stats.q5.blank1[answers.q5.blank1] = (stats.q5.blank1[answers.q5.blank1] || 0) + 1;
        }
        if (answers.q5.blank2) {
          stats.q5.blank2[answers.q5.blank2] = (stats.q5.blank2[answers.q5.blank2] || 0) + 1;
        }
      }
    });

    return stats;
  };

  const stats = calculateStats();
  const total = responses.length || 1;

  return (
    <div className="min-h-screen bg-black text-white p-4">
      <div className="max-w-6xl mx-auto">
        <img src="/assets/itba-logo.png" alt="ITBA" className="w-32 mx-auto mb-6" />
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-semibold bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
              Resultados en Tiempo Real
            </h1>
            <p className="text-gray-400 mt-2 flex items-center gap-2">
              <Users className="w-5 h-5" /> {responses.length} respuestas
            </p>
          </div>
          <button
            onClick={onBack}
            className="px-6 py-2 bg-gray-800 rounded-full hover:bg-gray-700 transition-all"
          >
            Volver
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Pregunta 1 */}
          <div className="bg-gray-900 rounded-3xl p-6">
            <h3 className="text-xl font-medium mb-4">Pregunta 1: Verdadero o Falso</h3>
            {questions[0].options.map(opt => {
              const truePerc = total > 0 ? Math.round((stats.q1[opt.id].true / total) * 100) : 0;
              const falsePerc = total > 0 ? Math.round((stats.q1[opt.id].false / total) * 100) : 0;
              
              return (
                <div key={opt.id} className="mb-4">
                  <p className="text-sm text-gray-400 mb-2">
                    {opt.id}) {opt.correct ? '✓ Correcto: V' : '✗ Correcto: F'}
                  </p>
                  <div className="flex gap-2">
                    <div className="flex-1">
                      <div className="bg-gray-800 rounded-full h-6 overflow-hidden">
                        <div 
                          className="h-full bg-green-500 transition-all duration-500"
                          style={{ width: `${truePerc}%` }}
                        />
                      </div>
                      <p className="text-xs text-gray-500 mt-1">V: {truePerc}%</p>
                    </div>
                    <div className="flex-1">
                      <div className="bg-gray-800 rounded-full h-6 overflow-hidden">
                        <div 
                          className="h-full bg-red-500 transition-all duration-500"
                          style={{ width: `${falsePerc}%` }}
                        />
                      </div>
                      <p className="text-xs text-gray-500 mt-1">F: {falsePerc}%</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Pregunta 2 */}
          <div className="bg-gray-900 rounded-3xl p-6">
            <h3 className="text-xl font-medium mb-4">Pregunta 2: Opción Múltiple</h3>
            {questions[1].options.map(opt => {
              const perc = total > 0 ? Math.round((stats.q2[opt.id] / total) * 100) : 0;
              
              return (
                <div key={opt.id} className="mb-3">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm">{opt.id}. {opt.correct && '✓'}</span>
                    <span className="text-sm text-gray-400">{perc}%</span>
                  </div>
                  <div className="bg-gray-800 rounded-full h-6 overflow-hidden">
                    <div 
                      className={`h-full ${opt.correct ? 'bg-green-500' : 'bg-blue-500'} transition-all duration-500`}
                      style={{ width: `${perc}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Pregunta 3 */}
          <div className="bg-gray-900 rounded-3xl p-6">
            <h3 className="text-xl font-medium mb-4">Pregunta 3: Relacionar Columnas</h3>
            <div className="flex items-center justify-center gap-8">
              <div className="text-center">
                <div className="text-5xl font-bold text-green-500">
                  {total > 0 ? Math.round((stats.q3.correct / total) * 100) : 0}%
                </div>
                <p className="text-gray-400 mt-2">Correctas</p>
              </div>
              <div className="text-center">
                <div className="text-5xl font-bold text-red-500">
                  {total > 0 ? Math.round((stats.q3.incorrect / total) * 100) : 0}%
                </div>
                <p className="text-gray-400 mt-2">Incorrectas</p>
              </div>
            </div>
          </div>

          {/* Pregunta 4 */}
          <div className="bg-gray-900 rounded-3xl p-6">
            <h3 className="text-xl font-medium mb-4">Pregunta 4: Algunas Respuestas</h3>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {stats.q4.length > 0 ? (
                stats.q4.slice(0, 5).map((answer, idx) => (
                  <div key={idx} className="text-sm text-gray-300 p-2 bg-gray-800 rounded">
                    {answer}
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No hay respuestas aún</p>
              )}
            </div>
          </div>

          {/* Pregunta 5 */}
          <div className="bg-gray-900 rounded-3xl p-6 md:col-span-2">
            <h3 className="text-xl font-medium mb-4">Pregunta 5: Palabras Más Usadas</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-400 mb-2">Primer espacio:</p>
                {Object.keys(stats.q5.blank1).length > 0 ? (
                  Object.entries(stats.q5.blank1).map(([word, count]) => (
                    <div key={word} className="flex justify-between text-sm mb-1">
                      <span>{word}</span>
                      <span className="text-gray-400">{count} estudiantes</span>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-sm">No hay respuestas aún</p>
                )}
              </div>
              <div>
                <p className="text-sm text-gray-400 mb-2">Segundo espacio:</p>
                {Object.keys(stats.q5.blank2).length > 0 ? (
                  Object.entries(stats.q5.blank2).map(([word, count]) => (
                    <div key={word} className="flex justify-between text-sm mb-1">
                      <span>{word}</span>
                      <span className="text-gray-400">{count} estudiantes</span>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-sm">No hay respuestas aún</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsView;
