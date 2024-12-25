import React from 'react';
import Sidebar from '../components/Sidebar';

interface Task {
  id: number;
  title: string;
  notes: string;
}

interface TrashPageProps {
  trashedTasks: Task[];
  deleteTaskPermanently: (id: number) => void;
}

const TrashPage: React.FC<TrashPageProps> = ({ trashedTasks, deleteTaskPermanently }) => {
  return (
    <Sidebar>
      <div className="p-4 w-full">
        <h1 className="text-2xl font-bold mb-4 text-blue-600">Trash</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {trashedTasks.map((task) => (
            <div key={task.id} className="bg-white p-4 rounded shadow-md">
              <h2 className="text-xl font-bold mb-2">{task.title}</h2>
              <button
                onClick={() => deleteTaskPermanently(task.id)}
                className="bg-red-500 hover:bg-red-600 text-white rounded p-2 w-full mt-2 transition duration-300"
              >
                Delete Task
              </button>
            </div>
          ))}
        </div>
      </div>
    </Sidebar>
  );
};

export default TrashPage;
