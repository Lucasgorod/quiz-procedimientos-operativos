import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import Landing from './Landing';
import TeacherView from './TeacherView';
import StudentView from './StudentView';
import ResultsView from './ResultsView';
import { ref, get } from 'firebase/database';
import { database } from '../config/firebase';

const QuizView = () => {
  const { quizId } = useParams();
  const location = useLocation();
  const [mode, setMode] = useState('landing');
  const [sessionCode, setSessionCode] = useState('');
  const [questions, setQuestions] = useState([]);

  // parse session from query
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const sessionFromUrl = params.get('session');
    if (sessionFromUrl) {
      setSessionCode(sessionFromUrl);
      setMode('student');
    }
  }, [location.search]);

  useEffect(() => {
    const fetchQuiz = async () => {
      if (!database || !quizId) return;
      const quizRef = ref(database, `quizzes/${quizId}/questions`);
      const snap = await get(quizRef);
      const data = snap.val();
      if (data) {
        setQuestions(Object.values(data));
      }
    };
    fetchQuiz();
  }, [quizId]);

  const handleModeSelect = (newMode, code = '') => {
    setMode(newMode);
    if (code) setSessionCode(code);
  };

  return (
    <>
      {mode === 'landing' && <Landing onModeSelect={handleModeSelect} />}
      {mode === 'teacher' && (
        <TeacherView
          quizId={quizId}
          onModeSelect={handleModeSelect}
          sessionCode={sessionCode}
        />
      )}
      {mode === 'student' && (
        <StudentView quizId={quizId} sessionCode={sessionCode} questions={questions} />
      )}
      {mode === 'results' && (
        <ResultsView
          quizId={quizId}
          sessionCode={sessionCode}
          questions={questions}
          onBack={() => handleModeSelect('teacher', sessionCode)}
        />
      )}
    </>
  );
};

export default QuizView;
