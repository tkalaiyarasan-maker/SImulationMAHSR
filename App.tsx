import React, { useState, useCallback } from 'react';
import { User, SimulationResult } from './types';
import LoginPage from './components/LoginPage';
import Simulation from './components/Simulation';
import AdminDashboard from './components/AdminDashboard';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);

  const handleLogin = (loggedInUser: User) => {
    setUser(loggedInUser);
  };

  const handleLogout = () => {
    setUser(null);
  };

  const handleSimulationComplete = useCallback((result: Omit<SimulationResult, 'userName' | 'userId' | 'date'>) => {
    if (!user || user.role !== 'guest') return;

    const newResult: SimulationResult = {
      ...result,
      userName: user.name,
      userId: user.id,
      date: new Date().toISOString(),
    };

    try {
      const existingResults: SimulationResult[] = JSON.parse(localStorage.getItem('simulationResults') || '[]');
      localStorage.setItem('simulationResults', JSON.stringify([...existingResults, newResult]));
    } catch (error) {
      console.error("Failed to save simulation results:", error);
    }
  }, [user]);

  if (!user) {
    return <LoginPage onLogin={handleLogin} />;
  }

  if (user.role === 'admin') {
    return <AdminDashboard onLogout={handleLogout} />;
  }

  // user.role === 'guest'
  return <Simulation user={user} onComplete={handleSimulationComplete} onLogout={handleLogout} />;
};

export default App;
