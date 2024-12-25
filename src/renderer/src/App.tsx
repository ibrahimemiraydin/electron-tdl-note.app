import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from '../../pages/HomePage';
import TaskPage from '../../pages/TaskManagerPage';
import TaskListPage from '../../pages/TaskListPage';

interface Task {
  id: number;
  title: string;
  notes: string;
}

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  useEffect(() => {
    window.electron.ipcRenderer.invoke('get-all-tasks').then((loadedTasks: Task[]) => {
      setTasks(loadedTasks);
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

  const deleteTask = (id: number): void => {
    window.electron.ipcRenderer.invoke('delete-task', id).then(() => {
      window.electron.ipcRenderer.invoke('get-all-tasks').then((loadedTasks: Task[]) => {
        setTasks(loadedTasks);
      });
    });
  };

  return (
    <Router>
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
              selectedTask={selectedTask}
              setSelectedTask={setSelectedTask}
              updateTask={updateTask}
              deleteTask={deleteTask}
            />
          }
        />
        <Route
          path="/task-list"
          element={<TaskListPage tasks={tasks} />}
        />
      </Routes>
    </Router>
  );
};

export default App;
