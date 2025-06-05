import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import QuizView from './components/QuizView';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/quiz/:quizId" element={<QuizView />} />
    </Routes>
  );
}

export default App;
