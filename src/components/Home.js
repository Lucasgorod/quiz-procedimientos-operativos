import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [quizId, setQuizId] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (quizId.trim()) {
      navigate(`/quiz/${quizId}`);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
      <form onSubmit={handleSubmit} className="bg-gray-900 rounded-3xl p-8 w-full max-w-md space-y-4">
        <img src="/assets/itba-logo.png" alt="ITBA" className="w-32 mx-auto mb-4" />
        <h1 className="text-4xl font-semibold text-center mb-4 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
          Quiz Interactivo
        </h1>
        <input
          type="text"
          value={quizId}
          onChange={(e) => setQuizId(e.target.value)}
          placeholder="ID del Quiz"
          className="w-full px-4 py-3 bg-black rounded-2xl border border-gray-800 focus:border-blue-500 focus:outline-none"
        />
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full py-3 font-medium hover:opacity-90 transition-opacity"
        >
          Entrar
        </button>
      </form>
    </div>
  );
};

export default Home;
