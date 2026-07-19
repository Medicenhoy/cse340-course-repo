import { getUpcomingProjects, getProjectDetails } from '../models/projects.js';
import { getCategoriesForProject } from '../models/categories.js';

const NUMBER_OF_UPCOMING_PROJECTS = 5;

const showProjectsPage = async (req, res) => {
    const projects = await getUpcomingProjects(NUMBER_OF_UPCOMING_PROJECTS);
    res.render('projects', { title: 'Upcoming Service Projects', projects });
};

const showProjectDetailsPage = async (req, res) => {
    const project = await getProjectDetails(req.params.id);

    if (!project) {
        const err = new Error('Project Not Found');
        err.status = 404;
        throw err;
    }

    const categories = await getCategoriesForProject(req.params.id);

    res.render('project', { title: project.title, project, categories });
};

export { showProjectsPage, showProjectDetailsPage };