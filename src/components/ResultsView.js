import React from 'react';
import { Users } from 'lucide-react';
import { questions } from '../utils/questions';
import { useSession } from '../hooks/useSession';

const ResultsView = ({ sessionCode, onBack }) => {
  const { responses } = useSession(sessionCode);

  // Calcular estadísticas
  const calculateStats = () => {
    const stats = {
      q1: { a: { true: 0, false: 0 }, b: { true: 0, false: 0 }, c: { true: 0, false: 0 }, d: { true: 0, false: 0 } },
      q2: { A: 0, B: 0, C: 0, D: 0 },
      q3: { A: 0, B: 0, C: 0, D: 0 },
      q4: { A: 0, B: 0, C: 0, D: 0 },
      q5: { A: 0, B: 0, C: 0, D: 0 },
      q6: { A: 0, B: 0, C: 0, D: 0 }
    };

    responses.forEach(response => {
      const { answers } = response;
      
      // Q1 - Verdadero/Falso
      if (answers.q1) {
        Object.keys(answers.q1).forEach(key => {
          if (answers.q1[key] === true) stats.q1[key].true++;
          if (answers.q1[key] === false) stats.q1[key].false++;
        });
      }

      // Q2-Q6 - Opción múltiple
      if (answers.q2) stats.q2[answers.q2]++;
      if (answers.q3) stats.q3[answers.q3]++;
      if (answers.q4) stats.q4[answers.q4]++;
      if (answers.q5) stats.q5[answers.q5]++;
      if (answers.q6) stats.q6[answers.q6]++;
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

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Pregunta 1: Verdadero/Falso */}
          <div className="bg-gray-900 rounded-3xl p-6">
            <h3 className="text-lg font-medium mb-4">P1: Verdadero/Falso</h3>
            <p className="text-xs text-gray-500 mb-4">{questions[0].subtitle}</p>
            {questions[0].options.map(opt => {
              const truePerc = total > 0 ? Math.round((stats.q1[opt.id].true / total) * 100) : 0;
              const falsePerc = total > 0 ? Math.round((stats.q1[opt.id].false / total) * 100) : 0;
              
              return (
                <div key={opt.id} className="mb-4">
                  <p className="text-sm text-gray-400 mb-2">
                    {opt.id.toUpperCase()}) {opt.correct ? '✓ Correcto: V' : '✗ Correcto: F'}
                  </p>
                  <div className="flex gap-2">
                    <div className="flex-1">
                      <div className="bg-gray-800 rounded-full h-4 overflow-hidden">
                        <div 
                          className="h-full bg-green-500 transition-all duration-500"
                          style={{ width: `${truePerc}%` }}
                        />
                      </div>
                      <p className="text-xs text-gray-500 mt-1">V: {truePerc}%</p>
                    </div>
                    <div className="flex-1">
                      <div className="bg-gray-800 rounded-full h-4 overflow-hidden">
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

          {/* Pregunta 2: Estándares ESG */}
          <div className="bg-gray-900 rounded-3xl p-6">
            <h3 className="text-lg font-medium mb-4">P2: Estándares ESG</h3>
            <p className="text-xs text-gray-500 mb-4">{questions[1].subtitle}</p>
            {questions[1].options.map(opt => {
              const perc = total > 0 ? Math.round(((stats.q2[opt.id] || 0) / total) * 100) : 0;
              
              return (
                <div key={opt.id} className="mb-3">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm">{opt.id}. {opt.text.substring(0, 20)}... {opt.correct && '✓'}</span>
                    <span className="text-sm text-gray-400">{perc}%</span>
                  </div>
                  <div className="bg-gray-800 rounded-full h-4 overflow-hidden">
                    <div 
                      className={`h-full ${opt.correct ? 'bg-green-500' : 'bg-blue-500'} transition-all duration-500`}
                      style={{ width: `${perc}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Pregunta 3: Eventos PSM */}
          <div className="bg-gray-900 rounded-3xl p-6">
            <h3 className="text-lg font-medium mb-4">P3: Eventos PSM</h3>
            <p className="text-xs text-gray-500 mb-4">{questions[2].subtitle}</p>
            {questions[2].options.map(opt => {
              const perc = total > 0 ? Math.round(((stats.q3[opt.id] || 0) / total) * 100) : 0;
              
              return (
                <div key={opt.id} className="mb-3">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm">{opt.id}. {opt.text} {opt.correct && '✓'}</span>
                    <span className="text-sm text-gray-400">{perc}%</span>
                  </div>
                  <div className="bg-gray-800 rounded-full h-4 overflow-hidden">
                    <div 
                      className={`h-full ${opt.correct ? 'bg-green-500' : 'bg-blue-500'} transition-all duration-500`}
                      style={{ width: `${perc}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Pregunta 4: ODS */}
          <div className="bg-gray-900 rounded-3xl p-6">
            <h3 className="text-lg font-medium mb-4">P4: ODS</h3>
            <p className="text-xs text-gray-500 mb-4">{questions[3].subtitle}</p>
            {questions[3].options.map(opt => {
              const perc = total > 0 ? Math.round(((stats.q4[opt.id] || 0) / total) * 100) : 0;
              
              return (
                <div key={opt.id} className="mb-3">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm">{opt.id}. {opt.text} {opt.correct && '✓'}</span>
                    <span className="text-sm text-gray-400">{perc}%</span>
                  </div>
                  <div className="bg-gray-800 rounded-full h-4 overflow-hidden">
                    <div 
                      className={`h-full ${opt.correct ? 'bg-green-500' : 'bg-blue-500'} transition-all duration-500`}
                      style={{ width: `${perc}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Pregunta 5: Integración Estratégica */}
          <div className="bg-gray-900 rounded-3xl p-6">
            <h3 className="text-lg font-medium mb-4">P5: Integración</h3>
            <p className="text-xs text-gray-500 mb-4">{questions[4].subtitle}</p>
            {questions[4].options.map(opt => {
              const perc = total > 0 ? Math.round(((stats.q5[opt.id] || 0) / total) * 100) : 0;
              
              return (
                <div key={opt.id} className="mb-3">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm">{opt.id}. {opt.text.substring(0, 20)}... {opt.correct && '✓'}</span>
                    <span className="text-sm text-gray-400">{perc}%</span>
                  </div>
                  <div className="bg-gray-800 rounded-full h-4 overflow-hidden">
                    <div 
                      className={`h-full ${opt.correct ? 'bg-green-500' : 'bg-blue-500'} transition-all duration-500`}
                      style={{ width: `${perc}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Pregunta 6: Oportunidades PSM */}
          <div className="bg-gray-900 rounded-3xl p-6">
            <h3 className="text-lg font-medium mb-4">P6: Oportunidades</h3>
            <p className="text-xs text-gray-500 mb-4">{questions[5].subtitle}</p>
            {questions[5].options.map(opt => {
              const perc = total > 0 ? Math.round(((stats.q6[opt.id] || 0) / total) * 100) : 0;
              
              return (
                <div key={opt.id} className="mb-3">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm">{opt.id}. {opt.text.substring(0, 20)}... {opt.correct && '✓'}</span>
                    <span className="text-sm text-gray-400">{perc}%</span>
                  </div>
                  <div className="bg-gray-800 rounded-full h-4 overflow-hidden">
                    <div 
                      className={`h-full ${opt.correct ? 'bg-green-500' : 'bg-blue-500'} transition-all duration-500`}
                      style={{ width: `${perc}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsView;
