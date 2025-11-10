import React from 'react';
import { User } from '../types';

interface HeaderProps {
    user: User;
    onLogout: () => void;
    unreadEmailCount: number;
    onInboxOpen: () => void;
}

const Header: React.FC<HeaderProps> = ({ user, onLogout, unreadEmailCount, onInboxOpen }) => {
    return (
        <header className="bg-white shadow-md p-4 mb-8">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-blue-800">MAHSR: The Time Crunch Challenge</h1>
                    <p className="text-sm text-gray-500">Project Director Simulation</p>
                </div>
                <div className="flex items-center space-x-4">
                     <button onClick={onInboxOpen} className="relative p-2 rounded-full hover:bg-gray-100">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        {unreadEmailCount > 0 && (
                            <span className="absolute top-0 right-0 block h-5 w-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
                                {unreadEmailCount}
                            </span>
                        )}
                    </button>
                    <div className="text-right">
                        <p className="font-semibold text-gray-700">{user.name} ({user.id})</p>
                        <button
                            onClick={onLogout}
                            className="mt-1 text-sm font-medium text-red-500 hover:text-red-700 transition-colors"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;