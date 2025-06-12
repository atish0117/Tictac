import React, { useState, useEffect } from "react";
import { FaSun } from "react-icons/fa";
import { MdDarkMode } from "react-icons/md";
import { ScoreBoard2 } from "../Components/ScoreBoard";
import { useTheme } from "../Components/Context/ThemeContext";

const WINNING_COMBINATIONS = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6],
];

const Computer = () => {
  const [board, setBoard] = useState(Array(9).fill(""));
  const [xQueue, setXQueue] = useState([]);
  const [oQueue, setOQueue] = useState([]);
  const [xRound, setXRound] = useState(0);
  const [oRound, setORound] = useState(0);
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState(null);
  const [winningCombination, setWinningCombination] = useState([]);
  const [winningColor, setWinningColor] = useState("");
  const [turnChanged, setTurnChanged] = useState(false);
  const [xScore, setXScore] = useState(0);
  const [oScore, setOScore] = useState(0);
  const [totalGames, setTotalGames] = useState(0);

  const {isDarkMode}=useTheme()
  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const isLight = (index) => {
    if (winner) return false;
    if (isXNext && xQueue.length >= 3 && oRound > 0 && xQueue[0] === index) return true;
    if (!isXNext && oQueue.length >= 3 && xRound > 0 && oQueue[0] === index) return true;
    return false;
  };

  const calculateWinner = (squares) => {
    for (let combo of WINNING_COMBINATIONS) {
      const [a, b, c] = combo;
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return { winner: squares[a], combination: combo };
      }
    }
    return { winner: null, combination: [] };
  };

  const minimax = (board, depth, isMaximizing) => {
    const result = calculateWinner(board);
    if (result.winner === "X") return -10 + depth;
    if (result.winner === "O") return 10 - depth;
    if (!board.includes("")) return 0;

    if (isMaximizing) {
      let best = -Infinity;
      for (let i = 0; i < board.length; i++) {
        if (board[i] === "") {
          board[i] = "O";
          best = Math.max(best, minimax(board, depth + 1, false));
          board[i] = "";
        }
      }
      return best;
    } else {
      let best = Infinity;
      for (let i = 0; i < board.length; i++) {
        if (board[i] === "") {
          board[i] = "X";
          best = Math.min(best, minimax(board, depth + 1, true));
          board[i] = "";
        }
      }
      return best;
    }
  };

  const computerMove = () => {
    if (winner) return;
    let bestScore = -Infinity;
    let move;
    for (let i = 0; i < board.length; i++) {
      if (board[i] === "") {
        board[i] = "O";
        const score = minimax(board, 0, false);
        board[i] = "";
        if (score > bestScore) {
          bestScore = score;
          move = i;
        }
      }
    }

    const newBoard = [...board];
    newBoard[move] = "O";
    new Audio("/click-sound.mp3").play();

    let newOQueue = [...oQueue, move];
    if (newOQueue.length === 3) setORound((prev) => prev + 1);
    if (newOQueue.length > 3 && xRound > 0) {
      const removed = newOQueue.shift();
      newBoard[removed] = "";
    }

    setOQueue(newOQueue);
    setBoard(newBoard);

    const result = calculateWinner(newBoard);
    if (result.winner) {
      setWinner(result.winner);
      setWinningCombination(result.combination);
      setWinningColor(getRandomColor());
      new Audio("/win-sound.mp3").play();
      if (result.winner === "X") setXScore((prev) => prev + 1);
      if (result.winner === "O") setOScore((prev) => prev + 1);
    } else {
      setIsXNext(true);
      setTurnChanged(true);
    }
  };

  const handleBoxClick = (index) => {
    if (board[index] || winner || !isXNext) return;

    const newBoard = [...board];
    newBoard[index] = "X";
    new Audio("/click-sound.mp3").play();

    let newXQueue = [...xQueue, index];
    if (newXQueue.length === 3) setXRound((prev) => prev + 1);
    if (newXQueue.length > 3 && oRound > 0) {
      const removed = newXQueue.shift();
      newBoard[removed] = "";
    }

    setXQueue(newXQueue);
    setBoard(newBoard);

    const result = calculateWinner(newBoard);
    if (result.winner) {
      setWinner(result.winner);
      setWinningCombination(result.combination);
      setWinningColor(getRandomColor());
      new Audio("/win-sound.mp3").play();
      if (result.winner === "X") setXScore((prev) => prev + 1);
      if (result.winner === "O") setOScore((prev) => prev + 1);
    } else {
      setIsXNext(false);
      setTurnChanged(true);
    }
  };

  useEffect(() => {
    if (!isXNext && !winner) {
      setTimeout(computerMove, 1000);
    }
  }, [isXNext, board, winner]);


  useEffect(()=>{
    setTotalGames(xScore+oScore)
  },[xScore,oScore])


  const restartGame = () => {
    setBoard(Array(9).fill(""));
    setXQueue([]);
    setOQueue([]);
    setXRound(0);
    setORound(0);
    setIsXNext(true);
    setWinner(null);
    setWinningCombination([]);
    setWinningColor("");
    setTurnChanged(false);
  };

  const resetScores = () => {
    setXScore(0);
    setOScore(0);
  };



  return (
    <div className={`min-h-screen flex flex-col items-center justify-center ${
  isDarkMode ? "bg-gray-900" : "bg-gradient-to-br from-blue-50 to-purple-100"
} p-6`}>
  <h1 className={`text-4xl font-bold mb-4 ${isDarkMode ? "text-white" : "text-gray-800"}`}>
    Xtreme Tic-Tac-Toe
  </h1>

  {/* Scoreboard */}
  <ScoreBoard2 xScore={xScore} oScore={oScore} resetScores={resetScores} isDarkMode={isDarkMode} />

  <div className={`text-lg text-center mb-4 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
    <h3 className="text-xl font-semibold">Total Games: {totalGames}</h3>
  </div>

  {/* Glassmorphism Game Board */}
  <div
    className="grid grid-cols-3 gap-4 p-6 rounded-2xl backdrop-blur-sm border border-opacity-20"
    style={{
      background: isDarkMode 
        ? 'rgba(30, 30, 30, 0.5)' 
        : 'rgba(255, 255, 255, 0.3)',
      boxShadow: isDarkMode
        ? '0 8px 32px 0 rgba(0, 0, 0, 0.3)'
        : '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
      borderColor: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.3)'
    }}
  >
    {board.map((value, index) => {
      const isWinningBox = winningCombination.includes(index);
      const boxColor = isWinningBox ? winningColor : "";

      // Neumorphic cell styling
      const cellBaseStyle = isDarkMode
        ? {
            background: isWinningBox 
              ? boxColor 
              : 'linear-gradient(145deg, #1e1e1e, #232323)',
            boxShadow: isWinningBox
              ? `0 0 15px ${boxColor}, 5px 5px 10px #0d0d0d, -5px -5px 10px #2f2f2f`
              : '8px 8px 16px #0d0d0d, -8px -8px 16px #2f2f2f'
          }
        : {
            background: isWinningBox 
              ? boxColor 
              : 'linear-gradient(145deg, #ffffff, #e6e6e6)',
            boxShadow: isWinningBox
              ? `0 0 15px ${boxColor}, 5px 5px 10px #d1d1d1, -5px -5px 10px #ffffff`
              : '8px 8px 16px #d1d1d1, -8px -8px 16px #ffffff'
          };

      return (
        <div
          key={index}
          className={`w-24 h-24 flex items-center justify-center text-4xl font-extrabold rounded-xl
            ${value === "X" ? (isDarkMode ? "text-blue-400" : "text-blue-600") : ""}
            ${value === "O" ? (isDarkMode ? "text-pink-400" : "text-pink-500") : ""}
            ${!value ? "cursor-pointer" : ""}
            transition-all duration-300 ease-in-out select-none`}
          style={{
            ...cellBaseStyle,
            transform: isWinningBox ? 'scale(1.05)' : 'scale(1)',
            transition: 'all 0.3s ease'
          }}
          onClick={() => handleBoxClick(index)}
        >
          {value}
        </div>
      );
    })}
  </div>

  {/* Info & Buttons */}
  <div className="mt-6 flex flex-col items-center gap-2">
    {winner ? (
      <div className={`text-2xl font-semibold ${isDarkMode ? "text-green-400" : "text-green-600"} animate-pulse`}>
        Winner: {winner}
      </div>
    ) : (
      <div className={`text-xl font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"} transition-all duration-500 ${
        turnChanged ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}>
        Next Turn: {isXNext ? "X" : "O"}
      </div>
    )}

    <div className="flex gap-4 mt-4">
      <button
        onClick={restartGame}
        className={`px-6 py-2 rounded-lg shadow-md transition-all ${
          isDarkMode 
            ? "bg-indigo-600 hover:bg-indigo-700 text-white"
            : "bg-indigo-500 hover:bg-indigo-600 text-white"
        }`}
      >
        Restart
      </button>
    </div>
  </div>
</div>
  );
};

export default Computer;
