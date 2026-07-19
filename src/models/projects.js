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

export async function getUpcomingProjects(number_of_projects) {
    const result = await pool.query(
        `SELECT projects.project_id,
                projects.title,
                projects.description,
                projects.date,
                projects.location,
                projects.organization_id,
                organizations.name AS organization_name
         FROM projects
         JOIN organizations
           ON projects.organization_id = organizations.organization_id
         WHERE projects.date >= CURRENT_DATE
         ORDER BY projects.date ASC
         LIMIT $1`,
        [number_of_projects]
    );
    return result.rows;
}

export async function getProjectDetails(id) {
    const result = await pool.query(
        `SELECT projects.project_id,
                projects.title,
                projects.description,
                projects.date,
                projects.location,
                projects.organization_id,
                organizations.name AS organization_name
         FROM projects
         JOIN organizations
           ON projects.organization_id = organizations.organization_id
         WHERE projects.project_id = $1`,
        [id]
    );
    return result.rows.length > 0 ? result.rows[0] : null;
}

export async function getProjectsByOrganizationId(organizationId) {
    const result = await pool.query(
        `SELECT project_id,
                organization_id,
                title,
                description,
                location,
                date
         FROM projects
         WHERE organization_id = $1
         ORDER BY date`,
        [organizationId]
    );
    return result.rows;
}