import React, { useState, useEffect } from 'react';
import { SimulationResult } from '../types';

interface AdminDashboardProps {
    onLogout: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onLogout }) => {
    const [results, setResults] = useState<SimulationResult[]>([]);

    useEffect(() => {
        try {
            const storedResults = localStorage.getItem('simulationResults');
            if (storedResults) {
                setResults(JSON.parse(storedResults));
            }
        } catch (error) {
            console.error("Failed to load simulation results:", error);
            setResults([]);
        }
    }, []);

    return (
        <div className="max-w-6xl mx-auto p-4 md:p-8">
            <header className="flex justify-between items-center mb-8">
                <h1 className="text-3xl md:text-4xl font-extrabold text-blue-800">Admin Dashboard</h1>
                <button
                    onClick={onLogout}
                    className="px-4 py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition-colors"
                >
                    Logout
                </button>
            </header>

            <div className="bg-white p-6 rounded-xl shadow-lg overflow-x-auto">
                <h2 className="text-xl font-bold text-gray-700 mb-4">Simulation Results</h2>
                {results.length === 0 ? (
                    <p className="text-gray-500">No simulation results have been recorded yet.</p>
                ) : (
                    <table className="w-full text-sm text-left text-gray-500">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-100">
                            <tr>
                                <th scope="col" className="px-6 py-3">Date</th>
                                <th scope="col" className="px-6 py-3">Name</th>
                                <th scope="col" className="px-6 py-3">PS Number</th>
                                <th scope="col" className="px-6 py-3">Delay (Days)</th>
                                <th scope="col" className="px-6 py-3">Cost Overrun (Cr)</th>
                                <th scope="col" className="px-6 py-3">Outcome</th>
                            </tr>
                        </thead>
                        <tbody>
                            {results.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).map((result, index) => (
                                <tr key={index} className="bg-white border-b hover:bg-gray-50">
                                    <td className="px-6 py-4">{new Date(result.date).toLocaleString()}</td>
                                    <td className="px-6 py-4 font-medium text-gray-900">{result.userName}</td>
                                    <td className="px-6 py-4">{result.userId}</td>
                                    <td className={`px-6 py-4 font-semibold ${result.totalDelayDays > 0 ? 'text-red-600' : 'text-green-600'}`}>{result.totalDelayDays}</td>
                                    <td className={`px-6 py-4 font-semibold ${result.costOverrun > 0 ? 'text-red-600' : 'text-green-600'}`}>₹{result.costOverrun.toLocaleString()}</td>
                                    <td className="px-6 py-4">{result.outcome}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default AdminDashboard;