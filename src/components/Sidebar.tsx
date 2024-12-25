import React from 'react';
import { Link } from 'react-router-dom';

interface SidebarProps {
  children: React.ReactNode;
}

const Sidebar: React.FC<SidebarProps> = ({ children }) => {
  return (
    <div className="flex h-screen bg-white">
      <div className="w-1/6 bg-white p-4 flex flex-col justify-between shadow-md">
        <div>
          <div className="text-center mb-6">
            <h2 className="text-xl font-bold text-blue-600">Notefier</h2>
          </div>
          <div className="space-y-2">
            <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 rounded p-2 w-full transition duration-300">
              Search Tasks
            </button>
            <Link to="/">
              <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 rounded p-2 w-full transition duration-300">
                Home
              </button>
            </Link>
            <Link to="/task-list">
              <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 rounded p-2 w-full transition duration-300">
                Task List
              </button>
            </Link>
            <Link to="/tasks">
              <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 rounded p-2 w-full transition duration-300">
                Task Manager
              </button>
            </Link>
          </div>
        </div>
        <div className="space-y-2">
          <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 rounded p-2 w-full transition duration-300">
            Settings
          </button>
            <Link to="/trash">
              <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 rounded p-2 w-full transition duration-300"> 
                Trash 
              </button>
            </Link>
        </div>
      </div>
      <div className="flex-1 p-1 ">{children}</div>
    </div>
  );
};

export default Sidebar;
