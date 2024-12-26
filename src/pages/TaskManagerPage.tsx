import React, { useState, useEffect, useRef } from 'react';
import Sidebar from '../components/Sidebar';
import TaskList from '../components/TaskList';
import { Menu, Item, useContextMenu } from 'react-contexify';
import 'react-contexify/dist/ReactContexify.css';

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

  const [newTitle, setNewTitle] = useState<string>('');
  const [editingTaskId, setEditingTaskId] = useState<number | null>(null);
  const [markdownText, setMarkdownText] = useState<string>('');

  const editableDivRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (editingTaskId !== null) {
      const task = tasks.find((task) => task.id === editingTaskId);
      if (task) {
        setNewTitle(task.title);
      }
    }
  }, [editingTaskId]);

  useEffect(() => {
    if (selectedTask) {
      setMarkdownText(selectedTask.notes);
      if (editableDivRef.current) {
        editableDivRef.current.innerText = selectedTask.notes;
      }
    }
  }, [selectedTask]);

  const handleTaskClick = (taskId: number): void => {
    const task = tasks.find((task) => task.id === taskId);
    if (task) {
      setSelectedTask(task);
    }
  };

  const handleMarkdownChange = (event: React.FormEvent<HTMLDivElement>) => {
    const value = event.currentTarget.innerText;
    setMarkdownText(value);
    if (selectedTask) {
      updateTask(selectedTask.id, value);
    }
  };

  const handleRenameTask = (taskId: number, title: string) => {
    renameTask(taskId, title);
    setEditingTaskId(null);
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
    <Sidebar>
      <div className="flex p-4 bg-gray-100 min-h-screen w-full">
        <div className="w-1/3 pr-4">
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
        <div className="w-2/3 pl-4">
          {selectedTask && (
            <>
              <h2 className="text-xl font-bold mb-4 text-blue-600">Task Notes for "{selectedTask.title}"</h2>
              <div
                ref={editableDivRef}
                contentEditable
                className="border border-gray-300 rounded p-2 w-full h-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
                onInput={handleMarkdownChange}
                dangerouslySetInnerHTML={{ __html: markdownText }}
              />
            </>
          )}
        </div>
      </div>
      <Menu id="task-context-menu">
        <Item onClick={({ props }) => handleRenameClick(props.taskId)}>Rename</Item>
        <Item onClick={({ props }) => trashTask(props.taskId)}>Move to Trash</Item>
      </Menu>
    </Sidebar>
  );
};

export default TaskManagerPage;
