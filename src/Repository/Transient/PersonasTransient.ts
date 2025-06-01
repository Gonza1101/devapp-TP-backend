import personasDB from '../../DataBase/Transient/PersonasDB';
import { Persona } from '../../Model/Persona';
import { Auto } from '../../Model/Auto';

export const PersonasTransient = {
    listadoPersona: () => {
        const personas = personasDB.listaPersonas;
        return personas;
    },
    personaConDni: (dni: string) => {
        return personasDB.listaPersonas.find((p) => p.dni === dni);
    },
    personaConId: (idPersona: string) => {
        return personasDB.listaPersonas.find((p) => p._id === idPersona);
    },
    agregarPersona: (personaNueva: Persona) => {
        personasDB.listaPersonas.push(personaNueva);
    },
    agregarAuto: (idPersona: string, auto: Auto) => {
        const persona = personasDB.listaPersonas.find((p) => p._id === idPersona);
        persona?.autos.push(auto);
    },
    eliminaPersona: (idPersona: string) => {
        const indexPersona = personasDB.listaPersonas.findIndex((p) => p._id === idPersona);
        personasDB.listaPersonas.splice(indexPersona, 1);
    },
    eliminarAuto: (idPersona: string, idAuto: number) => {
        const persona = personasDB.listaPersonas.find((p) => p._id === idPersona);
        persona?.autos.splice(idAuto, 1);
    }
};
