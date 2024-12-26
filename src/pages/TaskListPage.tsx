import React from 'react';

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
    <div className="p-4 w-full bg-stone-50 dark:bg-slate-800">
      <h1 className="text-2xl font-bold mb-4 text-stone-950 dark:text-slate-200">All Tasks</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {tasks.map((task) => (
          <div key={task.id} className="bg-stone-50 dark:bg-slate-700 p-4 rounded shadow-md border border-stone-300 dark:border-slate-600">
            <h2 className="text-xl font-bold mb-2 text-stone-950 dark:text-slate-200">{task.title}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskListPage;
