import { app, shell, BrowserWindow, ipcMain } from 'electron';
import { join } from 'path';
import { electronApp, optimizer, is } from '@electron-toolkit/utils';
import icon from '../../resources/icon.png?asset';
import { getAllTasks, addTask, updateTask, trashTask, deleteTaskPermanently, renameTask, getTrashedTasks } from '../database'; // Import database functions
import { getSetting, setSetting } from '../database/settings';

function createWindow(): void {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  });

  mainWindow.on('ready-to-show', () => {
    mainWindow.show();
  });

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url);
    return { action: 'deny' };
  });

  // HMR for renderer based on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL']);
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'));
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron');

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window);
  });

  // IPC test
  ipcMain.on('ping', () => console.log('pong'));

  createWindow();

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// IPC Handlers for database operations
ipcMain.handle('get-all-tasks', () => getAllTasks());
ipcMain.handle('add-task', (_, title, notes) => {

  const createdAt = new Date().toISOString();

  const lastModifiedAt = createdAt;

  return addTask(title, notes, createdAt, lastModifiedAt);

});
ipcMain.handle('update-task', (_, id, notes) => updateTask(id, notes));
ipcMain.handle('trash-task', (_, id) => trashTask(id));
ipcMain.handle('delete-task-permanently', (_, id) => deleteTaskPermanently(id));
ipcMain.handle('rename-task', (_, id, title) => renameTask(id, title));
ipcMain.handle('get-trashed-tasks', () => getTrashedTasks()); // Add this handler
ipcMain.handle('get-setting', async (_, key) => { return getSetting(key); });
ipcMain.handle('set-setting', async (_, key, value) => { return setSetting(key, value); });

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
