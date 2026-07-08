import React, { useState } from "react";
import { ScoreBoard1 } from "../Components/ScoreBoard";
import { useTheme } from "../Components/Context/ThemeContext";
import { motion, AnimatePresence } from "framer-motion";
import { playClickSound, playWinSound } from "../utils/sounds";

const generateWinningCombinations = () => {
  const size = 6;
  const combos = [];

  // Horizontal
  for (let row = 0; row < size; row++) {
    const base = row * size;
    combos.push([base, base + 1, base + 2, base + 3, base + 4, base + 5]);
  }

  // Vertical
  for (let col = 0; col < size; col++) {
    combos.push([
      col,
      col + size,
      col + size * 2,
      col + size * 3,
      col + size * 4,
      col + size * 5
    ]);
  }

  // Diagonal ↘
  combos.push([0, 7, 14, 21, 28, 35]);
  // Diagonal ↙
  combos.push([5, 10, 15, 20, 25, 30]);

  return combos;
};

const WINNING_COMBINATIONS = generateWinningCombinations();

const Xtreme6x6 = () => {
  const [board, setBoard] = useState(Array(36).fill(""));
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
      const [a, b, c, d, e, f] = combo;
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c] &&
        squares[a] === squares[d] &&
        squares[a] === squares[e] &&
        squares[a] === squares[f]
      ) {
        return { winner: squares[a], combo };
      }
    }
    return null;
  };

  const handleBoxClick = (index) => {
    if (board[index] || winner) return;

    const newBoard = [...board];
    const currentPlayer = isXNext ? "X" : "O";
    newBoard[index] = currentPlayer;

    playClickSound();

    if (isXNext) {
      let newXQueue = [...xQueue, index];
      // Limit to 8 marks. The 9th mark removes the 1st.
      if (newXQueue.length > 8) {
        const removeIndex = newXQueue.shift();
        newBoard[removeIndex] = "";
      }
      setXQueue(newXQueue);
    } else {
      let newOQueue = [...oQueue, index];
      if (newOQueue.length > 8) {
        const removeIndex = newOQueue.shift();
        newBoard[removeIndex] = "";
      }
      setOQueue(newOQueue);
    }

    setBoard(newBoard);
    const winResult = calculateWinner(newBoard);

    if (winResult) {
      setWinner(winResult.winner);
      setWinningCombination(winResult.combo);
      setWinningColor(getRandomColor());
      playWinSound();
      if (winResult.winner === "X") {
        setXScore(prev => prev + 1);
      } else {
        setOScore(prev => prev + 1);
      }
    } else {
      setIsXNext(!isXNext);
    }
  };

  const restartGame = () => {
    setBoard(Array(36).fill(""));
    setXQueue([]);
    setOQueue([]);
    setIsXNext(true);
    setWinner(null);
    setWinningCombination([]);
    setWinningColor("");
  };

  const isLight = (index) => {
    if (winner) return false;
    // Highlight oldest mark when queue reaches the limit of 8
    if (isXNext && xQueue.length === 8 && xQueue[0] === index) return true;
    if (!isXNext && oQueue.length === 8 && oQueue[0] === index) return true;
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
            Xtreme 6x6 PvP
          </h1>
          <p className="text-xs uppercase tracking-widest mt-1 text-slate-500 dark:text-slate-400">
            PvP disappearing grid (Max 8 Marks - Connect 6 to win)
          </p>
        </motion.div>

        {/* Scoreboard */}
        <ScoreBoard1 xScore={xScore} oScore={oScore} resetScores={() => { setXScore(0); setOScore(0); }} />

        {/* 3D Board Display */}
        <div className="grid-3d-wrapper w-full flex justify-center mb-8">
          <div 
            className="grid-3d grid grid-cols-6 gap-2 p-3 rounded-2xl glass-panel shadow-2xl relative"
            style={{ width: "max-content" }}
          >
            {board.map((value, index) => {
              const isWinningBox = winningCombination.includes(index);
              const isOldestMark = isLight(index);

              return (
                <motion.button
                  key={index}
                  whileHover={{ scale: !value && !winner ? 1.05 : 1 }}
                  whileTap={{ scale: !value && !winner ? 0.95 : 1 }}
                  className={`w-9 h-9 sm:w-12 sm:h-12 flex items-center justify-center text-lg sm:text-xl font-extrabold border rounded-lg shadow-sm transition-all duration-300 select-none
                    ${value === "X" ? "text-blue-500 glow-x" : "text-pink-500 glow-o"}
                    ${isOldestMark ? "mark-fading border-rose-500/40 bg-rose-500/5" : ""}
                    ${isWinningBox ? "scale-105 border-green-500/50" : ""}
                    ${isDarkMode 
                      ? "bg-slate-900/60 border-slate-800 hover:bg-slate-800/80" 
                      : "bg-white border-slate-200 hover:bg-slate-100/50"
                    }`}
                  style={{
                    backgroundColor: isWinningBox ? winningColor : undefined,
                    boxShadow: isWinningBox ? `0 0 15px ${winningColor}` : undefined
                  }}
                  onClick={() => handleBoxClick(index)}
                  disabled={!!value || !!winner}
                >
                  {value}
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Status Info */}
        <div className="flex flex-col items-center gap-4">
          <AnimatePresence mode="wait">
            {winner ? (
              <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="text-2xl font-black text-green-500 drop-shadow-md"
              >
                🎉 Winner: Player {winner}
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
                Next Turn: <span className={isXNext ? "text-blue-500" : "text-pink-500"}>{isXNext ? "Player X" : "Player O"}</span>
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

export default Xtreme6x6;
