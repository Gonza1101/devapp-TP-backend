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
    const idAuto = personasRepository.idPersonaConDni(personaNueva.dni);
    if (!idAuto) {
        try {
            personasRepository.agregarPersona(personaNueva);
            return personasRepository.personaConDni(personaNueva.dni);
        } catch (error) {
            console.log(error);
            return undefined;
        }
    }
    return undefined;
};

const modificaPersona = (idPersona: string, datosNuevos: Persona) => {
    const personasAModificar = personasRepository.personaConId(idPersona);
    const personaModificada = { ...personasAModificar, ...datosNuevos };
    try {
        personasRepository.eliminaPersona(idPersona);
        personasRepository.agregarPersona(personaModificada);
        return personaModificada;
    } catch (error) {
        console.log(error);
        return undefined;
    }
};

const eliminarPersonaConDni = (idPersona: string) => {
    if (personasRepository.personaConId(idPersona)) {
        try {
            return personasRepository.eliminaPersona(idPersona);
        } catch (error) {
            console.log(error);
            return undefined;
        }
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
