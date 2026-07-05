import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuración de las vistas
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Configuración de la carpeta pública
app.use(express.static(path.join(__dirname, 'public')));

// Rutas de tu aplicación
app.get('/', (req, res) => {
    res.render('index', { title: 'Home' });
});

app.get('/organizations', (req, res) => {
    res.render('organizations', { title: 'Organizations' });
});

app.get('/projects', (req, res) => {
    res.render('projects', { title: 'Service Projects' });
});

app.get('/categories', (req, res) => {
    res.render('categories', { title: 'Service Project Categories' });
});

// Arranque del servidor
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});