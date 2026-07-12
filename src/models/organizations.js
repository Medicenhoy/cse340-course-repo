// src/models/organizations.js
import { pool } from './db.js';

export async function getAllOrganizations() {
    const result = await pool.query(
        'SELECT * FROM organizations ORDER BY name'
    );
    return result.rows;
}