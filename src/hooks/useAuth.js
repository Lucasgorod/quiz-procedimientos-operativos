import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth, database } from '../config/firebase';
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut
} from 'firebase/auth';
import { onValue, ref, set } from 'firebase/database';

const AuthContext = createContext({ user: null });

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!auth) {
      setLoading(false);
      return;
    }
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
    });
    return unsub;
  }, []);

  useEffect(() => {
    if (!database) return;
    const adminRef = ref(database, 'admins');
    const unsub = onValue(adminRef, (snap) => {
      const data = snap.val() || {};
      setAdmins(Object.keys(data));
    });
    return unsub;
  }, []);

  const login = async () => {
    if (!auth) return;
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    if (database && admins.length === 0) {
      const adminRef = ref(database, `admins/${result.user.uid}`);
      await set(adminRef, true);
    }
  };

  const logout = async () => {
    if (!auth) return;
    await signOut(auth);
  };

  const isAdmin = user && admins.includes(user.uid);

  return (
    <AuthContext.Provider value={{ user, login, logout, isAdmin, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
