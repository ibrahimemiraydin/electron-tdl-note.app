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
  inputRef: React.RefObject<HTMLInputElement>;
  setIsClickingRenameInput: (value: boolean) => void;
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
  handleContextMenuEllipsis,
  inputRef,
  setIsClickingRenameInput
}) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, taskId: number) => {
    if (e.key === 'Enter') {
      handleRenameTask(taskId, newTitle);
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
      {tasks.map((task) => (
        <div
          key={task.id}
          className={`border border-gray-300 dark:border-slate-600 p-4 cursor-pointer rounded-lg transition duration-300 shadow-sm ${
            selectedTask?.id === task.id || editingTaskId === task.id ? 'bg-blue-100 dark:bg-slate-700' : 'hover:bg-gray-200 dark:hover:bg-slate-600'
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
              className="border dark:border-slate-600 dark:bg-slate-600 dark:text-white p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              ref={inputRef}
              onMouseDown={() => setIsClickingRenameInput(true)}
              autoFocus
            />
          ) : (
            <span className="text-lg font-medium text-stone-950 dark:text-slate-200 flex-grow">{task.title}</span>
          )}
          <span
            className="ml-4 cursor-pointer text-gray-500 hover:text-gray-700 dark:text-slate-200 dark:hover:text-white transition duration-300"
            onClick={(event) => {
              event.stopPropagation();
              handleContextMenuEllipsis(event, task.id);
            }}
            onContextMenu={(event) => {
              event.stopPropagation();
              handleContextMenuEllipsis(event, task.id);
            }}
          >
            ⋯
          </span>
        </div>
      ))}
    </div>
  );
};

export default TaskList;
