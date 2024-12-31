import React, { useState, useEffect } from 'react';
import ThemeSwitch from './ThemeSwitch';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  updateProfile: (profilePhoto: string, name: string) => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose, updateProfile }) => {
  const [activeCategory, setActiveCategory] = useState('My Account');
  const [profilePhoto, setProfilePhoto] = useState<string>('');
  const [name, setName] = useState<string>('');

  useEffect(() => {
    if (isOpen) {
      setActiveCategory('My Account'); // Default category
      // Load settings when the modal is opened
      window.electron.ipcRenderer.invoke('get-setting', 'profilePhoto').then((profilePhoto) => {
        if (profilePhoto) {
          setProfilePhoto(profilePhoto.value);
        }
      });
      window.electron.ipcRenderer.invoke('get-setting', 'name').then((name) => {
        if (name) {
          setName(name.value);
        }
      });
    }
  }, [isOpen]);

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleProfilePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event: ProgressEvent<FileReader>) => {
        if (event.target && event.target.result) {
          setProfilePhoto(event.target.result as string);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleApplyChanges = () => {
    updateProfile(profilePhoto, name);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 dark:bg-opacity-80"
      onClick={handleOverlayClick}
    >
      <div className="bg-stone-50 text-stone-950 p-8 rounded-xl shadow-2xl w-full max-w-3xl h-[90vh] mx-6 flex flex-col dark:bg-slate-800 dark:text-slate-200">
        <div className="flex h-full">
          <div className="w-1/4 border-r dark:border-gray-700 flex flex-col justify-between">
            <div>
              <h2 className="text-3xl font-bold mb-6">Settings</h2>
              <ul className="space-y-4">
                <li>
                  <button
                    className={`w-full text-left py-3 px-4 rounded-lg transition-colors duration-300 ${
                      activeCategory === 'My Account' ? 'bg-blue-100 dark:bg-slate-700' : 'hover:bg-gray-200 dark:hover:bg-slate-600'
                    }`}
                    onClick={() => setActiveCategory('My Account')}
                  >
                    My Account
                  </button>
                </li>
                <li>
                  <button
                    className={`w-full text-left py-3 px-4 rounded-lg transition-colors duration-300 ${
                      activeCategory === 'General' ? 'bg-blue-100 dark:bg-slate-700' : 'hover:bg-gray-200 dark:hover:bg-slate-600'
                    }`}
                    onClick={() => setActiveCategory('General')}
                  >
                    General
                  </button>
                </li>
                <li>
                  <button
                    className={`w-full text-left py-3 px-4 rounded-lg transition-colors duration-300 ${
                      activeCategory === 'Language' ? 'bg-blue-100 dark:bg-slate-700' : 'hover:bg-gray-200 dark:hover:bg-slate-600'
                    }`}
                    onClick={() => setActiveCategory('Language')}
                  >
                    Language
                  </button>
                </li>
              </ul>
            </div>
            <button
              onClick={onClose}
              className="bg-blue-500 hover:bg-blue-600 text-white rounded-lg py-2 px-4 mt-6 transition duration-300"
            >
              Close
            </button>
          </div>
          <div className="w-3/4 p-8 overflow-y-auto">
            {activeCategory === 'My Account' && (
              <div className="flex flex-col items-center">
                <h2 className="text-3xl font-semibold mb-4 text-center">My Account Settings</h2>
                <label className="mb-3 text-gray-700 dark:text-gray-300">Profile Photo</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleProfilePhotoChange}
                  className="hidden"
                  id="profile-photo-input"
                />
                <label htmlFor="profile-photo-input" className="cursor-pointer mb-4">
                  <div className="w-24 h-24 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                    {profilePhoto ? (
                      <img src={profilePhoto} alt="Profile" className="w-24 h-24 rounded-full object-cover" />
                    ) : (
                      <span className="text-gray-500 dark:text-gray-400">Click to upload</span>
                    )}
                  </div>
                </label>
                <label className="mb-3 text-gray-700 dark:text-gray-300">Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={handleNameChange}
                  className="border p-3 w-full rounded-lg dark:bg-slate-700 dark:border-slate-600 dark:text-white mb-4"
                  maxLength={18}
                />
                <button
                  onClick={handleApplyChanges}
                  className="bg-blue-500 hover:bg-blue-600 text-white rounded-lg py-2 px-4 transition duration-300"
                >
                  Apply Changes
                </button>
              </div>
            )}
            {activeCategory === 'General' && (
              <div>
                <h2 className="text-3xl font-semibold mb-4 text-center">General Settings</h2>
                <div className="flex justify-between items-center">
                  <label className="text-lg font-medium mb-4">Theme</label>
                  <ThemeSwitch />
                </div>
              </div>
            )}
            {activeCategory === 'Language' && (
              <div>
                <h2 className="text-3xl font-semibold mb-4 text-center">Language Settings</h2>
                {/* Language settings content goes here */}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;
