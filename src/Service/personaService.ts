import { Persona } from '../Model/Persona';

export const agregarPersona = (list: Persona[], nuevaPersona: Persona) =>{
    list.push(nuevaPersona);
};

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

export const eliminarPersonaConDni = (list: Persona[], id: string) => {
    const listSin = list.filter((p) => p.dni !== id);
    // const indexPersona = list.findIndex((p) => p.dni === id);
    // const listSin = list.splice(indexPersona, 1);
    return listSin;
};

export const actualizarPersonaConDni = (list: Persona[], id: string, dato: Persona) => {
    const personasACambiar = buscarPersonaConDni(list, id);
    const personaActualizada = {...personasACambiar, ...dato};
    eliminarPersonaConDni(list, id);
    

};
