import React from 'react'


// import React from "react";

export const ScoreBoard1 = ({ xScore, oScore, resetScores }) => {
  const total = xScore + oScore;
  const xPercentage = total === 0 ? 50 : (xScore / total) * 100;
  const oPercentage = total === 0 ? 50 : (oScore / total) * 100;

  return (
    <div className="w-full max-w-xl mx-auto p-4">
      <div className="bg-white dark:bg-gray-700 rounded-xl shadow-lg p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
        {/* Player X */}
        <div className={`flex-1 text-center ${xScore > oScore ? "text-green-600" : "text-gray-700 dark:text-gray-100"}`}>
          <h2 className="text-md sm:text-lg font-semibold flex justify-center items-center gap-1">
            🧑 Player (X)
          </h2>
          <p className="text-3xl sm:text-4xl font-bold">{xScore}</p>
          <div className="w-full h-2 bg-gray-300 rounded mt-2 overflow-hidden">
            <div
              className="h-full bg-blue-500 transition-all duration-500"
              style={{ width: `${xPercentage}%` }}
            ></div>
          </div>
        </div>

        {/* Reset Button */}
        <div className="flex justify-center sm:justify-center">
          <button
            onClick={resetScores}
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-300 shadow-md text-sm sm:text-base"
            title="Reset Scores"
          >
            🔄 Reset
          </button>
        </div>

        {/* Player O */}
        <div className={`flex-1 text-center ${oScore > xScore ? "text-green-600" : "text-gray-700 dark:text-gray-100"}`}>
          <h2 className="text-md sm:text-lg font-semibold flex justify-center items-center gap-1">
            🧑 Player (O)
          </h2>
          <p className="text-3xl sm:text-4xl font-bold">{oScore}</p>
          <div className="w-full h-2 bg-gray-300 rounded mt-2 overflow-hidden">
            <div
              className="h-full bg-pink-500 transition-all duration-500"
              style={{ width: `${oPercentage}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};



export const ScoreBoard2 = ({ xScore, oScore, resetScores }) => {
  const total = xScore + oScore;
  const xPercentage = total === 0 ? 50 : (xScore / total) * 100;
  const oPercentage = total === 0 ? 50 : (oScore / total) * 100;

  return (
    <div className="w-full max-w-xl mx-auto p-4">
      <div className="bg-white dark:bg-gray-700 rounded-xl shadow-lg p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
        {/* Player (X) */}
        <div className={`flex-1 text-center ${xScore > oScore ? "text-green-600" : "text-gray-800 dark:text-gray-100"}`}>
          <h2 className="text-md sm:text-lg font-semibold flex justify-center items-center gap-1">
            🧑 Player (X)
          </h2>
          <p className="text-3xl sm:text-4xl font-bold">{xScore}</p>
          <div className="w-full h-2 bg-gray-300 rounded mt-2 overflow-hidden">
            <div
              className="h-full bg-blue-500 transition-all duration-500"
              style={{ width: `${xPercentage}%` }}
            ></div>
          </div>
        </div>

        {/* Reset Button */}
        <div className="flex justify-center sm:justify-center">
          <button
            onClick={resetScores}
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-300 shadow-md text-sm sm:text-base"
            title="Reset Scores"
          >
            🔄 Reset
          </button>
        </div>

        {/* Computer (O) */}
        <div className={`flex-1 text-center ${oScore > xScore ? "text-green-600" : "text-gray-800 dark:text-gray-100"}`}>
          <h2 className="text-md sm:text-lg font-semibold flex justify-center items-center gap-1">
            🤖 Computer (O)
          </h2>
          <p className="text-3xl sm:text-4xl font-bold">{oScore}</p>
          <div className="w-full h-2 bg-gray-300 rounded mt-2 overflow-hidden">
            <div
              className="h-full bg-pink-500 transition-all duration-500"
              style={{ width: `${oPercentage}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};







export const ScoreBoard3 = ({ xWins, oWins, draws, resetScores }) => {
  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="bg-white dark:bg-gray-700 rounded-xl shadow-lg p-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
        
        {/* Player 1 */}
        <div className="text-center flex-1">
          <p className="text-md sm:text-xl font-semibold text-gray-800 dark:text-gray-100">
            🧑 Player 1 (X)
          </p>
          <p className="text-3xl font-extrabold text-blue-600">{xWins}</p>
          <p className="text-sm text-gray-500 dark:text-gray-300">Wins</p>
        </div>

        {/* Player 2 */}
        <div className="text-center flex-1">
          <p className="text-md sm:text-xl font-semibold text-gray-800 dark:text-gray-100">
            🧑 Player 2 (O)
          </p>
          <p className="text-3xl font-extrabold text-red-500">{oWins}</p>
          <p className="text-sm text-gray-500 dark:text-gray-300">Wins</p>
        </div>

        {/* Draws */}
        <div className="text-center flex-1">
          <p className="text-md sm:text-xl font-semibold text-gray-800 dark:text-gray-100">
            🤝 Draws
          </p>
          <p className="text-3xl font-extrabold text-yellow-500">{draws}</p>
        </div>

        {/* Reset Button */}
        <div className="flex justify-center sm:justify-end">
          <button
            onClick={resetScores}
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-300 shadow"
            title="Reset all scores"
          >
            🔄 Reset
          </button>
        </div>
      </div>
    </div>
  );
};



export const ScoreBoard4 = ({ xWins, oWins, draws, resetScores }) => {
  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="bg-white dark:bg-gray-700 rounded-xl shadow-lg p-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
        
        {/* Player (X) */}
        <div className="text-center flex-1">
          <p className="text-md sm:text-xl font-semibold text-gray-800 dark:text-gray-100">
            🧑 Player (X)
          </p>
          <p className="text-3xl font-extrabold text-blue-600">{xWins}</p>
          <p className="text-sm text-gray-500 dark:text-gray-300">Wins</p>
        </div>

        {/* Computer (O) */}
        <div className="text-center flex-1">
          <p className="text-md sm:text-xl font-semibold text-gray-800 dark:text-gray-100">
            🤖 Computer (O)
          </p>
          <p className="text-3xl font-extrabold text-red-600">{oWins}</p>
          <p className="text-sm text-gray-500 dark:text-gray-300">Wins</p>
        </div>

        {/* Draws */}
        <div className="text-center flex-1">
          <p className="text-md sm:text-xl font-semibold text-gray-800 dark:text-gray-100">
            🤝 Draws
          </p>
          <p className="text-3xl font-extrabold text-yellow-500">{draws}</p>
        </div>

        {/* Reset Button */}
        <div className="flex justify-center sm:justify-end">
          <button
            onClick={resetScores}
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-300 shadow"
            title="Reset all scores"
          >
            🔄 Reset
          </button>
        </div>
      </div>
    </div>
  );
};

