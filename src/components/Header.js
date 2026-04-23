import React, { useState } from 'react';

const Header = ({ darkMode, toggleDarkMode, activeSection, scrollToSection }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact' }
  ];

  const handleNavClick = (sectionId) => {
    scrollToSection(sectionId);
    setIsMobileMenuOpen(false); // Close mobile menu after navigation
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 dark:border-[#283039] bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo / Name */}
          <div 
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => handleNavClick('home')}
          >
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 text-primary">
              <span className="material-symbols-outlined text-3xl">code</span>
            </div>
            <h2 className="text-xl font-bold tracking-tight">Rokib Hasan</h2>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`text-sm font-medium transition-colors ${
                  activeSection === item.id
                    ? 'text-primary'
                    : 'text-slate-500 dark:text-slate-400 hover:text-primary'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>
          
          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-4">
            <button 
              onClick={toggleDarkMode}
              aria-label="Toggle Dark Mode" 
              className="p-2 rounded-lg text-slate-500 hover:bg-slate-200 dark:hover:bg-[#283039] transition-colors"
            >
              <span className="material-symbols-outlined">
                {darkMode ? 'light_mode' : 'dark_mode'}
              </span>
            </button>
            <button 
              onClick={() => handleNavClick('contact')}
              className="flex items-center justify-center h-10 px-6 rounded-lg bg-gradient-to-r from-primary to-secondary hover:from-primary-dark hover:to-pink-600 text-white text-sm font-bold transition-all shadow-lg shadow-purple-500/30 transform hover:scale-105"
            >
              Hire Me
            </button>
          </div>

          {/* Mobile Actions */}
          <div className="flex md:hidden items-center gap-2">
            <button 
              onClick={toggleDarkMode}
              aria-label="Toggle Dark Mode" 
              className="p-2 rounded-lg text-slate-500 hover:bg-slate-200 dark:hover:bg-[#283039] transition-colors"
            >
              <span className="material-symbols-outlined">
                {darkMode ? 'light_mode' : 'dark_mode'}
              </span>
            </button>
            
            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              aria-label="Toggle Mobile Menu"
              className="p-2 rounded-lg text-slate-500 hover:bg-slate-200 dark:hover:bg-[#283039] transition-colors"
            >
              <span className="material-symbols-outlined">
                {isMobileMenuOpen ? 'close' : 'menu'}
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 dark:border-[#283039] bg-background-light dark:bg-background-dark">
            <nav className="px-4 py-4 space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`block w-full text-left px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                    activeSection === item.id
                      ? 'text-primary bg-primary/10'
                      : 'text-slate-700 dark:text-slate-300 hover:text-primary hover:bg-slate-100 dark:hover:bg-[#283039]'
                  }`}
                >
                  {item.label}
                </button>
              ))}
              
              {/* Mobile Hire Me Button */}
              <button 
                onClick={() => handleNavClick('contact')}
                className="w-full mt-4 flex items-center justify-center h-12 px-6 rounded-lg bg-gradient-to-r from-primary to-secondary hover:from-primary-dark hover:to-pink-600 text-white text-base font-bold transition-all shadow-lg shadow-purple-500/30 transform hover:scale-105"
              >
                Hire Me
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;