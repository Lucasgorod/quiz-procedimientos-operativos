import React from 'react';
import { Users } from 'lucide-react';
import { questions } from '../utils/questions';
import { useSession } from '../hooks/useSession';

const ResultsView = ({ sessionCode, onBack }) => {
  const { responses } = useSession(sessionCode);

  // Calcular estadísticas
  const calculateStats = () => {
    const stats = {
      q1: { A: 0, B: 0, C: 0, D: 0 },
      q2: { A: 0, B: 0, C: 0, D: 0 },
      q3: { A: 0, B: 0, C: 0, D: 0 },
      q4: { a: { true: 0, false: 0 }, b: { true: 0, false: 0 }, c: { true: 0, false: 0 }, d: { true: 0, false: 0 } },
      q5: {}
    };

    responses.forEach(response => {
      const { answers } = response;
      
      // Q1-Q3 - Opción múltiple
      if (answers.q1) stats.q1[answers.q1]++;
      if (answers.q2) stats.q2[answers.q2]++;
      if (answers.q3) stats.q3[answers.q3]++;

      // Q4 - Verdadero/Falso
      if (answers.q4) {
        Object.keys(answers.q4).forEach(key => {
          if (answers.q4[key] === true) stats.q4[key].true++;
          if (answers.q4[key] === false) stats.q4[key].false++;
        });
      }

      // Q5 - Fill in the blank
      if (answers.q5) {
        Object.keys(answers.q5).forEach(key => {
          if (!stats.q5[key]) stats.q5[key] = {};
          const answer = answers.q5[key]?.toLowerCase().trim();
          if (answer) {
            stats.q5[key][answer] = (stats.q5[key][answer] || 0) + 1;
          }
        });
      }
    });

    return stats;
  };

  const stats = calculateStats();
  const total = responses.length || 1;

  return (
    <div className="min-h-screen bg-black text-white p-4">
      <div className="max-w-6xl mx-auto">
        <img src={process.env.PUBLIC_URL + "/assets/itba-logo.png"} alt="ITBA" className="w-32 mx-auto mb-6" />
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

        <div className="space-y-8">
          {/* Pregunta 1: Liderazgo en Seguridad */}
          <div className="bg-gray-900 rounded-3xl p-6">
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-3 text-blue-400">🟦 Pregunta 1: Opción múltiple</h3>
              <p className="text-base text-gray-300 font-medium">{questions[0].subtitle}</p>
            </div>
            <div className="space-y-4">
              {questions[0].options.map(opt => {
                const perc = total > 0 ? Math.round(((stats.q1[opt.id] || 0) / total) * 100) : 0;
                
                return (
                  <div key={opt.id} className="bg-gray-800 rounded-2xl p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex-1 pr-4">
                        <span className="text-base text-gray-200">
                          <span className="font-semibold text-blue-300">{opt.id}.</span> {opt.text}
                        </span>
                        {opt.correct && <span className="ml-2 text-green-400 font-semibold">✓ Correcta</span>}
                      </div>
                      <div className="text-right">
                        <span className="text-lg font-bold text-gray-300">{perc}%</span>
                        <div className="text-xs text-gray-500">({stats.q1[opt.id] || 0} respuestas)</div>
                      </div>
                    </div>
                    <div className="bg-gray-700 rounded-full h-3 overflow-hidden">
                      <div 
                        className={`h-full transition-all duration-700 ${opt.correct ? 'bg-green-500' : 'bg-blue-500'}`}
                        style={{ width: `${perc}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Pregunta 2: Coherencia Liderazgo */}
          <div className="bg-gray-900 rounded-3xl p-6">
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-3 text-blue-400">Pregunta 2: Opción múltiple</h3>
              <p className="text-base text-gray-300 font-medium">{questions[1].subtitle}</p>
            </div>
            <div className="space-y-4">
              {questions[1].options.map(opt => {
                const perc = total > 0 ? Math.round(((stats.q2[opt.id] || 0) / total) * 100) : 0;
                
                return (
                  <div key={opt.id} className="bg-gray-800 rounded-2xl p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex-1 pr-4">
                        <span className="text-base text-gray-200">
                          <span className="font-semibold text-blue-300">{opt.id}.</span> {opt.text}
                        </span>
                        {opt.correct && <span className="ml-2 text-green-400 font-semibold">✓ Correcta</span>}
                      </div>
                      <div className="text-right">
                        <span className="text-lg font-bold text-gray-300">{perc}%</span>
                        <div className="text-xs text-gray-500">({stats.q2[opt.id] || 0} respuestas)</div>
                      </div>
                    </div>
                    <div className="bg-gray-700 rounded-full h-3 overflow-hidden">
                      <div 
                        className={`h-full transition-all duration-700 ${opt.correct ? 'bg-green-500' : 'bg-blue-500'}`}
                        style={{ width: `${perc}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Pregunta 3: Cultura de Seguridad */}
          <div className="bg-gray-900 rounded-3xl p-6">
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-3 text-blue-400">Pregunta 3: Opción múltiple</h3>
              <p className="text-base text-gray-300 font-medium">{questions[2].subtitle}</p>
            </div>
            <div className="space-y-4">
              {questions[2].options.map(opt => {
                const perc = total > 0 ? Math.round(((stats.q3[opt.id] || 0) / total) * 100) : 0;
                
                return (
                  <div key={opt.id} className="bg-gray-800 rounded-2xl p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex-1 pr-4">
                        <span className="text-base text-gray-200">
                          <span className="font-semibold text-blue-300">{opt.id}.</span> {opt.text}
                        </span>
                        {opt.correct && <span className="ml-2 text-green-400 font-semibold">✓ Correcta</span>}
                      </div>
                      <div className="text-right">
                        <span className="text-lg font-bold text-gray-300">{perc}%</span>
                        <div className="text-xs text-gray-500">({stats.q3[opt.id] || 0} respuestas)</div>
                      </div>
                    </div>
                    <div className="bg-gray-700 rounded-full h-3 overflow-hidden">
                      <div 
                        className={`h-full transition-all duration-700 ${opt.correct ? 'bg-green-500' : 'bg-blue-500'}`}
                        style={{ width: `${perc}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Pregunta 4: Verdadero/Falso */}
          <div className="bg-gray-900 rounded-3xl p-6">
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-3 text-yellow-400">🟨 Pregunta 4: Verdadero / Falso</h3>
              <p className="text-base text-gray-300 font-medium">{questions[3].subtitle}</p>
            </div>
            <div className="space-y-6">
              {questions[3].options.map(opt => {
                const trueCount = stats.q4[opt.id]?.true || 0;
                const falseCount = stats.q4[opt.id]?.false || 0;
                const totalResponses = trueCount + falseCount;
                const truePerc = totalResponses > 0 ? Math.round((trueCount / totalResponses) * 100) : 0;
                const falsePerc = totalResponses > 0 ? Math.round((falseCount / totalResponses) * 100) : 0;
                
                return (
                  <div key={opt.id} className="bg-gray-800 rounded-2xl p-4">
                    <div className="mb-4">
                      <p className="text-base text-gray-200 mb-2">
                        <span className="font-semibold text-yellow-300">{opt.id.toUpperCase()})</span> {opt.text}
                      </p>
                      <p className="text-sm font-medium">
                        {opt.correct ? (
                          <span className="text-green-400">✓ Respuesta correcta: Verdadero</span>
                        ) : (
                          <span className="text-red-400">✗ Respuesta correcta: Falso</span>
                        )}
                      </p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-medium text-green-300">Verdadero</span>
                          <span className="text-sm font-bold">{truePerc}% ({trueCount})</span>
                        </div>
                        <div className="bg-gray-700 rounded-full h-3 overflow-hidden">
                          <div 
                            className="h-full bg-green-500 transition-all duration-700"
                            style={{ width: `${truePerc}%` }}
                          />
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-medium text-red-300">Falso</span>
                          <span className="text-sm font-bold">{falsePerc}% ({falseCount})</span>
                        </div>
                        <div className="bg-gray-700 rounded-full h-3 overflow-hidden">
                          <div 
                            className="h-full bg-red-500 transition-all duration-700"
                            style={{ width: `${falsePerc}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Pregunta 5: Completar frases */}
          <div className="bg-gray-900 rounded-3xl p-6">
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-3 text-green-400">🟩 Pregunta 5: Completar la frase</h3>
              <p className="text-base text-gray-300 font-medium">{questions[4].subtitle}</p>
            </div>
            <div className="space-y-6">
              {questions[4].options.map(opt => (
                <div key={opt.id} className="bg-gray-800 rounded-2xl p-4">
                  <div className="mb-4">
                    <p className="text-base text-gray-200 mb-2">
                      <span className="font-semibold text-green-300">{opt.id.toUpperCase()})</span> {opt.text.replace('__________', `[${opt.correct}]`)}
                    </p>
                    <p className="text-sm text-green-400 font-medium">✓ Respuesta correcta: "{opt.correct}"</p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium text-gray-400">Respuestas más frecuentes:</h4>
                    {stats.q5[opt.id] && Object.entries(stats.q5[opt.id])
                      .sort(([,a], [,b]) => b - a)
                      .slice(0, 5)
                      .map(([answer, count]) => {
                        const perc = Math.round((count / total) * 100);
                        const isCorrect = opt.alternatives?.some(alt => 
                          alt.toLowerCase() === answer.toLowerCase()
                        );
                        
                        return (
                          <div key={answer} className="flex justify-between items-center py-2 px-3 bg-gray-700 rounded-lg">
                            <span className={`text-sm font-medium ${isCorrect ? 'text-green-400' : 'text-gray-300'}`}>
                              "{answer}" {isCorrect && '✓'}
                            </span>
                            <span className="text-sm font-bold text-gray-300">{perc}% ({count})</span>
                          </div>
                        );
                      })
                    }
                    {(!stats.q5[opt.id] || Object.keys(stats.q5[opt.id]).length === 0) && (
                      <p className="text-sm text-gray-500 italic">No hay respuestas aún</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsView;
