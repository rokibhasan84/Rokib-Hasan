import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Sidebar = ({ activeSection, scrollToSection }) => {
  const [isVisible, setIsVisible] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home', icon: 'home' },
    { id: 'about', label: 'About', icon: 'person' },
    { id: 'skills', label: 'Skills', icon: 'psychology' },
    { id: 'projects', label: 'Projects', icon: 'work' },
    { id: 'contact', label: 'Contact', icon: 'mail' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const sidebarVariants = {
    hidden: { 
      x: -100, 
      opacity: 0,
      transition: { duration: 0.3 }
    },
    visible: { 
      x: 0, 
      opacity: 1,
      transition: { duration: 0.3 }
    }
  };

  const itemVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: (i) => ({
      x: 0,
      opacity: 1,
      transition: {
        delay: i * 0.1,
        duration: 0.3
      }
    })
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          variants={sidebarVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          className="fixed left-6 top-1/3 transform -translate-y-1/2 z-40 hidden lg:block"
        >
          <div className="bg-white/10 dark:bg-black/20 backdrop-blur-md rounded-2xl p-4 border border-white/20 dark:border-white/10 shadow-2xl">
            <nav className="space-y-4">
              {navItems.map((item, index) => (
                <motion.button
                  key={item.id}
                  custom={index}
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  onClick={() => scrollToSection(item.id)}
                  className={`group relative flex items-center justify-center w-12 h-12 rounded-xl transition-all duration-300 ${
                    activeSection === item.id
                      ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-lg shadow-purple-500/30'
                      : 'text-slate-600 dark:text-slate-400 hover:text-primary hover:bg-white/20 dark:hover:bg-white/10'
                  }`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="material-symbols-outlined text-xl">
                    {item.icon}
                  </span>
                  
                  {/* Tooltip */}
                  <div className="absolute left-16 px-3 py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-sm font-medium rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
                    {item.label}
                    <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1 w-2 h-2 bg-slate-900 dark:bg-white rotate-45"></div>
                  </div>
                </motion.button>
              ))}
            </nav>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Sidebar;