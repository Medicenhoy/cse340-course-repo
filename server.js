import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { getAllOrganizations } from './src/models/organizations.js';
import { getAllProjects } from './src/models/projects.js';
import { getAllCategories } from './src/models/categories.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.render('index', { title: 'Home' });
});

app.get('/organizations', async (req, res) => {
    const organizations = await getAllOrganizations();
    res.render('organizations', { title: 'Organizations', organizations });
});

app.get('/projects', async (req, res) => {
    const projects = await getAllProjects();
    res.render('projects', { title: 'Service Projects', projects });
});

app.get('/categories', async (req, res) => {
    const categories = await getAllCategories();
    res.render('categories', { title: 'Service Project Categories', categories });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});