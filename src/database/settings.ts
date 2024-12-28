import Database from 'better-sqlite3';
import * as path from 'path';
import { app } from 'electron';

// Use app.getPath to get the userData directory for the settings database
const dbPath = path.join(app.getPath('userData'), 'settings.db');
const db = new Database(dbPath);

// Create or update the settings table
db.prepare(`
  CREATE TABLE IF NOT EXISTS settings (
    key TEXT PRIMARY KEY,
    value TEXT
  )
`).run();

// Functions to handle settings
export const getSetting = (key: string) => {
  return db.prepare('SELECT value FROM settings WHERE key = ?').get(key);
};

export const setSetting = (key: string, value: string) => {
  return db.prepare('INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)').run(key, value);
};
