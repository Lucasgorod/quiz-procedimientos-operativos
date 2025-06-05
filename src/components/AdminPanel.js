import React, { useEffect, useState } from 'react';
import { ref, onValue, set } from 'firebase/database';
import { database } from '../config/firebase';
import { useAuth } from '../hooks/useAuth';
import { Link } from 'react-router-dom';

const emptyQuestion = {
  id: '',
  type: 'trueFalse',
  title: '',
  subtitle: '',
  options: []
};

const AdminPanel = () => {
  const { user, signIn, signOut } = useAuth();
  const [quizzes, setQuizzes] = useState({});
  const [editingId, setEditingId] = useState(null);
  const [quizData, setQuizData] = useState({ title: '', questions: [] });

  useEffect(() => {
    if (!database) return;
    const qRef = ref(database, 'quizzes');
    const unsub = onValue(qRef, (snap) => {
      setQuizzes(snap.val() || {});
    });
    return () => unsub();
  }, []);

  const startNew = () => {
    setEditingId('');
    setQuizData({ title: '', questions: [ { ...emptyQuestion } ] });
  };

  const editQuiz = (id) => {
    setEditingId(id);
    const data = quizzes[id];
    if (data) setQuizData(data);
  };

  const addQuestion = () => {
    setQuizData({ ...quizData, questions: [...quizData.questions, { ...emptyQuestion }] });
  };

  const saveQuiz = async () => {
    if (!database) return;
    const id = editingId || quizData.slug || quizData.title.toLowerCase().replace(/\s+/g,'-');
    const quizRef = ref(database, `quizzes/${id}`);
    await set(quizRef, quizData);
    setEditingId(null);
    alert(`Quiz guardado en /quiz/${id}`);
  };

  if (!user) {
    return (
      <div className="p-4 text-center">
        <button onClick={signIn} className="bg-blue-500 text-white px-4 py-2 rounded">Iniciar sesión con Google</button>
      </div>
    );
  }

  return (
    <div className="p-4 max-w-4xl mx-auto space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Panel de Administración</h1>
        <button onClick={signOut} className="text-sm text-blue-500">Cerrar sesión</button>
      </div>

      {!editingId && editingId !== '' && (
        <div>
          <button onClick={startNew} className="bg-green-500 text-white px-4 py-2 rounded">Nuevo Quiz</button>
          <ul className="mt-4 space-y-2">
            {Object.entries(quizzes).map(([id, q]) => (
              <li key={id} className="flex justify-between bg-gray-100 p-2 rounded">
                <span>{q.title}</span>
                <div>
                  <button onClick={() => editQuiz(id)} className="text-blue-500 mr-2">Editar</button>
                  <Link to={`/quiz/${id}`} className="text-green-500" target="_blank">Ver</Link>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {(editingId || editingId === '') && (
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Título"
            value={quizData.title}
            onChange={(e) => setQuizData({ ...quizData, title: e.target.value })}
            className="w-full border p-2"
          />
          <input
            type="text"
            placeholder="Slug opcional"
            value={quizData.slug || ''}
            onChange={(e) => setQuizData({ ...quizData, slug: e.target.value })}
            className="w-full border p-2"
          />

          {quizData.questions.map((q, idx) => (
            <div key={idx} className="border p-2 rounded space-y-2">
              <input
                type="text"
                placeholder="ID"
                value={q.id}
                onChange={(e) => {
                  const qs = [...quizData.questions];
                  qs[idx].id = e.target.value;
                  setQuizData({ ...quizData, questions: qs });
                }}
                className="w-full border p-1"
              />
              <select
                value={q.type}
                onChange={(e) => {
                  const qs = [...quizData.questions];
                  qs[idx].type = e.target.value;
                  setQuizData({ ...quizData, questions: qs });
                }}
                className="w-full border p-1"
              >
                <option value="trueFalse">Verdadero/Falso</option>
                <option value="multiple">Opción Múltiple</option>
                <option value="match">Relacionar</option>
                <option value="open">Abierta</option>
                <option value="fill">Completar</option>
              </select>
              <input
                type="text"
                placeholder="Título"
                value={q.title}
                onChange={(e) => {
                  const qs = [...quizData.questions];
                  qs[idx].title = e.target.value;
                  setQuizData({ ...quizData, questions: qs });
                }}
                className="w-full border p-1"
              />
              <input
                type="text"
                placeholder="Subtítulo"
                value={q.subtitle}
                onChange={(e) => {
                  const qs = [...quizData.questions];
                  qs[idx].subtitle = e.target.value;
                  setQuizData({ ...quizData, questions: qs });
                }}
                className="w-full border p-1"
              />
              {/* Options for types that require them */}
              {(q.type === 'trueFalse' || q.type === 'multiple') && (
                <textarea
                  placeholder="Opciones (una por línea, prefijar con * la correcta)"
                  value={(q.options || []).map((o) => `${o.correct ? '*' : ''}${o.text}`).join('\n')}
                  onChange={(e) => {
                    const lines = e.target.value.split(/\n+/).filter(Boolean);
                    const opts = lines.map((l,i)=>({id:String.fromCharCode(65+i), text:l.replace(/^\*/,''), correct:l.startsWith('*')}));
                    const qs = [...quizData.questions];
                    qs[idx].options = opts;
                    setQuizData({ ...quizData, questions: qs });
                  }}
                  className="w-full border p-1"
                />
              )}
            </div>
          ))}
          <button onClick={addQuestion} className="bg-gray-200 px-3 py-1 rounded">Agregar Pregunta</button>
          <div>
            <button onClick={saveQuiz} className="bg-blue-500 text-white px-4 py-2 rounded mr-2">Guardar</button>
            <button onClick={() => setEditingId(null)} className="bg-gray-300 px-4 py-2 rounded">Cancelar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
