import React, { useState, useEffect } from 'react';

const TicTacToe6x6 = () => {
  const size = 6;
  const totalCells = size * size;
  const [board, setBoard] = useState(Array(totalCells).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winnerInfo, setWinnerInfo] = useState({ winner: null, winningCells: [] });
  const [xWins, setXWins] = useState(0);
  const [oWins, setOWins] = useState(0);
  const [draws, setDraws] = useState(0);
  const [totalGames, setTotalGames] = useState(0);

  // Handle the cell click
  const handleClick = (index) => {
    if (board[index] || winnerInfo.winner) return;

    const newBoard = [...board];
    newBoard[index] = isXNext ? 'X' : 'O';
    setBoard(newBoard);

    const result = calculateWinner(newBoard, size);
    if (result) {
      setWinnerInfo(result);
      if (result.winner === 'X') {
        setXWins((prev) => prev + 1);
      } else if (result.winner === 'O') {
        setOWins((prev) => prev + 1);
      }
    } else {
      setIsXNext(!isXNext);
    }
  };

  // Calculate winner based on the board state
  const calculateWinner = (squares, size) => {
    const lines = generateWinningCombos(size, 6); // 6 in a row to win
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
        return { winner: squares[a], winningCells: line };
      }
    }
    return null;
  };

  // Generate winning combinations (horizontal, vertical, diagonal)
  const generateWinningCombos = (size, inARow) => {
    const combos = [];

    // Horizontal
    for (let row = 0; row < size; row++) {
      for (let col = 0; col <= size - inARow; col++) {
        const start = row * size + col;
        const combo = Array.from({ length: inARow }, (_, i) => start + i);
        combos.push(combo);
      }
    }

    // Vertical
    for (let col = 0; col < size; col++) {
      for (let row = 0; row <= size - inARow; row++) {
        const start = row * size + col;
        const combo = Array.from({ length: inARow }, (_, i) => start + i * size);
        combos.push(combo);
      }
    }

    // Diagonal ↘
    for (let row = 0; row <= size - inARow; row++) {
      for (let col = 0; col <= size - inARow; col++) {
        const start = row * size + col;
        const combo = Array.from({ length: inARow }, (_, i) => start + i * (size + 1));
        combos.push(combo);
      }
    }

    // Diagonal ↙
    for (let row = 0; row <= size - inARow; row++) {
      for (let col = inARow - 1; col < size; col++) {
        const start = row * size + col;
        const combo = Array.from({ length: inARow }, (_, i) => start + i * (size - 1));
        combos.push(combo);
      }
    }

    return combos;
  };

  // Reset the game when clicked
  const resetGame = () => {
    setBoard(Array(totalCells).fill(null));
    setIsXNext(true);
    setWinnerInfo({ winner: null, winningCells: [] });
    setTotalGames((prev) => prev + 1);
  };

   // ...Total numbers of game  ...  
      useEffect(() => {
        setTotalGames(xWins + oWins + draws);
      }, [xWins, oWins, draws]);

  // Reset scores when clicked
  const resetScores = () => {
    setXWins(0);
    setOWins(0);
    setDraws(0);
    setTotalGames(0);
  };

  // Check for draw when all cells are filled
  useEffect(() => {
    if (!winnerInfo.winner && !board.includes(null)) {
      setWinnerInfo({ winner: 'Draw', winningCells: [] });
      setDraws((prev) => prev + 1);
      setTimeout(() => resetGame(), 2000); // Reset after 2 seconds
    }
  }, [board, winnerInfo]);

  // Render each cell
  const renderCell = (index) => {
    const isWinningCell = winnerInfo.winningCells.includes(index);
    return (
      <button
        key={index}
        className={`w-16 h-16 md:w-20 md:h-20 border-2 flex items-center justify-center 
          text-2xl font-bold cursor-pointer rounded-md
          transition-all duration-200 ease-in-out select-none
          ${
            board[index] === 'X'
              ? 'text-blue-600'
              : board[index] === 'O'
              ? 'text-red-500'
              : 'text-pink-500'
          }
          ${
          isWinningCell ? 'bg-green-300' : 'bg-white'
        }
        ${!board[index] && !winnerInfo.winner ? 'hover:bg-gray-200' : ''}`}
        onClick={() => handleClick(index)}
      >
        {board[index]}
      </button>
    );
  };

  return (
    <div className="flex flex-col items-center pt-10 bg-gradient-to-br from-blue-100 to-purple-200 ">
      <h1 className="text-3xl font-bold mb-4">6x6 Tic Tac Toe (PVP)</h1>

      {/* Detailed Scoreboard */}
      <div className="w-1/2 flex justify-between items-center bg-white p-4 rounded-lg shadow-lg mb-6">
  <div className="text-center">
    <p className="text-xl font-bold text-gray-800">🧑 Player (X)</p>
    <p className="text-3xl font-extrabold text-blue-600">{xWins}</p>
    <p className="text-lg text-gray-600">Wins</p>
  </div>
  <div className="text-center">
    <p className="text-xl font-bold text-gray-800">🧑 Player (O)</p>
    <p className="text-3xl font-extrabold text-red-600">{oWins}</p>
    <p className="text-lg text-gray-600">Wins</p>
  </div>
  <div className="text-center">
    <p className="text-xl font-bold text-gray-800">🔄 Draws</p>
    <p className="text-3xl font-extrabold text-yellow-600">{draws}</p>
  </div>
</div>




      <div className="text-lg text-center mb-4">
        <h3 className="text-xl font-semibold">Total Games: {totalGames}</h3>
      </div>

      {/* Game Grid */}
      <div
        className={`grid gap-1`}
        style={{ gridTemplateColumns: `repeat(${size}, 4rem)` }}
      >
        {board.map((_, index) => renderCell(index))}
      </div>

      {/* Turn or Winner Info */}
      <div className="mt-4 text-lg font-medium">
        {winnerInfo.winner ? (
          winnerInfo.winner === 'Draw' ? (
            <p className="text-yellow-600">🚫 Draw</p>
          ) : (
            <p className="text-green-600">🎉 Winner: {winnerInfo.winner}</p>
          )
        ) : (
          <p>Next Turn: {isXNext ? 'X' : 'O'}</p>
        )}
      </div>

      {/* Restart Button */}
      <button
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        onClick={resetGame}
      >
        Restart Game
      </button>

      {/* Reset Scores Button */}
      <button
        className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        onClick={resetScores}
      >
        Reset Scores
      </button>
    </div>
  );
};

export default TicTacToe6x6;
