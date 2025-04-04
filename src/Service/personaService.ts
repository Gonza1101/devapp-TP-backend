import { Persona } from '../Model/Persona';
// import { listaPersona } from '../Repository/ListadoPersona';

export const existePersonsa = (list: Persona[], id: string) => {
    const persona = list.find((p) => p.dni === id);
    return persona !== undefined;
};

const esDatoValido = (dato: unknown, tipo: string) => {
    return typeof dato === tipo || dato === undefined;
};

const esFechaValida = (fecha: unknown) => {
    return (
        fecha === undefined ||
        (typeof fecha === 'string' && !Number.isNaN(new Date(fecha)) && new Date(fecha) > new Date())
    );
};

const esGeneroValido = (genero: unknown) => {
    return (
        genero === undefined ||
        (typeof genero === 'string' &&
            (genero.toString() === 'masculino' ||
                genero.toString() === 'femenino' ||
                genero.toString() === 'noBinario'))
    );
};

export const sonDatosValidos = (persona: Persona) => {
    return (
        esDatoValido(persona.nombre, 'string') &&
        esDatoValido(persona.apellido, 'string') &&
        esDatoValido(persona.dni, 'string') &&
        esFechaValida(persona.fechaNacimiento) &&
        esGeneroValido(persona.genero)
    );
};

export const buscarPersonaConDni = (list: Persona[], id: string) => {
    const personaEncontrada = list.find((p) => p.dni === id);
    return personaEncontrada;
};

export const agregarPersona = (list: Persona[], nuevaPersona: Persona) => {
    list.push(nuevaPersona);
};

export const eliminarPersonaConDni = (list: Persona[], id: string) => {
    const listSin = list.filter((p) => p.dni !== id);
    // const indexPersona = list.findIndex((p) => p.dni === id);
    // const listSin = list.splice(indexPersona, 1);
    return listSin;
};

export const actualizarPersonaConDni = (list: Persona[], id: string, dato: Persona) => {
    const personasACambiar = buscarPersonaConDni(list, id);
    console.log(personasACambiar);
    eliminarPersonaConDni(list, id);
    const personaActualizada = { ...personasACambiar, ...dato };
    console.log(personaActualizada);
    agregarPersona(list, personaActualizada);
    return personaActualizada;
};
