import React, { useState, useEffect } from "react";
import { FaSun } from "react-icons/fa";
import { MdDarkMode } from "react-icons/md";
import {ScoreBoard1} from '../Components/ScoreBoard'
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

const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(""));
  const [xQueue, setXQueue] = useState([]);
  const [oQueue, setOQueue] = useState([]);
  const [xRound, setXRound] = useState(0);
  const [oRound, setORound] = useState(0);
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState(null);
  const [winningCombination, setWinningCombination] = useState([]); // Store winning combination
  const [winningColor, setWinningColor] = useState(""); // Store the color for the winning boxes
  const [isDarkMode, setIsDarkMode] = useState(false); // For Dark Mode Toggle
  const [turnChanged, setTurnChanged] = useState(false); // For detecting turn change
  const[totalGames, setTotalGames] = useState(0)
 // Score state
  const [xScore, setXScore] = useState(0);
  const [oScore, setOScore] = useState(0);

  // Function to generate random color
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
      const [a, b, c] = combo;
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        setWinningCombination(combo); // Set the winning combination
        setWinningColor(getRandomColor()); // Generate and set the winning color
        return squares[a];
      }
    }
    return null;
  };

  const handleBoxClick = (index) => {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = isXNext ? "X" : "O";

    // Play sound on box fill
    const clickSound = new Audio("/click-sound.mp3");
    clickSound.play();

    if (isXNext) {
      let newXQueue = [...xQueue, index];
      if (newXQueue.length === 3) {
        setXRound(prev => prev + 1);
      }
      if (newXQueue.length > 3 && oRound > 0) {
        const removeIndex = newXQueue.shift();
        newBoard[removeIndex] = "";
      }
      setXQueue(newXQueue);
    } else {
      let newOQueue = [...oQueue, index];
      if (newOQueue.length === 3) {
        setORound(prev => prev + 1);
      }
      if (newOQueue.length > 3 && xRound > 0) {
        const removeIndex = newOQueue.shift();
        newBoard[removeIndex] = "";
      }
      setOQueue(newOQueue);
    }

    setBoard(newBoard);
    const win = calculateWinner(newBoard);
    if (win) {
      setWinner(win);
      // Play sound when winner is declared
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
      setTurnChanged(true); // Trigger turn change effect
    }
  };

   // ...Total numbers of game  ...  
      useEffect(() => {
        setTotalGames(xScore + oScore);
      }, [xScore, oScore]);

  const restartGame = () => {
    setBoard(Array(9).fill(""));
    setXQueue([]);
    setOQueue([]);
    setXRound(0);
    setORound(0);
    setIsXNext(true);
    setWinner(null);
    setWinningCombination([]); // Reset winning combination
    setWinningColor(""); // Reset winning color
    setTurnChanged(false); // Reset turn change effect
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

  const toggleDarkMode = () => {
    setIsDarkMode(prev => !prev);
  };

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center ${isDarkMode ? "bg-gray-800 text-white" : "bg-gradient-to-br from-blue-100 to-purple-200"} p-6`}>
      <h1 className="text-4xl font-bold mb-6 text-gray-800 drop-shadow-md">
      Xtreme Tic-Tac-Toe (PvP)
      </h1>

       {/* Scoreboard */}
       <ScoreBoard1 xScore={xScore} oScore={oScore} resetScores={() => { setXScore(0); setOScore(0); }} />

      <div className="text-lg text-center mb-4">
        <h3 className="text-xl font-semibold">Total Games: {totalGames}</h3>
      </div>

      <div 
        className="grid grid-cols-3 gap-4 bg-amber-200 p-4 rounded-2xl transform rotate-3d-[30deg]" 
        style={{ 
          boxShadow: '0 8px 32px 0 rgba( 31, 38, 135, 0.4 )',
          backdropFilter: 'blur(4px)',
          WebkitBackdropFilter: 'blur(4px)',
          background: 'rgba( 250, 242, 242, 0.05 )',
          borderRadius: '10px',
          border: '1px solid rgba( 255, 255, 255, 0.18 )',
        }}
      >
        {board.map((value, index) => {
          const isWinningBox = winningCombination.includes(index);
          const boxColor = isWinningBox ? winningColor : ""; // Apply the winning color to the winning boxes

          return (
            <div
              key={index}
              className={`w-24 h-24 flex items-center justify-center 
                text-4xl font-extrabold border-2 rounded-xl
                ${value === "X" ? "text-blue-600" : "text-pink-500"} 
                ${!value ? "hover:shadow-2xl hover:scale-105 cursor-pointer hover:bg-gray-300" : ""}
                ${isLight(index) ? "bg-gray-300 opacity-70" : "bg-white"}
                shadow-lg transition-all duration-300 ease-in-out select-none`}
              style={{ backgroundColor: boxColor }} // Apply the winning color here
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
          <div className={`text-xl font-medium text-gray-700 transition-all duration-500 
            ${turnChanged ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
            Next Turn: {isXNext ? "X" : "O"}
          </div>
        )}

          <div className="flex gap-6">
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
          {isDarkMode ? <FaSun color="yellow" size={30}/> : <MdDarkMode color="black" size={30}/>}
        </button>
        </div>
      </div>
    </div>
  );
};

export default TicTacToe;



