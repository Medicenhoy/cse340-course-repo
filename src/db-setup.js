// src/db-setup.js
// Runs src/setup.sql against the database defined in DATABASE_URL
// Usage: node src/db-setup.js
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { pool } from './models/db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sql = fs.readFileSync(path.join(__dirname, 'setup.sql'), 'utf8');

try {
    await pool.query(sql);
    console.log('Database setup complete!');
    const result = await pool.query('SELECT name FROM categories ORDER BY name');
    console.log('Categories in database:', result.rows.map(row => row.name).join(', '));
} catch (error) {
    console.error('Error running setup:', error.message);
} finally {
    await pool.end();
}