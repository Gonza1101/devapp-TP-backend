import { Persona } from '../Model/Persona';
import repositorioPersona from '../Repository/personasRepository';

const listadoDePersonas = () => {
    const lista = repositorioPersona.listaDePersonas();
    return {
        personas: lista.personas.map((per) => {
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

const listaDeAutosDePersonaConDni = (id: string) => {
    return {
        autos: repositorioPersona.personaConDni(id)?.autos.map((aut) => {
            return { marca: aut.marca, modelo: aut.modelo, patente: aut.patente };
        })
    };
};

const buscarPersonaConDni = (id: string) => {
    return repositorioPersona.personaConDni(id);
};

const existePersonsa = (id: string) => {
    const persona = repositorioPersona.personaConDni(id);
    return persona !== undefined;
};
// const esUndefined = (dato: unknown) => {
//     return dato === undefined;
// };

const agregarPersona = (nuevaPersona: Persona) => {
    repositorioPersona.listaDePersonas().personas.push(nuevaPersona);
};

const eliminarPersonaConDni = (id: string) => {
    const listSin = repositorioPersona.listaDePersonas().personas.filter((p) => p.dni !== id);
    // const indexPersona = list.findIndex((p) => p.dni === id);
    // const listSin = list.splice(indexPersona, 1);
    return listSin;
};

const actualizarPersonaConDni = (id: string, dato: Persona) => {
    const personasACambiar = buscarPersonaConDni(id);
    console.log(personasACambiar);
    eliminarPersonaConDni(id);
    const personaActualizada = { ...personasACambiar, ...dato };
    console.log(personaActualizada);
    agregarPersona(personaActualizada);
    return personaActualizada;
};

export default {
    listadoDePersonas,
    listaDeAutosDePersonaConDni,
    buscarPersonaConDni,
    existePersonsa,
    agregarPersona,
    actualizarPersonaConDni,
    eliminarPersonaConDni
};
