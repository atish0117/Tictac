import React, { useEffect, useState } from "react";
import { FaSun } from "react-icons/fa";
import { MdDarkMode } from "react-icons/md";
import { ScoreBoard1 } from "../Components/ScoreBoard";
const WINNING_COMBINATIONS = [
  // Horizontal
  [0, 1, 2, 3],
  [4, 5, 6, 7],
  [8, 9, 10, 11],
  [12, 13, 14, 15],
  
  // Vertical
  [0, 4, 8, 12],
  [1, 5, 9, 13],
  [2, 6, 10, 14],
  [3, 7, 11, 15],
  
  // Diagonals
  [0, 5, 10, 15],
  [3, 6, 9, 12],
];

const Xtreme4x4 = () => {
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
  const [totalGames, setTotalGames] = useState(0);
  // Score variables
  const [xScore, setXScore] = useState(0);
  const [oScore, setOScore] = useState(0);

  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

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
        setWinningColor(getRandomColor());
        return squares[a];
      }
    }
    return null;
  };

  const handleBoxClick = (index) => {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = isXNext ? "X" : "O";

    const clickSound = new Audio("/click-sound.mp3");
    clickSound.play();

    if (isXNext) {
      let newXQueue = [...xQueue, index];
      if (newXQueue.length === 5) {
        setXRound((prev) => prev + 1);
      }
      if (newXQueue.length > 5 && oRound > 0) {
        const removeIndex = newXQueue.shift();
        newBoard[removeIndex] = "";
      }
      setXQueue(newXQueue);
    } else {
      let newOQueue = [...oQueue, index];
      if (newOQueue.length === 5) {
        setORound((prev) => prev + 1);
      }
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
      const winSound = new Audio("/win-sound.mp3");
      winSound.play();
      
      // Update the score based on the winner
      if (win === "X") {
        setXScore(xScore + 1);
      } else {
        setOScore(oScore + 1);
      }
    } else {
      setIsXNext(!isXNext);
      setTurnChanged(true);
    }
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
    if (isXNext && xQueue.length >= 5 && oRound > 0 && xQueue[0] === index) {
      return true;
    }
    if (!isXNext && oQueue.length >= 5 && xRound > 0 && oQueue[0] === index) {
      return true;
    }
    return false;
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
      <h1 className="text-4xl font-bold mb-6 text-gray-800 drop-shadow-md">Xtreme Tic-Tac-Toe</h1>

      {/* Scoreboard */}
      {/* <div className="mb-6 w-full max-w-xl bg-white dark:bg-gray-700 rounded-2xl p-4 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className={`flex-1 text-center ${xScore > oScore ? "text-green-600" : ""}`}>
          <h2 className="text-lg font-bold flex items-center justify-center gap-2">
            🧑 Player (X)
          </h2>
          <p className="text-3xl font-extrabold">{xScore}</p>
          <div className="w-full h-2 bg-gray-300 rounded mt-2 overflow-hidden">
            <div
              className="h-full bg-blue-500 transition-all duration-500"
              style={{ width: `${xScore + oScore === 0 ? 50 : (xScore / (xScore + oScore)) * 100}%` }}
            ></div>
          </div>
        </div>

        <div className={`flex-1 text-center ${oScore > xScore ? "text-green-600" : ""}`}>
          <h2 className="text-lg font-bold flex items-center justify-center gap-2">
            🧑 Player (O)
          </h2>
          <p className="text-3xl font-extrabold">{oScore}</p>
          <div className="w-full h-2 bg-gray-300 rounded mt-2 overflow-hidden">
            <div
              className="h-full bg-pink-500 transition-all duration-500"
              style={{ width: `${xScore + oScore === 0 ? 50 : (oScore / (xScore + oScore)) * 100}%` }}
            ></div>
          </div>
        </div>

        <button
          onClick={() => {
            setXScore(0);
            setOScore(0);
          }}
          className="bg-red-500 text-white font-medium px-4 py-2 rounded hover:bg-red-600 transition shadow"
          title="Reset both scores to zero"
        >
          Reset Scores
        </button>
      </div> */}
       <ScoreBoard1 xScore={xScore} oScore={oScore} resetScores={() => { setXScore(0); setOScore(0); }} />


      <div className="text-lg text-center mb-4">
        <h3 className="text-xl font-semibold">Total Games: {totalGames}</h3>
      </div>

      <div
        className="grid grid-cols-4 gap-4 bg-amber-200 p-4 rounded-2xl transform rotate-3d-[30deg]"
        style={{
          boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.4)",
          backdropFilter: "blur(4px)",
          WebkitBackdropFilter: "blur(4px)",
          background: "rgba(250, 242, 242, 0.05)",
          borderRadius: "10px",
          border: "1px solid rgba(255, 255, 255, 0.18)",
        }}
      >
        {board.map((value, index) => {
          const isWinningBox = winningCombination.includes(index);
          const boxColor = isWinningBox ? winningColor : "";

          return (
            <div
              key={index}
              className={`w-24 h-24 flex items-center justify-center text-4xl font-extrabold border-2 rounded-xl ${
                value === "X" ? "text-blue-600" : "text-pink-500"
              } ${!value ? "hover:shadow-2xl hover:scale-105 cursor-pointer" : ""} ${
                isLight(index) ? "bg-gray-300 opacity-70" : "bg-white"
              } shadow-lg transition-all duration-300 ease-in-out select-none`}
              style={{ backgroundColor: boxColor }}
              onClick={() => handleBoxClick(index)}
            >
              {value}
            </div>
          );
        })}
      </div>

      <div className="mt-6 flex flex-col items-center gap-2">
        {winner ? (
          <div className="text-2xl font-semibold text-green-600 animate-bounce">Winner: {winner}</div>
        ) : (
          <div
            className={`text-xl font-medium text-gray-700 transition-all duration-500 ${
              turnChanged ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
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
          {isDarkMode ? <FaSun color="yellow" size={30} /> : <MdDarkMode color="black" size={30} />}
        </button>
      </div>
    </div>
  );
};

export default Xtreme4x4;
