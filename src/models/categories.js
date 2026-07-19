import { pool } from './db.js';

export async function getAllCategories() {
    const result = await pool.query(
        'SELECT * FROM categories ORDER BY name'
    );
    return result.rows;
}

export async function getCategoryDetails(categoryId) {
    const result = await pool.query(
        `SELECT category_id, name
         FROM categories
         WHERE category_id = $1`,
        [categoryId]
    );
    return result.rows.length > 0 ? result.rows[0] : null;
}

export async function getCategoriesForProject(projectId) {
    const result = await pool.query(
        `SELECT categories.category_id,
                categories.name
         FROM categories
         JOIN project_categories
           ON categories.category_id = project_categories.category_id
         WHERE project_categories.project_id = $1
         ORDER BY categories.name`,
        [projectId]
    );
    return result.rows;
}

export async function getProjectsByCategoryId(categoryId) {
    const result = await pool.query(
        `SELECT projects.project_id,
                projects.title,
                projects.date
         FROM projects
         JOIN project_categories
           ON projects.project_id = project_categories.project_id
         WHERE project_categories.category_id = $1
         ORDER BY projects.date`,
        [categoryId]
    );
    return result.rows;
}