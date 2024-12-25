import React from 'react';

interface Task {
  id: number;
  title: string;
  notes: string;
}

interface TaskListProps {
  tasks: Task[];
  handleTaskClick: (taskId: number) => void;
  selectedTask: Task | null;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, handleTaskClick, selectedTask }) => {
  return (
    <ul className="mt-4 space-y-2">
      {tasks.map((task) => (
        <li
          key={task.id}
          className={`border-b border-gray-300 p-2 cursor-pointer rounded transition duration-300 ${
            selectedTask?.id === task.id ? 'bg-blue-100' : 'hover:bg-gray-200'
          }`}
          onClick={() => handleTaskClick(task.id)}
        >
          {task.title}
        </li>
      ))}
    </ul>
  );
};

export default TaskList;
