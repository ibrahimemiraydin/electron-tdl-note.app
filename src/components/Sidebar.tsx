import React from 'react';
import { Link, useLocation } from 'react-router-dom';

interface SidebarProps {
  children: React.ReactNode;
}

const Sidebar: React.FC<SidebarProps> = ({ children }) => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="flex h-screen bg-white">
      <div className="w-1/8 bg-white p-2 flex flex-col justify-between shadow-md">
        <div>
          <button className="flex items-center mb-6 p-4 w-full text-left hover:bg-gray-200 transition duration-300">
            <img src="/path/to/profile-picture.jpg" alt="Profile" className="w-10 h-10 rounded-full mr-2" />
            <span className="text-gray-700 font-bold">İbrahim Emir Aydın</span>
          </button>
          <div className="space-y-2">
            <button className={`hover:bg-gray-200 text-gray-700 rounded p-2 w-full transition duration-300 ${isActive('/search') ? 'bg-gray-200' : ''}`}>
              Search Tasks
            </button>
            <Link to="/">
              <button className={`hover:bg-gray-200 text-gray-700 rounded p-2 w-full transition duration-300 ${isActive('/') ? 'bg-gray-200' : ''}`}>
                Home
              </button>
            </Link>
          </div>
          <div className="mt-8">
            <h3 className="text-gray-700 font-bold mb-2 text-center">Your Tasks</h3>
            <div className="space-y-2">
              <Link to="/task-list">
                <button className={`hover:bg-gray-200 text-gray-700 rounded p-2 w-full transition duration-300 ${isActive('/task-list') ? 'bg-gray-200' : ''}`}>
                  Task List
                </button>
              </Link>
              <Link to="/tasks">
                <button className={`hover:bg-gray-200 text-gray-700 rounded p-2 w-full transition duration-300 ${isActive('/tasks') ? 'bg-gray-200' : ''}`}>
                  Task Manager
                </button>
              </Link>
            </div>
          </div>
        </div>
        <div className="space-y-2 mt-8">
          <button className="hover:bg-gray-200 text-gray-700 rounded p-2 w-full transition duration-300">
            Settings
          </button>
          <Link to="/trash">
            <button className={`hover:bg-gray-200 text-gray-700 rounded p-2 w-full transition duration-300 ${isActive('/trash') ? 'bg-gray-200' : ''}`}>
              Trash
            </button>
          </Link>
        </div>
      </div>
      <div className="flex-1 p-4">{children}</div>
    </div>
  );
};

export default Sidebar;
