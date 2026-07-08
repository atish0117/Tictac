import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTheme } from '../Components/Context/ThemeContext';
import { playClickSound, playHoverSound } from '../utils/sounds';
import { FiUsers, FiCpu, FiGrid, FiLayout, FiActivity, FiZap } from 'react-icons/fi';

const gameCabinets = {
  three: {
    title: '3x3 Classic',
    desc: 'The timeless standard. Perfect for quick matches and strategy practice.',
    icon: FiGrid,
    themeColor: 'from-cyan-400 to-blue-600',
    glowColor: 'rgba(6, 182, 212, 0.45)',
    accentBg: 'bg-cyan-500/10 text-cyan-400',
    accentBorder: 'border-cyan-500/30',
    playersOnline: '4,831',
    bgImage: '/cyan_card_bg.png',
    modes: [
      { to: '/home', label: 'Local PvP', icon: FiUsers, type: '2 Players' },
      { to: '/computer', label: 'vs Computer AI', icon: FiCpu, type: 'Vs AI' },
    ],
  },
  four: {
    title: '4x4 Grid',
    desc: 'Extended board. Connect 4 to win. Features the famous disappearing marks Xtreme modes.',
    icon: FiLayout,
    themeColor: 'from-violet-500 to-indigo-600',
    glowColor: 'rgba(139, 92, 246, 0.45)',
    accentBg: 'bg-violet-500/10 text-violet-400',
    accentBorder: 'border-violet-500/30',
    playersOnline: '7,104',
    bgImage: '/purple_card_bg.png',
    modes: [
      { to: '/four', label: 'Classic PvP', icon: FiUsers, type: '2 Players' },
      { to: '/TicTacToe4x4', label: 'Classic vs AI', icon: FiCpu, type: 'Vs AI' },
      { to: '/Xtreme4x4', label: 'Xtreme PvP', icon: FiActivity, type: 'disappearing' },
      { to: '/AI_Xtreme4x4', label: 'Xtreme vs AI', icon: FiCpu, type: 'disappearing AI' },
    ],
  },
  six: {
    title: '6x6 Colossus',
    desc: 'Massive battlefield. Line up 6 marks to win. Hardcore standard and disappearing modes.',
    icon: FiActivity,
    themeColor: 'from-pink-500 to-rose-600',
    glowColor: 'rgba(244, 63, 94, 0.45)',
    accentBg: 'bg-pink-500/10 text-pink-400',
    accentBorder: 'border-pink-500/30',
    playersOnline: '2,903',
    bgImage: '/pink_card_bg.png',
    modes: [
      { to: '/six', label: 'Classic PvP', icon: FiUsers, type: '2 Players' },
      { to: '/TicTacToe6x6', label: 'Classic vs AI', icon: FiCpu, type: 'Vs AI' },
      { to: '/Xtreme6x6', label: 'Xtreme PvP', icon: FiActivity, type: 'disappearing' },
      { to: '/AI_Xtreme6x6', label: 'Xtreme vs AI', icon: FiCpu, type: 'disappearing AI' },
    ],
  },
};

