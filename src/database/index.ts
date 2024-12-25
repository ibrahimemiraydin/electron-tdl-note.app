import Database from 'better-sqlite3';
import * as path from 'path';
import { app } from 'electron';

// Use app.getPath to get the userData directory
const dbPath = path.join(app.getPath('userData'), 'tasks.db');
const db = new Database(dbPath);

// Create the tasks table if it doesn't exist
db.prepare(`
  CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    notes TEXT
  )
`).run();

export const getAllTasks = () => {
  return db.prepare('SELECT * FROM tasks').all();
};

export const addTask = (title: string, notes: string) => {
  return db.prepare('INSERT INTO tasks (title, notes) VALUES (?, ?)').run(title, notes);
};

export const updateTask = (id: number, notes: string) => {
  return db.prepare('UPDATE tasks SET notes = ? WHERE id = ?').run(notes, id);
};

export const deleteTask = (id: number) => {
  return db.prepare('DELETE FROM tasks WHERE id = ?').run(id);
};
