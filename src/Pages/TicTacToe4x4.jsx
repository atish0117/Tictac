import React, { useState, useEffect } from 'react';
import { ScoreBoard3 } from '../Components/ScoreBoard';
import { useTheme } from '../Components/Context/ThemeContext';
const TicTacToe4x4 = () => {
  const size = 4;
  const totalCells = size * size;
  const [board, setBoard] = useState(Array(totalCells).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winnerInfo, setWinnerInfo] = useState({ winner: null, winningCells: [] });
  const [xWins, setXWins] = useState(0);
  const [oWins, setOWins] = useState(0);
  const [draws, setDraws] = useState(0);
  const [totalGames, setTotalGames] = useState(0);

    const {isDarkMode}=useTheme()
  const handleClick = (index) => {
    if (board[index] || winnerInfo.winner) return;
    const newBoard = [...board];
    newBoard[index] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    setIsXNext(!isXNext);
  };

  useEffect(() => {
    const result = calculateWinner(board, size);
    if (result) {
      setWinnerInfo(result);
      if (result.winner === 'X') setXWins((prev) => prev + 1);
      if (result.winner === 'O') setOWins((prev) => prev + 1);
    } else if (!board.includes(null)) {
      setWinnerInfo({ winner: 'Draw', winningCells: [] });
      setDraws((prev) => prev + 1);
      setTimeout(() => resetGame(), 2000);
    }
  }, [board]);

  const resetGame = () => {
    setBoard(Array(totalCells).fill(null));
    setIsXNext(true);
    setWinnerInfo({ winner: null, winningCells: [] });
  };

  const resetScores = () => {
    setXWins(0);
    setOWins(0);
    setDraws(0);
    setTotalGames(0);
  };

  // ...Total numbers of game  ...  
  useEffect(() => {
    setTotalGames(xWins + oWins + draws);
  }, [xWins, oWins, draws]);
  

  const calculateWinner = (squares, size) => {
    const lines = generateWinningCombos(size, 4);
    for (let line of lines) {
      const [a, b, c, d] = line;
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c] &&
        squares[a] === squares[d]
      ) {
        return { winner: squares[a], winningCells: line };
      }
    }
    return null;
  };

  const generateWinningCombos = (size, inARow) => {
    const combos = [];

    // Horizontal
    for (let row = 0; row < size; row++) {
      for (let col = 0; col <= size - inARow; col++) {
        const start = row * size + col;
        combos.push(Array.from({ length: inARow }, (_, i) => start + i));
      }
    }

    // Vertical
    for (let col = 0; col < size; col++) {
      for (let row = 0; row <= size - inARow; row++) {
        const start = row * size + col;
        combos.push(Array.from({ length: inARow }, (_, i) => start + i * size));
      }
    }

    // Diagonal ↘
    for (let row = 0; row <= size - inARow; row++) {
      for (let col = 0; col <= size - inARow; col++) {
        const start = row * size + col;
        combos.push(Array.from({ length: inARow }, (_, i) => start + i * (size + 1)));
      }
    }

    // Diagonal ↙
    for (let row = 0; row <= size - inARow; row++) {
      for (let col = inARow - 1; col < size; col++) {
        const start = row * size + col;
        combos.push(Array.from({ length: inARow }, (_, i) => start + i * (size - 1)));
      }
    }

    return combos;
  };

  const renderCell = (index) => {
    const isWinning = winnerInfo.winningCells.includes(index);
    return (
      <div
        key={index}
        onClick={() => handleClick(index)}
        className={`
          w-16 h-16 md:w-20 md:h-20 border-2 rounded-md 
          flex items-center justify-center text-2xl font-bold cursor-pointer
          transition-all duration-200 ease-in-out select-none
          ${
            board[index] === 'X'
              ? 'text-blue-600'
              : board[index] === 'O'
              ? 'text-red-500'
              : 'text-pink-500'
          }
          ${!board[index] && !winnerInfo.winner ? 'hover:bg-gray-200' : ''}
          ${isWinning ? 'bg-green-300 animate-pulse' : 'bg-white'}
        ` }
      >
        {board[index]}
      </div>
    );
  };

  return (
    <div className={`flex flex-col items-center px-4
              ${
        isDarkMode ? "bg-gray-800 text-white" : "bg-gradient-to-br from-blue-100 to-purple-200"
      }`}>
      <h1 className="text-3xl font-bold mb-4 text-center">4x4 Tic Tac Toe (PvP)</h1>

    
          <ScoreBoard3 xWins={xWins} oWins={oWins} draws={draws} resetScores={resetScores}/>
      

      <div className="text-lg text-center mb-4">
        <h3 className="text-xl font-semibold">Total Games: {totalGames}</h3>
      </div>

      {/* Game Board */}
      <div
        className={`grid gap-2 grid-cols-4 p-4`}
        style={{ maxWidth: 'fit-content',
          boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.4)",
          backdropFilter: "blur(4px)",
          WebkitBackdropFilter: "blur(4px)",
          background: "rgba(250, 242, 242, 0.05)",
          borderRadius: "10px",
          border: "1px solid rgba(255, 255, 255, 0.18)",
          }}
      >
        {board.map((_, i) => renderCell(i))}
      </div>

      {/* Game Info */}
      <div className="mt-4 text-lg font-medium text-center">
        {winnerInfo.winner ? (
          winnerInfo.winner === 'Draw' ? (
            <p className="text-yellow-600">🚫 It's a Draw!</p>
          ) : (
            <p className="text-green-600">🎉 Winner: {winnerInfo.winner}</p>
          )
        ) : (
          <p>Next Turn: {isXNext ? 'X (Player 1)' : 'O (Player 2)'}</p>
        )}
      </div>

      {/* Buttons */}
      <div className="mt-4 flex gap-4">
        <button
          onClick={resetGame}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Restart
        </button>
       
      </div>
    </div>
  );
};

export default TicTacToe4x4;
