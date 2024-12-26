import React, { useState, useEffect, useRef } from 'react';
import TaskList from '../components/TaskList';
import { Menu, Item, useContextMenu } from 'react-contexify';
import 'react-contexify/dist/ReactContexify.css';
import { useLocation } from 'react-router-dom';

interface Task {
  id: number;
  title: string;
  notes: string;
}

interface TaskManagerPageProps {
  tasks: Task[];
  selectedTask: Task | null;
  setSelectedTask: (task: Task | null) => void;
  updateTask: (id: number, notes: string) => void;
  trashTask: (id: number) => void;
  renameTask: (id: number, title: string) => void;
}

const TaskManagerPage: React.FC<TaskManagerPageProps> = ({
  tasks,
  selectedTask,
  setSelectedTask,
  updateTask,
  trashTask,
  renameTask
}) => {
  const { show } = useContextMenu({
    id: 'task-context-menu'
  });

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const taskId = queryParams.get('taskId');

  const [newTitle, setNewTitle] = useState<string>('');
  const [editingTaskId, setEditingTaskId] = useState<number | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editingTaskId !== null) {
      const task = tasks.find((task) => task.id === editingTaskId);
      if (task) {
        setNewTitle(task.title);
      }
    }
  }, [editingTaskId, tasks]);

  useEffect(() => {
    if (taskId) {
      const task = tasks.find((task) => task.id === Number(taskId));
      if (task) {
        setSelectedTask(task);
      }
    }
  }, [taskId, tasks, setSelectedTask]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
        if (editingTaskId !== null) {
          handleRenameTask(editingTaskId, newTitle);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [editingTaskId, newTitle]);

  const handleTaskClick = (taskId: number): void => {
    const task = tasks.find((task) => task.id === taskId);
    if (task) {
      setSelectedTask(task);
      setEditingTaskId(null);
    }
  };

  const handleRenameTask = (taskId: number, title: string) => {
    renameTask(taskId, title);
    setEditingTaskId(null);
    if (selectedTask && selectedTask.id === taskId) {
      const updatedTask = { ...selectedTask, title };
      setSelectedTask(updatedTask);
    }
  };

  const handleContextMenu = (event: React.MouseEvent, taskId: number) => {
    event.preventDefault();
    setSelectedTask(tasks.find((task) => task.id === taskId) || null);
    show({
      event,
      props: { taskId }
    });
  };

  const handleContextMenuEllipsis = (event: React.MouseEvent, taskId: number) => {
    event.preventDefault();
    setSelectedTask(tasks.find((task) => task.id === taskId) || null);
    show({
      event,
      props: { taskId }
    });
  };

  const handleRenameClick = (taskId: number) => {
    setEditingTaskId(taskId);
  };

  return (
    <div className="bg-stone-50 dark:bg-slate-800 w-full">
      <div className="flex p-4">
        <div className="w-1/4 pr-4">
          <TaskList
            tasks={tasks}
            handleTaskClick={handleTaskClick}
            selectedTask={selectedTask}
            onContextMenu={handleContextMenu}
            editingTaskId={editingTaskId}
            setNewTitle={setNewTitle}
            newTitle={newTitle}
            handleRenameTask={handleRenameTask}
            handleContextMenuEllipsis={handleContextMenuEllipsis}
          />
        </div>
        <div className="w-3/4 pl-4 flex flex-col">
          {selectedTask && (
            <>
              <div className="flex justify-between items-center mb-4">
                {editingTaskId === selectedTask.id ? (
                  <input
                    ref={inputRef}
                    type="text"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        handleRenameTask(editingTaskId, newTitle);
                      }
                    }}
                    className="border p-2 w-full dark:bg-slate-700 dark:border-slate-600 dark:text-white"
                  />
                ) : (
                  <h2 className="text-xl font-bold text-stone-950 dark:text-slate-200">{selectedTask.title}</h2>
                )}
                <button onClick={() => handleContextMenuEllipsis(event as any, selectedTask.id)} className="text-stone-950 dark:text-slate-200 hover:text-gray-700 dark:hover:text-slate-200">
                  &#x2022;&#x2022;&#x2022;
                </button>
              </div>
              <hr className="mb-4 dark:border-slate-600" />
            </>
          )}
        </div>
      </div>
      <Menu id="task-context-menu" className="dark:bg-slate-700 dark:border-slate-600 dark:text-slate-200">
        <Item onClick={({ props }) => handleRenameClick(props.taskId)}>Rename</Item>
        <Item onClick={({ props }) => trashTask(props.taskId)}>Move to Trash</Item>
      </Menu>
    </div>
  );
};

export default TaskManagerPage;
