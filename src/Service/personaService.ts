import { Persona } from '../Model/Persona';

export const existePersonsa = (list: Persona[], id: string) => {
    const persona = list.find((p) => p.dni === id);
    if (persona === undefined) {
        return false;
    } else {
        return true;
    }
};

export const sonDatosValidos = (persona: Persona) => {
    if (typeof persona.nombre !== 'string' && typeof persona.apellido !== 'string' && typeof persona.dni !== 'string') {
        return false;
    } else {
        return true;
    }
};

export const buscarPersonaConDni = (list: Persona[], id: string) => {
    const personaEncontrada = list.find((p) => p.dni === id);
    return personaEncontrada;
};

export const actualizarPersonaConDni = (list: Persona[], id: string, dato: Persona) => {
    const persona = buscarPersonaConDni(list, id);
};
