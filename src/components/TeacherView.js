import React, { useState, useEffect } from 'react';
import { Users, Eye } from 'lucide-react';
import QRGenerator from './QRGenerator';
import { useSession } from '../hooks/useSession';
import LogoutButton from './auth/LogoutButton';

const TeacherView = ({ onModeSelect, sessionCode: initialSessionCode }) => {
  const [sessionCode, setSessionCode] = useState(initialSessionCode || '');
  const { responses, createSession, clearSession } = useSession(sessionCode);

  const handleReset = async () => {
    await clearSession();
    const newCode = await createSession();
    setSessionCode(newCode);
    onModeSelect('teacher', newCode);
  };

  useEffect(() => {
    const initSession = async () => {
      if (!initialSessionCode) {
        const code = await createSession();
        setSessionCode(code);
        // notify parent so the session code persists across views
        onModeSelect('teacher', code);
      } else {
        setSessionCode(initialSessionCode);
      }
    };
    initSession();
  }, [initialSessionCode]);

  return (
    <div className="min-h-screen bg-black text-white p-4">
      <div className="max-w-4xl mx-auto text-center relative">
        <div className="absolute top-4 right-4">
          <LogoutButton />
        </div>
        <img src="/assets/itba-logo.png" alt="ITBA" className="w-36 mx-auto mb-6" />
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
            onClick={handleReset}
            className="px-8 py-3 bg-red-600 rounded-full font-medium hover:bg-red-500 transition-all"
          >
            Limpiar Resultados y Reiniciar
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
