import Database from 'better-sqlite3';
import * as path from 'path';
import { app } from 'electron';

// Use app.getPath to get the userData directory
const dbPath = path.join(app.getPath('userData'), 'tasks.db');
const db = new Database(dbPath);

// Create or update the tasks table to include the isTrashed column
db.prepare(`
  CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    notes TEXT,
    isTrashed INTEGER DEFAULT 0
  )
`).run();

// Add isTrashed column if it doesn't exist
try {
  db.prepare("ALTER TABLE tasks ADD COLUMN isTrashed INTEGER DEFAULT 0").run();
} catch (error: any) {  // Explicitly type error as any
  if (!error.message.includes('duplicate column name')) {
    throw error;
  }
}

// Create or update the user table to store profile photo and name
db.prepare(`
  CREATE TABLE IF NOT EXISTS user (
    id INTEGER PRIMARY KEY,
    profilePhoto TEXT,
    name TEXT
  )
`).run();

// Functions to handle tasks
export const getAllTasks = () => {
  return db.prepare('SELECT * FROM tasks WHERE isTrashed = 0').all();
};

export const getTrashedTasks = () => {
  return db.prepare('SELECT * FROM tasks WHERE isTrashed = 1').all();
};

export const addTask = (title: string, notes: string) => {
  return db.prepare('INSERT INTO tasks (title, notes) VALUES (?, ?)').run(title, notes);
};

export const updateTask = (id: number, notes: string) => {
  return db.prepare('UPDATE tasks SET notes = ? WHERE id = ?').run(notes, id);
};

export const trashTask = (id: number) => {
  return db.prepare('UPDATE tasks SET isTrashed = 1 WHERE id = ?').run(id);
};

export const deleteTaskPermanently = (id: number) => {
  return db.prepare('DELETE FROM tasks WHERE id = ?').run(id);
};

export const renameTask = (id: number, title: string) => {
  return db.prepare('UPDATE tasks SET title = ? WHERE id = ?').run(title, id);
};

// Functions to handle user profile
export const getUser = () => {
  return db.prepare('SELECT profilePhoto, name FROM user WHERE id = 1').get();
};

export const updateUser = (profilePhoto: string, name: string) => {
  return db.prepare('INSERT OR REPLACE INTO user (id, profilePhoto, name) VALUES (1, ?, ?)').run(profilePhoto, name);
};
