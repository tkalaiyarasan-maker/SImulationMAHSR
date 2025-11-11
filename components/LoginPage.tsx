import React, { useState } from 'react';
import { User } from '../types';
import { validateAuthKey } from '../services/keyService';

interface LoginPageProps {
    onLogin: (user: User) => void;
}

const ADMIN_PASSWORD = 'Tka@2qwerty'; // Hardcoded for simplicity

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
    const [name, setName] = useState('');
    const [id, setId] = useState('');
    const [key, setKey] = useState('');
    const [adminPassword, setAdminPassword] = useState('');
    const [error, setError] = useState('');

    const handleGuestLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        if (!name.trim() || !id.trim() || !key.trim()) {
            setError('Please provide Name, PS Number, and a valid Key.');
            return;
        }

        try {
            const { isValid, message } = await validateAuthKey(key.trim());
            if (isValid) {
                onLogin({ name, id, role: 'guest' });
            } else {
                setError(message);
            }
        } catch (err) {
            console.error("Failed to validate key:", err);
            setError('An error occurred during key validation.');
        }
    };

    const handleAdminLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        if (adminPassword === ADMIN_PASSWORD) {
            onLogin({ name: 'Admin', id: 'admin', role: 'admin' });
        } else {
            setError('Incorrect admin password.');
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4 md:p-8">
            <div className="max-w-7xl w-full space-y-6">
                <header className="text-center">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-blue-800">MAHSR: The Time Crunch Challenge</h1>
                    <p className="text-xl text-gray-600 mt-2">Project Director Simulation</p>
                </header>

                {error && <p className="text-center text-red-500 bg-red-100 p-3 rounded-md max-w-lg mx-auto">{error}</p>}

                <div className="grid md:grid-cols-5 gap-8 items-start">
                    {/* Project Overview Section (Left Column) */}
                    <div className="md:col-span-3 bg-white p-8 rounded-xl shadow-lg border border-gray-200">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">Project Overview</h2>
                        <div className="text-gray-700 space-y-4 text-justify pr-4">
                            <p>
                                The Mumbai–Ahmedabad High-Speed Rail (MAHSR), widely known as the Bullet Train Project, is India’s first high-speed rail corridor, spanning approximately 508 km between Mumbai in Maharashtra and Ahmedabad in Gujarat, designed for speeds up to 320 km/h. The project is being implemented by the National High Speed Rail Corporation Limited (NHSRCL) with technical and financial assistance from the Japan International Cooperation Agency (JICA). Among the several civil packages, Package C4 is the largest, covering nearly 237 km, accounting for about 47% of the total route. The contract, valued at approximately ₹25,000 crore, was awarded to Larsen & Toubro (L&T) under a Design and Build (D&B) format, and the work commenced in December 2020.
                            </p>
                            <p>
                                From an engineering perspective, this package features advanced Full Span Launching Method (FSLM) technology, enabling rapid and precise construction of high-speed rail viaducts. The alignment is designed to meet stringent tolerances for 320 km/h operation, incorporating seismic design standards compliant with Japanese norms. A Task Force Level (TFL) coordination structure was established at an early stage to integrate Design, Construction, Planning, and Cost Control teams, ensuring seamless communication and swift decision-making. Innovative practices such as digital project monitoring platforms, automated precast yard operations, and gantry-based full-span erection systems have significantly enhanced quality and execution efficiency.
                            </p>
                            <p>
                                Despite the technological and organizational advancements, Package C4 faced multiple delays due to interlinked technical, administrative, and environmental factors. The most significant contributors were delays in land acquisition and site access (up to 1078 days), hindrances within the Right of Way, and obstructions caused by DFCC material near the Surat Depot. Further disruptions arose from local encumbrances, utility shifting delays, and frequent design revisions. A large number of delay events were linked to Engineer’s directions and approvals, particularly concerning unconfirmed bearing capacities (UBC), ground condition mismatches, foundation design revisions, and reissued drawings for river bridges such as Tapi, Narmada, and Kolak.
                            </p>
                            <p>
                                Natural events such as Cyclone Tauktae, intense monsoon rains, and the COVID-19 second and third waves added to the setbacks. Global supply chain disruptions, including floods and port congestion in China, delayed the delivery of of essential FSLM moulds and launching equipment. Additionally, interfacing issues with adjacent contractors (P1B/C and E1), pipeline infringements, and design modifications at depots and approach lines led to further delays. Architectural and finishing works at Surat, Bilimora, and Vapi Stations also faced delays due to mock-up reviews, aesthetic revisions, and slow approvals for elements like façades, flooring, cladding, and fire systems. Other contributing factors included PSD (Platform Screen Door) integration, rolling stock interfacing, and variation instructions for noise barriers and depot facilities.
                            </p>
                             <p>
                                In total, the project experienced a range of delay durations, from short-term hold-ups to extended impacts exceeding 1000 days, primarily driven by site handover constraints, design revisions, delayed approvals, coordination bottlenecks, and climatic challenges. However, through proactive steps such as TFL-based coordination, fast-tracked design approvals, and parallel execution strategies, the project has managed to maintain steady progress while ensuring adherence to high-speed rail standards and quality benchmarks.
                            </p>
                        </div>
                    </div>

                    {/* Login Forms (Right Column) */}
                    <div className="md:col-span-2 space-y-8">
                        {/* Guest Login */}
                        <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200">
                            <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">Guest Login</h2>
                            <form onSubmit={handleGuestLogin} className="space-y-6">
                                <div>
                                    <label htmlFor="name" className="text-sm font-medium text-gray-700">Your Name</label>
                                    <input
                                        id="name"
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="e.g., Jane Doe"
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="id" className="text-sm font-medium text-gray-700">PS Number</label>
                                    <input
                                        id="id"
                                        type="text"
                                        value={id}
                                        onChange={(e) => setId(e.target.value)}
                                        className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="e.g., LNT12345"
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="key" className="text-sm font-medium text-gray-700">Key</label>
                                    <input
                                        id="key"
                                        type="text"
                                        value={key}
                                        onChange={(e) => setKey(e.target.value)}
                                        className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="Enter the access key from the admin"
                                        required
                                    />
                                </div>
                                <button type="submit" className="w-full py-3 px-4 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition duration-300">
                                    Start Simulation
                                </button>
                            </form>
                        </div>

                        {/* Admin Login */}
                        <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200">
                            <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">Admin Login</h2>
                            <form onSubmit={handleAdminLogin} className="space-y-6">
                                <div>
                                    <label htmlFor="admin-password" className="text-sm font-medium text-gray-700">Password</label>
                                    <input
                                        id="admin-password"
                                        type="password"
                                        value={adminPassword}
                                        onChange={(e) => setAdminPassword(e.target.value)}
                                        className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
                                        placeholder="Enter admin password"
                                        required
                                    />
                                </div>
                                <button type="submit" className="w-full py-3 px-4 bg-purple-600 text-white font-bold rounded-lg hover:bg-purple-700 transition duration-300">
                                    View Dashboard
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;