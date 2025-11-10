import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { User, Option, HistoryEntry, SimulationResult, Challenge, Email, EmailEvent } from '../types';
import { CHALLENGES, TOTAL_MONTHS, INTERMISSION_DURATION, START_YEAR, START_MONTH_INDEX, MONTH_NAMES, COST_RATE_PER_DAY_SAVED, EMAIL_EVENTS } from '../constants';
import { getPmBrainstorm, generateFinalReport } from '../services/geminiService';
import Dashboard from './Dashboard';
import Charts from './Charts';
import DecisionPanel from './DecisionPanel';
import IntermissionPanel from './IntermissionPanel';
import GameOverModal from './GameOverModal';
import Header from './Header';
import EmailInboxModal from './EmailInboxModal';

interface SimulationProps {
  user: User;
  onComplete: (result: Omit<SimulationResult, 'userName' | 'userId' | 'date'>) => void;
  onLogout: () => void;
}

const Simulation: React.FC<SimulationProps> = ({ user, onComplete, onLogout }) => {
    const [challenges] = useState(() => [...CHALLENGES]); // No longer shuffling
    const [challengeIndex, setChallengeIndex] = useState(0);
    const [currentMonth, setCurrentMonth] = useState(0);
    const [totalDelayDays, setTotalDelayDays] = useState(0);
    const [costOverrun, setCostOverrun] = useState(0);
    const [history, setHistory] = useState<HistoryEntry[]>([{ round: 0, label: 'Start', delay: 0, cost: 0 }]);
    const [isDecisionPending, setIsDecisionPending] = useState(true);
    const [isIntermission, setIsIntermission] = useState(false);
    const [intermissionTimer, setIntermissionTimer] = useState(INTERMISSION_DURATION);
    const [isGameOver, setIsGameOver] = useState(false);
    const [isBrainstorming, setIsBrainstorming] = useState(false);
    const [brainstormText, setBrainstormText] = useState('');
    const [isGeneratingReport, setIsGeneratingReport] = useState(false);
    const [reportText, setReportText] = useState('');

    // --- New State for Email Feature ---
    const [isEmailPhase, setIsEmailPhase] = useState(false);
    const [currentEmailEvent, setCurrentEmailEvent] = useState<EmailEvent | null>(null);
    const [emailsToReply, setEmailsToReply] = useState<Email[]>([]);
    const [repliedEmails, setRepliedEmails] = useState<Email[]>([]);
    const [emailResultMessage, setEmailResultMessage] = useState<string | null>(null);

    const currentChallenge = useMemo(() => challenges[challengeIndex], [challengeIndex, challenges]);

    const timeDisplay = useMemo(() => {
        const totalMonths = START_MONTH_INDEX + currentMonth;
        const year = START_YEAR + Math.floor(totalMonths / 12);
        const month = totalMonths % 12;
        return `${MONTH_NAMES[month]} ${year}`;
    }, [currentMonth]);

    const targetProgress = useMemo(() => Math.min(100, Math.round((currentMonth / TOTAL_MONTHS) * 100)), [currentMonth]);

    useEffect(() => {
        if (currentChallenge) {
            setCurrentMonth(currentChallenge.month);
        }
    }, [currentChallenge]);

    useEffect(() => {
        if (isIntermission) {
            if (intermissionTimer > 0) {
                const timerId = setTimeout(() => setIntermissionTimer(intermissionTimer - 1), 1000);
                return () => clearTimeout(timerId);
            } else {
                setIsIntermission(false);
                setIntermissionTimer(INTERMISSION_DURATION);
                if (challengeIndex + 1 < challenges.length) {
                    setChallengeIndex(challengeIndex + 1);
                    setIsDecisionPending(true);
                    setBrainstormText('');
                } else {
                    setIsGameOver(true);
                }
            }
        }
    }, [isIntermission, intermissionTimer, challengeIndex, challenges.length]);

    useEffect(() => {
        if (isGameOver) {
            const generateReport = async () => {
                setIsGeneratingReport(true);
                const report = await generateFinalReport(totalDelayDays, costOverrun);
                setReportText(report);
                setIsGeneratingReport(false);
                let outcome = "Significant Extension Required";
                if (totalDelayDays < -30) outcome = "Exceptional Performance";
                else if (totalDelayDays < 120) outcome = "Excellent Performance";
                onComplete({ totalDelayDays, costOverrun, outcome });
            };
            generateReport();
        }
    }, [isGameOver, totalDelayDays, costOverrun, onComplete]);
    
    const startEmailPhase = (event: EmailEvent) => {
        setCurrentEmailEvent(event);
        setEmailsToReply(event.emails);
        setRepliedEmails([]);
        setEmailResultMessage(null);
        setIsEmailPhase(true);
    };

    const handleDecision = (option: Option) => {
        if (!isDecisionPending) return;
        setIsDecisionPending(false);

        let costAdjustment = 0;
        if (option.delay < 0) {
            costAdjustment = Math.abs(option.delay) * COST_RATE_PER_DAY_SAVED;
        }

        const newDelay = totalDelayDays + option.delay;
        const newCost = costOverrun + option.cost - costAdjustment;

        setTotalDelayDays(newDelay);
        setCostOverrun(newCost);
        setHistory(prev => [
            ...prev,
            { round: challengeIndex + 1, label: `R${challengeIndex + 1}`, delay: newDelay, cost: newCost }
        ]);

        const nextEmailEvent = EMAIL_EVENTS.find(event => event.round === challengeIndex + 1);
        if (nextEmailEvent) {
            startEmailPhase(nextEmailEvent);
        } else {
            setIsIntermission(true);
        }
    };

    const handleEmailReply = (repliedEmail: Email) => {
        const newEmailsToReply = emailsToReply.filter(e => e.id !== repliedEmail.id);
        setEmailsToReply(newEmailsToReply);

        const newRepliedEmails = [...repliedEmails, repliedEmail];
        setRepliedEmails(newRepliedEmails);

        if (newEmailsToReply.length === 0 && currentEmailEvent) {
            // All emails replied, now calculate penalty
            let mistakes = 0;
            for (let i = 0; i < newRepliedEmails.length - 1; i++) {
                if (newRepliedEmails[i].priority > newRepliedEmails[i + 1].priority) {
                    mistakes++;
                }
            }
            
            const delayPenalty = mistakes * 10; // 10 days per mistake
            const costPenalty = mistakes * 15; // 15 Cr per mistake
            
            let resultMsg = "You handled all communications effectively. No negative impact.";
            if (mistakes > 0) {
                 setTotalDelayDays(d => d + delayPenalty);
                 setCostOverrun(c => c + costPenalty);
                 setHistory(prev => [
                    ...prev,
                    { round: challengeIndex + 1, label: `Email`, delay: totalDelayDays + delayPenalty, cost: costOverrun + costPenalty }
                 ]);
                 resultMsg = `Your prioritization of emails was not optimal, leading to ${mistakes} mistake(s). This has resulted in a penalty of ${delayPenalty} days and ₹${costPenalty} Cr.`;
            }
            setEmailResultMessage(resultMsg);
        }
    };

    const handleCloseEmailPhase = () => {
        setIsEmailPhase(false);
        setIsIntermission(true);
    };

    const handleBrainstorm = useCallback(async () => {
        if (isBrainstorming || !isDecisionPending) return;
        setIsBrainstorming(true);
        const analysis = await getPmBrainstorm(currentChallenge);
        setBrainstormText(analysis);
        setIsBrainstorming(false);
    }, [isBrainstorming, isDecisionPending, currentChallenge]);

    const handleRestart = () => {
        onLogout();
    };

    if (!currentChallenge) {
        return <div>Loading Simulation...</div>;
    }
    
    const unreadEmailCount = EMAIL_EVENTS.find(e => e.round === challengeIndex + 1 && isDecisionPending) ? EMAIL_EVENTS.find(e => e.round === challengeIndex + 1)!.emails.length : 0;

    return (
        <div className="min-h-screen bg-gray-100">
            <div className="max-w-7xl mx-auto">
                <Header 
                    user={user} 
                    onLogout={onLogout} 
                    unreadEmailCount={unreadEmailCount}
                    onInboxOpen={() => {
                        const nextEmailEvent = EMAIL_EVENTS.find(event => event.round === challengeIndex + 1);
                        if (nextEmailEvent) startEmailPhase(nextEmailEvent);
                    }}
                />
                
                <div className="p-4 md:p-0">
                    <Dashboard
                        timeDisplay={timeDisplay}
                        totalDelayDays={totalDelayDays}
                        costOverrun={costOverrun}
                        targetProgress={targetProgress}
                    />

                    <Charts history={history} />

                    {isIntermission ? (
                        <IntermissionPanel timer={intermissionTimer} />
                    ) : (
                        !isGameOver && !isEmailPhase && (
                            <DecisionPanel
                                challenge={currentChallenge}
                                challengeIndex={challengeIndex}
                                onDecision={handleDecision}
                                onBrainstorm={handleBrainstorm}
                                isBrainstorming={isBrainstorming}
                                brainstormText={brainstormText}
                                isDecisionPending={isDecisionPending}
                            />
                        )
                    )}
                </div>

                {isEmailPhase && currentEmailEvent && (
                    <EmailInboxModal
                        emails={emailsToReply}
                        onReply={handleEmailReply}
                        resultMessage={emailResultMessage}
                        onClose={handleCloseEmailPhase}
                    />
                )}

                {isGameOver && (
                    <GameOverModal
                        totalDelayDays={totalDelayDays}
                        costOverrun={costOverrun}
                        reportText={reportText}
                        isGeneratingReport={isGeneratingReport}
                        onRestart={handleRestart}
                    />
                )}
            </div>
        </div>
    );
};

export default Simulation;