import React from 'react';
import { useAuth } from '../../hooks/useAuth';

const LogoutButton = () => {
  const { logout } = useAuth();
  return (
    <button onClick={logout} className="text-sm text-gray-400 hover:underline">
      Cerrar sesión
    </button>
  );
};

export default LogoutButton;
