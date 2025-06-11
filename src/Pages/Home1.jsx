import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const gameOptions = {
  three: {
    title: '3x3 Game',
    bg: 'https://images.unsplash.com/photo-1498736297812-3a08021f206f?q=80&w=2079&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // You can use any image URL
    items: [
      { to: '/', label: 'Two Players',
        img:"https://images.unsplash.com/photo-1521364577880-a15e92cbff6f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
       },
      { to: '/computer', label: 'With Computer',
        img:"https://images.unsplash.com/photo-1521364577880-a15e92cbff6f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
       },
    ],
  },
  four: {
    title: '4x4 Game',
    bg: 'https://images.unsplash.com/photo-1495954222046-2c427ecb546d?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    items: [
      { to: '/four', 
        label: 'Two Players',
      img:"https://images.unsplash.com/photo-1521364577880-a15e92cbff6f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      },
      { to: '/TicTacToe4x4', label: 'With Computer',
        img:"https://images.unsplash.com/photo-1521364577880-a15e92cbff6f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
       },
      { to: '/Xtreme4x4', label: 'Xtreme Two Players',
        img:"https://images.unsplash.com/photo-1521364577880-a15e92cbff6f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
       },
      { to: '/AI_Xtreme4x4', label: 'Xtreme With Computer' ,
        img:"https://images.unsplash.com/photo-1521364577880-a15e92cbff6f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      },
    ],
  },
  six: {
    title: '6x6 Game',
    bg: 'https://images.unsplash.com/photo-1640955011254-39734e60b16f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    items: [
      { to: '/six', label: 'Two Players',
        img:"https://images.unsplash.com/photo-1521364577880-a15e92cbff6f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
       },
      { to: '/TicTacToe6x6', label: 'With Computer',
        img:"https://images.unsplash.com/photo-1521364577880-a15e92cbff6f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
       },
      { to: '/Xtreme6x6', label: 'Xtreme Two Players',
        img:"https://images.unsplash.com/photo-1521364577880-a15e92cbff6f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
       },
      { to: '/AI_Xtreme6x6', label: 'Xtreme With Computer',
        img:"https://images.unsplash.com/photo-1521364577880-a15e92cbff6f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
       },
    ],
  },
};

const HomeGameSelector = () => {
  const [active, setActive] = useState(null);

  const handleClick = (key) => {
    setActive(active === key ? null : key);
  };

  return (
<div className="min-h-screen bg-[url('https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-cover bg-center p-6 flex flex-col items-center">
      <h1 className="text-4xl font-bold text-gray-800 mb-12">Choose Your Game</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10 w-full max-w-6xl">
        {Object.entries(gameOptions).map(([key, game]) => (
          <div key={key} className="flex flex-col items-center">
            <motion.div
              whileHover={{ scale: 1.03 }}
              onClick={() => handleClick(key)}
              className="cursor-pointer w-full h-40 rounded-xl shadow-lg bg-cover bg-center flex items-center justify-center text-white text-2xl font-bold"
              style={{ backgroundImage: `url(${game.bg})` }}
            >
              {game.title}
            </motion.div>

            <AnimatePresence>
              {active === key && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-4 grid grid-cols-2 gap-3 w-full"
                >
                  {game.items.map((item) => (
                    <NavLink
                    key={item.to}
  to={item.to}
  className="relative text-white h-24 rounded-md overflow-hidden shadow border hover:scale-[1.02] transition"
  style={{
    backgroundImage: `url(${item.img})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  }}
>
  <div className="bg-black/40 w-full h-full flex items-center justify-center">
    <span className="text-sm font-semibold">{item.label}</span>
  </div>
                    </NavLink>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeGameSelector;
