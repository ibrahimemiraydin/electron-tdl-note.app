import React from 'react';
import Sidebar from '../components/Sidebar';

interface Task {
  id: number;
  title: string;
  notes: string;
}

interface TaskListPageProps {
  tasks: Task[];
}

const TaskListPage: React.FC<TaskListPageProps> = ({ tasks }) => {
  return (
    <Sidebar>
      <div className="p-4 w-full">
        <h1 className="text-2xl font-bold mb-4 text-blue-600">All Tasks</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {tasks.map((task) => (
            <div key={task.id} className="bg-white p-4 rounded shadow-md">
              <h2 className="text-xl font-bold mb-2">{task.title}</h2>
            </div>
          ))}
        </div>
      </div>
    </Sidebar>
  );
};

export default TaskListPage;
