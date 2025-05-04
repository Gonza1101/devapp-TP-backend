import { aAutoReq, AutoDto } from '../DTO/autoDto';
import { aPersonaDto, aPersonaReq } from '../DTO/personaDto';
import { Persona } from '../Model/Persona';
import { Auto } from '../Model/Auto';
import { PersonaDto } from '../DTO/personaDto';
import personasRepository from '../Repository/personasRepository';
import { randomUUID } from 'crypto';
import autoService from './autoService';


const listadoDePersonas = () => {
    const lista = personasRepository.listadoPersonas();
    return {
        personas: lista.map((persona) => {
            return aPersonaReq(persona);
        })
    };
};

const listaDeAutosDePersonaConDni = (dni: string) => {
    return {
        autos: personasRepository.personaConDni(dni)?.autos.map((auto) => {
            return aAutoReq(auto);
        })
    };
};

const busquedaDePersonaConDni = (dniPersona: string) => {
    return aPersonaDto(personasRepository.personaConDni(dniPersona));
};

const busquedaDePersonaConId = (idPersona: string) => {
    return aPersonaDto(personasRepository.personaConId(idPersona));
};

const agregarPersona = (personaNueva: PersonaDto) => {
    const persona: Persona = {
        id: randomUUID(),
        nombre: personaNueva.nombre!,
        apellido: personaNueva.apellido!,
        dni: personaNueva.dni!,
        fechaNacimiento: new Date(personaNueva.fechaNacimiento!),
        genero: personaNueva.genero!,
        esDonante: personaNueva.esDonante!,
        img: personaNueva.img,
        autos: []
    };
    if (!personasRepository.idPersonaConDni(persona.dni)) {
        personasRepository.agregarPersona(persona);
        return personasRepository.personaConDni(persona.dni);
    }
    return undefined;
};

const modificaPersona = (idPersona: string, datosNuevos: Persona) => {
    const personasAModificar = personasRepository.personaConId(idPersona);
    if (personasAModificar) {
        personasRepository.eliminaPersona(idPersona);
        personasRepository.agregarPersona({ ...personasAModificar, ...datosNuevos });
        return aPersonaDto({ ...personasAModificar, ...datosNuevos });
    }
    return undefined;
};

const eliminarPersonaConId = (idPersona: string) => {
    if (personasRepository.personaConId(idPersona)) {
        return personasRepository.eliminaPersona(idPersona).map((p) => aPersonaReq(p));
    }
    return undefined;
};
const agregarAutoAPersona = (auto: Auto) => {
    console.log(auto);
    const persona = personasRepository.personaConDni(auto.idDueño);
    if (persona !== undefined) {
        persona.autos.push(auto);
        return true;
    }
    return false;
};

const eliminarAutodePersona = (idPersona: string, idAuto: AutoDto) => {
    const persona = personasRepository.personaConId(idPersona);
    if (persona !== undefined) {
        const autoIndex = persona.autos.findIndex((a) => a.id === idAuto.id);
        if (autoIndex !== undefined) {
            if (autoService.eliminaAuto(idAuto.id!) !== undefined) {
                persona.autos.splice(autoIndex, 1);
                personasRepository.eliminaPersona(persona.id);
                personasRepository.agregarPersona(persona);
                return persona;
            }
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
    eliminarPersonaConId,
    agregarAutoAPersona,
    eliminarAutodePersona
};
