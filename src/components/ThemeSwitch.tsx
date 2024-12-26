import React, { useState, useEffect } from 'react';

const ThemeSwitch: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme) {
      setIsDarkMode(currentTheme === 'dark');
      document.documentElement.classList.toggle('dark', currentTheme === 'dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = isDarkMode ? 'light' : 'dark';
    setIsDarkMode(!isDarkMode);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  return (
    <div className="flex items-center">
      <span className="mr-2 text-gray-700 dark:text-gray-300">Light</span>
      <button
        className={`w-12 h-6 flex items-center bg-gray-300 dark:bg-gray-600 rounded-full p-1 cursor-pointer ${
          isDarkMode ? 'justify-end' : 'justify-start'
        }`}
        onClick={toggleTheme}
      >
        <div className="bg-white w-4 h-4 rounded-full shadow-md transform transition-transform"></div>
      </button>
      <span className="ml-2 text-gray-700 dark:text-gray-300">Dark</span>
    </div>
  );
};

export default ThemeSwitch;
