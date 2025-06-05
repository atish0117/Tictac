import React, { useState, useEffect } from "react";
import { FaSun } from "react-icons/fa";
import { MdDarkMode } from "react-icons/md";
import { ScoreBoard2 } from "../Components/ScoreBoard";
const WINNING_COMBINATIONS = [
  [0, 1, 2, 3],
  [4, 5, 6, 7],
  [8, 9, 10, 11],
  [12, 13, 14, 15],
  [0, 4, 8, 12],
  [1, 5, 9, 13],
  [2, 6, 10, 14],
  [3, 7, 11, 15],
  [0, 5, 10, 15],
  [3, 6, 9, 12],
];

const getRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const AI_Xtreme4x4 = () => {
  const [board, setBoard] = useState(Array(16).fill(""));
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
  const [xScore, setXScore] = useState(0);
  const [oScore, setOScore] = useState(0);
  const[totalGames, setTotalGames] = useState(0);
  const calculateWinner = (squares) => {
    for (let combo of WINNING_COMBINATIONS) {
      const [a, b, c, d] = combo;
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c] &&
        squares[a] === squares[d]
      ) {
        setWinningCombination(combo);
        return squares[a];
      }
    }
    return null;
  };

  const isDraw = (squares) => {
    return squares.every((square) => square !== "") && !calculateWinner(squares);
  };

  const makeMove = (index, player) => {
    const newBoard = [...board];
    newBoard[index] = player;

    if (player === "X") {
      let newXQueue = [...xQueue, index];
      if (newXQueue.length === 5) setXRound((prev) => prev + 1);
      if (newXQueue.length > 5 && oRound > 0) {
        const removeIndex = newXQueue.shift();
        newBoard[removeIndex] = "";
      }
      setXQueue(newXQueue);
    } else {
      let newOQueue = [...oQueue, index];
      if (newOQueue.length === 5) setORound((prev) => prev + 1);
      if (newOQueue.length > 5 && xRound > 0) {
        const removeIndex = newOQueue.shift();
        newBoard[removeIndex] = "";
      }
      setOQueue(newOQueue);
    }

    setBoard(newBoard);
    const win = calculateWinner(newBoard);
    if (win) {
      setWinner(win);
      setWinningColor(getRandomColor());
      new Audio("/win-sound.mp3").play();
      if (win === "X") setXScore((prev) => prev + 1);
      else setOScore((prev) => prev + 1);
    } else if (isDraw(newBoard)) {
      setWinner("Draw");
    } else {
      setIsXNext(player === "X" ? false : true);
      setTurnChanged(true);
    }
  };

  const handleBoxClick = (index) => {
    if (board[index] || winner || !isXNext) return;
    new Audio("/click-sound.mp3").play();
    makeMove(index, "X");
  };

  useEffect(()=>{
  setTotalGames(xScore+oScore)
  },[xScore,oScore])

  const restartGame = () => {
    setBoard(Array(16).fill(""));
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

  const isLight = (index) => {
    if (winner) return false;
    if (isXNext && xQueue.length >= 5 && oRound > 0 && xQueue[0] === index) return true;
    if (!isXNext && oQueue.length >= 5 && xRound > 0 && oQueue[0] === index) return true;
    return false;
  };

  const toggleDarkMode = () => setIsDarkMode((prev) => !prev);

  // Minimax AI (limited depth for performance)
  const minimax = (boardState, depth, isMaximizing) => {
    const winner = calculateWinner(boardState);
    if (winner === "O") return 10 - depth;
    if (winner === "X") return depth - 10;
    if (!boardState.includes("") || depth >= 4) return 0;

    const scores = [];
    for (let i = 0; i < 16; i++) {
      if (boardState[i] === "") {
        const newBoard = [...boardState];
        newBoard[i] = isMaximizing ? "O" : "X";
        scores.push(minimax(newBoard, depth + 1, !isMaximizing));
      }
    }

    return isMaximizing ? Math.max(...scores) : Math.min(...scores);
  };

  const getBestMove = () => {
    let bestScore = -Infinity;
    let move = null;
    for (let i = 0; i < 16; i++) {
      if (board[i] === "") {
        const newBoard = [...board];
        newBoard[i] = "O";
        const score = minimax(newBoard, 0, false);
        if (score > bestScore) {
          bestScore = score;
          move = i;
        }
      }
    }
    return move;
  };

  // Auto-move for AI
  useEffect(() => {
    if (!isXNext && !winner) {
      const timeout = setTimeout(() => {
        const move = getBestMove();
        if (move !== null) makeMove(move, "O");
      }, 600);
      return () => clearTimeout(timeout);
    }
  }, [isXNext, board, winner]);

  const resetScores=()=>{
    setXScore(0)
    setOScore(0)
  }
  return (
    <div className={`min-h-screen flex flex-col items-center justify-center ${isDarkMode ? "bg-gray-800 text-white" : "bg-gradient-to-br from-blue-100 to-purple-200"} p-6`}>
      <h1 className="text-4xl font-bold mb-6 text-gray-800 drop-shadow-md dark:text-white">Xtreme Tic-Tac-Toe</h1>

      {/* Scoreboard */}
      <ScoreBoard2 xScore={xScore} oScore={oScore} resetScore={resetScores} />
      

      <div className="text-lg text-center mb-4">
        <h3 className="text-xl font-semibold">Total Games: {totalGames}</h3>
      </div>

      {/* Board */}
      <div className="grid grid-cols-4 gap-4 p-4 bg-amber-200 rounded-2xl">
        {board.map((value, index) => {
          const isWinningBox = winningCombination.includes(index);
          const boxColor = isWinningBox ? winningColor : "";
          return (
            <div
              key={index}
              onClick={() => handleBoxClick(index)}
              className={`w-24 h-24 flex items-center justify-center text-4xl font-extrabold border-2 rounded-xl 
              ${value === "X" ? "text-blue-600" : "text-pink-500"} 
              ${!value ? "hover:shadow-2xl hover:scale-105 cursor-pointer" : ""} 
              ${isLight(index) ? "bg-gray-300 opacity-70" : "bg-white"} 
              transition-all duration-300 select-none shadow-md`}
              style={{ backgroundColor: boxColor }}
            >
              {value}
            </div>
          );
        })}
      </div>

      <div className="mt-6 flex flex-col items-center gap-2">
        {winner && winner !== "Draw" && (
          <div className="text-2xl font-semibold text-green-600 animate-bounce">Winner: {winner}</div>
        )}
        {winner === "Draw" && (
          <div className="text-xl font-semibold text-yellow-600">It's a Draw!</div>
        )}
        {!winner && (
          <div className={`text-xl font-medium transition-all duration-500 ${turnChanged ? "opacity-100" : "opacity-0"}`}>
            Next Turn: {isXNext ? "X" : "O"}
          </div>
        )}
        <div className="flex gap-4 mt-4">
          <button onClick={restartGame} className="px-6 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg">
            Restart
          </button>
          <button onClick={toggleDarkMode} className="px-6 py-2 bg-gray-300 dark:bg-gray-600 hover:bg-gray-700 text-white rounded-lg">
            {isDarkMode ? <FaSun color="yellow" size={24} /> : <MdDarkMode color="black" size={24} />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AI_Xtreme4x4;
