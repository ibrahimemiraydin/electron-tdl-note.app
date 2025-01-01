import React, { useState } from 'react';
import { Link } from 'react-router-dom';


interface HomePageProps {
  addTask: (title: string, notes: string) => void;
}

const HomePage: React.FC<HomePageProps> = ({ addTask }) => {
  const [taskTitle, setTaskTitle] = useState('');
  const [error, setError] = useState('');

  const handleAddTask = () => {
    if (taskTitle.trim() === '') {
      setError('Task title cannot be empty');
      return;
    }
    addTask(taskTitle, '');
    setTaskTitle('');
    setError('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-150 to-blue-200 dark:from-slate-900 dark:to-slate-800 py-12 px-4 overflow-hidden">
      <div className="max-w-5xl mx-auto flex flex-col items-center">
        <div className="text-center bg-white dark:bg-slate-700 rounded-xl p-10 shadow-2xl w-full max-w-lg mb-10">
          <h1 className="text-6xl font-extrabold text-blue-600 dark:text-blue-300 mb-6">Notefier</h1>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">Organize your tasks and boost your productivity!</p>
          <input
            type="text"
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
            placeholder="New Task"
            className="border dark:border-slate-600 dark:bg-slate-600 dark:text-white p-3 mb-4 w-full rounded-md focus:outline-none focus:ring-4 focus:ring-blue-500"
          />
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <button
            onClick={handleAddTask}
            className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-full p-4 w-full mt-2 transition duration-300 shadow-lg transform hover:scale-110"
          >
            Add Task
          </button>
          <Link to="/tasks">
            <button className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-full p-4 w-full mt-4 transition duration-300 shadow-lg transform hover:scale-110">
              Go to Task Manager
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
