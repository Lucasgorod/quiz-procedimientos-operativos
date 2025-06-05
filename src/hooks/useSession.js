import { useState, useEffect } from 'react';
import { ref, set, onValue, push, remove, get, update } from 'firebase/database';
import { database } from '../config/firebase';

export const useSession = (quizId, sessionCode) => {
  const [session, setSession] = useState(null);
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!sessionCode || !database || !quizId) {
      setLoading(false);
      return;
    }

    const sessionRef = ref(database, `sessions/${quizId}/${sessionCode}`);
    const unsubscribe = onValue(sessionRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setSession(data);
        const responsesArr = data.responses ? Object.values(data.responses) : [];
        responsesArr.sort((a, b) => (a.submittedAt || 0) - (b.submittedAt || 0));
        setResponses(responsesArr);
      } else {
        setSession(null);
        setResponses([]);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [quizId, sessionCode]);

  const createSession = async () => {
    const code = Math.random().toString(36).substring(2, 8).toUpperCase();
    
    if (database) {
      const sessionRef = ref(database, `sessions/${quizId}/${code}`);
      await set(sessionRef, {
        code,
        createdAt: Date.now(),
        status: 'active',
        responses: {}
      });
    }
    
    return code;
  };

  const submitResponse = async (studentName, answers) => {
    if (!database) return;

    const responsesRef = ref(database, `sessions/${quizId}/${sessionCode}/responses`);
    await push(responsesRef, {
      studentName,
      answers,
      submittedAt: Date.now()
    });
  };

  const clearSession = async () => {
    if (!database || !sessionCode) return;
    const sessionRef = ref(database, `sessions/${quizId}/${sessionCode}`);
    await remove(sessionRef);
  };

  const duplicateSession = async (newCode) => {
    if (!database || !sessionCode) return null;
    const srcRef = ref(database, `sessions/${quizId}/${sessionCode}`);
    const snapshot = await get(srcRef);
    if (!snapshot.exists()) return null;
    const data = snapshot.val();
    const targetCode = newCode || Math.random().toString(36).substring(2, 8).toUpperCase();
    const targetRef = ref(database, `sessions/${quizId}/${targetCode}`);
    await set(targetRef, { ...data, code: targetCode, createdAt: Date.now() });
    return targetCode;
  };

  const archiveSession = async () => {
    if (!database || !sessionCode) return;
    const sessionRef = ref(database, `sessions/${quizId}/${sessionCode}`);
    await update(sessionRef, { status: 'archived', archivedAt: Date.now() });
  };

  return {
    session,
    responses,
    loading,
    createSession,
    submitResponse,
    clearSession,
    duplicateSession,
    archiveSession
  };
};
