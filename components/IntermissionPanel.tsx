
import React, { useMemo } from 'react';
import { PM_TIPS } from '../constants';

interface IntermissionPanelProps {
  timer: number;
}

const IntermissionPanel: React.FC<IntermissionPanelProps> = ({ timer }) => {
  const tip = useMemo(() => PM_TIPS[Math.floor(Math.random() * PM_TIPS.length)], []);

  return (
    <div className="shadow-md rounded-xl bg-indigo-50 p-6 md:p-8 border-t-4 border-indigo-500 text-center">
      <h2 className="text-3xl font-extrabold text-indigo-700 mb-4">Intermission: Stage Break!</h2>
      <p className="text-xl text-indigo-600 mb-6">Next Challenge in...</p>
      <p className="text-7xl font-mono font-extrabold text-indigo-900 mb-6">{timer}</p>
      <div className="bg-indigo-100 p-4 rounded-lg border border-indigo-200">
        <p className="text-sm text-indigo-500 font-semibold mb-1">Project Management Tip:</p>
        <p className="text-lg font-medium text-indigo-800" dangerouslySetInnerHTML={{ __html: tip }}></p>
      </div>
    </div>
  );
};

export default IntermissionPanel;
