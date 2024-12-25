import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

interface HomePageProps {
  addTask: (title: string, notes: string) => void;
}

const HomePage: React.FC<HomePageProps> = ({ addTask }) => {
  const [taskTitle, setTaskTitle] = useState('');

  const handleAddTask = () => {
    addTask(taskTitle, '');
    setTaskTitle('');
  };

  return (
    <Sidebar>
      <div className="text-center bg-white rounded-lg p-8 shadow-lg">
        <h1 className="text-4xl font-bold text-blue-600 mb-4">Welcome to the To-Do App</h1>
        <p className="text-gray-700 mb-8">Organize your tasks and boost your productivity!</p>
        <input
          type="text"
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
          placeholder="New Task"
          className="border p-2 mb-4 w-full"
        />
        <button
          onClick={handleAddTask}
          className="bg-blue-500 hover:bg-blue-600 text-white rounded p-2 w-full mt-2 transition duration-300"
        >
          Add Task
        </button>
        <Link to="/tasks">
          <button className="bg-blue-500 hover:bg-blue-600 text-white rounded-full p-4 px-8 transition duration-300 shadow-lg transform hover:scale-105 mt-4">
            Go to Task Manager
          </button>
        </Link>
      </div>
    </Sidebar>
  );
};

export default HomePage;
