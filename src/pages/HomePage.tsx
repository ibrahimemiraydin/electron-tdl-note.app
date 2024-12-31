import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

interface Task {
  id: number;
  title: string;
  notes: string;
  createdAt: string;
  lastModifiedAt: string;
}

interface HomePageProps {
  addTask: (title: string, notes: string) => void;
  tasks: Task[];
  trashTask: (id: number) => void;
  renameTask: (id: number, title: string) => void;
}

const HomePage: React.FC<HomePageProps> = ({ addTask, tasks, trashTask, renameTask }) => {
  const [taskTitle, setTaskTitle] = useState('');
  const [menuVisible, setMenuVisible] = useState<null | number>(null);
  const [editTaskId, setEditTaskId] = useState<null | number>(null);
  const [newTitle, setNewTitle] = useState('');
  const navigate = useNavigate();

  const handleAddTask = () => {
    addTask(taskTitle, '');
    setTaskTitle('');
  };

  const handleTaskClick = (taskId: number) => {
    navigate(`/tasks?taskId=${taskId}`);
  };

  const handleMenuToggle = (taskId: number) => {
    setMenuVisible(taskId === menuVisible ? null : taskId);
  };

  const handleMoveToTrash = (taskId: number) => {
    trashTask(taskId);
    setMenuVisible(null);
  };

  const handleRename = (taskId: number, title: string) => {
    renameTask(taskId, title);
    setEditTaskId(null);
    setMenuVisible(null);
  };

  // Sort tasks by lastModifiedAt in descending order and take the top 3
  const sortedRecentTasks = tasks
    .sort((a, b) => new Date(b.lastModifiedAt).getTime() - new Date(a.lastModifiedAt).getTime())
    .slice(0, 3);

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
        <div className="bg-white dark:bg-slate-700 rounded-xl p-8 shadow-2xl w-full max-w-3xl">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-gray-200 mb-6">Recent Tasks</h2>
          <div className="space-y-6">
            {sortedRecentTasks.map((task) => (
              <div
                key={task.id}
                className="bg-gray-100 dark:bg-slate-600 p-4 rounded-lg shadow-md border border-gray-300 dark:border-slate-500 relative cursor-pointer hover:bg-gray-200 dark:hover:bg-slate-500 transition duration-300"
                onClick={() => handleTaskClick(task.id)}
              >
                {editTaskId === task.id ? (
                  <input
                    type="text"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    onBlur={() => handleRename(task.id, newTitle)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        handleRename(task.id, newTitle);
                      }
                    }}
                    className="border dark:border-slate-600 dark:bg-slate-600 dark:text-white p-2 w-full rounded"
                  />
                ) : (
                  <>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-200 mb-2">{task.title}</h3>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">Created At: {new Date(task.createdAt).toLocaleString()}</p>
                    <p className="text-gray-500 dark:text-gray-400 text-sm mb-2">Last Modified: {new Date(task.lastModifiedAt).toLocaleString()}</p>
                    <p className="text-gray-700 dark:text-gray-300">{task.notes.length > 150 ? task.notes.substring(0, 150) + '...' : task.notes}</p>
                  </>
                )}
                <div className="absolute top-2 right-2">
                  <button onClick={(e) => {
                    e.stopPropagation();
                    handleMenuToggle(task.id);
                  }} className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100">
                    &#x2022;&#x2022;&#x2022;
                  </button>
                  {menuVisible === task.id && (
                    <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-slate-600 border border-gray-300 dark:border-slate-500 rounded shadow-lg z-10">
                      <button
                        onClick={() => {
                          setEditTaskId(task.id);
                          setNewTitle(task.title);
                          setMenuVisible(null);
                        }}
                        className="block w-full text-left px-4 py-2 text-gray-900 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-slate-500"
                      >
                        Rename
                      </button>
                      <button
                        onClick={() => handleMoveToTrash(task.id)}
                        className="block w-full text-left px-4 py-2 text-gray-900 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-slate-500"
                      >
                        Move to Trash
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
