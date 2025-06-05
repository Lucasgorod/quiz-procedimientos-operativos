import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Landing from './components/Landing';
import TeacherView from './components/TeacherView';
import StudentView from './components/StudentView';
import ResultsView from './components/ResultsView';
import AdminPanel from './components/AdminPanel';
import QuizView from './components/QuizView';

function Home() {
  const [mode, setMode] = useState('landing');
  const [sessionCode, setSessionCode] = useState('');

  useEffect(() => {
    // Check if there's a session code in the URL
    const urlParams = new URLSearchParams(window.location.search);
    const sessionFromUrl = urlParams.get('session');
    if (sessionFromUrl) {
      setSessionCode(sessionFromUrl);
      setMode('student');
    }
  }, []);

  const handleModeSelect = (newMode, code = '') => {
    setMode(newMode);
    if (code) setSessionCode(code);
  };

  return (
    <>
      {mode === 'landing' && <Landing onModeSelect={handleModeSelect} />}
      {mode === 'teacher' && (
        <TeacherView
          onModeSelect={handleModeSelect}
          sessionCode={sessionCode}
        />
      )}
      {mode === 'student' && <StudentView sessionCode={sessionCode} />}
      {mode === 'results' && (
        <ResultsView
          sessionCode={sessionCode}
          onBack={() => handleModeSelect('teacher', sessionCode)}
        />
      )}
    </>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/admin" element={<AdminPanel />} />
      <Route path="/quiz/:id" element={<QuizView />} />
      <Route path="*" element={<Home />} />
    </Routes>
  );
}

export default App;
