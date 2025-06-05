import React, { useEffect, useState, useCallback } from 'react';
import { database } from '../config/firebase';
import { ref, onValue, set, push } from 'firebase/database';
import { useAuth } from '../hooks/useAuth';
import { QUIZ_TYPES, DEFAULT_QUIZ } from '../utils/constants';
import { FilePlus, Eye, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const emptyQuestion = { id: '', type: QUIZ_TYPES.TRUE_FALSE, title: '', subtitle: '', text: '', options: [], definitions: [], pairs: [] };

const AdminPanel = () => {
  const { user, signIn, signOut } = useAuth();
  const [quizzes, setQuizzes] = useState({});
  const [quiz, setQuiz] = useState(DEFAULT_QUIZ);
  const [editingId, setEditingId] = useState(null);
  const [status, setStatus] = useState('idle'); // idle | saving | saved

  // load quizzes
  useEffect(() => {
    if (!database) return;
    const qRef = ref(database, 'quizzes');
    const unsub = onValue(qRef, snap => {
      setQuizzes(snap.val() || {});
    });
    return () => unsub();
  }, []);

  // auto save
  useEffect(() => {
    if (!editingId) return;
    const interval = setInterval(() => {
      handleSave();
    }, 30000);
    return () => clearInterval(interval);
  }, [editingId, quiz]);

  const startNew = () => {
    setEditingId(push(ref(database, 'quizzes')).key);
    setQuiz({ ...DEFAULT_QUIZ, questions: [{ ...emptyQuestion }] });
  };

  const editQuiz = (id) => {
    const data = quizzes[id];
    if (data) {
      setEditingId(id);
      setQuiz({ ...DEFAULT_QUIZ, ...data });
    }
  };

  const handleSave = useCallback(async () => {
    if (!database || !editingId) return;
    if (!quiz.title || quiz.questions.length === 0) {
      alert('El quiz debe tener título y al menos una pregunta');
      return;
    }
    setStatus('saving');
    try {
      await set(ref(database, `quizzes/${editingId}`), {
        ...quiz,
        updatedAt: Date.now(),
        id: editingId
      });
      setStatus('saved');
      setTimeout(() => setStatus('idle'), 2000);
    } catch (error) {
      console.error('Error guardando:', error);
      alert('Error al guardar el quiz');
      setStatus('idle');
    }
  }, [editingId, quiz]);

  const updateQuestion = (idx, field, value) => {
    const qs = [...quiz.questions];
    qs[idx] = { ...qs[idx], [field]: value };
    setQuiz({ ...quiz, questions: qs });
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white p-4">
        <button onClick={signIn} className="btn">Iniciar sesión</button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-4 space-y-6">
      <header className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Panel de Administración</h1>
        <div className="flex items-center gap-3">
          <button onClick={startNew} className="btn flex items-center gap-2"><FilePlus size={16}/>Nuevo</button>
          <button onClick={signOut} className="btn">Salir</button>
        </div>
      </header>

      {!editingId && (
        <div className="space-y-4">
          {Object.entries(quizzes).length === 0 && <p>No hay quizzes</p>}
          <ul className="space-y-2">
            {Object.entries(quizzes).map(([id, q]) => (
              <li key={id} className="flex justify-between bg-gray-900 p-3 rounded-md items-center">
                <span>{q.title}</span>
                <div className="flex gap-2">
                  <button className="btn" onClick={() => editQuiz(id)}>Editar</button>
                  <Link className="btn" to={`/quiz/${id}`} target="_blank"><Eye size={16}/></Link>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {editingId && (
        <div className="space-y-4">
          <input
            className="input-field w-full"
            placeholder="Título del quiz"
            value={quiz.title}
            onChange={e => setQuiz({ ...quiz, title: e.target.value })}
          />
          {quiz.questions.map((q, idx) => (
            <div key={idx} className="card-dark space-y-2 p-4">
              <input
                className="input-field w-full"
                placeholder="Título de la pregunta"
                value={q.title}
                onChange={e => updateQuestion(idx, 'title', e.target.value)}
              />
              <select
                className="input-field w-full"
                value={q.type}
                onChange={e => updateQuestion(idx, 'type', e.target.value)}
              >
                {Object.values(QUIZ_TYPES).map(t => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>
          ))}
          <button className="btn" onClick={() => setQuiz({ ...quiz, questions: [...quiz.questions, { ...emptyQuestion }] })}>Agregar pregunta</button>
          <div className="flex gap-3 items-center">
            <button className="btn" onClick={handleSave}>Guardar</button>
            {status === 'saving' && <Loader2 className="animate-spin" />}
            {status === 'saved' && <span className="text-green-500">Guardado</span>}
            <button className="btn" onClick={() => setEditingId(null)}>Volver</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
