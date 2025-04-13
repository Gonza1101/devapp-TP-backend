import personasDB from '../DataBase/personasDB';
import { Persona } from '../Model/Persona';

const listadoPersonas = () => {
    return { personas: personasDB.listaPersonas };
};

const personaConDni = (dniPersona: string) => {
    return personasDB.listaPersonas.find((p) => p.dni === dniPersona);
};

const personaConId = (idPersona: string) => {
    return personasDB.listaPersonas.find((p) => p.id === idPersona);
};

const idPersonaConDni = (dniPersona: string) => {
    return personaConDni(dniPersona)?.id;
}

const agregarPersona = (personaNueva: Persona) => {
    personasDB.listaPersonas.push(personaNueva);
    return `Se agrego una persona nueva con DNI ${personaNueva.dni}`;
};

const eliminaPersona = (idPersona: string) => {
    const indexPersona = personasDB.listaPersonas.findIndex((p) => p.dni === idPersona);
    return personasDB.listaPersonas.splice(indexPersona, 1);
};

export default { listadoPersonas, personaConDni, personaConId, agregarPersona, idPersonaConDni, eliminaPersona };
