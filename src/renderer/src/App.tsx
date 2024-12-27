import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from '../../pages/HomePage';
import TaskPage from '../../pages/TaskManagerPage';
import TaskListPage from '../../pages/TaskListPage';
import TrashPage from '../../pages/TrashPage';
import Sidebar from '../../components/Sidebar';
import SettingsModal from '../../components/SettingsModal';

interface Task {
  id: number;
  title: string;
  notes: string;
}

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [trashedTasks, setTrashedTasks] = useState<Task[]>([]);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [, setIsSettingsOpen] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState<string>('');
  const [name, setName] = useState<string>('');

  useEffect(() => {
    window.electron.ipcRenderer.invoke('get-all-tasks').then((loadedTasks: Task[]) => {
      setTasks(loadedTasks);
    });

    window.electron.ipcRenderer.invoke('get-trashed-tasks').then((loadedTasks: Task[]) => {
      setTrashedTasks(loadedTasks);
    });
  }, []);

  const addTask = (title: string, notes: string = ''): void => {
    window.electron.ipcRenderer.invoke('add-task', title, notes).then(() => {
      window.electron.ipcRenderer.invoke('get-all-tasks').then((loadedTasks: Task[]) => {
        setTasks(loadedTasks);
      });
    });
  };

  const updateTask = (id: number, notes: string): void => {
    window.electron.ipcRenderer.invoke('update-task', id, notes).then(() => {
      window.electron.ipcRenderer.invoke('get-all-tasks').then((loadedTasks: Task[]) => {
        setTasks(loadedTasks);
        const updatedTask = loadedTasks.find((task) => task.id === id);
        if (updatedTask) {
          setSelectedTask(updatedTask);
        }
      });
    });
  };

  const trashTask = (id: number): void => {
    window.electron.ipcRenderer.invoke('trash-task', id).then(() => {
      window.electron.ipcRenderer.invoke('get-all-tasks').then((loadedTasks: Task[]) => {
        setTasks(loadedTasks);
      });
      window.electron.ipcRenderer.invoke('get-trashed-tasks').then((loadedTrashedTasks: Task[]) => {
        setTrashedTasks(loadedTrashedTasks);
      });
    });
  };

  const deleteTaskPermanently = (id: number): void => {
    window.electron.ipcRenderer.invoke('delete-task-permanently', id).then(() => {
      window.electron.ipcRenderer.invoke('get-trashed-tasks').then((loadedTrashedTasks: Task[]) => {
        setTrashedTasks(loadedTrashedTasks);
      });
    });
  };

  const renameTask = (id: number, title: string): void => {
    window.electron.ipcRenderer.invoke('rename-task', id, title).then(() => {
      window.electron.ipcRenderer.invoke('get-all-tasks').then((loadedTasks: Task[]) => {
        setTasks(loadedTasks);
      });
    });
  };

  const updateProfile = (newProfilePhoto: string, newName: string) => {
    setProfilePhoto(newProfilePhoto);
    setName(newName);
  };

  return (
    <Router>
      <div className="bg-stone-50 dark:bg-slate-800">
        <Sidebar profilePhoto={profilePhoto} name={name} updateProfile={updateProfile}>
          <Routes>
            <Route
              path="/"
              element={<HomePage addTask={addTask} recentTasks={tasks.slice(0, 3)} trashTask={trashTask} renameTask={renameTask} />}
            />
            <Route
              path="/tasks"
              element={
                <TaskPage
                  tasks={tasks}
                  addTask={addTask}
                  selectedTask={selectedTask}
                  setSelectedTask={setSelectedTask}
                  updateTask={updateTask}
                  trashTask={trashTask}
                  renameTask={renameTask}
                />
              }
            />
            <Route
              path="/task-list"
              element={<TaskListPage tasks={tasks} />}
            />
            <Route
              path="/trash"
              element={
                <TrashPage
                  trashedTasks={trashedTasks}
                  deleteTaskPermanently={deleteTaskPermanently}
                />
              }
            />
            <Route
              path="/settings/my-account"
              element={<SettingsModal isOpen={true} onClose={() => setIsSettingsOpen(false)} updateProfile={updateProfile} />}
            />
            <Route
              path="/settings/general"
              element={<SettingsModal isOpen={true} onClose={() => setIsSettingsOpen(false)} updateProfile={updateProfile} />}
            />
            <Route
              path="/settings/language"
              element={<SettingsModal isOpen={true} onClose={() => setIsSettingsOpen(false)} updateProfile={updateProfile} />}
            />
          </Routes>
        </Sidebar>
      </div>
    </Router>
  );
};

export default App;
