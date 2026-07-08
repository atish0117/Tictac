import React from 'react';
import { useTheme } from './Context/ThemeContext';
import { FiRefreshCw, FiUser, FiCpu } from 'react-icons/fi';

// ScoreBoard1: Used for 3x3, 4x4, 6x6 PvP matches (Player X vs Player O)
export const ScoreBoard1 = ({ xScore, oScore, resetScores }) => {
  const { isDarkMode } = useTheme();
  const total = xScore + oScore;
  const xPercentage = total === 0 ? 50 : (xScore / total) * 100;
  const oPercentage = total === 0 ? 50 : (oScore / total) * 100;

  return (
    <div className="w-full max-w-lg mx-auto mb-6">
      <div className={`glass-panel rounded-2xl shadow-lg p-5 flex flex-col gap-4 relative overflow-hidden transition-all duration-300`}>
        {/* Top Header & Reset */}
        <div className="flex justify-between items-center pb-2 border-b border-slate-200/20">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-500">Local PvP Match</span>
          <button
            onClick={resetScores}
            className="flex items-center gap-1 px-3 py-1.5 bg-rose-500/10 hover:bg-rose-500/20 text-rose-500 text-xs font-bold rounded-lg transition-all duration-200"
            title="Reset Scores"
          >
            <FiRefreshCw className="w-3.5 h-3.5" />
            Reset
          </button>
        </div>

        {/* Players Score Display */}
        <div className="grid grid-cols-2 gap-4 items-center relative z-10">
          {/* Player X */}
          <div className="text-center">
            <div className="flex items-center justify-center gap-1.5 mb-1">
              <div className="w-2.5 h-2.5 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)]"></div>
              <span className="text-sm font-semibold text-slate-500 dark:text-slate-400">Player X</span>
            </div>
            <p className="text-4xl font-extrabold text-blue-500 tracking-tight">{xScore}</p>
          </div>

          {/* Player O */}
          <div className="text-center">
            <div className="flex items-center justify-center gap-1.5 mb-1">
              <div className="w-2.5 h-2.5 rounded-full bg-pink-500 shadow-[0_0_8px_rgba(236,72,153,0.8)]"></div>
              <span className="text-sm font-semibold text-slate-500 dark:text-slate-400">Player O</span>
            </div>
            <p className="text-4xl font-extrabold text-pink-500 tracking-tight">{oScore}</p>
          </div>
        </div>

        {/* Progress Bar Visualizer */}
        <div className="w-full h-2.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden flex shadow-inner">
          <div
            className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 transition-all duration-500"
            style={{ width: `${xPercentage}%` }}
          ></div>
          <div
            className="h-full bg-gradient-to-r from-pink-500 to-rose-400 transition-all duration-500"
            style={{ width: `${oPercentage}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

// ScoreBoard2: Used for AI matches (Player X vs Computer O)
export const ScoreBoard2 = ({ xScore, oScore, resetScores }) => {
  const { isDarkMode } = useTheme();
  const total = xScore + oScore;
  const xPercentage = total === 0 ? 50 : (xScore / total) * 100;
  const oPercentage = total === 0 ? 50 : (oScore / total) * 100;

  return (
    <div className="w-full max-w-lg mx-auto mb-6">
      <div className={`glass-panel rounded-2xl shadow-lg p-5 flex flex-col gap-4 relative overflow-hidden transition-all duration-300`}>
        {/* Top Header & Reset */}
        <div className="flex justify-between items-center pb-2 border-b border-slate-200/20">
          <span className="text-xs font-bold uppercase tracking-wider text-purple-500">AI Arena Challenge</span>
          <button
            onClick={resetScores}
            className="flex items-center gap-1 px-3 py-1.5 bg-rose-500/10 hover:bg-rose-500/20 text-rose-500 text-xs font-bold rounded-lg transition-all duration-200"
            title="Reset Scores"
          >
            <FiRefreshCw className="w-3.5 h-3.5" />
            Reset
          </button>
        </div>

        {/* Players Score Display */}
        <div className="grid grid-cols-2 gap-4 items-center relative z-10">
          {/* Player X */}
          <div className="text-center">
            <div className="flex items-center justify-center gap-1.5 mb-1">
              <FiUser className="text-blue-500" />
              <span className="text-sm font-semibold text-slate-500 dark:text-slate-400">You (X)</span>
            </div>
            <p className="text-4xl font-extrabold text-blue-500 tracking-tight">{xScore}</p>
          </div>

          {/* Computer O */}
          <div className="text-center">
            <div className="flex items-center justify-center gap-1.5 mb-1">
              <FiCpu className="text-pink-500 animate-pulse" />
              <span className="text-sm font-semibold text-slate-500 dark:text-slate-400">AI (O)</span>
            </div>
            <p className="text-4xl font-extrabold text-pink-500 tracking-tight">{oScore}</p>
          </div>
        </div>

        {/* Progress Bar Visualizer */}
        <div className="w-full h-2.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden flex shadow-inner">
          <div
            className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 transition-all duration-500"
            style={{ width: `${xPercentage}%` }}
          ></div>
          <div
            className="h-full bg-gradient-to-r from-pink-500 to-rose-400 transition-all duration-500"
            style={{ width: `${oPercentage}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

// ScoreBoard3: Used for 4x4 / 6x6 PvP matches featuring Draws counter
export const ScoreBoard3 = ({ xWins, oWins, draws, resetScores }) => {
  const { isDarkMode } = useTheme();

  return (
    <div className="w-full max-w-lg mx-auto mb-6">
      <div className={`glass-panel rounded-2xl shadow-lg p-5 flex flex-col gap-4 relative overflow-hidden transition-all duration-300`}>
        {/* Top Header & Reset */}
        <div className="flex justify-between items-center pb-2 border-b border-slate-200/20">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-500">Board Statistics (PvP)</span>
          <button
            onClick={resetScores}
            className="flex items-center gap-1 px-3 py-1.5 bg-rose-500/10 hover:bg-rose-500/20 text-rose-500 text-xs font-bold rounded-lg transition-all duration-200"
            title="Reset Scores"
          >
            <FiRefreshCw className="w-3.5 h-3.5" />
            Reset
          </button>
        </div>

        {/* Players Score Display */}
        <div className="grid grid-cols-3 gap-2 items-center relative z-10 text-center">
          {/* Player X */}
          <div>
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 block mb-1">Player X</span>
            <p className="text-3xl font-extrabold text-blue-500">{xWins}</p>
            <span className="text-[10px] text-slate-400 uppercase tracking-widest">Wins</span>
          </div>

          {/* Draws */}
          <div className="border-x border-slate-200/20 px-2">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 block mb-1">Draws</span>
            <p className="text-3xl font-extrabold text-amber-500">{draws}</p>
            <span className="text-[10px] text-slate-400 uppercase tracking-widest">Ties</span>
          </div>

          {/* Player O */}
          <div>
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 block mb-1">Player O</span>
            <p className="text-3xl font-extrabold text-pink-500">{oWins}</p>
            <span className="text-[10px] text-slate-400 uppercase tracking-widest">Wins</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// ScoreBoard4: Used for 4x4 / 6x6 vs Computer (AI) featuring Draws counter
export const ScoreBoard4 = ({ xWins, oWins, draws, resetScores }) => {
  const { isDarkMode } = useTheme();

  return (
    <div className="w-full max-w-lg mx-auto mb-6">
      <div className={`glass-panel rounded-2xl shadow-lg p-5 flex flex-col gap-4 relative overflow-hidden transition-all duration-300`}>
        {/* Top Header & Reset */}
        <div className="flex justify-between items-center pb-2 border-b border-slate-200/20">
          <span className="text-xs font-bold uppercase tracking-wider text-purple-500">Board Statistics (vs AI)</span>
          <button
            onClick={resetScores}
            className="flex items-center gap-1 px-3 py-1.5 bg-rose-500/10 hover:bg-rose-500/20 text-rose-500 text-xs font-bold rounded-lg transition-all duration-200"
            title="Reset Scores"
          >
            <FiRefreshCw className="w-3.5 h-3.5" />
            Reset
          </button>
        </div>

        {/* Players Score Display */}
        <div className="grid grid-cols-3 gap-2 items-center relative z-10 text-center">
          {/* Player X */}
          <div>
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 block mb-1 flex items-center justify-center gap-1">
              <FiUser className="w-3 h-3 text-blue-500" /> You
            </span>
            <p className="text-3xl font-extrabold text-blue-500">{xWins}</p>
            <span className="text-[10px] text-slate-400 uppercase tracking-widest">Wins</span>
          </div>

          {/* Draws */}
          <div className="border-x border-slate-200/20 px-2">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 block mb-1">Draws</span>
            <p className="text-3xl font-extrabold text-amber-500">{draws}</p>
            <span className="text-[10px] text-slate-400 uppercase tracking-widest">Ties</span>
          </div>

          {/* AI O */}
          <div>
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 block mb-1 flex items-center justify-center gap-1">
              <FiCpu className="w-3 h-3 text-pink-500 animate-pulse" /> AI
            </span>
            <p className="text-3xl font-extrabold text-pink-500">{oWins}</p>
            <span className="text-[10px] text-slate-400 uppercase tracking-widest">Wins</span>
          </div>
        </div>
      </div>
    </div>
  );
};
