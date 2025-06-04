import React, { useState, useEffect } from 'react';
import { Users, Eye } from 'lucide-react';
import QRGenerator from './QRGenerator';
import { useSession } from '../hooks/useSession';

const TeacherView = ({ onModeSelect }) => {
  const [sessionCode, setSessionCode] = useState('');
  const { responses, createSession } = useSession(sessionCode);

  useEffect(() => {
    const initSession = async () => {
      const code = await createSession();
      setSessionCode(code);
    };
    initSession();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white p-4">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-5xl font-semibold mb-4 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
          Sesión Iniciada
        </h1>
        
        <div className="bg-gray-900 rounded-3xl p-8 mb-6">
          <p className="text-xl text-gray-400 mb-6">
            Los estudiantes pueden unirse escaneando el código QR
          </p>
          
          <QRGenerator sessionCode={sessionCode} />
          
          <div className="mt-6 mb-6">
            <p className="text-gray-400 mb-2">O ingresando el código:</p>
            <p className="text-4xl font-mono font-bold">{sessionCode}</p>
          </div>
          
          <div className="flex items-center justify-center gap-2 text-lg">
            <Users className="w-6 h-6 text-blue-500" />
            <span className="text-gray-300">{responses.length} estudiantes conectados</span>
          </div>
        </div>
        
        <div className="flex gap-4 justify-center">
          <button
            onClick={() => onModeSelect('results', sessionCode)}
            className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full font-medium hover:opacity-90 transition-opacity flex items-center gap-2"
          >
            <Eye className="w-5 h-5" />
            Ver Resultados en Tiempo Real
          </button>
          
          <button
            onClick={() => onModeSelect('landing')}
            className="px-8 py-3 bg-gray-800 rounded-full font-medium hover:bg-gray-700 transition-all"
          >
            Volver
          </button>
        </div>
      </div>
    </div>
  );
};

export default TeacherView;
