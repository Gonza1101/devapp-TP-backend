/* eslint-disable prettier/prettier */
// Importamos nuestras dependencias
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import process from 'process';
import { Persona } from './Model/Persona';
import { agregarPersona, buscarPersonaConDni, eliminarPersonaConDni, existePersonsa, sonDatosValidosParaEditar } from './Service/personaService';
import { listAutosDePersonaConDni, obtenerListaPersonas } from './Controller/personaController';

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
app.get('/',(req,res)=>{
    /*
        {...objeto} => crea un objeto con todos los campos del objeto
        {...objeto1,...objeto2} => crea un objeto nuevo sumando los campos del objeto 1 + objeto 2
                                    si llegara a haber claves iguales se pisan y se guardan las del segundo objeto
    */

    res.json('Llegaste')
})
//BROWSE 
// app.get('/personas', personaController.agregar);

app.get('/personas',(req,res)=>{
    const queryParamDni = req.query.dni?.toString();
    const rta = queryParamDni ===undefined ? obtenerListaPersonas : listAutosDePersonaConDni(queryParamDni);
    res.json(rta);
    res.status(200);
})

// Read - Busca una persona por DNI
app.get('/personas/dni',(req,res)=>{
    const reqBody = req.body;
    const reqDniBody = reqBody.dni;
    const persona = buscarPersonaConDni(reqDniBody);

    if (persona === undefined){
        res.status(404);
        res.json(`No hay Persona Registrada con ${reqDniBody}`)
    }else{
        res.json(persona);
        console.log(typeof(persona.nombre))
        res.status(200)
    }
});

// EDIT - Actualiza datos
app.put('/personas/:dni', (req, res)=>{
    const idDni = req.params.dni;
    const reqBody = req.body;
    const existe:boolean = existePersonsa(idDni);
    
    if (!existe){
        res.status(404)
        res.json(`La Persona con DNI ${idDni} no se encuentra registrado`)
    }
    if (sonDatosValidosParaEditar(reqBody)){ 
        const per = actualizarPersonaConDni( idDni,reqBody);
        
        res.status(200)
        res.json(per);
    }else{
        res.status(400);
        res.json('Clasico Error de type')
    }
});

// ADD - Agrega una persona nueva
app.post('/nuevaPersona',(req,res)=>{
    
    const reqBody: Persona = req.body;
    if (existePersonsa(reqBody.dni)){
        res.status(400);
        res.json(`Usuario con DNI ${reqBody.dni} ya se encuentra registrado`);
    }else{

        agregarPersona(reqBody);
        res.json(`Se agrego a ${reqBody.nombre} con DNI ${reqBody.dni}`);
        res.status(200);
    }
});
// DELETE - Eliminar Persona con DNI
app.delete('/chauPersona/:dni',(req,res)=>{
    const idDni = req.params.dni;

    if (!existePersonsa(idDni)){
        res.status(404);
        res.json('No se Puede eliminar a un usuario que no existe')
    }else{
        listPersona = eliminarPersonaConDni(idDni);
        res.status(200);
        res.json(listPersona);
    }
})

// Levantamos el servidor en el puerto que configuramos
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
