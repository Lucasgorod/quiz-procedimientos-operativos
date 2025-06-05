import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import AdminPanel from './components/AdminPanel';
import QuizView from './components/QuizView';

function App() {
  return (
    <Routes>
      <Route path="/admin" element={<AdminPanel />} />
      <Route path="/quiz/:quizId" element={<QuizView />} />
      <Route path="*" element={<Home />} />
    </Routes>
  );
}

export default App;
