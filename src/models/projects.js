// src/models/projects.js
import { pool } from './db.js';

export async function getAllProjects() {
    const result = await pool.query(
        `SELECT projects.project_id,
                projects.title,
                projects.description,
                projects.location,
                projects.date,
                organizations.name AS organization_name
         FROM projects
         JOIN organizations
           ON projects.organization_id = organizations.organization_id
         ORDER BY projects.date`
    );
    return result.rows;
}