import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { GameState, Option, HistoryEntry, User, SimulationResult } from '../types';
import { CHALLENGES, TOTAL_MONTHS, START_MONTH_INDEX, START_YEAR, MONTH_NAMES, COST_RATE_PER_DAY_SAVED, INTERMISSION_DURATION } from '../constants';
import Header from './Header';
import Dashboard from './Dashboard';
import Charts from './Charts';
import DecisionPanel from './DecisionPanel';
import IntermissionPanel from './IntermissionPanel';
import GameOverModal from './GameOverModal';
import { getPmBrainstorm, generateFinalReport } from '../services/geminiService';

const initialState: GameState = {
  currentMonth: CHALLENGES[0].month,
  totalDelayDays: 0,
  costOverrun: 0,
  currentChallengeIndex: 0,
  isDecisionPending: true,
  isIntermission: false,
  isGameOver: false,
  history: [{ round: 0, label: 'Start', delay: 0, cost: 0 }],
};

interface SimulationProps {
  user: User;
  onLogout: () => void;
  onComplete: (result: Omit<SimulationResult, 'userName' | 'userId' | 'date'>) => void;
}

const Simulation: React.FC<SimulationProps> = ({ user, onLogout, onComplete }) => {
  const [gameState, setGameState] = useState<GameState>(initialState);
  const [intermissionTimer, setIntermissionTimer] = useState<number>(INTERMISSION_DURATION);
  const [brainstormText, setBrainstormText] = useState<string>('');
  const [isBrainstorming, setIsBrainstorming] = useState<boolean>(false);
  const [finalReport, setFinalReport] = useState<string>('');
  const [isGeneratingReport, setIsGeneratingReport] = useState<boolean>(false);

  const currentChallenge = useMemo(() => CHALLENGES[gameState.currentChallengeIndex], [gameState.currentChallengeIndex]);
  
  const finishSimulation = useCallback(() => {
      setGameState(prev => ({
          ...prev,
          currentMonth: TOTAL_MONTHS - 1,
          isGameOver: true,
          isDecisionPending: false,
          isIntermission: false,
      }));
  }, []);

  const advanceSimulation = useCallback(() => {
    if (gameState.currentChallengeIndex + 1 >= CHALLENGES.length) {
      finishSimulation();
      return;
    }

    const nextChallengeIndex = gameState.currentChallengeIndex + 1;
    const nextChallenge = CHALLENGES[nextChallengeIndex];

    setGameState(prev => ({
      ...prev,
      isIntermission: false,
      isDecisionPending: true,
      currentChallengeIndex: nextChallengeIndex,
      currentMonth: nextChallenge.month,
    }));
    setBrainstormText('');
  }, [gameState.currentChallengeIndex, finishSimulation]);
  
  useEffect(() => {
    if (gameState.isGameOver && !finalReport && !isGeneratingReport) {
      setIsGeneratingReport(true);
      
      let outcome = "";
      if (gameState.totalDelayDays < -30) outcome = "Exceptional Performance";
      else if (gameState.totalDelayDays < 120) outcome = "Excellent Performance";
      else outcome = "Significant Extension Required";
      
      onComplete({
        totalDelayDays: gameState.totalDelayDays,
        costOverrun: gameState.costOverrun,
        outcome: outcome,
      });

      generateFinalReport(gameState.totalDelayDays, gameState.costOverrun)
        .then(report => {
          setFinalReport(report);
          setIsGeneratingReport(false);
        });
    }
  }, [gameState.isGameOver, gameState.totalDelayDays, gameState.costOverrun, finalReport, onComplete, isGeneratingReport]);


  useEffect(() => {
    if (gameState.isIntermission) {
      setIntermissionTimer(INTERMISSION_DURATION);
      const intervalId = setInterval(() => {
        setIntermissionTimer(prevTimer => {
          if (prevTimer <= 1) {
            clearInterval(intervalId);
            advanceSimulation();
            return 0;
          }
          return prevTimer - 1;
        });
      }, 1000);
      return () => clearInterval(intervalId);
    }
  }, [gameState.isIntermission, advanceSimulation]);

  const handleDecision = (option: Option) => {
    if (!gameState.isDecisionPending) return;

    let costAdjustment = 0;
    if (option.delay < 0) {
      costAdjustment = Math.abs(option.delay) * COST_RATE_PER_DAY_SAVED;
    }
    
    const newDelay = gameState.totalDelayDays + option.delay;
    const newCost = gameState.costOverrun + option.cost - costAdjustment;

    const newHistoryEntry: HistoryEntry = {
      round: gameState.currentChallengeIndex + 1,
      label: `R${gameState.currentChallengeIndex + 1}`,
      delay: newDelay,
      cost: newCost,
    };
    
    setGameState(prev => ({
      ...prev,
      totalDelayDays: newDelay,
      costOverrun: newCost,
      history: [...prev.history, newHistoryEntry],
      isDecisionPending: false,
      isIntermission: true,
    }));
  };

  const handleBrainstorm = async () => {
      if (!gameState.isDecisionPending || isBrainstorming) return;
      setIsBrainstorming(true);
      setBrainstormText('Analyzing the situation and compiling options...');
      const analysis = await getPmBrainstorm(currentChallenge);
      setBrainstormText(analysis);
      setIsBrainstorming(false);
  };

  const targetProgress = Math.min(100, Math.round((gameState.currentMonth / TOTAL_MONTHS) * 100));
  const timeDisplay = `${MONTH_NAMES[ (START_MONTH_INDEX + gameState.currentMonth) % 12]} ${START_YEAR + Math.floor((START_MONTH_INDEX + gameState.currentMonth) / 12)}`;

  return (
    <div className="max-w-4xl mx-auto">
      <Header user={user} onLogout={onLogout} />
      <Dashboard
        timeDisplay={timeDisplay}
        totalDelayDays={gameState.totalDelayDays}
        costOverrun={gameState.costOverrun}
        targetProgress={targetProgress}
      />
      <Charts history={gameState.history} />

      {gameState.isIntermission && !gameState.isGameOver && (
        <IntermissionPanel timer={intermissionTimer} />
      )}

      {!gameState.isIntermission && !gameState.isGameOver && currentChallenge && (
        <DecisionPanel
          challenge={currentChallenge}
          challengeIndex={gameState.currentChallengeIndex}
          onDecision={handleDecision}
          onBrainstorm={handleBrainstorm}
          isBrainstorming={isBrainstorming}
          brainstormText={brainstormText}
          isDecisionPending={gameState.isDecisionPending}
        />
      )}

      {gameState.isGameOver && (
          <GameOverModal
              totalDelayDays={gameState.totalDelayDays}
              costOverrun={gameState.costOverrun}
              reportText={finalReport}
              isGeneratingReport={isGeneratingReport}
              onRestart={onLogout}
          />
      )}
    </div>
  );
};

export default Simulation;
