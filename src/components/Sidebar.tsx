import React, { useState, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import SettingsModal from './SettingsModal';
import SearchModal from './SearchModal';

interface SidebarProps {
  children: React.ReactNode;
  profilePhoto: string;
  name: string;
  updateProfile: (profilePhoto: string, name: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ children, profilePhoto, name, updateProfile }) => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const profileButtonRef = useRef<HTMLButtonElement>(null);

  return (
    <div className="flex h-screen">
      <div className="fixed inset-y-0 left-0 w-64 bg-gradient-to-r from-stone-50 via-stone-100 to-stone-50 dark:bg-gradient-to-r dark:from-slate-800 dark:via-slate-700 dark:to-slate-800 p-4 flex flex-col justify-between shadow-xl rounded-r-lg">
        <div className="space-y-6">
          <button
            ref={profileButtonRef}
            className="flex items-center p-4 w-full text-left hover:bg-blue-100 dark:hover:bg-slate-600 rounded-lg transition duration-300"
            onClick={() => setIsSettingsOpen(true)}
          >
            <img src={profilePhoto} alt="Profile" className="w-14 h-14 rounded-full mr-4 border-2 border-blue-500 transition duration-300 transform hover:scale-105" />
            <div className="flex flex-col">
              <span className="text-stone-950 dark:text-slate-200 font-bold text-xl">{name}</span>
              <span className="text-blue-500 text-sm">View Profile</span>
            </div>
          </button>
          <div className="space-y-3">
            <button
              className={`hover:bg-blue-100 dark:hover:bg-slate-600 text-stone-950 dark:text-slate-200 rounded-lg p-3 w-full text-left flex items-center transition duration-300 ${
                isActive('/search') ? 'bg-blue-100 dark:bg-slate-600' : ''
              }`}
              onClick={() => setIsSearchOpen(true)}
            >
              <i className="fas fa-search mr-3"></i>
              Search for a Task
            </button>
            <Link to="/">
              <button
                className={`hover:bg-blue-100 dark:hover:bg-slate-600 text-stone-950 dark:text-slate-200 rounded-lg p-3 w-full text-left flex items-center transition duration-300 ${
                  isActive('/') ? 'bg-blue-100 dark:bg-slate-600' : ''
                }`}
              >
                <i className="fas fa-home mr-3"></i>
                Home
              </button>
            </Link>
          </div>
          <div className="mt-10 space-y-3">
            <h3 className="text-stone-950 dark:text-slate-200 font-bold text-center text-lg">Your Tasks</h3>
            <Link to="/task-list">
              <button
                className={`hover:bg-blue-100 dark:hover:bg-slate-600 text-stone-950 dark:text-slate-200 rounded-lg p-3 w-full text-left flex items-center transition duration-300 ${
                  isActive('/task-list') ? 'bg-blue-100 dark:bg-slate-600' : ''
                }`}
              >
                <i className="fas fa-list mr-3"></i>
                Task List
              </button>
            </Link>
            <Link to="/tasks">
              <button
                className={`hover:bg-blue-100 dark:hover:bg-slate-600 text-stone-950 dark:text-slate-200 rounded-lg p-3 w-full text-left flex items-center transition duration-300 ${
                  isActive('/tasks') ? 'bg-blue-100 dark:bg-slate-600' : ''
                }`}
              >
                <i className="fas fa-tasks mr-3"></i>
                Task Manager
              </button>
            </Link>
          </div>
        </div>
        <div className="mt-auto space-y-3">
          <button
            onClick={() => setIsSettingsOpen(true)}
            className="hover:bg-blue-100 dark:hover:bg-slate-600 text-stone-950 dark:text-slate-200 rounded-lg p-3 w-full text-left flex items-center transition duration-300"
          >
            <i className="fas fa-cog mr-3"></i>
            Settings
          </button>
          <Link to="/trash">
            <button
              className={`hover:bg-blue-100 dark:hover:bg-slate-600 text-stone-950 dark:text-slate-200 rounded-lg p-3 w-full text-left flex items-center transition duration-300 ${
                isActive('/trash') ? 'bg-blue-100 dark:bg-slate-600' : ''
              }`}
            >
              <i className="fas fa-trash mr-3"></i>
              Trash
            </button>
          </Link>
        </div>
      </div>
      <div className="ml-64 flex-1 p-6 bg-stone-50 dark:bg-slate-800 overflow-y-auto">
        {children}
      </div>
      <SettingsModal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} updateProfile={updateProfile} />
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} onSearch={(query) => console.log(query)} />
    </div>
  );
};

export default Sidebar;
