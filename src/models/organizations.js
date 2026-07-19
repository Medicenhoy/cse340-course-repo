import { pool } from './db.js';

export async function getAllOrganizations() {
    const result = await pool.query(
        'SELECT * FROM organizations ORDER BY name'
    );
    return result.rows;
}

export async function getOrganizationDetails(organizationId) {
    const result = await pool.query(
        `SELECT organization_id,
                name,
                description
         FROM organizations
         WHERE organization_id = $1`,
        [organizationId]
    );
    return result.rows.length > 0 ? result.rows[0] : null;
}