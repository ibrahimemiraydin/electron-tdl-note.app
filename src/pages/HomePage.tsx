import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

interface Task {
  id: number;
  title: string;
  notes: string;
}

interface HomePageProps {
  addTask: (title: string, notes: string) => void;
  recentTasks: Task[];
}

const HomePage: React.FC<HomePageProps> = ({ addTask, recentTasks }) => {
  const [taskTitle, setTaskTitle] = useState('');

  const handleAddTask = () => {
    addTask(taskTitle, '');
    setTaskTitle('');
  };

  return (
    <Sidebar>
      <div className="text-center bg-white rounded-lg p-8 shadow-lg">
        <h1 className="text-4xl font-bold text-blue-600 mb-4">Notefier</h1>
        <p className="text-gray-700 mb-8">Organize your tasks and boost your productivity!</p>
        <input
          type="text"
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
          placeholder="New Task"
          className="border p-2 mb-4 w-3/4 mx-auto rounded"
        />
        <button
          onClick={handleAddTask}
          className="bg-blue-500 hover:bg-blue-600 text-white rounded-full p-4 w-3/4 mt-2 transition duration-300 shadow-lg transform hover:scale-105"
        >
          Add Task
        </button>
        <Link to="/tasks">
          <button className="bg-blue-500 hover:bg-blue-600 text-white rounded-full p-4 w-3/4 mt-4 transition duration-300 shadow-lg transform hover:scale-105">
            Go to Task Manager
          </button>
        </Link>
      </div>
      <div className="mt-8 bg-white rounded-lg p-6 shadow-lg">
        <h2 className="text-3xl font-bold text-blue-600 mb-4">Recent Tasks</h2>
        <div className="space-y-4">
          {recentTasks.slice(-3).reverse().map((task) => (
            <div key={task.id} className="bg-white p-4 rounded shadow-md border border-gray-300">
              <h3 className="text-xl font-bold text-gray-700 mb-2">{task.title}</h3>
              <p className="text-gray-600">{task.notes}</p>
            </div>
          ))}
        </div>
      </div>
    </Sidebar>
  );
};

export default HomePage;
