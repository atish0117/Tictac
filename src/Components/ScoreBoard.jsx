import React from 'react'


export const ScoreBoard1 = ({ xScore, oScore, resetScores }) => {
  return (
    <>   
        {/* home */}
      {/* Scoreboard */}
      <div className="mb-6 w-full max-w-xl bg-white dark:bg-gray-700 rounded-2xl p-4 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
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
          onClick={resetScores}
          className="bg-red-500 text-white font-medium px-4 py-2 rounded hover:bg-red-600 transition shadow"
          title="Reset both scores to zero"
        >
          Reset Scores
        </button>
      </div>
    </>


  )
}

export const ScoreBoard2 = ( {xScore, oScore, resetScores }) => {
  return (
    <>  
        {/* score board for AI_Xtreme */}
          {/* Scoreboard */}
          <div className="mb-6 w-full max-w-xl bg-white dark:bg-gray-700 rounded-2xl p-4 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
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
      🤖 Computer (O)
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
    onClick={resetScores}
    className="bg-red-500 text-white font-medium px-4 py-2 rounded hover:bg-red-600 transition shadow"
    title="Reset both scores to zero"
  >
    Reset Scores
  </button>
</div>
    </>

)

}






export const ScoreBoard3 = () => {
  return (
    <>
    <div>ScoreBoard3</div>
      {/* Scoreboard */}
      <div className="w-1/2 flex justify-between items-center bg-white p-4 rounded-lg shadow-lg mb-6">
        <div className="text-center">
          <p className="text-xl font-bold text-gray-800">🧑 Player 1(X)</p>
          <p className="text-3xl font-extrabold text-blue-600">{xScore}</p>
          <p className="text-lg text-gray-600">Wins</p>
        </div>
        <div className="text-center">
          <p className="text-xl font-bold text-gray-800">🧑 Player 2(O)</p>
          <p className="text-3xl font-extrabold text-red-600">{oScore}</p>
          <p className="text-lg text-gray-600">Wins</p>
        </div>
        <div className="text-center">
          <p className="text-xl font-bold text-gray-800">🤝 Draws</p>
          <p className="text-3xl font-extrabold text-yellow-600">{draws}</p>
        </div>
      </div>
    </>
  )
}


export const ScoreBoard4 =()=>{

  return(
  <>
  <div className="w-1/2 flex justify-between items-center bg-white p-4 rounded-lg shadow-lg mb-6">
        <div className="text-center">
          <p className="text-xl font-bold text-gray-800">🧑 Player (X)</p>
          <p className="text-3xl font-extrabold text-blue-600">{xWins}</p>
          <p className="text-lg text-gray-600">Wins</p>
        </div>
        <div className="text-center">
          <p className="text-xl font-bold text-gray-800">🤖 Computer (O)</p>
          <p className="text-3xl font-extrabold text-red-600">{oWins}</p>
          <p className="text-lg text-gray-600">Wins</p>
        </div>
        <div className="text-center">
          <p className="text-xl font-bold text-gray-800">🤝 Draws</p>
          <p className="text-3xl font-extrabold text-yellow-600">{draws}</p>
        </div>
      </div>
      </>
  )

}
