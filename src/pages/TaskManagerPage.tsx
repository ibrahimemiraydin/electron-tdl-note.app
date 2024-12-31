import React, { useState, useEffect, useRef } from 'react';
import TaskList from '../components/TaskList';
import NoteModal from '../components/NoteModal';
import { Menu, Item, useContextMenu } from 'react-contexify';
import 'react-contexify/dist/ReactContexify.css';
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
  addTask: (title: string) => void;
  selectedTask: Task | null;
  setSelectedTask: (task: Task | null) => void;
  updateTask: (id: number, notes: string) => void;
  trashTask: (id: number) => void;
  renameTask: (id: number, title: string) => void;
}

const TaskManagerPage: React.FC<TaskManagerPageProps> = ({
  tasks,
  addTask,
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
  const [noteContent, setNoteContent] = useState<string>('');
  const [taskInput, setTaskInput] = useState<string>('');
  const [isNoteModalOpen, setIsNoteModalOpen] = useState<boolean>(false);
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
        setNoteContent(task.notes);
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
      setNoteContent(task.notes);
      setIsNoteModalOpen(true);
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

  const handleNotesChange = (notes: string) => {
    setNoteContent(notes);
    if (selectedTask) {
      updateTask(selectedTask.id, notes);
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

  const handleInputClick = () => {
    setSelectedTask(null);
    setNoteContent('');
  };

  const handleAddTask = () => {
    if (taskInput.trim()) {
      addTask(taskInput);
      setTaskInput('');
    }
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
      </div>
      <NoteModal
        isOpen={isNoteModalOpen}
        onClose={() => setIsNoteModalOpen(false)}
        noteContent={noteContent}
        onNotesChange={handleNotesChange}
      />
      <Menu id="task-context-menu" className="dark:bg-slate-700 dark:border-slate-600 dark:text-slate-200">
        <Item onClick={({ props }) => handleRenameClick(props.taskId)}>Rename</Item>
        <Item onClick={({ props }) => trashTask(props.taskId)}>Move to Trash</Item>
      </Menu>
    </div>
  );
};

export default TaskManagerPage;
