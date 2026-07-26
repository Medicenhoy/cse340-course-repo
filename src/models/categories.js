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

async function assignCategoryToProject(categoryId, projectId) {
    await pool.query(
        `INSERT INTO project_categories (category_id, project_id)
         VALUES ($1, $2)`,
        [categoryId, projectId]
    );
}

export async function updateCategoryAssignments(projectId, categoryIds) {
    // First, remove existing category assignments for the project
    await pool.query(
        `DELETE FROM project_categories
         WHERE project_id = $1`,
        [projectId]
    );

    // Next, add the new category assignments
    for (const categoryId of categoryIds) {
        await assignCategoryToProject(categoryId, projectId);
    }
}

export async function createCategory(name) {
    const result = await pool.query(
        `INSERT INTO categories (name)
         VALUES ($1)
         RETURNING category_id`,
        [name]
    );

    if (result.rows.length === 0) {
        throw new Error('Failed to create category');
    }

    return result.rows[0].category_id;
}

export async function updateCategory(categoryId, name) {
    const result = await pool.query(
        `UPDATE categories
         SET name = $1
         WHERE category_id = $2
         RETURNING category_id`,
        [name, categoryId]
    );

    if (result.rows.length === 0) {
        throw new Error('Category not found');
    }

    return result.rows[0].category_id;
}