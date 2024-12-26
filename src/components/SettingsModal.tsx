import React, { useState } from 'react';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose }) => {
  const [activeCategory, setActiveCategory] = useState('My Account');

  if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      onClick={handleOverlayClick}
    >
      <div className="bg-white p-6 rounded shadow-lg w-1/2 h-3/4 flex">
        <div className="w-1/4 border-r">
          <ul className="space-y-2">
            <li>
              <button
                className={`w-full text-left p-2 ${activeCategory === 'My Account' ? 'bg-gray-200' : ''}`}
                onClick={() => setActiveCategory('My Account')}
              >
                My Account
              </button>
            </li>
            <li>
              <button
                className={`w-full text-left p-2 ${activeCategory === 'General' ? 'bg-gray-200' : ''}`}
                onClick={() => setActiveCategory('General')}
              >
                General
              </button>
            </li>
            <li>
              <button
                className={`w-full text-left p-2 ${activeCategory === 'Language' ? 'bg-gray-200' : ''}`}
                onClick={() => setActiveCategory('Language')}
              >
                Language
              </button>
            </li>
          </ul>
        </div>
        <div className="w-3/4 p-4">
          {activeCategory === 'My Account' && <div>My Account Settings</div>}
          {activeCategory === 'General' && <div>General Settings</div>}
          {activeCategory === 'Language' && <div>Language Settings</div>}
          <button onClick={onClose} className="mt-4 bg-blue-500 hover:bg-blue-600 text-white rounded p-2">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;
