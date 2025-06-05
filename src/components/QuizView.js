import React, { useEffect, useState } from 'react';
import { ref, onValue } from 'firebase/database';
import { database } from '../config/firebase';
import { useParams } from 'react-router-dom';

const QuizView = () => {
  const { id } = useParams();
  const [quiz, setQuiz] = useState(null);

  useEffect(() => {
    if (!database) return;
    const qRef = ref(database, `quizzes/${id}`);
    const unsub = onValue(qRef, snap => {
      setQuiz(snap.val());
    });
    return () => unsub();
  }, [id]);

  if (!quiz) return <p className="p-4">Cargando...</p>;

  return (
    <div className="p-4 max-w-3xl mx-auto space-y-4">
      <h1 className="text-2xl font-bold">{quiz.title}</h1>
      {quiz.questions && quiz.questions.map((q,idx)=>(
        <div key={idx} className="border p-2 rounded">
          <p className="font-medium">{q.title}</p>
          <p className="text-sm text-gray-600">{q.subtitle}</p>
        </div>
      ))}
    </div>
  );
};

export default QuizView;
