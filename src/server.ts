
//eslint-disable prettier/prettier
// Importamos nuestras dependencias
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import process from 'process';
import personaController from './Controller/personaController';
import autoController from './Controller/autoController';
// Creamos nuestra app express
const app = express();
// Leemos el puerto de las variables de entorno, si no está, usamos uno por default
const port = process.env.PORT || 9000;
// Configuramos los plugins
// Más adelante intentaremos entender mejor cómo funcionan estos plugins
app.use(helmet());
app.use(bodyParser.json());

app.use(cors());
// Mis endpoints van acá
app.get('/', (req, res) => {
    res.json('Llegaste');
});
//BROWSE -
app.get('/personas', (req, res) => {
    personaController.browser(req, res);
});
app.get('/autos', (req, res) => {
    autoController.browser(req, res);
});

// READ -
app.get('/persona/:id', (req, res) => {
    personaController.read(req, res);
});
app.get('/auto/:id', (req, res) => {
    autoController.read(req, res);
});
// EDIT -
app.put('/persona/:id', (req, res) => {
    personaController.edit(req, res);
});
app.put('/auto/:id', (req, res) => {
    autoController.edit(req, res);
});

// ADD -
app.post('/persona', (req, res) => {
    personaController.add(req, res);
});
app.post('/auto', (req, res) => {
    autoController.add(req, res);
});
//PATCH -
app.patch('/persona/:idPersona', (req, res) => {
    personaController.eliminaAutoAPersona(req, res);
});
//DELETE -
app.delete('/persona/:id', (req, res) => {
    personaController.delet(req, res);
});

// Levantamos el servidor en el puerto que configuramos
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
