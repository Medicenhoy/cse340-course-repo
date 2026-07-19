import { getAllOrganizations, getOrganizationDetails, getProjectsByOrganization } from '../models/organizations.js';

const showOrganizationsPage = async (req, res) => {
    const organizations = await getAllOrganizations();
    res.render('organizations', { title: 'Organizations', organizations });
};

const showOrganizationDetailsPage = async (req, res) => {
    const organization = await getOrganizationDetails(req.params.id);
    const projects = await getProjectsByOrganization(req.params.id);
    res.render('organization', {
        title: organization.name,
        organization,
        projects
    });
};

export { showOrganizationsPage, showOrganizationDetailsPage };