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
                organizations.name AS organization_name,
                organizations.logo_filename
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

export async function createProject(title, description, location, date, organizationId) {
    const result = await pool.query(
        `INSERT INTO projects (title, description, location, date, organization_id)
         VALUES ($1, $2, $3, $4, $5)
         RETURNING project_id`,
        [title, description, location, date, organizationId]
    );

    if (result.rows.length === 0) {
        throw new Error('Failed to create project');
    }

    if (process.env.ENABLE_SQL_LOGGING === 'true') {
        console.log('Created new project with ID:', result.rows[0].project_id);
    }

    return result.rows[0].project_id;
}

export async function updateProject(projectId, title, description, location, date, organizationId) {
    const result = await pool.query(
        `UPDATE projects
         SET title = $1, description = $2, location = $3, date = $4, organization_id = $5
         WHERE project_id = $6
         RETURNING project_id`,
        [title, description, location, date, organizationId, projectId]
    );

    if (result.rows.length === 0) {
        throw new Error('Project not found');
    }

    return result.rows[0].project_id;
}