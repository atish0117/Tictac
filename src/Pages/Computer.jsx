import React, { useState, useEffect } from "react";
import { ScoreBoard2 } from "../Components/ScoreBoard";
import { useTheme } from "../Components/Context/ThemeContext";
import { motion, AnimatePresence } from "framer-motion";
import { playClickSound, playWinSound } from "../utils/sounds";

const WINNING_COMBINATIONS = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6],
];

const Computer = () => {
  const [board, setBoard] = useState(Array(9).fill(""));
  const [xQueue, setXQueue] = useState([]);
  const [oQueue, setOQueue] = useState([]);
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState(null);
  const [winningCombination, setWinningCombination] = useState([]);
  const [winningColor, setWinningColor] = useState("");
  const [xScore, setXScore] = useState(0);
  const [oScore, setOScore] = useState(0);
  const { isDarkMode } = useTheme();

  const getRandomColor = () => {
    const colors = [
      "rgba(34, 197, 94, 0.4)",  // green
      "rgba(168, 85, 247, 0.4)", // purple
      "rgba(234, 179, 8, 0.4)",  // yellow
      "rgba(59, 130, 246, 0.4)",  // blue
      "rgba(244, 63, 94, 0.4)"   // rose
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const calculateWinner = (squares) => {
    for (let combo of WINNING_COMBINATIONS) {
      const [a, b, c] = combo;
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return { winner: squares[a], combo };
      }
    }
    return null;
  };

  // Minimax algorithm simulating the queue of disappearing marks
  const minimax = (boardState, xQueueState, oQueueState, depth, isMaximizing) => {
    const result = calculateWinner(boardState);
    if (result) {
      if (result.winner === "O") return 10 - depth;
      if (result.winner === "X") return depth - 10;
    }
    
    // Set a depth limit to avoid infinite game trees
    if (depth >= 6) return 0;

    if (isMaximizing) {
      let best = -Infinity;
      for (let i = 0; i < 9; i++) {
        if (boardState[i] === "") {
          const nextBoard = [...boardState];
          nextBoard[i] = "O";
          let nextOQueue = [...oQueueState, i];
          if (nextOQueue.length > 3) {
            const removed = nextOQueue.shift();
            nextBoard[removed] = "";
          }
          const score = minimax(nextBoard, xQueueState, nextOQueue, depth + 1, false);
          best = Math.max(best, score);
        }
      }
      return best;
    } else {
      let best = Infinity;
      for (let i = 0; i < 9; i++) {
        if (boardState[i] === "") {
          const nextBoard = [...boardState];
          nextBoard[i] = "X";
          let nextXQueue = [...xQueueState, i];
          if (nextXQueue.length > 3) {
            const removed = nextXQueue.shift();
            nextBoard[removed] = "";
          }
          const score = minimax(nextBoard, nextXQueue, oQueueState, depth + 1, true);
          best = Math.min(best, score);
        }
      }
      return best;
    }
  };

  const computerMove = () => {
    if (winner || isXNext) return;

    let bestScore = -Infinity;
    let move = null;

    for (let i = 0; i < 9; i++) {
      if (board[i] === "") {
        const nextBoard = [...board];
        nextBoard[i] = "O";
        let nextOQueue = [...oQueue, i];
        if (nextOQueue.length > 3) {
          const removed = nextOQueue.shift();
          nextBoard[removed] = "";
        }
        const score = minimax(nextBoard, xQueue, nextOQueue, 0, false);
        if (score > bestScore) {
          bestScore = score;
          move = i;
        }
      }
    }

    if (move !== null) {
      const newBoard = [...board];
      newBoard[move] = "O";
      let newOQueue = [...oQueue, move];
      if (newOQueue.length > 3) {
        const removed = newOQueue.shift();
        newBoard[removed] = "";
      }

      playClickSound();

      setOQueue(newOQueue);
      setBoard(newBoard);

      const winResult = calculateWinner(newBoard);
      if (winResult) {
        setWinner(winResult.winner);
        setWinningCombination(winResult.combo);
        setWinningColor(getRandomColor());
        playWinSound();
        setOScore((prev) => prev + 1);
      } else {
        setIsXNext(true);
      }
    }
  };

  const handleBoxClick = (index) => {
    if (board[index] || winner || !isXNext) return;

    const newBoard = [...board];
    newBoard[index] = "X";

    playClickSound();

    let newXQueue = [...xQueue, index];
    if (newXQueue.length > 3) {
      const removed = newXQueue.shift();
      newBoard[removed] = "";
    }

    setXQueue(newXQueue);
    setBoard(newBoard);

    const winResult = calculateWinner(newBoard);
    if (winResult) {
      setWinner(winResult.winner);
      setWinningCombination(winResult.combo);
      setWinningColor(getRandomColor());
      playWinSound();
      setXScore((prev) => prev + 1);
    } else {
      setIsXNext(false);
    }
  };

  useEffect(() => {
    if (!isXNext && !winner) {
      const timer = setTimeout(computerMove, 600);
      return () => clearTimeout(timer);
    }
  }, [isXNext, board, winner]);

  const restartGame = () => {
    setBoard(Array(9).fill(""));
    setXQueue([]);
    setOQueue([]);
    setIsXNext(true);
    setWinner(null);
    setWinningCombination([]);
    setWinningColor("");
  };

  const isLight = (index) => {
    if (winner) return false;
    if (isXNext && xQueue.length === 3 && xQueue[0] === index) return true;
    if (!isXNext && oQueue.length === 3 && oQueue[0] === index) return true;
    return false;
  };

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center p-6 transition-colors duration-300 ${
      isDarkMode 
        ? "bg-slate-950 text-white bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-black" 
        : "bg-slate-50 text-slate-900 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-100 via-slate-50 to-slate-100"
    }`}>
      {/* Decorative Blur Spheres */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-pink-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative z-10 w-full max-w-lg flex flex-col items-center">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-6"
        >
          <h1 className="text-3xl md:text-5xl font-black bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
            Xtreme vs Computer
          </h1>
          <p className="text-xs uppercase tracking-widest mt-1 text-slate-500 dark:text-slate-400">
            Challenge the smart queue-aware AI
          </p>
        </motion.div>

        {/* Scoreboard */}
        <ScoreBoard2 xScore={xScore} oScore={oScore} resetScores={() => { setXScore(0); setOScore(0); }} />

        {/* Board Display */}
        <div className="grid-3d-wrapper w-full flex justify-center mb-8">
          <div 
            className="grid-3d grid grid-cols-3 gap-3 p-4 rounded-2xl glass-panel shadow-2xl relative"
            style={{ width: "max-content" }}
          >
            {board.map((value, index) => {
              const isWinningBox = winningCombination.includes(index);
              const isOldestMark = isLight(index);

              return (
                <motion.button
                  key={index}
                  whileHover={{ scale: !value && !winner && isXNext ? 1.05 : 1 }}
                  whileTap={{ scale: !value && !winner && isXNext ? 0.95 : 1 }}
                  className={`w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center text-4xl font-extrabold border rounded-xl shadow-md transition-all duration-300 select-none
                    ${value === "X" ? "text-blue-500 glow-x" : "text-pink-500 glow-o"}
                    ${isOldestMark ? "mark-fading border-rose-500/40 bg-rose-500/5" : ""}
                    ${isWinningBox ? "scale-105 border-green-500/50" : ""}
                    ${isDarkMode 
                      ? "bg-slate-900/60 border-slate-800 hover:bg-slate-800/80" 
                      : "bg-white border-slate-200 hover:bg-slate-100/50"
                    }
                    ${!isXNext ? "cursor-not-allowed" : ""}`}
                  style={{
                    backgroundColor: isWinningBox ? winningColor : undefined,
                    boxShadow: isWinningBox ? `0 0 20px ${winningColor}` : undefined
                  }}
                  onClick={() => handleBoxClick(index)}
                  disabled={!!value || !!winner || !isXNext}
                >
                  {value}
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Info & Action Buttons */}
        <div className="flex flex-col items-center gap-4">
          <AnimatePresence mode="wait">
            {winner ? (
              <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="text-2xl font-black text-green-500 drop-shadow-md flex items-center gap-1.5"
              >
                🎉 Winner: {winner === "X" ? "You!" : "AI"}
              </motion.div>
            ) : (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className={`text-base font-semibold px-4 py-1.5 rounded-full border shadow-sm ${
                  isDarkMode 
                    ? "bg-slate-900 border-slate-800 text-slate-300" 
                    : "bg-white border-slate-200 text-slate-700"
                }`}
              >
                {isXNext ? (
                  <span>Your Turn <span className="text-blue-500">(X)</span></span>
                ) : (
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-pink-500 animate-ping"></span>
                    AI is thinking... <span className="text-pink-500">(O)</span>
                  </span>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          <button
            onClick={restartGame}
            className="px-6 py-2.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:to-pink-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 active:scale-95"
          >
            Restart Game
          </button>
        </div>
      </div>
    </div>
  );
};

export default Computer;
