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
    <>
      <div className="text-center bg-stone-50 dark:bg-slate-800 rounded-lg p-8 shadow-lg">
        <h1 className="text-4xl font-bold text-stone-950 dark:text-slate-200 mb-4">Notefier</h1>
        <p className="text-stone-950 dark:text-slate-200 mb-8">Organize your tasks and boost your productivity!</p>
        <input
          type="text"
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
          placeholder="New Task"
          className="border dark:border-slate-700 dark:bg-slate-700 dark:text-white p-2 mb-4 w-3/4 mx-auto rounded"
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
      <div className="mt-8 bg-stone-50 dark:bg-slate-800 rounded-lg p-6 shadow-lg">
        <h2 className="text-3xl font-bold text-stone-950 dark:text-slate-200 mb-4">Recent Tasks</h2>
        <div className="space-y-4">
          {sortedRecentTasks.map((task) => (
            <div
              key={task.id}
              className="bg-white dark:bg-slate-700 p-4 rounded shadow-md border border-gray-300 dark:border-slate-600 relative cursor-pointer hover:bg-gray-100 dark:hover:bg-slate-600 transition duration-300"
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
                  className="border dark:border-slate-600 dark:bg-slate-600 dark:text-white p-2 w-full"
                />
              ) : (
                <>
                  <h3 className="text-xl font-bold text-stone-950 dark:text-slate-200 mb-2">{task.title}</h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Created At: {new Date(task.createdAt).toLocaleString()}</p>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">Last Modified: {new Date(task.lastModifiedAt).toLocaleString()}</p>
                  <p className="text-stone-950 dark:text-slate-200">
                    {task.notes.length > 203 ? task.notes.substring(0, 203) + '...' : task.notes}
                  </p>
                </>
              )}
              <div className="absolute top-2 right-2">
                <button onClick={(e) => {
                  e.stopPropagation();
                  handleMenuToggle(task.id);
                }} className="text-stone-950 dark:text-slate-200 hover:text-gray-700 dark:hover:text-slate-200">
                  &#x2022;&#x2022;&#x2022;
                </button>
                {menuVisible === task.id && (
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-700 border border-gray-300 dark:border-slate-600 rounded shadow-lg z-10">
                    <button
                      onClick={() => {
                        setEditTaskId(task.id);
                        setNewTitle(task.title);
                        setMenuVisible(null);
                      }}
                      className="block w-full text-left px-4 py-2 text-stone-950 dark:text-slate-200 hover:bg-gray-100 dark:hover:bg-slate-600"
                    >
                      Rename
                    </button>
                    <button
                      onClick={() => handleMoveToTrash(task.id)}
                      className="block w-full text-left px-4 py-2 text-stone-950 dark:text-slate-200 hover:bg-gray-100 dark:hover:bg-slate-600"
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
    </>
  );
};

export default HomePage;
