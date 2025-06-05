import React, { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { database } from '../config/firebase';
import { ref, onValue } from 'firebase/database';
import { Search } from 'lucide-react';

const Home = () => {
  const [quizzes, setQuizzes] = useState({});
  const [filter, setFilter] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (!database) return;
    const qRef = ref(database, 'quizzes');
    const unsub = onValue(qRef, snap => {
      setQuizzes(snap.val() || {});
    });
    return () => unsub();
  }, []);

  const filtered = useMemo(() => {
    if (!filter) return quizzes;
    const lower = filter.toLowerCase();
    return Object.fromEntries(
      Object.entries(quizzes).filter(([id, q]) =>
        q.title.toLowerCase().includes(lower)
      )
    );
  }, [filter, quizzes]);

  return (
    <div className="min-h-screen bg-black text-white p-4 space-y-6">
      <header className="text-center">
        <img src="/assets/itba-logo.png" alt="ITBA" className="w-40 mx-auto mb-4" />
        <h1 className="text-5xl font-semibold mb-4 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">Quizzes Disponibles</h1>
      </header>
      <div className="max-w-xl mx-auto">
        <div className="flex items-center bg-gray-900 rounded-full px-4 py-2 mb-6">
          <Search className="text-gray-500 mr-2" size={18} />
          <input
            type="text"
            className="flex-1 bg-transparent outline-none"
            placeholder="Buscar quiz"
            value={filter}
            onChange={e => setFilter(e.target.value)}
          />
        </div>
        <div className="grid gap-4">
          {Object.entries(filtered).map(([id, q]) => (
            <div key={id} className="card-dark p-4 flex justify-between items-center">
              <div>
                <h3 className="font-medium">{q.title}</h3>
                <p className="text-sm text-gray-400">{q.description}</p>
              </div>
              <button className="btn" onClick={() => navigate(`/quiz/${id}`)}>Abrir</button>
            </div>
          ))}
          {Object.keys(filtered).length === 0 && (
            <p className="text-center text-gray-500">No se encontraron quizzes</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
