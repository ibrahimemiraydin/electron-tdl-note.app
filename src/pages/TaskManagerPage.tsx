import React, { useState, useEffect, useRef } from 'react';
import Tasks from '../components/Tasks';
import NoteModal from '../components/NoteModal';
import { useLocation } from 'react-router-dom';

interface Task {
  id: number;
  title: string;
  notes: string;
  createdAt: string;
  lastModifiedAt: string;
}

interface TaskManagerPageProps {
  tasks: Task[];
  addTask: (title: string, notes: string) => void;
  updateTask: (id: number, notes: string, lastModifiedAt: string) => void;
  trashTask: (id: number) => void;
  renameTask: (id: number, title: string) => void;
}

const TaskManagerPage: React.FC<TaskManagerPageProps> = ({
  tasks,
  addTask,
  updateTask,
  trashTask,
  renameTask
}) => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const taskId = queryParams.get('taskId');

  const [newTitle, setNewTitle] = useState<string>('');
  const [editingTaskId, setEditingTaskId] = useState<number | null>(null);
  const [noteContent, setNoteContent] = useState<string>('');
  const [taskInput, setTaskInput] = useState<string>('');
  const [isNoteModalOpen, setIsNoteModalOpen] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [isClickingRenameInput, setIsClickingRenameInput] = useState<boolean>(false);
  const [currentTaskName, setCurrentTaskName] = useState<string>('');

  const currentDateTime = () => new Date().toISOString();

  const addTaskWithTimestamp = (title: string) => {
    addTask(title, '');
  };

  const handleUpdateTask = (taskId: number, lastModifiedAt: string) => {
    const task = tasks.find((task) => task.id === taskId);
    if (task) {
      task.lastModifiedAt = lastModifiedAt;
      updateTask(taskId, task.notes, lastModifiedAt);
    }
  };

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
        setNoteContent(task.notes);
        setCurrentTaskName(task.title);
      }
    }
  }, [taskId, tasks]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
        if (editingTaskId !== null && !isClickingRenameInput) {
          renameTask(editingTaskId, newTitle);
        } else {
          setIsClickingRenameInput(false);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [editingTaskId, newTitle, isClickingRenameInput]);

  const handleTaskClick = (taskId: number): void => {
    if (!isClickingRenameInput) {
      const task = tasks.find((task) => task.id === taskId);
      if (task) {
        setEditingTaskId(null);
        setNoteContent(task.notes);
        setCurrentTaskName(task.title);
        setIsNoteModalOpen(true);
        // Ensure taskId is in the URL to update the selected task
        window.history.pushState({}, '', `?taskId=${taskId}`);
      }
    } else {
      setIsClickingRenameInput(false);
    }
  };

  const handleNotesChange = (notes: string) => {
    setNoteContent(notes);
    const taskId = Number(queryParams.get('taskId'));
    if (taskId) {
      updateTask(taskId, notes, currentDateTime());
    }
  };

  const handleInputClick = () => {
    setNoteContent('');
  };

  const handleAddTask = () => {
    if (taskInput.trim()) {
      addTaskWithTimestamp(taskInput);
      setTaskInput('');
    }
  };

  const handleContextMenu = (event: React.MouseEvent, taskId: number) => {
    event.preventDefault();
    const taskElement = event.currentTarget as HTMLElement;
    taskElement.setAttribute('taskId', taskId.toString());
    event.target['taskId'] = taskId;
  };

  return (
    <div className="bg-stone-50 dark:bg-slate-800 h-full w-full flex flex-col p-6 space-y-6">
      <div className="bg-white dark:bg-slate-700 p-4 rounded-xl shadow-lg flex items-center space-x-2">
        <input
          type="text"
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleAddTask();
            }
          }}
          onClick={handleInputClick}
          placeholder="New Task"
          className="border p-3 flex-grow dark:bg-slate-600 dark:border-slate-500 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleAddTask}
          className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-lg transition duration-300 transform hover:scale-105"
        >
          Add Task
        </button>
      </div>
      <div className="flex-grow flex">
        <div className="w-full p-4 bg-white dark:bg-slate-700 rounded-xl shadow-lg">
          <Tasks
            tasks={tasks}
            handleTaskClick={handleTaskClick}
            onContextMenu={handleContextMenu}
            editingTaskId={editingTaskId}
            setNewTitle={setNewTitle}
            newTitle={newTitle}
            handleRenameTask={renameTask}
            handleTrashTask={trashTask}
            handleUpdateTask={handleUpdateTask}
            inputRef={inputRef}
            setIsClickingRenameInput={setIsClickingRenameInput}
            setEditingTaskId={setEditingTaskId}
          />
        </div>
      </div>
      <NoteModal
        isOpen={isNoteModalOpen}
        onClose={() => setIsNoteModalOpen(false)}
        taskName={currentTaskName}
        noteContent={noteContent}
        onNotesChange={handleNotesChange}
      />
    </div>
  );
};

export default TaskManagerPage;
