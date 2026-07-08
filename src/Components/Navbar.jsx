import React, { useState, useEffect, useRef } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { ThemeToggleButton } from './ThemeToggleButton';
import { useTheme } from './Context/ThemeContext';
import { FiChevronDown, FiMenu, FiX, FiGrid, FiLayout, FiActivity } from 'react-icons/fi';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const { isDarkMode } = useTheme();
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
    if (!isMobileMenuOpen) setActiveDropdown(null);
  };

  const toggleDropdown = (menu) => {
    setActiveDropdown(activeDropdown === menu ? null : menu);
  };

  const menuItems = {
    three: {
      title: '3x3 Standard',
      icon: FiGrid,
      items: [
        { to: '/home', label: 'Two Players (PvP)' },
        { to: '/computer', label: 'vs Computer (AI)' },
      ],
    },
    four: {
      title: '4x4 Grid',
      icon: FiLayout,
      items: [
        { to: '/four', label: 'Two Players (PvP)' },
        { to: '/TicTacToe4x4', label: 'vs Computer (AI)' },
        { to: '/Xtreme4x4', label: 'Xtreme PvP' },
        { to: '/AI_Xtreme4x4', label: 'Xtreme vs AI' },
      ],
    },
    six: {
      title: '6x6 Xtreme',
      icon: FiActivity,
      items: [
        { to: '/six', label: 'Two Players (PvP)' },
        { to: '/TicTacToe6x6', label: 'vs Computer (AI)' },
        { to: '/Xtreme6x6', label: 'Xtreme PvP' },
        { to: '/AI_Xtreme6x6', label: 'Xtreme vs AI' },
      ],
    },
  };

  if (location.pathname === '/') {
    return null;
  }

  return (
    <nav 
      className={`sticky top-0 z-50 transition-colors duration-300 border-b backdrop-blur-md ${
        isDarkMode 
          ? 'bg-slate-950/80 border-slate-800 text-white' 
          : 'bg-white/85 border-slate-200 text-slate-900'
      }`} 
      ref={navbarRef}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <NavLink 
              to="/" 
              className="font-black text-2xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:scale-105 transition-transform duration-200"
            >
              ❌ TicTac ⭕
            </NavLink>
          </div>

          {/* Desktop Menu */}
          <div className="hidden sm:flex gap-4 items-center">
            {Object.entries(menuItems).map(([key, menu]) => {
              const Icon = menu.icon;
              const isOpen = activeDropdown === key;
              return (
                <div key={key} className="relative">
                  <button
                    onClick={() => toggleDropdown(key)}
                    className={`px-3 py-2 rounded-xl text-sm font-semibold flex items-center gap-1.5 transition-all duration-200 ${
                      isOpen
                        ? (isDarkMode ? 'bg-slate-800 text-white shadow-md' : 'bg-slate-100 text-slate-900 shadow-sm')
                        : (isDarkMode ? 'text-slate-300 hover:text-white hover:bg-slate-900/60' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50')
                    }`}
                    aria-haspopup="true"
                    aria-expanded={isOpen}
                  >
                    <Icon className="w-4 h-4 opacity-75" />
                    {menu.title}
                    <FiChevronDown className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {isOpen && (
                    <div className={`absolute z-50 mt-2 w-52 rounded-xl shadow-xl overflow-hidden animate-fadeIn border ${
                      isDarkMode 
                        ? 'bg-slate-900 border-slate-800 text-white' 
                        : 'bg-white border-slate-200 text-slate-800'
                    }`}>
                      <div className="py-1">
                        {menu.items.map((item) => (
                          <NavLink
                            key={item.to}
                            to={item.to}
                            className={({ isActive }) =>
                              `block px-4 py-2.5 text-sm transition-colors duration-150 ${
                                isActive 
                                  ? 'bg-blue-500 text-white font-medium' 
                                  : (isDarkMode ? 'hover:bg-slate-800 hover:text-white' : 'hover:bg-blue-50 hover:text-blue-600')
                              }`
                            }
                          >
                            {item.label}
                          </NavLink>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
            <div className="border-l border-slate-200 dark:border-slate-800 h-6 mx-1"></div>
            <ThemeToggleButton />
          </div>

          {/* Mobile Hamburger */}
          <div className="sm:hidden flex items-center gap-2">
            <ThemeToggleButton />
            <button
              onClick={toggleMobileMenu}
              className={`p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-950 focus:outline-none transition-colors duration-200 ${
                isDarkMode ? 'text-slate-300' : 'text-slate-600'
              }`}
              aria-label="Toggle menu"
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <FiX className="h-6 w-6" /> : <FiMenu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className={`sm:hidden border-t px-4 py-3 space-y-1.5 transition-all duration-300 ${
          isDarkMode ? 'bg-slate-950 border-slate-800' : 'bg-white border-slate-100'
        }`}>
          {Object.entries(menuItems).map(([key, menu]) => {
            const Icon = menu.icon;
            const isOpen = activeDropdown === key;
            return (
              <div key={key} className="rounded-xl overflow-hidden">
                <button
                  onClick={() => toggleDropdown(key)}
                  className={`w-full text-left px-3 py-3 font-semibold text-sm flex justify-between items-center transition-colors ${
                    isOpen
                      ? (isDarkMode ? 'bg-slate-900 text-white' : 'bg-slate-50 text-slate-950')
                      : (isDarkMode ? 'text-slate-300 hover:bg-slate-900/50' : 'text-slate-600 hover:bg-slate-50')
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <Icon className="w-4 h-4" />
                    {menu.title}
                  </span>
                  <FiChevronDown className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                </button>

                {isOpen && (
                  <div className={`pl-6 py-1 pr-2 space-y-1 ${isDarkMode ? 'bg-slate-900/40' : 'bg-slate-50/50'}`}>
                    {menu.items.map((item) => (
                      <NavLink
                        key={item.to}
                        to={item.to}
                        className={({ isActive }) =>
                          `block px-3 py-2 rounded-lg text-sm transition-colors ${
                            isActive
                              ? 'text-blue-500 font-semibold'
                              : (isDarkMode ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-950')
                          }`
                        }
                      >
                        {item.label}
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </nav>
  );
};

export default Navbar;