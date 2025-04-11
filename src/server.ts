/* eslint-disable prettier/prettier */
// Importamos nuestras dependencias
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import process from 'process';
import personaController from './Controller/personaController';


// Creamos nuestra app express
const app = express();
// Leemos el puerto de las variables de entorno, si no está, usamos uno por default
const port = process.env.PORT || 9000;
// Configuramos los plugins
// Más adelante intentaremos entender mejor cómo funcionan estos plugins
app.use(cors());
app.use(helmet());
app.use(bodyParser.json());

// Mis endpoints van acá
app.get('/',(req,res) =>{
    /*
        {...objeto} => crea un objeto con todos los campos del objeto
        {...objeto1,...objeto2} => crea un objeto nuevo sumando los campos del objeto 1 + objeto 2
                                    si llegara a haber claves iguales se pisan y se guardan las del segundo objeto
    */

    res.json('Llegaste')
})
//BROWSE 
app.get('/personas',(req, res) => {
    personaController.browser(req, res);
});

app.get('/autos',(req, res) => {
    personaController.browser(req, res);
});

// Read - Busca una persona por DNI
app.get('/persona/dni',(req,res)=>{
    personaController.read(req, res);
});

// EDIT - Actualiza datos
app.put('/persona/:dni', (req, res)=>{
    personaController.edit(req,res);
});

// ADD - Agrega una persona nueva
app.post('/Persona',(req,res)=>{
    personaController.add(req,res);
});
//DELETE - Eliminar Persona con DNI
app.delete('/persona/:dni',(req,res)=>{
   personaController.delet(req, res);
})

// Levantamos el servidor en el puerto que configuramos
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
