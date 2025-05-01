import React, { useState, useEffect } from 'react';

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

  const handleClick = (index) => {
    if (board[index] || winnerInfo.winner) return;

    const newBoard = [...board];
    newBoard[index] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    setIsXNext(!isXNext);
  };

  // Check for win or draw
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
    setTotalGames((prev) => prev + 1);
  };

  const resetScores = () => {
    setXWins(0);
    setOWins(0);
    setDraws(0);
    setTotalGames(0);
  };

  const calculateWinner = (squares, size) => {
    const lines = generateWinningCombos(size, 4); // Ensure `inARow` is set to 4
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
    const isWinningCell = winnerInfo.winningCells.includes(index);
    return (
      <button
        key={index}
        className={`w-16 h-16 text-xl font-bold border border-gray-400 flex items-center justify-center ${
          isWinningCell ? 'bg-green-300' : 'bg-white'
        }`}
        onClick={() => handleClick(index)}
      >
        {board[index]}
      </button>
    );
  };

  return (
    <div className="flex flex-col items-center mt-10">
      <h1 className="text-3xl font-bold mb-4">4x4 Tic Tac Toe (Player vs Player)</h1>

      <div className="w-1/2 flex justify-between items-center bg-white p-4 rounded-lg shadow-lg mb-6">
        <div className="text-center">
          <p className="text-xl font-bold text-gray-800">🧑 Player (X)</p>
          <p className="text-3xl font-extrabold text-blue-600">{xWins}</p>
          <p className="text-lg text-gray-600">Wins</p>
        </div>
        <div className="text-center">
          <p className="text-xl font-bold text-gray-800">🤖 Player (O)</p>
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

      <div
        className={`grid gap-1`}
        style={{ gridTemplateColumns: `repeat(${size}, 4rem)` }}
      >
        {board.map((_, index) => renderCell(index))}
      </div>

      <div className="mt-4 text-lg font-medium">
        {winnerInfo.winner ? (
          winnerInfo.winner === 'Draw' ? (
            <p className="text-yellow-600">🚫 Draw</p>
          ) : (
            <p className="text-green-600">🎉 Winner: {winnerInfo.winner}</p>
          )
        ) : (
          <p>Next Turn: {isXNext ? 'X (Player 1)' : 'O (Player 2)'}</p>
        )}
      </div>

      <button
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        onClick={resetGame}
      >
        Restart Game
      </button>

      <button
        className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        onClick={resetScores}
      >
        Reset Scores
      </button>
    </div>
  );
};

export default TicTacToe4x4;
