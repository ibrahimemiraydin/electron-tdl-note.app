import React from 'react';
import Sidebar from '../components/Sidebar';
import TaskList from '../components/TaskList';

interface Task {
  id: number;
  title: string;
  notes: string;
}

interface TaskPageProps {
  tasks: Task[];
  selectedTask: Task | null;
  setSelectedTask: (task: Task | null) => void;
  updateTask: (id: number, notes: string) => void;
  deleteTask: (id: number) => void;
}

const TaskPage: React.FC<TaskPageProps> = ({
  tasks,
  selectedTask,
  setSelectedTask,
  updateTask,
  deleteTask
}) => {
  const handleTaskClick = (taskId: number): void => {
    const task = tasks.find((task) => task.id === taskId);
    if (task) {
      setSelectedTask(task);
    }
  };

  const handleNoteChange = (notes: string): void => {
    if (selectedTask) {
      updateTask(selectedTask.id, notes);
    }
  };

  return (
    <Sidebar>
      <div className="flex p-4 bg-gray-100 min-h-screen w-full">
        <div className="w-1/3 pr-4">
          <TaskList tasks={tasks} handleTaskClick={handleTaskClick} selectedTask={selectedTask} />
        </div>
        <div className="w-2/3 pl-4">
          {selectedTask && (
            <>
              <h2 className="text-xl font-bold mb-4 text-blue-600">Task Notes for "{selectedTask.title}"</h2>
              <textarea
                value={selectedTask.notes}
                onChange={(e) => handleNoteChange(e.target.value)}
                placeholder="Add notes here..."
                className="border border-gray-300 rounded p-2 w-full h-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={() => deleteTask(selectedTask.id)}
                className="bg-red-500 hover:bg-red-600 text-white rounded p-2 w-full mt-2 transition duration-300"
              >
                Delete Task
              </button>
            </>
          )}
        </div>
      </div>
    </Sidebar>
  );
};

export default TaskPage;
