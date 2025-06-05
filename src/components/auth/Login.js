import React from 'react';
import { useAuth } from '../../hooks/useAuth';

const Login = () => {
  const { login } = useAuth();
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
      <button
        onClick={login}
        className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full font-medium hover:opacity-90 transition-opacity"
      >
        Iniciar sesión con Google
      </button>
    </div>
  );
};

export default Login;
