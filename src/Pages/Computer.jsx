import React, { useState, useEffect } from "react";
import { FaSun } from "react-icons/fa";
import { MdDarkMode } from "react-icons/md";

const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
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
    if (isXNext && xQueue.length >= 3 && oRound > 0 && xQueue[0] === index) {
      return true;
    }
    if (!isXNext && oQueue.length >= 3 && xRound > 0 && oQueue[0] === index) {
      return true;
    }
    return false;
  };

  const calculateWinner = (squares) => {
    for (let combo of WINNING_COMBINATIONS) {
      const [a, b, c] = combo;
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return { winner: squares[a], combination: combo }; // Just return the winner and combination
      }
    }
    return { winner: null, combination: [] }; // If no winner, return null
  };

  const minimax = (board, depth, isMaximizingPlayer) => {
    const result = calculateWinner(board); // FIX: get .winner
    if (result.winner === "X") return -10 + depth;
    if (result.winner === "O") return 10 - depth;
    if (!board.includes("")) return 0; // Draw case
  
    if (isMaximizingPlayer) {
      let bestScore = -Infinity;
      for (let i = 0; i < board.length; i++) {
        if (board[i] === "") {
          board[i] = "O";
          let score = minimax(board, depth + 1, false);
          board[i] = "";
          bestScore = Math.max(score, bestScore);
        }
      }
      return bestScore;
    } else {
      let bestScore = Infinity;
      for (let i = 0; i < board.length; i++) {
        if (board[i] === "") {
          board[i] = "X";
          let score = minimax(board, depth + 1, true);
          board[i] = "";
          bestScore = Math.min(score, bestScore);
        }
      }
      return bestScore;
    }
  };
  

  const computerMove = () => {
    if (winner) return; // Don't let the computer play if there's already a winner

    let bestScore = -Infinity;
    let bestMove;
    for (let i = 0; i < board.length; i++) {
      if (board[i] === "") {
        board[i] = "O";
        let score = minimax(board, 0, false);
        board[i] = "";
        if (score > bestScore) {
          bestScore = score;
          bestMove = i;
        }
      }
    }

    const newBoard = [...board];
    newBoard[bestMove] = "O";
    const clickSound = new Audio("/click-sound.mp3");
    clickSound.play();

    let newOQueue = [...oQueue, bestMove];
    if (newOQueue.length === 3) {
      setORound((prev) => prev + 1);
    }
    if (newOQueue.length > 3 && xRound > 0) {
      const removeIndex = newOQueue.shift();
      newBoard[removeIndex] = "";
    }
    setOQueue(newOQueue);

    setBoard(newBoard);
    const result = calculateWinner(newBoard);
    if (result.winner) {
      setWinner(result.winner); // Only set winner when someone wins
      setWinningCombination(result.combination); // Set the winning combination
      setWinningColor(getRandomColor()); // Only change color when there's a winner
      const winSound = new Audio("/win-sound.mp3");
      winSound.play();
    } else {
      setIsXNext(true); // Switch to player's turn
      setTurnChanged(true);
    }
  };

  const handleBoxClick = (index) => {
    if (board[index] || winner || !isXNext) return; // Player's turn only

    const newBoard = [...board];
    newBoard[index] = "X";

    const clickSound = new Audio("/click-sound.mp3");
    clickSound.play();

    let newXQueue = [...xQueue, index];
    if (newXQueue.length === 3) {
      setXRound((prev) => prev + 1);
    }
    if (newXQueue.length > 3 && oRound > 0) {
      const removeIndex = newXQueue.shift();
      newBoard[removeIndex] = "";
    }
    setXQueue(newXQueue);

    setBoard(newBoard);
    const result = calculateWinner(newBoard);
    if (result.winner) {
      setWinner(result.winner);
      setWinningCombination(result.combination);
      setWinningColor(getRandomColor()); // Only set color if there's a winner
      const winSound = new Audio("/win-sound.mp3");
      winSound.play();
    } else {
      setIsXNext(false); // Switch to computer's turn
      setTurnChanged(true);
    }
  };

  useEffect(() => {
    if (!isXNext && !winner) {
      setTimeout(computerMove, 1000); // Give the computer a delay before playing
    }
  }, [isXNext, board, winner]);

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

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center ${
        isDarkMode
          ? "bg-gray-800 text-white"
          : "bg-gradient-to-br from-blue-100 to-purple-200"
      } p-6`}
    >
      <h1 className="text-4xl font-bold mb-6 text-gray-800 drop-shadow-md">
        Xtreme Tic-Tac-Toe
      </h1>

      <div
        className="grid grid-cols-3 gap-4 bg-amber-200 p-4 rounded-2xl transform rotate-3d-[30deg]"
      
        style={{
            // borderRadius: '71px',
            background: 'linear-gradient(45deg, #f0f0f0, #cacaca,)',
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
                          ${
                            value === "X"
                              ? "text-blue-600"
                              : value === "O"
                              ? "text-pink-500"
                              : ""
                          }
                          ${
                            !value
                              ? "hover:shadow-2xl hover:scale-105 cursor-pointer"
                              : ""
                          }
                           ${
                             isLight(index)
                               ? "bg-gray-300 opacity-70"
                               : "bg-white"
                           }
                          shadow-lg transition-all duration-300 ease-in-out select-none`}
                          style={{
                            // borderRadius: '61px',
                            background: 'linear-gradient(45deg, #f0f0f0, #cacaca)',
                            boxShadow: '5px -5px 7px #5a5a5a, -5px 5px 7px #ffffff',
                          }}
                          
                          
              onClick={() => handleBoxClick(index)}
            >
              {value}
            </div>
          );
        })}
      </div>

      <div className="mt-6 flex flex-col items-center gap-2">
        {winner ? (
          <div className="text-2xl font-semibold text-green-600 animate-bounce">
            Winner: {winner}
          </div>
        ) : (
          <div
            className={`text-xl font-medium text-gray-700 transition-all duration-500 ${
              turnChanged
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
          >
            Next Turn: {isXNext ? "X" : "O"}
          </div>
        )}

        <button
          onClick={restartGame}
          className="mt-4 px-6 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg shadow-md transition-all"
        >
          Restart
        </button>

        <button
          onClick={toggleDarkMode}
          className="mt-4 px-6 py-2 bg-gray-300 hover:bg-gray-700 text-white rounded-lg shadow-md transition-all"
        >
          {isDarkMode ? (
            <FaSun color="yellow" size={30} />
          ) : (
            <MdDarkMode color="black" size={30} />
          )}
        </button>
      </div>
    </div>
  );
};

export default Computer;
