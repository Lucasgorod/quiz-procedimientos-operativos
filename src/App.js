import React, { useState, useEffect } from 'react';
import Landing from './components/Landing';
import TeacherView from './components/TeacherView';
import StudentView from './components/StudentView';
import ResultsView from './components/ResultsView';
import Login from './components/auth/Login';
import { useAuth } from './hooks/useAuth';

function App() {
  const [mode, setMode] = useState('landing');
  const [sessionCode, setSessionCode] = useState('');
  const { isAdmin } = useAuth();

  useEffect(() => {
    // Check if there's a session code in the URL
    const urlParams = new URLSearchParams(window.location.search);
    const sessionFromUrl = urlParams.get('session');
    if (sessionFromUrl) {
      setSessionCode(sessionFromUrl);
      setMode('student');
    }
  }, []);

  useEffect(() => {
    if (mode === 'login' && isAdmin) {
      setMode('teacher');
    }
  }, [isAdmin, mode]);

  const handleModeSelect = (newMode, code = '') => {
    if (newMode === 'teacher' && !isAdmin) {
      setMode('login');
      return;
    }
    setMode(newMode);
    if (code) setSessionCode(code);
  };

  return (
    <>
      {mode === 'landing' && <Landing onModeSelect={handleModeSelect} />}
      {mode === 'login' && <Login />}
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

export default App;
