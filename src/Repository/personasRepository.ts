import personasDB from '../DataBase/personasDB';
import { Persona } from '../Model/Persona';

const listadoPersonas = () => {
    return personasDB.listaPersonas;
};

const personaConDni = (dniPersona: string) => {
    return personasDB.listaPersonas.find((p) => p.dni === dniPersona);
};

const personaConId = (idPersona: string) => {
    return personasDB.listaPersonas.find((p) => p.id === idPersona);
};

const agregarPersona = (personaNueva: Persona) => {
    try {
        personasDB.listaPersonas.push(personaNueva);
    } catch {
        //Aca Manejaria Error..
        console.log('No se puso Cargar');
        return false;
    }
};

const eliminaPersona = (idPersona: string) => {
    const indexPersona = personasDB.listaPersonas.findIndex((p) => p.id === idPersona);
    return personasDB.listaPersonas.splice(indexPersona, 1);
};

export default { listadoPersonas, personaConDni, personaConId, agregarPersona, eliminaPersona, eliminarAutoDePersona };