const HomeGameSelector = () => {
  const { isDarkMode } = useTheme();

  const handleHover = () => {
    playHoverSound();
  };

  const handleModeClick = () => {
    playClickSound();
  };

  // Generate dynamic cabinet styles with linear gradients over images for legibility
  const getCabinetStyle = (cabinet) => {
    const overlay = isDarkMode
      ? 'linear-gradient(to bottom, rgba(15, 23, 42, 0.88), rgba(15, 23, 42, 0.98))'
      : 'linear-gradient(to bottom, rgba(255, 255, 255, 0.88), rgba(255, 255, 255, 0.98))';
    return {
      backgroundImage: `${overlay}, url('${cabinet.bgImage}')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      boxShadow: `0 10px 30px -15px ${cabinet.glowColor}`
    };
  };

  return (
    <div
      className="min-h-screen relative overflow-hidden flex flex-col items-center justify-between py-12 px-4 md:px-8 transition-colors duration-300 text-white"
    >
      {/* Background Image with NO class */}
      <img
        src="/bg_image2.png"
        alt=""
        loading="eager"
        fetchpriority="high"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          pointerEvents: 'none',
          zIndex: -2
        }}
      />

      {/* Cyberpunk Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,24,38,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(18,24,38,0.03)_1px,transparent_1px)] bg-[size:30px_30px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)] pointer-events-none opacity-20"></div>

      {/* Decorative Neon Blurs */}
      <div className="absolute top-1/4 left-1/10 w-[350px] h-[350px] bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/10 w-[350px] h-[350px] bg-purple-500/10 rounded-full blur-3xl pointer-events-none"></div>

      {/* Top Bar with Live Counter */}
      <div className="relative z-10 w-full max-w-6xl flex justify-between items-center mb-8 px-2">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></div>
          <span className="text-xs font-bold uppercase tracking-widest text-slate-400">
            Live Server Lobby
          </span>
        </div>
        <div className="px-4 py-1 rounded-full border text-xs font-bold shadow-sm bg-slate-900/60 border-slate-800 text-slate-300">
          🟢 <span className="text-blue-400">14,832</span> Online Players
        </div>
      </div>

      {/* Main Content Hero */}
      <div className="relative z-10 w-full max-w-6xl flex flex-col items-center my-auto pt-16 md:pt-24">
        {/* Cabinets Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full items-stretch">
          {Object.entries(gameCabinets).map(([key, cabinet], index) => {
            const Icon = cabinet.icon;
            return (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                onMouseEnter={handleHover}
                className={`group glass-panel rounded-3xl overflow-hidden shadow-2xl transition-all duration-300 flex flex-col border p-6 relative hover:scale-[1.01] ${isDarkMode ? 'border-slate-800/80 hover:border-slate-700 text-white' : 'border-slate-200 hover:border-slate-350 text-slate-900'
                  }`}
                style={getCabinetStyle(cabinet)}
              >
                {/* Neon Cabinet Marquee Header */}
                <div className={`absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r ${cabinet.themeColor}`} />

                {/* Cabinet Header Info */}
                <div className="flex justify-between items-center mb-4">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded border uppercase tracking-wider ${cabinet.accentBg} ${cabinet.accentBorder}`}>
                    Active: {cabinet.playersOnline}
                  </span>
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-400 group-hover:bg-blue-500 transition-colors" />
                </div>

                {/* Title & Icon */}
                <div className="flex items-center gap-3.5 mb-4">
                  <div className={`p-3 rounded-2xl bg-gradient-to-br ${cabinet.themeColor} text-white shadow-md transform group-hover:rotate-12 transition-transform duration-300`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold tracking-tight">{cabinet.title}</h2>
                    <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400">Cabinet Console</span>
                  </div>
                </div>

                {/* Description */}
                <p className={`text-xs leading-relaxed mb-6 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                  {cabinet.desc}
                </p>

                {/* Game Modes Menu (Always Rendered & Stacked) */}
                <div className="mt-auto flex flex-col gap-2">
                  <div className={`text-[10px] font-bold uppercase tracking-widest mb-1 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                    Select Mode
                  </div>
                  {cabinet.modes.map((mode) => {
                    const ModeIcon = mode.icon;
                    return (
                      <NavLink
                        key={mode.to}
                        to={mode.to}
                        onClick={handleModeClick}
                        onMouseEnter={handleHover}
                        className={`flex items-center justify-between p-3 rounded-xl border transition-all duration-200 ${isDarkMode
                            ? 'bg-slate-950/70 border-slate-900 hover:bg-slate-900 hover:border-slate-800 text-white'
                            : 'bg-white border-slate-200 hover:bg-slate-100 hover:border-slate-300 text-slate-800'
                          }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <ModeIcon className="w-4 h-4 text-blue-500" />
                          <span className="text-sm font-bold">{mode.label}</span>
                        </div>
                        <span className="text-[9px] uppercase tracking-wider px-2 py-0.5 rounded bg-blue-500/10 text-blue-500 dark:text-blue-400 border border-blue-500/20 font-semibold">
                          {mode.type}
                        </span>
                      </NavLink>
                    );
                  })}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Footer Instructions Info */}
      <div className="relative z-10 w-full max-w-6xl mt-12 text-center text-xs text-slate-400 border-t border-slate-200/10 pt-4">
        © 2026 TicTac Retro Gaming Inc. • Select a game cabinet above to insert coin and play.
      </div>
    </div>
  );
};

export default HomeGameSelector;
