import React, { useState, useEffect } from "react";
import { FaSun } from "react-icons/fa";
import { MdDarkMode } from "react-icons/md";
import { ScoreBoard2 } from "../Components/ScoreBoard";
import { useTheme } from "../Components/Context/ThemeContext";

const SIZE = 6;
const getRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) color += letters[Math.floor(Math.random() * 16)];
  return color;
};

const AI_Xtreme6x6 = () => {
  const [board, setBoard] = useState(Array(SIZE * SIZE).fill(""));
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

    const {isDarkMode}=useTheme()
  const calculateWinner = (squares) => {
    const lines =generateWinningCombos(SIZE,6)
    for (let line of lines) {
      const [a, b, c, d, e, f] = line;
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c] &&
        squares[a] === squares[d] &&
        squares[a] === squares[e] &&
        squares[a] === squares[f]
      ) {
        setWinningCombination(line);
        return squares[a];  // 'X' or 'O'
      }
    }
    return null;
  };
  
// Generate winning combinations dynamically for 6x6 board
  const generateWinningCombos = (size, inARow) => {
    const combos = [];
    // Horizontal, Vertical, Diagonal combinations
    for (let row = 0; row < size; row++) {
      for (let col = 0; col <= size - inARow; col++) {
        const start = row * size + col;
        combos.push(Array.from({ length: inARow }, (_, i) => start + i));
      }
    }

    for (let col = 0; col < size; col++) {
      for (let row = 0; row <= size - inARow; row++) {
        const start = row * size + col;
        combos.push(Array.from({ length: inARow }, (_, i) => start + i * size));
      }
    }

    for (let row = 0; row <= size - inARow; row++) {
      for (let col = 0; col <= size - inARow; col++) {
        const start = row * size + col;
        combos.push(Array.from({ length: inARow }, (_, i) => start + i * (size + 1)));
      }
    }

    for (let row = 0; row <= size - inARow; row++) {
      for (let col = inARow - 1; col < size; col++) {
        const start = row * size + col;
        combos.push(Array.from({ length: inARow }, (_, i) => start + i * (size - 1)));
      }
    }

    return combos;
  };

  const isDraw = (squares) => squares.every((s) => s !== "") && !calculateWinner(squares);

  const makeMove = (index, player) => {
    const newBoard = [...board];
    newBoard[index] = player;

    if (player === "X") {
      let newXQueue = [...xQueue, index];
      if (newXQueue.length === 8) setXRound((prev) => prev + 1);
      if (newXQueue.length > 8 && oRound > 0) {
        const removeIndex = newXQueue.shift();
        newBoard[removeIndex] = "";
      }
      setXQueue(newXQueue);
    } else {
      let newOQueue = [...oQueue, index];
      if (newOQueue.length === 8) setORound((prev) => prev + 1);
      if (newOQueue.length > 8 && xRound > 0) {
        const removeIndex = newOQueue.shift();
        newBoard[removeIndex] = "";
      }
      setOQueue(newOQueue);
    }

    setBoard(newBoard);
    const win = calculateWinner(newBoard);
    if (win) {
      setWinner(win);
      setWinningColor(getRandomColor());  // This will generate a random color for the winning line
      new Audio("/win-sound.mp3").play();
      if (win === "X") setXScore((prev) => prev + 1);
      else setOScore((prev) => prev + 1);
    } else if (isDraw(newBoard)) {
      setWinner("Draw");
    } else {
      setIsXNext(player !== "X");
      setTurnChanged(true);
    }
  };

  const handleBoxClick = (index) => {
    if (board[index] || winner || !isXNext) return;
    new Audio("/click-sound.mp3").play();
    makeMove(index, "X");
  };

  const restartGame = () => {
    setBoard(Array(SIZE * SIZE).fill(""));
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
    if (isXNext && xQueue.length >= 6 && oRound > 0 && xQueue[0] === index) return true;
    if (!isXNext && oQueue.length >= 6 && xRound > 0 && oQueue[0] === index) return true;
    return false;
  };


  const minimax = (boardState, depth, isMaximizing) => {
    const result = calculateWinner(boardState);
    if (result === "O") return 10 - depth;
    if (result === "X") return depth - 10;
    if (!boardState.includes("") || depth >= 3) return 0;

    const scores = [];
    for (let i = 0; i < boardState.length; i++) {
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
    for (let i = 0; i < board.length; i++) {
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

  // auto move for AI
  useEffect(() => {
    if (!isXNext && !winner) {
      const timeout = setTimeout(() => {
        const move = getBestMove();
        if (move !== null) makeMove(move, "O");
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [isXNext, board, winner]);

  const resetScores=()=>{
    setXScore(0)
    setOScore(0)
  }

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center ${isDarkMode ? "bg-gray-800 text-white" : "bg-gradient-to-br from-yellow-100 to-pink-200"} p-6`}>
      <h1 className="text-4xl font-bold mb-6 drop-shadow-md">Xtreme 6x6 Tic-Tac-Toe (AI Mode)</h1>
        {/* Scoreboard */}
     <ScoreBoard2 xScore={xScore} oScore={oScore} resetScores={resetScores}/>
      <div className="grid grid-cols-6 gap-2 rounded-xl p-4 shadow-inner"
       style={{ 
        boxShadow: '0 8px 32px 0 rgba( 31, 38, 135, 0.4 )',
        backdropFilter: 'blur(4px)',
        WebkitBackdropFilter: 'blur(4px)',
        background: 'rgba( 250, 242, 242, 0.05 )',
        borderRadius: '10px',
        border: '1px solid rgba( 255, 255, 255, 0.18 )',
      }}
      >
      {board.map((val, idx) => {
  const isWinning = winningCombination.includes(idx);
  const bgColor = isWinning ? winningColor : "";
  return (
    <div
    key={idx}
    onClick={() => handleBoxClick(idx)}
    className={`w-16 h-16 md:w-18 md:h-18 flex items-center justify-center text-4xl font-extrabold border-2 rounded-xl 
    ${val === "X" ? "text-blue-600" : "text-pink-500"} 
    ${!val ? "hover:shadow-2xl hover:scale-105 cursor-pointer hover:bg-gray-300" : ""} 
    ${isLight(idx) ? "bg-gray-300 opacity-70" : "bg-white"} 
    transition-all duration-300 select-none shadow-md`}
    style={{ backgroundColor: bgColor }}
  >
    {val}
  </div>
  );
})}

      </div>

      <div className="mt-2 flex flex-col items-center gap-2">
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
          <button onClick={restartGame} className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700 transition">
            Restart
          </button>
         
        </div>
      </div>
    </div>
  );
};

export default AI_Xtreme6x6;
