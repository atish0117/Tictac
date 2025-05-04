import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState({
    three: false,
    four: false,
    six: false,
  });

  const toggleDropdown = (menu) => {
    setShowDropdown((prev) => ({
      ...prev,
      [menu]: !prev[menu],
    }));
  };

  const navLinkClass = ({ isActive }) =>
    isActive
      ? 'block text-white bg-blue-700 px-3 py-2 rounded-md text-base font-medium'
      : 'block text-gray-300 hover:bg-blue-500 hover:text-white px-3 py-2 rounded-md text-base font-medium';

  return (
    <nav className="bg-blue-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <NavLink to="/" className="text-white font-bold text-xl">
            Tic Tac Toe
          </NavLink>

          {/* Mobile Hamburger */}
          <div className="sm:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white focus:outline-none"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

          {/* Desktop Menu */}
          <div className="hidden sm:flex gap-6 items-center">
            {/* 3x3 Game Dropdown */}
            <div
              onMouseEnter={() => toggleDropdown("three")}
              onMouseLeave={() => toggleDropdown("three")}
              className="relative"
            >
              <button className="text-gray-300 hover:bg-blue-500 hover:text-white px-3 py-2 rounded-md">
                3x3 Game
              </button>
              {showDropdown.three && (
                <div className="absolute bg-white rounded shadow-md z-10">
                  <NavLink to="/" className="block px-4 py-2 text-gray-800 hover:bg-blue-100">
                    Two Players
                  </NavLink>
                  <NavLink to="/computer" className="block px-4 py-2 text-gray-800 hover:bg-blue-100">
                    With Computer
                  </NavLink>
                </div>
              )}
            </div>

            {/* 4x4 Game Dropdown */}
            <div
              onMouseEnter={() => toggleDropdown("four")}
              onMouseLeave={() => toggleDropdown("four")}
              className="relative"
            >
              <button className="text-gray-300 hover:bg-blue-500 hover:text-white px-3 py-2 rounded-md">
                4x4 Game
              </button>
              {showDropdown.four && (
                <div className="absolute bg-white rounded shadow-md z-10 text-xs">
                  <NavLink to="/four" className="block px-4 py-2 text-gray-800 hover:bg-blue-100">
                    Two Players
                  </NavLink>
                  <NavLink to="/TicTacToe4x4" className="block px-4 py-2 text-gray-800 hover:bg-blue-100">
                    With Computer
                  </NavLink>
                  <NavLink to="/Xtreme4x4" className="block px-2 py-2 text-gray-800 hover:bg-blue-100">
                    Xtreme Two Players
                  </NavLink>
                  <NavLink to="/AI_Xtreme4x4" className="block px-2 py-2 text-gray-800 hover:bg-blue-100">
                  Xtreme With Computer
                  </NavLink>
                </div>
              )}
            </div>

            {/* 6x6 Game Dropdown */}
            <div
              onMouseEnter={() => toggleDropdown("six")}
              onMouseLeave={() => toggleDropdown("six")}
              className="relative"
            >
              <button className="text-gray-300 hover:bg-blue-500 hover:text-white px-3 py-2 rounded-md">
                6x6 Game
              </button>
              {showDropdown.six && (
                <div className="absolute bg-white rounded shadow-md z-10 text-xs">
                  <NavLink to="/six" className="block px-2 py-2 text-gray-800 hover:bg-blue-100">
                    Two Players
                  </NavLink>
                  <NavLink to="/TicTacToe6x6" className="block px-2 py-2 text-gray-800 hover:bg-blue-100">
                    With Computer
                  </NavLink>
                  <NavLink to="/Xtreme6x6" className="block px-2 py-2 text-gray-800 hover:bg-blue-100">
                    Xtreme Two Players
                  </NavLink>
                  <NavLink to="/AI_Xtreme6x6" className="block px-2 py-2 text-gray-800 hover:bg-blue-100">
                  Xtreme With Computer
                  </NavLink>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="sm:hidden px-2 pt-2 pb-3 space-y-1">
          {/* Mobile Dropdowns (Simple display) */}
          <div>
            <span className="text-white font-semibold px-3">3x3 Game</span>
            <NavLink to="/3x3two" className="block text-gray-300 px-4 py-1 hover:text-white">Two Players</NavLink>
            <NavLink to="/3x3ai" className="block text-gray-300 px-4 py-1 hover:text-white">With Computer</NavLink>
          </div>
          <div>
            <span className="text-white font-semibold px-3">4x4 Game</span>
            <NavLink to="/4x4two" className="block text-gray-300 px-4 py-1 hover:text-white">Two Players</NavLink>
            <NavLink to="/4x4ai" className="block text-gray-300 px-4 py-1 hover:text-white">With Computer</NavLink>
          </div>
          <div>
            <span className="text-white font-semibold px-3">6x6 Game</span>
            <NavLink to="/6x6two" className="block text-gray-300 px-4 py-1 hover:text-white">Two Players</NavLink>
            <NavLink to="/TicTacToe6x6" className="block text-gray-300 px-4 py-1 hover:text-white">With Computer</NavLink>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
