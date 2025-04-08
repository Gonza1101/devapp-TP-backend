import { Persona } from '../Model/Persona';
import { listaPersonas } from '../Repository/ListadoPersona';
import { personaConDni } from '../Repository/repositorioPersona';

export const listaDePersonasResumida = () => {
    const lista = listaPersonas;
    return {
        personas: lista.map((per) => {
            return {
                dni: per.dni,
                nombre: per.nombre,
                apellido: per.apellido,
                auto: per.autos.map((aut) => {
                    return { marca: aut.marca, modelo: aut.modelo, patente: aut.patente };
                })
            };
        })
    };
};

export const listaDeAutosPorDniPersona = (id: string) => {
    return {
        autos: personaConDni(id)?.autos.map((aut) => {
            return { marca: aut.marca, modelo: aut.modelo, patente: aut.patente };
        })
    };
};

export const existePersonsa = (id: string) => {
    const persona = personaConDni(id);
    return persona !== undefined;
};

const esUndefined = (dato: unknown) => {
    return dato === undefined;
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

export const sonDatosValidosParaEditar = (persona: Persona) => {
    return (
        esDatoValido(persona.nombre, 'string') &&
        esDatoValido(persona.apellido, 'string') &&
        esDatoValido(persona.dni, 'string') &&
        esFechaValida(persona.fechaNacimiento) &&
        esGeneroValido(persona.genero)
    );
};

export const buscarPersonaConDni = (id: string) => {
    return personaConDni(id);
};

export const agregarPersona = (nuevaPersona: Persona) => {
    listaPersonas.push(nuevaPersona);
};

export const eliminarPersonaConDni = (id: string) => {
    const listSin = listaPersonas.filter((p) => p.dni !== id);
    // const indexPersona = list.findIndex((p) => p.dni === id);
    // const listSin = list.splice(indexPersona, 1);
    return listSin;
};

export const actualizarPersonaConDni = (id: string, dato: Persona) => {
    const personasACambiar = buscarPersonaConDni(id);
    console.log(personasACambiar);
    eliminarPersonaConDni(id);
    const personaActualizada = { ...personasACambiar, ...dato };
    console.log(personaActualizada);
    agregarPersona(personaActualizada);
    return personaActualizada;
};
