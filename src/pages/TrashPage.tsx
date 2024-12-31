import React from 'react';

interface Task {
  id: number;
  title: string;
  notes: string;
  createdAt: string;
  lastModifiedAt: string;
}

interface TrashPageProps {
  trashedTasks: Task[];
  tasks: Task[];
  setTasks: (tasks: Task[]) => void;
  deleteTaskPermanently: (id: number) => void;
  restoreTask: (id: number) => void;
}

const TrashPage: React.FC<TrashPageProps> = ({ trashedTasks, deleteTaskPermanently, restoreTask }) => {
  return (
    <div className="p-6 w-full bg-stone-50 dark:bg-slate-800 min-h-screen">
      <h1 className="text-5xl font-extrabold mb-8 text-center text-stone-950 dark:text-slate-200">Trash</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {trashedTasks.map((task) => (
          <div
            key={task.id}
            className="bg-white dark:bg-slate-700 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-green-600 to-red-700 opacity-0 group-hover:opacity-50 transition-opacity duration-300 rounded-lg"></div>
            <div className="relative z-10 flex flex-col justify-between h-full">
              <div>
                <h2 className="text-2xl font-bold mb-2 text-stone-950 dark:text-slate-200">{task.title}</h2>
                <p className="text-gray-600 dark:text-slate-400 overflow-hidden text-ellipsis">
                  {task.notes.length > 100 ? `${task.notes.substring(0, 100)}...` : task.notes}
                </p>
              </div>
              <div className="mt-4 flex justify-between">
                <button
                  onClick={() => restoreTask(task.id)}
                  className="bg-green-500 hover:bg-green-600 text-white rounded-lg py-2 px-4 transition duration-300 transform hover:scale-105"
                >
                  Restore
                </button>
                <button
                  onClick={() => deleteTaskPermanently(task.id)}
                  className="bg-red-500 hover:bg-red-600 text-white rounded-lg py-2 px-4 transition duration-300 transform hover:scale-105"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
        {trashedTasks.length === 0 && (
          <div className="col-span-full text-center text-gray-500 dark:text-slate-400 mt-8">
            No tasks in trash
          </div>
        )}
      </div>
    </div>
  );
};

export default TrashPage;
