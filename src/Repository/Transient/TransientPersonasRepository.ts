import personasDB from '../../DataBase/Transient/PersonasDB';
import { Persona } from '../../Model/Persona';
import { Auto } from '../../Model/Auto';

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
    personasDB.listaPersonas.push(personaNueva);
};
const agregarAuto = (idPersona: string, auto: Auto) => {
    const persona = personasDB.listaPersonas.find((p) => p.id === idPersona);
    persona?.autos.push(auto);
};

const eliminarAuto = (idPersona: string, index: number) => {
    const persona = personasDB.listaPersonas.find((p) => p.id === idPersona);
    persona?.autos.splice(index, 1);
};

const eliminaPersona = (idPersona: string) => {
    const indexPersona = personasDB.listaPersonas.findIndex((p) => p.id === idPersona);
    return personasDB.listaPersonas.splice(indexPersona, 1);
};

export default {
    listadoPersonas,
    personaConDni,
    personaConId,
    agregarPersona,
    eliminaPersona,
    agregarAuto,
    eliminarAuto
};
