import { useEffect, useState } from 'react';
import { signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';
import { auth, googleProvider } from '../config/firebase';

export const useAuth = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (!auth) return;
    const unsub = onAuthStateChanged(auth, (u) => setUser(u));
    return () => unsub();
  }, []);

  const signIn = async () => {
    if (!auth) return;
    await signInWithPopup(auth, googleProvider);
  };

  const signOutUser = async () => {
    if (!auth) return;
    await signOut(auth);
  };

  return { user, signIn, signOut: signOutUser };
};
