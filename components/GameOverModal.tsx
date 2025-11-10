import React from 'react';
import { TOTAL_MONTHS } from '../constants';

interface GameOverModalProps {
    totalDelayDays: number;
    costOverrun: number;
    reportText: string;
    isGeneratingReport: boolean;
    onRestart: () => void; // Changed from window.reload
}

const GameOverModal: React.FC<GameOverModalProps> = ({ totalDelayDays, costOverrun, reportText, isGeneratingReport, onRestart }) => {

    let outcome;
    let verdictClass;

    if (totalDelayDays < -30) {
        outcome = "Exceptional Performance! You finished AHEAD of the original target schedule (48 Months). A remarkable feat under intense pressure!";
        verdictClass = "bg-green-100 text-green-700";
    } else if (totalDelayDays < 120) {
        outcome = "Excellent Performance! The project finished with a manageable time extension, demonstrating effective crisis management and resilience.";
        verdictClass = "bg-yellow-100 text-yellow-700";
    } else {
        outcome = "Significant Extension Required. The cumulative challenges led to major project delays, requiring formal claims for time extension and facing potential cost penalties.";
        verdictClass = "bg-red-100 text-red-700";
    }

    const finalDurationMonths = ((TOTAL_MONTHS * 30.4375) + totalDelayDays) / 30.4375;

    return (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center p-4 z-50">
            <div className="bg-white p-8 md:p-10 rounded-xl shadow-2xl max-w-xl w-full transform transition-all duration-300 scale-100">
                <h2 className="text-3xl font-bold text-blue-800 mb-4 text-center">Project Completion Report</h2>
                <div className="text-gray-700 space-y-2 mb-6">
                    <p><strong>Original Target Duration:</strong> {TOTAL_MONTHS} Months</p>
                    <p><strong>Total Delay Incurred:</strong> <span className={`font-bold ${totalDelayDays >= 0 ? 'text-red-600' : 'text-green-600'}`}>{totalDelayDays.toLocaleString()} Days</span></p>
                    <p><strong>Estimated Final Duration:</strong> {finalDurationMonths.toFixed(1)} Months</p>
                    <p><strong>Total Cost Overrun (Cumulative):</strong> <span className={`font-bold ${costOverrun > 0 ? 'text-red-600' : 'text-green-600'}`}>₹{costOverrun.toLocaleString()} Cr</span></p>
                </div>
                <div className={`p-4 rounded-lg text-center font-bold text-xl mb-4 ${verdictClass}`}>{outcome}</div>

                {isGeneratingReport ? (
                    <div className="p-3 bg-blue-100 text-blue-800 rounded-lg font-medium text-center mb-4">
                        Generating final analysis report...
                    </div>
                ) : (
                    <div className="p-3 bg-green-100 text-green-800 rounded-lg font-medium text-center mb-4">
                        <p className="font-bold">Report Generation Complete.</p>
                        <p className="text-sm mt-1">Report successfully prepared. Displayed below for review.</p>
                    </div>
                )}
                
                {reportText && (
                    <div className="bg-gray-100 p-4 rounded-lg border border-gray-300 max-h-60 overflow-y-auto">
                        <h3 className="text-lg font-semibold text-gray-700 mb-2">Final Project Report</h3>
                        <pre className="text-gray-800 text-sm leading-relaxed whitespace-pre-wrap font-sans">{reportText}</pre>
                    </div>
                )}

                <button
                    onClick={onRestart} // Use the prop here
                    className="w-full mt-6 py-3 px-4 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition duration-300"
                >
                    Return to Login
                </button>
            </div>
        </div>
    );
};

export default GameOverModal;
