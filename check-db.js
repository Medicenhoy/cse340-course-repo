// check-db.js — temporal, solo para diagnóstico
import { pool } from './src/models/db.js';

const result = await pool.query(
    `SELECT project_id, title, date, organization_id
     FROM projects
     ORDER BY project_id DESC
     LIMIT 5`
);
console.table(result.rows);
process.exit(0);