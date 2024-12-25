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
  onContextMenu: (event: React.MouseEvent, taskId: number) => void;
  editingTaskId: number | null;
  setNewTitle: (title: string) => void;
  newTitle: string;
  handleRenameTask: (taskId: number, title: string) => void;
  handleContextMenuEllipsis: (event: React.MouseEvent, taskId: number) => void;
}

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  handleTaskClick,
  selectedTask,
  onContextMenu,
  editingTaskId,
  setNewTitle,
  newTitle,
  handleRenameTask,
  handleContextMenuEllipsis
}) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, taskId: number) => {
    if (e.key === 'Enter') {
      handleRenameTask(taskId, newTitle);
    }
  };

  return (
    <ul className="mt-4 space-y-2">
      {tasks.map((task) => (
        <li
          key={task.id}
          className={`border-b border-gray-300 p-2 cursor-pointer rounded transition duration-300 ${
            selectedTask?.id === task.id || editingTaskId === task.id ? 'bg-blue-100' : 'hover:bg-gray-200'
          } flex justify-between items-center`}
          onClick={() => handleTaskClick(task.id)}
          onContextMenu={(event) => onContextMenu(event, task.id)}
        >
          {editingTaskId === task.id ? (
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              onKeyDown={(e) => handleKeyDown(e, task.id)}
              className="border p-1"
              autoFocus
            />
          ) : (
            <span>{task.title}</span>
          )}
          <span
            className="ml-2 cursor-pointer"
            onClick={(event) => handleContextMenuEllipsis(event, task.id)}
            onContextMenu={(event) => handleContextMenuEllipsis(event, task.id)}
          >
            ⋯
          </span>
        </li>
      ))}
    </ul>
  );
};

export default TaskList;
