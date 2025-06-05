import { useEffect, useState } from 'react';
import { ref, onValue } from 'firebase/database';
import { database } from '../config/firebase';

export const useQuizData = (quizId) => {
  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!quizId || !database) {
      setLoading(false);
      return;
    }
    const qRef = ref(database, `quizzes/${quizId}`);
    const unsub = onValue(qRef, snap => {
      setQuiz(snap.val());
      setLoading(false);
    });
    return () => unsub();
  }, [quizId]);

  return { quiz, loading };
};
