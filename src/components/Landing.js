import React from 'react';
import { Play, Users } from 'lucide-react';

const Landing = ({ onModeSelect }) => {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
      <div className="max-w-4xl w-full text-center">
        <img src={process.env.PUBLIC_URL + "/assets/itba-logo.png"} alt="ITBA" className="w-56 md:w-72 mx-auto mb-8" />
        <h1 className="text-6xl font-semibold mb-4 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
          Quiz Interactivo
        </h1>
        <p className="text-2xl text-gray-400 mb-12">
          PSM & Sustentabilidad - Certificación
        </p>
        
        <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
          <button
            onClick={() => onModeSelect('teacher')}
            className="bg-gray-900 rounded-3xl p-8 hover:bg-gray-800 transition-all group"
          >
            <Play className="w-16 h-16 mx-auto mb-4 text-blue-500 group-hover:scale-110 transition-transform" />
            <h3 className="text-xl font-medium mb-2">Iniciar Sesión</h3>
            <p className="text-gray-400">Para el profesor</p>
          </button>
          
          <button
            onClick={() => onModeSelect('student')}
            className="bg-gray-900 rounded-3xl p-8 hover:bg-gray-800 transition-all group"
          >
            <Users className="w-16 h-16 mx-auto mb-4 text-purple-500 group-hover:scale-110 transition-transform" />
            <h3 className="text-xl font-medium mb-2">Unirse como Estudiante</h3>
            <p className="text-gray-400">Escanear QR o ingresar código</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Landing;
