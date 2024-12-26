import React, { useState, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import SettingsModal from './SettingsModal';
import ProfileContextMenu from './ProfileContextMenu';

interface SidebarProps {
  children: React.ReactNode;
}

const Sidebar: React.FC<SidebarProps> = ({ children }) => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isProfileMenuVisible, setProfileMenuVisible] = useState(false);
  const profileButtonRef = useRef<HTMLButtonElement>(null);

  const toggleProfileMenu = () => {
    setProfileMenuVisible((prev) => !prev);
  };

  const closeProfileMenu = () => {
    setProfileMenuVisible(false);
  };

  return (
    <div className="flex h-screen bg-stone-50 dark:bg-slate-800 relative">
      <div className="w-1/8 bg-stone-50 dark:bg-slate-800 p-2 flex flex-col justify-between shadow-md">
        <div>
          <button
            ref={profileButtonRef}
            onClick={toggleProfileMenu}
            className="flex items-center mb-6 p-4 w-full text-left hover:bg-gray-200 dark:hover:bg-slate-600 transition duration-300"
          >
            <img src="/path/to/profile-picture.jpg" alt="Profile" className="w-10 h-10 rounded-full mr-2" />
            <span className="text-stone-950 dark:text-slate-200 font-bold">İbrahim Emir Aydın</span>
          </button>
          {isProfileMenuVisible && (
            <ProfileContextMenu
              isVisible={isProfileMenuVisible}
              onClose={closeProfileMenu}
              buttonRef={profileButtonRef}
            />
          )}
          <div className="space-y-2">
            <button
              className={`hover:bg-gray-200 dark:hover:bg-slate-600 text-stone-950 dark:text-slate-200 rounded p-2 w-full text-left transition duration-300 ${
                isActive('/search') ? 'bg-gray-200 dark:bg-slate-600' : ''
              }`}
            >
              Search Tasks
            </button>
            <Link to="/">
              <button
                className={`hover:bg-gray-200 dark:hover:bg-slate-600 text-stone-950 dark:text-slate-200 rounded p-2 w-full text-left transition duration-300 ${
                  isActive('/') ? 'bg-gray-200 dark:bg-slate-600' : ''
                }`}
              >
                Home
              </button>
            </Link>
          </div>
          <div className="mt-8">
            <h3 className="text-stone-950 dark:text-slate-200 font-bold mb-2 text-center">Your Tasks</h3>
            <div className="space-y-2">
              <Link to="/task-list">
                <button
                  className={`hover:bg-gray-200 dark:hover:bg-slate-600 text-stone-950 dark:text-slate-200 rounded p-2 w-full text-left transition duration-300 ${
                    isActive('/task-list') ? 'bg-gray-200 dark:bg-slate-600' : ''
                  }`}
                >
                  Task List
                </button>
              </Link>
              <Link to="/tasks">
                <button
                  className={`hover:bg-gray-200 dark:hover:bg-slate-600 text-stone-950 dark:text-slate-200 rounded p-2 w-full text-left transition duration-300 ${
                    isActive('/tasks') ? 'bg-gray-200 dark:bg-slate-600' : ''
                  }`}
                >
                  Task Manager
                </button>
              </Link>
            </div>
          </div>
        </div>
        <div className="space-y-2 mt-8">
          <button
            onClick={() => setIsSettingsOpen(true)}
            className="hover:bg-gray-200 dark:hover:bg-slate-600 text-stone-950 dark:text-slate-200 rounded p-2 w-full text-left transition duration-300"
          >
            Settings
          </button>
          <Link to="/trash">
            <button
              className={`hover:bg-gray-200 dark:hover:bg-slate-600 text-stone-950 dark:text-slate-200 rounded p-2 w-full text-left transition duration-300 ${
                isActive('/trash') ? 'bg-gray-200 dark:bg-slate-600' : ''
              }`}
            >
              Trash
            </button>
          </Link>
        </div>
      </div>
      <div className="flex-1 p-4 bg-stone-50 dark:bg-slate-800">{children}</div>
      <SettingsModal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
    </div>
  );
};

export default Sidebar;
