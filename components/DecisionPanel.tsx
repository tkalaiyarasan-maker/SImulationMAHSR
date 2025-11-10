
import React from 'react';
import { Challenge, Option } from '../types';
import { CHALLENGES } from '../constants';

interface DecisionPanelProps {
  challenge: Challenge;
  challengeIndex: number;
  onDecision: (option: Option) => void;
  onBrainstorm: () => void;
  isBrainstorming: boolean;
  brainstormText: string;
  isDecisionPending: boolean;
}

const LoadingSpinner: React.FC = () => (
    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
);

const OptionButton: React.FC<{ option: Option; onClick: () => void; disabled: boolean }> = ({ option, onClick, disabled }) => (
    <button
        onClick={onClick}
        disabled={disabled}
        className="w-full text-left p-4 border border-gray-200 rounded-lg bg-white hover:bg-blue-50 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none hover:enabled:translate-y-[-2px] hover:enabled:shadow-lg"
    >
        <div className="font-bold text-gray-800">{option.label}</div>
        <div className="text-sm text-gray-600 mt-1">{option.impact}</div>
    </button>
);

const DecisionPanel: React.FC<DecisionPanelProps> = ({ challenge, challengeIndex, onDecision, onBrainstorm, isBrainstorming, brainstormText, isDecisionPending }) => {
  return (
    <div className="shadow-md rounded-xl bg-white p-6 md:p-8 border-t-4 border-blue-500">
        <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4">
            Stage {challengeIndex + 1}/{CHALLENGES.length}: {challenge.title}
        </h2>
        <p className="text-gray-700 mb-6">{challenge.description}</p>
        
        <button
            onClick={onBrainstorm}
            disabled={isBrainstorming || !isDecisionPending}
            className="w-full mt-4 py-3 px-4 bg-purple-600 text-white font-bold rounded-lg hover:bg-purple-700 transition duration-300 shadow-md flex items-center justify-center space-x-2 disabled:bg-purple-400 disabled:cursor-not-allowed"
        >
            {isBrainstorming ? <LoadingSpinner /> : null}
            <span>{isBrainstorming ? 'Analyzing...' : '✨ Get PM Brainstorm'}</span>
        </button>

        {brainstormText && (
            <div className="mt-4 p-4 bg-purple-50 border border-purple-300 rounded-lg">
                <h3 className="text-lg font-semibold text-purple-800 mb-2">AI Consultant Analysis</h3>
                <pre className="text-gray-700 whitespace-pre-wrap leading-relaxed font-sans">{brainstormText}</pre>
            </div>
        )}
        
        <div className="space-y-4 mt-6">
            {challenge.options.map((option, index) => (
                <OptionButton key={index} option={option} onClick={() => onDecision(option)} disabled={!isDecisionPending} />
            ))}
        </div>
    </div>
  );
};

export default DecisionPanel;
