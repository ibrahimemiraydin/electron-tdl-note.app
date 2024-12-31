import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface Task {
  id: number;
  title: string;
  notes: string;
}

interface TaskListPageProps {
  tasks: Task[];
}

const TaskListPage: React.FC<TaskListPageProps> = ({ tasks }) => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get('search') || '';

  const [searchQuery, setSearchQuery] = useState(query);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>(tasks);

  useEffect(() => {
    if (searchQuery) {
      setFilteredTasks(tasks.filter(task => 
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.notes.toLowerCase().includes(searchQuery.toLowerCase())
      ));
    } else {
      setFilteredTasks(tasks);
    }
  }, [searchQuery, tasks]);

  useEffect(() => {
    setSearchQuery(query);
  }, [query]);

  return (
    <div className="p-6 w-full bg-stone-50 dark:bg-slate-800">
      <h1 className="text-4xl font-extrabold mb-4 text-center text-stone-950 dark:text-slate-200">All Tasks</h1>
      <div className="mb-6">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-600 dark:border-slate-500 dark:text-white"
          placeholder="Search tasks..."
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredTasks.map((task) => (
          <div key={task.id} className="bg-white dark:bg-slate-700 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-500 opacity-0 group-hover:opacity-50 transition-opacity duration-300 rounded-lg"></div>
            <div className="relative z-10">
              <h2 className="text-2xl font-bold mb-2 text-stone-950 dark:text-slate-200">{task.title}</h2>
              <p className="text-gray-600 dark:text-slate-400 overflow-hidden whitespace-nowrap overflow-ellipsis">{task.notes.length > 100 ? `${task.notes.substring(0, 100)}...` : task.notes}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskListPage;
