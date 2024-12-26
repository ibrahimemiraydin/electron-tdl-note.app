import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ThemeSwitch from './ThemeSwitch';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose }) => {
  const location = useLocation();
  const [activeCategory, setActiveCategory] = useState('My Account');

  useEffect(() => {
    if (location.pathname.includes('my-account')) {
      setActiveCategory('My Account');
    } else if (location.pathname.includes('general')) {
      setActiveCategory('General');
    } else if (location.pathname.includes('language')) {
      setActiveCategory('Language');
    }
  }, [location.pathname]);

  if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 dark:bg-opacity-80"
      onClick={handleOverlayClick}
    >
      <div className="bg-stone-50 text-stone-950 p-6 rounded shadow-lg w-1/2 h-3/4 flex dark:bg-slate-800 dark:text-slate-200">
        <div className="w-1/4 border-r dark:border-gray-700">
          <ul className="space-y-2">
            <li>
              <button
                className={`w-full text-left p-2 ${activeCategory === 'My Account' ? 'bg-gray-200 dark:bg-gray-700' : ''}`}
                onClick={() => setActiveCategory('My Account')}
              >
                My Account
              </button>
            </li>
            <li>
              <button
                className={`w-full text-left p-2 ${activeCategory === 'General' ? 'bg-gray-200 dark:bg-slate-700' : ''}`}
                onClick={() => setActiveCategory('General')}
              >
                General
              </button>
            </li>
            <li>
              <button
                className={`w-full text-left p-2 ${activeCategory === 'Language' ? 'bg-gray-200 dark:bg-gray-700' : ''}`}
                onClick={() => setActiveCategory('Language')}
              >
                Language
              </button>
            </li>
          </ul>
        </div>
        <div className="w-3/4 p-4">
          {activeCategory === 'My Account' && <div>My Account Settings</div>}
          {activeCategory === 'General' && (
            <div>
              <h2 className="text-2xl mb-4">General Settings</h2>
              <div className="flex items-center justify-between mb-4">
                <label className="text-gray-700 dark:text-gray-300">Theme</label>
                <ThemeSwitch />
              </div>
            </div>
          )}
          {activeCategory === 'Language' && <div>Language Settings</div>}
          <button onClick={onClose} className="mt-4 bg-blue-500 hover:bg-blue-600 text-white rounded p-2 dark:bg-blue-700">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;
