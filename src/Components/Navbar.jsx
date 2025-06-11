import React, { useState, useEffect, useRef } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { ThemeToggleButton } from './ThemeToggleButton';
const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const location = useLocation();
  const navbarRef = useRef(null);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setActiveDropdown(null);
  }, [location.pathname]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navbarRef.current && !navbarRef.current.contains(event.target)) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    if (isMobileMenuOpen) setActiveDropdown(null);
  };

  const toggleDropdown = (menu) => {
    setActiveDropdown(activeDropdown === menu ? null : menu);
  };

  const navLinkClass = ({ isActive }) =>
    isActive
      ? 'block text-white bg-blue-700 px-3 py-2 rounded-md text-base font-medium'
      : 'block text-gray-300 hover:bg-blue-500 hover:text-white px-3 py-2 rounded-md text-base font-medium';

  const menuItems = {
    three: {
      title: '3x3 Game',
      items: [
        { to: '/home', label: 'Two Players' },
        { to: '/computer', label: 'With Computer' },
      ],
    },
    four: {
      title: '4x4 Game',
      items: [
        { to: '/four', label: 'Two Players' },
        { to: '/TicTacToe4x4', label: 'With Computer' },
        { to: '/Xtreme4x4', label: 'Xtreme Two Players' },
        { to: '/AI_Xtreme4x4', label: 'Xtreme With Computer' },
      ],
    },
    six: {
      title: '6x6 Game',
      items: [
        { to: '/six', label: 'Two Players' },
        { to: '/TicTacToe6x6', label: 'With Computer' },
        { to: '/Xtreme6x6', label: 'Xtreme Two Players' },
        { to: '/AI_Xtreme6x6', label: 'Xtreme With Computer' },
      ],
    },
  };

  return (
    <nav className="bg-blue-600 shadow-lg" ref={navbarRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <NavLink 
            to="/" 
            className="text-white font-bold text-xl hover:text-blue-200 transition-colors duration-200"
          >
            Tic Tac Toe
          </NavLink>

          {/* Desktop Menu */}
          <div className="hidden sm:flex gap-4 items-center">
            {Object.entries(menuItems).map(([key, menu]) => (
              <div key={key} className="relative">
                <button
                  onClick={() => toggleDropdown(key)}
                  className={`px-3 py-2 rounded-md text-base font-medium flex items-center ${
                    activeDropdown === key
                      ? 'text-white bg-blue-700'
                      : 'text-gray-300 hover:text-white hover:bg-blue-500'
                  } transition-colors duration-200`}
                  aria-haspopup="true"
                  aria-expanded={activeDropdown === key}
                >
                  {menu.title}
                  <svg
                    className={`ml-1 h-4 w-4 transition-transform duration-200 ${
                      activeDropdown === key ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {activeDropdown === key && (
                  <div className="absolute z-10 mt-2 w-48 bg-white rounded-md shadow-lg overflow-hidden animate-fadeIn">
                    {menu.items.map((item) => (
                      <NavLink
                        key={item.to}
                        to={item.to}
                        className={({ isActive }) =>
                          `block px-4 py-2 text-gray-800 hover:bg-blue-100 transition-colors duration-150 ${
                            isActive ? 'bg-blue-100 font-medium' : ''
                          }`
                        }
                      >
                        {item.label}
                      </NavLink>
                    ))}

                  </div>
                )}
              </div>
            ))}
            <ThemeToggleButton/>
          </div>

          {/* Mobile Hamburger */}
          <div className="sm:hidden">
            <button
              onClick={toggleMobileMenu}
              className="text-white hover:text-blue-200 focus:outline-none transition-colors duration-200"
              aria-label="Toggle menu"
              aria-expanded={isMobileMenuOpen}
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu with Animation */}
      <div
        className={`sm:hidden bg-blue-700 overflow-hidden transition-all duration-300 ease-in-out ${
          isMobileMenuOpen ? 'max-h-screen py-2' : 'max-h-0 py-0'
        }`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1">
          {Object.entries(menuItems).map(([key, menu]) => (
            <div key={key} className="mb-2">
              <button
                onClick={() => toggleDropdown(key)}
                className={`w-full text-left px-3 py-2 rounded-md text-base font-medium flex justify-between items-center ${
                  activeDropdown === key
                    ? 'text-white bg-blue-600'
                    : 'text-gray-300 hover:text-white hover:bg-blue-500'
                } transition-colors duration-200`}
              >
                {menu.title}
                <svg
                  className={`h-4 w-4 transition-transform duration-200 ${
                    activeDropdown === key ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  activeDropdown === key ? 'max-h-96' : 'max-h-0'
                }`}
              >
                <div className="pl-4 pt-1">
                  {menu.items.map((item) => (
                    <NavLink
                      key={item.to}
                      to={item.to}
                      className={({ isActive }) =>
                        `block px-3 py-2 rounded-md text-base ${
                          isActive
                            ? 'text-white bg-blue-600'
                            : 'text-gray-300 hover:text-white hover:bg-blue-500'
                        } transition-colors duration-200`
                      }
                    >
                      {item.label}
                    </NavLink>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;