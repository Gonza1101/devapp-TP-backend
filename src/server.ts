/* eslint-disable prettier/prettier */
// Importamos nuestras dependencias
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import process from 'process';
import { Persona } from './Model/Persona';
import { Genero } from './Model/Genero';
import { Auto } from './Model/Auto';
import { actualizarPersonaConDni, agregarPersona, buscarPersonaConDni, eliminarPersonaConDni, existePersonsa, sonDatosValidos } from './Service/personaService';

const auto1 : Auto = {
    marca : 'Ford',
    modelo : 'Taunus',
    anio : 1975,
    color : 'Naranja',
    numeroChasis : 'fotaus75123',
    motor : 'rumrrrum',
    patente : 'thc 420'
}

const auto2 : Auto = {
    marca : 'Chevrolet',
    modelo : 'Chevi',
    anio : 1965,
    color : 'Dorado',
    numeroChasis : 'chevchevi423',
    motor : 'prummprum',
    patente : 'frula 969'
}

const person1 : Persona = {
    nombre : 'Gonzalo',
    apellido : 'Villalba',
    dni : '33423185',
    fechaNacimiento : new Date(1987-13-12),
    genero: Genero.Masculino,
    esDonante: true,
    autos:[auto1]
}

const person2 : Persona = {
    nombre : 'Pam',
    apellido : 'Beesley',
    dni : '35456123',
    fechaNacimiento : new Date(1988-21-10),
    genero: Genero.Femenino,
    esDonante: false,
    autos : [auto2]
}

let listPersona : Persona[] =[person1,person2]



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
app.get('/personas',(req,res)=>{
    const queryParamDni = req.query.dni?.toString();

    const respuesta = () =>{
        if ( queryParamDni === undefined ){
            const listadoPersonas = {personas: listPersona.map(per => { return ( { dni:per.dni, nombre : per.nombre, apellido : per.apellido, 
                                                                                    auto : per.autos.map(aut=>{return({marca: aut.marca, modelo: aut.modelo, patente: aut.patente })})
                                                                                 } ) } )};
           return listadoPersonas
        }else {
            const listaDeAutosDeDNi = {Autos: (listPersona.find(p=> p.dni === queryParamDni))?.autos.map(aut=>{return({marca: aut.marca, modelo: aut.modelo, patente: aut.patente })})} 
            return listaDeAutosDeDNi
        }
    };
    res.json(respuesta());
    res.status(200);
})

// Read - Busca una persona por DNI
app.get('/personas/:dni',(req,res)=>{
    const reqBody = req.body;
    const reqDniBody = reqBody.dni;
    const persona = buscarPersonaConDni(listPersona, reqDniBody);

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
    const existe:boolean = existePersonsa(listPersona,idDni);
    
    if (!existe){
        res.status(404)
        res.json(`La Persona con DNI ${idDni} no se encuentra registrado`)
    }

    if (sonDatosValidos(reqBody)){ 
        actualizarPersonaConDni(listPersona, idDni,reqBody);
    }else{
        res.status(400);
        res.json('Clasico Error de type')
    }
});
// ADD - Agrega una persona nueva
app.post('/nuevaPersona',(req,res)=>{
    
    const reqBody: Persona = req.body;
    if (existePersonsa(listPersona, reqBody.dni)){
        res.status(400);
        res.json(`Usuario con DNI ${reqBody.dni} ya se encuentra registrado`);
    }else{
        agregarPersona(listPersona,reqBody);
        res.json(`Se agrego a ${reqBody.nombre} con DNI ${reqBody.dni}`);
        res.status(200);
    }
});
// DELETE - Eliminar Persona con DNI
app.delete('/chauPersona/:dni',(req,res)=>{
    const idDni = req.params.dni;

    if (!existePersonsa(listPersona, idDni)){
        res.status(404);
        res.json('No se Puede eliminar a un usuario que no existe')
    }else{
        listPersona = eliminarPersonaConDni(listPersona,idDni);
        res.status(200);
        res.json(listPersona);
    }
})

// Levantamos el servidor en el puerto que configuramos
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
