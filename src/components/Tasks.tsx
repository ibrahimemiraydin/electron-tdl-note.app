import React, { useEffect } from 'react';
import { useContextMenu } from 'react-contexify';
import TaskContextMenu from './TaskContextMenu';

interface Task {
  id: number;
  title: string;
  notes: string;
  createdAt: string;
  lastModifiedAt: string;
}

interface TasksProps {
  tasks: Task[];
  handleTaskClick: (taskId: number) => void;
  onContextMenu: (event: React.MouseEvent, taskId: number) => void;
  editingTaskId: number | null;
  setNewTitle: (title: string) => void;
  newTitle: string;
  handleRenameTask: (taskId: number, title: string) => void;
  handleTrashTask: (taskId: number) => void;
  handleUpdateTask: (taskId: number, lastModifiedAt: string) => void;
  inputRef: React.RefObject<HTMLInputElement>;
  setIsClickingRenameInput: (value: boolean) => void;
  setEditingTaskId: (taskId: number | null) => void;
}

const Tasks: React.FC<TasksProps> = ({
  tasks,
  handleTaskClick,
  editingTaskId,
  setNewTitle,
  newTitle,
  handleRenameTask,
  handleTrashTask,
  handleUpdateTask,
  inputRef,
  setIsClickingRenameInput,
  setEditingTaskId
}) => {
  const { show } = useContextMenu({
    id: 'task-context-menu'
  });

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, taskId: number) => {
    if (e.key === 'Enter') {
      applyRename(taskId);
    }
  };

  const currentDateTime = () => new Date().toISOString();

  const handlePropertiesClick = (taskId: number) => {
    handleUpdateTask(taskId, currentDateTime());
    console.log(`Task ID: ${taskId} - Properties updated`);
  };

  const handleContextMenu = (event: React.MouseEvent, taskId: number) => {
    event.preventDefault();
    show({ event, props: { taskId } });
  };

  const applyRename = (taskId: number) => {
    const task = tasks.find((task) => task.id === taskId);
    if (!newTitle.trim() && task) {
      handleRenameTask(taskId, task.title);
    } else {
      handleRenameTask(taskId, newTitle);
    }
    setEditingTaskId(null);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (editingTaskId !== null && inputRef.current && !inputRef.current.contains(event.target as Node)) {
        applyRename(editingTaskId);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [editingTaskId, newTitle, handleRenameTask, setEditingTaskId]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mt-4">
      {tasks.map((task) => (
        <div
          key={task.id}
          className="border border-gray-300 dark:border-slate-600 p-4 cursor-pointer rounded-lg transition duration-300 shadow-sm hover:bg-gray-200 dark:hover:bg-slate-600 flex flex-col justify-between relative"
          onClick={() => handleTaskClick(task.id)}
          onContextMenu={(event) => {
            handleContextMenu(event, task.id);
            (event.currentTarget as HTMLElement).setAttribute('data-task-id', task.id.toString());
          }}
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
            <span className="text-lg font-medium text-stone-950 dark:text-slate-200 break-words">{task.title}</span>
          )}
        </div>
      ))}
      <TaskContextMenu
        onRenameClick={setEditingTaskId}
        onTrashClick={handleTrashTask}
        onPropertiesClick={handlePropertiesClick}
      />
    </div>
  );
};

export default Tasks;
