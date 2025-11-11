import React, { useState, useEffect } from 'react';
import { SimulationResult, AuthKey } from '../types';

interface AdminDashboardProps {
    onLogout: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onLogout }) => {
    const [results, setResults] = useState<SimulationResult[]>([]);
    const [keys, setKeys] = useState<AuthKey[]>([]);

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

        try {
            const storedKeys: AuthKey[] = JSON.parse(localStorage.getItem('authKeys') || '[]');
            const activeKeys = storedKeys.filter(k => Date.now() < k.expiresAt);
            setKeys(activeKeys);
            if (activeKeys.length < storedKeys.length) {
                localStorage.setItem('authKeys', JSON.stringify(activeKeys)); // Clean up expired keys
            }
        } catch (error) {
            console.error("Failed to load auth keys:", error);
            setKeys([]);
        }
    }, []);

    const generateRandomKey = (): string => {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let result = '';
        for (let i = 0; i < 6; i++) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return result;
    };

    const handleGenerateKey = () => {
        const newKeyString = generateRandomKey();
        const now = Date.now();
        const newKey: AuthKey = {
            key: newKeyString,
            createdAt: now,
            expiresAt: now + 48 * 60 * 60 * 1000, // 48 hours in milliseconds
        };
        const updatedKeys = [...keys, newKey];
        setKeys(updatedKeys);
        localStorage.setItem('authKeys', JSON.stringify(updatedKeys));
    };

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

            <div className="bg-white p-6 rounded-xl shadow-lg mt-8">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-gray-700">Access Key Management</h2>
                    <button
                        onClick={handleGenerateKey}
                        className="px-4 py-2 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition-colors"
                    >
                        Generate New Key
                    </button>
                </div>
                {keys.length === 0 ? (
                    <p className="text-gray-500">No active keys. Generate one to allow guest access.</p>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left text-gray-500">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-100">
                                <tr>
                                    <th scope="col" className="px-6 py-3">Key</th>
                                    <th scope="col" className="px-6 py-3">Created At</th>
                                    <th scope="col" className="px-6 py-3">Expires At</th>
                                    <th scope="col" className="px-6 py-3">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {keys.sort((a,b) => b.createdAt - a.createdAt).map((k) => (
                                    <tr key={k.key} className="bg-white border-b hover:bg-gray-50">
                                        <td className="px-6 py-4 font-mono font-bold text-gray-900">{k.key}</td>
                                        <td className="px-6 py-4">{new Date(k.createdAt).toLocaleString()}</td>
                                        <td className="px-6 py-4">{new Date(k.expiresAt).toLocaleString()}</td>
                                        <td className="px-6 py-4">
                                            <span className="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-full">
                                                Active
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminDashboard;