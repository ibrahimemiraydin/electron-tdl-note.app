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
  createdAt: string;
  lastModifiedAt: string;
}

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [trashedTasks, setTrashedTasks] = useState<Task[]>([]);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState<string>('');
  const [name, setName] = useState<string>('');

  useEffect(() => {
    window.electron.ipcRenderer.invoke('get-all-tasks').then((loadedTasks: Task[]) => {
      setTasks(loadedTasks);
    });

    window.electron.ipcRenderer.invoke('get-trashed-tasks').then((loadedTasks: Task[]) => {
      setTrashedTasks(loadedTasks);
    });

    window.electron.ipcRenderer.invoke('get-setting', 'profilePhoto').then((profilePhoto) => {
      if (profilePhoto) {
        setProfilePhoto(profilePhoto.value);
      }
    });

    window.electron.ipcRenderer.invoke('get-setting', 'name').then((name) => {
      if (name) {
        setName(name.value);
      }
    });

    // Load and apply the theme setting when the app starts
    window.electron.ipcRenderer.invoke('get-setting', 'theme').then((savedTheme) => {
      if (savedTheme) {
        const theme = savedTheme.value;
        document.documentElement.classList.toggle('dark', theme === 'dark');
      }
    });
  }, []);

  const addTask = (title: string, notes: string): void => {
    const createdAt = new Date().toISOString();
    const lastModifiedAt = createdAt;
    const newTask: Task = { id: tasks.length + 1, title, notes, createdAt, lastModifiedAt };
    window.electron.ipcRenderer.invoke('add-task', title, notes, createdAt, lastModifiedAt).then(() => {
      setTasks((prevTasks) => [...prevTasks, newTask]);
    });
  };

  const updateTask = (id: number, notes: string): void => {
    const lastModifiedAt = new Date().toISOString();
    window.electron.ipcRenderer.invoke('update-task', id, notes, lastModifiedAt).then(() => {
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

  const restoreTask = (id: number): void => {
    window.electron.ipcRenderer.invoke('restore-task', id).then(() => {
      window.electron.ipcRenderer.invoke('get-all-tasks').then((loadedTasks: Task[]) => {
        setTasks(loadedTasks);
      });
      window.electron.ipcRenderer.invoke('get-trashed-tasks').then((loadedTrashedTasks: Task[]) => {
        setTrashedTasks(loadedTrashedTasks);
      });
    });
  };

  const renameTask = (id: number, title: string): void => {
    const lastModifiedAt = new Date().toISOString();
    window.electron.ipcRenderer.invoke('rename-task', id, title, lastModifiedAt).then(() => {
      window.electron.ipcRenderer.invoke('get-all-tasks').then((loadedTasks: Task[]) => {
        setTasks(loadedTasks);
      });
    });
  };

  const updateProfile = (newProfilePhoto: string, newName: string) => {
    window.electron.ipcRenderer.invoke('set-setting', 'profilePhoto', newProfilePhoto).then(() => {
      setProfilePhoto(newProfilePhoto);
    });
    window.electron.ipcRenderer.invoke('set-setting', 'name', newName).then(() => {
      setName(newName);
    });
  };

  return (
    <Router>
      <div>
        <Sidebar profilePhoto={profilePhoto} name={name} updateProfile={updateProfile}>
          <Routes>
            <Route
              path="/"
              element={<HomePage addTask={addTask} />}
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
                  tasks={tasks}
                  setTasks={setTasks}
                  deleteTaskPermanently={deleteTaskPermanently}
                  restoreTask={restoreTask}
                />
              }
            />
            <Route
              path="/settings/my-account"
              element={<SettingsModal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} updateProfile={updateProfile} />}
            />
            <Route
              path="/settings/general"
              element={<SettingsModal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} updateProfile={updateProfile} />}
            />
            <Route
              path="/settings/language"
              element={<SettingsModal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} updateProfile={updateProfile} />}
            />
          </Routes>
        </Sidebar>
      </div>
    </Router>
  );
};

export default App;
