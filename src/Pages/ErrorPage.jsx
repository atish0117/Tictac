import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css'; // Create this CSS file for styling

const ErrorPage = ({ statusCode, errorType, onRetry }) => {
  const navigate = useNavigate();

  // Error type configurations
  const errorConfigs = {
    notFound: {
      code: 404,
      title: "Game Not Found",
      message: "The Tic Tac Toe board you're looking for doesn't exist.",
      emoji: "🔍",
      bgColor: "bg-blue-50",
      textColor: "text-blue-800"
    },
    serverError: {
      code: 500,
      title: "Server Error",
      message: "Our server made a wrong move. Try refreshing the page!",
      emoji: "🛠️",
      bgColor: "bg-red-50",
      textColor: "text-red-800"
    },
    gameError: {
      code: null,
      title: "Game Error",
      message: "Something went wrong with the game logic.",
      emoji: "🤔",
      bgColor: "bg-yellow-50",
      textColor: "text-yellow-800"
    },
    default: {
      code: null,
      title: "Oops!",
      message: "An unexpected error occurred.",
      emoji: "⚠️",
      bgColor: "bg-gray-50",
      textColor: "text-gray-800"
    }
  };

  // Get the appropriate config
  const config = errorConfigs[errorType] || 
                Object.values(errorConfigs).find(ec => ec.code === statusCode) || 
                errorConfigs.default;

  // Auto-redirect for 404 errors after 5 seconds
  useEffect(() => {
    if (statusCode === 404) {
      const timer = setTimeout(() => navigate('/'), 5000);
      return () => clearTimeout(timer);
    }
  }, [navigate, statusCode]);

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center p-4 ${config.bgColor}`}>
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center">
        {/* Tic Tac Toe error grid */}
        <div className="grid grid-cols-3 gap-2 mb-6 mx-auto w-48">
          {['E', 'R', 'R', 'O', 'R', 'X', 'O', 'R', '!'].map((cell, i) => (
            <div 
              key={i}
              className={`aspect-square flex items-center justify-center text-xl font-bold rounded
                ${cell === 'X' ? 'bg-gray-200' : 
                  cell === 'O' ? 'bg-blue-200' : 'bg-red-200'}`}
            >
              {cell}
            </div>
          ))}
        </div>

        <div className={`text-5xl mb-4 ${config.textColor}`}>
          {config.emoji}
        </div>
        
        <h1 className={`text-3xl font-bold mb-2 ${config.textColor}`}>
          {config.title}
        </h1>
        
        <p className="text-gray-600 mb-6">
          {config.message}
        </p>

        <div className="flex flex-col space-y-3">
          {onRetry && (
            <button
              onClick={onRetry}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition"
            >
              Try Again
            </button>
          )}
          
          <button
            onClick={() => navigate('/')}
            className="w-full border border-blue-500 text-blue-500 hover:bg-blue-50 font-medium py-2 px-4 rounded-lg transition"
          >
            Back to Home
          </button>
          
          {statusCode === 404 && (
            <p className="text-sm text-gray-500 mt-2">
              Redirecting to home in 5 seconds...
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
