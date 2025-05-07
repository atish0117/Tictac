import React, { useState, useEffect } from "react";
import { FaSun } from "react-icons/fa";
import { MdDarkMode } from "react-icons/md";

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
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [turnChanged, setTurnChanged] = useState(false);
  const [xWins, setXWins] = useState(0);
  const [oWins, setOWins] = useState(0);
  const [totalGames, setTotalGames] = useState(0);
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
      if (result.winner === "X") setXWins((prev) => prev + 1);
      if (result.winner === "O") setOWins((prev) => prev + 1);
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
      if (result.winner === "X") setXWins((prev) => prev + 1);
      if (result.winner === "O") setOWins((prev) => prev + 1);
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
    setTotalGames(xWins+oWins)
  },[xWins,oWins])


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
    setXWins(0);
    setOWins(0);
  };

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center ${
        isDarkMode ? "bg-gray-800 text-white" : "bg-gradient-to-br from-blue-100 to-purple-200"
      } p-6`}
    >
      <h1 className="text-4xl font-bold mb-4 text-gray-800 dark:text-white">
        Xtreme Tic-Tac-Toe
      </h1>

      {/* Scoreboard */}
<div className="mb-6 w-full max-w-xl bg-white dark:bg-gray-700 rounded-2xl p-4 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
  <div className={`flex-1 text-center ${xWins > oWins ? "text-green-600" : ""}`}>
    <h2 className="text-lg font-bold flex items-center justify-center gap-2">
      🧑 Player (X)
    </h2>
    <p className="text-3xl font-extrabold">{xWins}</p>
    <div className="w-full h-2 bg-gray-300 rounded mt-2 overflow-hidden">
      <div
        className="h-full bg-blue-500 transition-all duration-500"
        style={{ width: `${xWins + oWins === 0 ? 50 : (xWins / (xWins + oWins)) * 100}%` }}
      ></div>
    </div>
  </div>

  <div className={`flex-1 text-center ${oWins > xWins ? "text-green-600" : ""}`}>
    <h2 className="text-lg font-bold flex items-center justify-center gap-2">
      🤖 Computer (O)
    </h2>
    <p className="text-3xl font-extrabold">{oWins}</p>
    <div className="w-full h-2 bg-gray-300 rounded mt-2 overflow-hidden">
      <div
        className="h-full bg-pink-500 transition-all duration-500"
        style={{ width: `${xWins + oWins === 0 ? 50 : (oWins / (xWins + oWins)) * 100}%` }}
      ></div>
    </div>
  </div>

  <button
    onClick={resetScores}
    className="bg-red-500 text-white font-medium px-4 py-2 rounded hover:bg-red-600 transition shadow"
    title="Reset both scores to zero"
  >
    Reset Scores
  </button>
</div>

<div className="text-lg text-center mb-4">
        <h3 className="text-xl font-semibold">Total Games: {totalGames}</h3>
      </div>

      {/* Game Board */}
      <div
        className="grid grid-cols-3 gap-4 p-4 rounded-2xl"
        style={{
          background: 'linear-gradient(45deg, #f0f0f0, #cacaca)',
          boxShadow: 'inset 5px -5px 2px #5a5a5a, inset -5px 5px 2px #ffffff',
        }}
      >
        {board.map((value, index) => {
          const isWinningBox = winningCombination.includes(index);
          const boxColor = isWinningBox ? winningColor : "";

          return (
            <div
              key={index}
              className={`w-24 h-24 flex items-center justify-center text-4xl font-extrabold rounded-xl
                ${value === "X" ? "text-blue-600" : value === "O" ? "text-pink-500" : ""}
                ${!value ? "hover:shadow-2xl hover:scale-105 cursor-pointer" : ""}
                ${isLight(index) ? "bg-gray-500 opacity-50" : ""}
                shadow-lg transition-all duration-300 ease-in-out select-none`}
              style={{
                background: isWinningBox ? boxColor : 'linear-gradient(45deg, #f0f0f0, #cacaca)',
                boxShadow: '5px -5px 7px #5a5a5a, -5px 5px 7px #ffffff',
              }}
              onClick={() => handleBoxClick(index)}
            >
              {value}
            </div>
          );
        })}
      </div>

      {/* Info & Buttons */}
      <div className="mt-3 flex flex-col items-center gap-2">
        {winner ? (
          <div className="text-2xl font-semibold text-green-600 animate-bounce">
            Winner: {winner}
          </div>
        ) : (
          <div
            className={`text-xl font-medium text-gray-700 transition-all duration-500 ${
              turnChanged ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            Next Turn: {isXNext ? "X" : "O"}
          </div>
        )}

          <div className="flex gap-5">
        <button
          onClick={restartGame}
          className="mt-2 px-6 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg shadow-md transition-all"
        >
          Restart
        </button>

        <button
          onClick={toggleDarkMode}
          className="mt-2 px-6 py-2 bg-gray-300 hover:bg-gray-700 text-white rounded-lg shadow-md transition-all"
        >
          {isDarkMode ? <FaSun color="yellow" size={30} /> : <MdDarkMode color="black" size={30} />}
        </button>
        </div>
      </div>
    </div>
  );
};

export default Computer;
