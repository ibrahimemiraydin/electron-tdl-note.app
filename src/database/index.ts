import Database from 'better-sqlite3';
import * as path from 'path';
import { app } from 'electron';

// Use app.getPath to get the userData directory
const dbPath = path.join(app.getPath('userData'), 'tasks.db');
const db = new Database(dbPath);

// Create or update the tasks table to include the necessary columns
db.prepare(`
  CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    notes TEXT,
    isTrashed INTEGER DEFAULT 0,
    createdAt TEXT DEFAULT (datetime('now')),
    lastModifiedAt TEXT DEFAULT (datetime('now'))
  )
`).run();

// Add isTrashed column if it doesn't exist
try {
  db.prepare("ALTER TABLE tasks ADD COLUMN isTrashed INTEGER DEFAULT 0").run();
} catch (error: any) {
  if (!error.message.includes('duplicate column name')) {
    throw error;
  }
}

// Add createdAt column if it doesn't exist
try {
  db.prepare("ALTER TABLE tasks ADD COLUMN createdAt TEXT DEFAULT (datetime('now'))").run();
} catch (error: any) {
  if (!error.message.includes('duplicate column name')) {
    throw error;
  }
}

// Add lastModifiedAt column if it doesn't exist
try {
  db.prepare("ALTER TABLE tasks ADD COLUMN lastModifiedAt TEXT DEFAULT (datetime('now'))").run();
} catch (error: any) {
  if (!error.message.includes('duplicate column name')) {
    throw error;
  }
}

// Functions to handle tasks
export const getAllTasks = () => {
  return db.prepare('SELECT * FROM tasks WHERE isTrashed = 0').all();
};

export const getTrashedTasks = () => {
  return db.prepare('SELECT * FROM tasks WHERE isTrashed = 1').all();
};

export const addTask = (title: string, notes: string, createdAt: string, lastModifiedAt: string) => {
  return db.prepare('INSERT INTO tasks (title, notes, createdAt, lastModifiedAt) VALUES (?, ?, ?, ?)').run(title, notes, createdAt, lastModifiedAt);
};

export const updateTask = (id: number, notes: string) => {
  const lastModifiedAt = new Date().toISOString();
  return db.prepare('UPDATE tasks SET notes = ?, lastModifiedAt = ? WHERE id = ?').run(notes, lastModifiedAt, id);
};

export const trashTask = (id: number) => {
  return db.prepare('UPDATE tasks SET isTrashed = 1 WHERE id = ?').run(id);
};

export const deleteTaskPermanently = (id: number) => {
  return db.prepare('DELETE FROM tasks WHERE id = ?').run(id);
};

export const restoreTask = (id: number) => {
  return db.prepare('UPDATE tasks SET isTrashed = 0 WHERE id = ?').run(id);
};

export const renameTask = (id: number, title: string) => {
  const lastModifiedAt = new Date().toISOString();
  return db.prepare('UPDATE tasks SET title = ?, lastModifiedAt = ? WHERE id = ?').run(title, lastModifiedAt, id);
};
