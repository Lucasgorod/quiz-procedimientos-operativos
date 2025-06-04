import React, { useState, useEffect } from 'react';
import Landing from './components/Landing';
import TeacherView from './components/TeacherView';
import StudentView from './components/StudentView';
import ResultsView from './components/ResultsView';

function App() {
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
      {mode === 'teacher' && <TeacherView onModeSelect={handleModeSelect} />}
      {mode === 'student' && <StudentView sessionCode={sessionCode} />}
      {mode === 'results' && (
        <ResultsView 
          sessionCode={sessionCode} 
          onBack={() => handleModeSelect('teacher')} 
        />
      )}
    </>
  );
}

export default App;
