import React, { useState, useEffect } from 'react';

const ThemeSwitch: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Load the theme setting from the database when the component mounts
    window.electron.ipcRenderer.invoke('get-setting', 'theme').then((savedTheme) => {
      if (savedTheme) {
        setIsDarkMode(savedTheme.value === 'dark');
        document.documentElement.classList.toggle('dark', savedTheme.value === 'dark');
      }
    });
  }, []);

  const toggleTheme = () => {
    const newTheme = isDarkMode ? 'light' : 'dark';
    setIsDarkMode(!isDarkMode);
    // Save the new theme setting to the database
    window.electron.ipcRenderer.invoke('set-setting', 'theme', newTheme);
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
