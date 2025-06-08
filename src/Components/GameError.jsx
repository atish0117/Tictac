const GameError = ({ error, onClose }) => {
  const errorTypes = {
    invalid_move: {
      title: "Invalid Move!",
      message: "That square is already taken.",
      emoji: "❌",
      color: "bg-red-100 border-red-300"
    },
    network_error: {
      title: "Connection Lost",
      message: "Couldn't connect to the game server.",
      emoji: "📡",
      color: "bg-yellow-100 border-yellow-300"
    },
    game_over: {
      title: "Game Ended",
      message: "This game has already been completed.",
      emoji: "🏁",
      color: "bg-blue-100 border-blue-300"
    }
  };

  const config = errorTypes[error?.type] || {
    title: "Game Error",
    message: "Something went wrong.",
    emoji: "⚠️",
    color: "bg-gray-100 border-gray-300"
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className={`max-w-sm w-full rounded-lg border p-6 ${config.color} shadow-xl`}>
        <div className="text-center">
          <div className="text-4xl mb-3">{config.emoji}</div>
          <h3 className="text-xl font-bold mb-2">{config.title}</h3>
          <p className="mb-4">{config.message}</p>
          
          <button
            onClick={onClose}
            className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded transition"
          >
            Continue Playing
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameError;