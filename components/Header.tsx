import React from 'react';
import { User } from '../types';

interface HeaderProps {
  user: User;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ user, onLogout }) => {
  return (
    <>
      <header className="text-center mb-2">
        <h1 className="text-3xl md:text-4xl font-extrabold text-blue-800">MAHSR: The Time Crunch Challenge</h1>
        <p className="text-lg text-gray-600">Simulate Project Director Decisions (Dec 2020 - Dec 2024)</p>
      </header>
      <div className="flex justify-between items-center mb-8 bg-white p-2 px-4 rounded-lg shadow-sm">
        <p className="text-sm text-gray-700">Welcome, <span className="font-bold text-blue-700">{user.name}</span> (PS Number: {user.id})</p>
        <button
          onClick={onLogout}
          className="px-3 py-1 bg-red-500 text-white text-sm font-semibold rounded-md hover:bg-red-600 transition-colors"
        >
          End Simulation
        </button>
      </div>
    </>
  );
};

export default Header;