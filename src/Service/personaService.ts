import { Persona } from '../Model/Persona';
import personasRepository from '../Repository/personasRepository';

const listadoDePersonas = () => {
    const lista = personasRepository.listadoPersonas();
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
        autos: personasRepository.personaConDni(id)?.autos.map((aut) => {
            return { marca: aut.marca, modelo: aut.modelo, patente: aut.patente };
        })
    };
};

const busquedaDePersonaConDni = (dniPersona: string) => {
    return personasRepository.personaConDni(dniPersona);
};

const busquedaDePersonaConId = (idPersona: string) => {
    return personasRepository.personaConDni(idPersona);
};

const agregarPersona = (personaNueva: Persona) => {
    if (!personasRepository.idPersonaConDni(personaNueva.dni)) {
        personasRepository.agregarPersona(personaNueva);
        return personasRepository.personaConDni(personaNueva.dni);
    }
    return undefined;
};

const modificaPersona = (dniPersona: string, datosNuevos: Persona) => {
    //TODO estoy modificando por dni me gustaria hacerlo con id;
    const personasAModificar = personasRepository.personaConDni(dniPersona);
    if (personasAModificar !== undefined) {
        personasRepository.eliminaPersona(dniPersona);
        personasRepository.agregarPersona({ ...personasAModificar, ...datosNuevos });
        return { ...personasAModificar, ...datosNuevos };
    }
    return undefined;
};

const eliminarPersonaConDni = (dniPersona: string) => {
    if (personasRepository.personaConDni(dniPersona)) {
        return personasRepository.eliminaPersona(dniPersona);
    }
    return undefined;
};

export default {
    listadoDePersonas,
    listaDeAutosDePersonaConDni,
    busquedaDePersonaConDni,
    busquedaDePersonaConId,
    agregarPersona,
    modificaPersona,
    eliminarPersonaConDni
};
