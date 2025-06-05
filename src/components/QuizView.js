import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Landing from './Landing';
import TeacherView from './TeacherView';
import StudentView from './StudentView';
import ResultsView from './ResultsView';
import { useQuizData } from '../hooks/useQuizData';

const QuizView = () => {
  const { quizId } = useParams();
  const { quiz, loading } = useQuizData(quizId);
  const [mode, setMode] = useState('landing');
  const [sessionCode, setSessionCode] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const sessionFromUrl = params.get('session');
    if (sessionFromUrl) {
      setSessionCode(sessionFromUrl);
      setMode('student');
    }
  }, []);

  const handleModeSelect = (m, code = '') => {
    setMode(m);
    if (code) setSessionCode(code);
  };

  if (loading) return <p className="p-4">Cargando...</p>;
  if (!quiz) return <p className="p-4">Quiz no encontrado</p>;

  return (
    <>
      {mode === 'landing' && <Landing onModeSelect={handleModeSelect} />}
      {mode === 'teacher' && (
        <TeacherView onModeSelect={handleModeSelect} sessionCode={sessionCode} quizId={quizId} />
      )}
      {mode === 'student' && (
        <StudentView sessionCode={sessionCode} quizId={quizId} questions={quiz.questions || []} />
      )}
      {mode === 'results' && (
        <ResultsView
          sessionCode={sessionCode}
          quizId={quizId}
          questions={quiz.questions || []}
          onBack={() => handleModeSelect('teacher', sessionCode)}
        />
      )}
    </>
  );
};

export default QuizView;
