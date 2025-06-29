import React, { useState, useEffect } from 'react';
import { ScoreBoard4 } from '../Components/ScoreBoard';
import { useTheme } from '../Components/Context/ThemeContext';
const AI_TicTacToe4x4 = () => {
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
    if (board[index] || winnerInfo.winner || !isXNext) return;

    const newBoard = [...board];
    newBoard[index] = 'X';
    setBoard(newBoard);
    setIsXNext(false);
  };

  // AI Move Trigger
  useEffect(() => {
    if (!isXNext && !winnerInfo.winner) {
      const timer = setTimeout(() => {
        const bestMove = findBestMove(board, 'O', 2); // Depth limit set to 2
        if (bestMove !== -1) {
          const newBoard = [...board];
          newBoard[bestMove] = 'O';
          setBoard(newBoard);
          setIsXNext(true);
        }
      }, 500); // AI delay for realism
      return () => clearTimeout(timer);
    }
  }, [board, isXNext, winnerInfo]);
  

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
  };

  // ...Total numbers of game  ...  
    useEffect(() => {
      setTotalGames(xWins + oWins + draws);
    }, [xWins, oWins, draws]);

  const resetScores = () => {
    setXWins(0);
    setOWins(0);
    setDraws(0);
    setTotalGames(0);
  };

  const calculateWinner = (squares, size) => {
    const lines = generateWinningCombos(size, 4); // Make sure `inARow` is set to 4 for full row win condition
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

  // Minimax Algorithm (depth-limited)
  const findBestMove = (newBoard, player, depth) => {
    let bestScore = -Infinity;
    let move = -1;

    newBoard.forEach((cell, index) => {
      if (!cell) {
        newBoard[index] = player;
        const score = minimax(newBoard, depth, false);
        newBoard[index] = null;
        if (score > bestScore) {
          bestScore = score;
          move = index;
        }
      }
    });

    return move;
  };

  const minimax = (board, depth, isMaximizing) => {
    const result = calculateWinner(board, size);
    if (result) {
      console.log('Game Over:', result);
      if (result.winner === 'O') return 10;
      if (result.winner === 'X') return -10;
      return 0;
    }

    if (depth === 0 || !board.includes(null)) {
      return 0;
    }

    if (isMaximizing) {
      let best = -Infinity;
      for (let i = 0; i < board.length; i++) {
        if (!board[i]) {
          board[i] = 'O';
          best = Math.max(best, minimax(board, depth - 1, false));
          board[i] = null;
        }
      }
      console.log('Maximizing best:', best);
      return best;
    } else {
      let best = Infinity;
      for (let i = 0; i < board.length; i++) {
        if (!board[i]) {
          board[i] = 'X';
          best = Math.min(best, minimax(board, depth - 1, true));
          board[i] = null;
        }
      }
      console.log('Minimizing best:', best);
      return best;
    }
  };

  const renderCell = (index) => {
    const isWinningCell = winnerInfo.winningCells.includes(index);
    return (
      <button
        key={index}
        className={`w-16 h-16  md:w-20 md:h-20 border-2 flex items-center justify-center
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
    <div className={`flex flex-col items-center ${
        isDarkMode ? "bg-gray-800 text-white" : "bg-gradient-to-br from-blue-100 to-purple-200"
      }`}>
      <h1 className="text-3xl font-bold mb-4">4x4 Tic Tac Toe (AI Mode)</h1>
    

          <ScoreBoard4 resetScores={resetScores} xWins={xWins} oWins={oWins} draws={draws}/>


      <div className="text-lg text-center mb-4">
        <h3 className="text-xl font-semibold">Total Games: {totalGames}</h3>
      </div>

      <div
        className={`grid gap-2 grid-cols-4 p-4`}
        style={{  maxWidth: 'fit-content',
          boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.4)",
          backdropFilter: "blur(4px)",
          WebkitBackdropFilter: "blur(4px)",
          background: "rgba(250, 242, 242, 0.05)",
          borderRadius: "10px",
          border: "1px solid rgba(255, 255, 255, 0.18)",
        }}
      >
        {board.map((_, index) => renderCell(index))}
      </div>

      <div className="mt-4 text-lg font-medium">
        {winnerInfo.winner ? (
          winnerInfo.winner === 'Draw' ? (
            <p className="text-yellow-600">🚫 It's a Draw!</p>
          ) : (
            <p className="text-green-600">🎉 Winner: {winnerInfo.winner}</p>
          )
        ) : (
          <p>Next Turn: {isXNext ? 'X (You)' : 'O (AI)'}</p>
        )}
      </div>

      <button
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        onClick={resetGame}
      >
        Restart
      </button>

      
    </div>
  );
};

export default AI_TicTacToe4x4;
