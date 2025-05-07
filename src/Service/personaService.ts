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

// const personaConDni = (dniPersona: string) => {
//     // console.log('PersonaService -> dniPersona');
//     // console.log(dniPersona);
//     const persona = personasRepository.personaConDni(dniPersona);
//     if (persona) {
//         // console.log(persona);
//         return aPersonaDto(persona);
//     } else {
//         return undefined;
//     }
// };

const personaConId = (idPersona: string) => {
    const persona = personasRepository.personaConId(idPersona);
    if (persona) {
        return aPersonaDto(persona);
    }
    return undefined;
};

const agregarPersona = (personaNueva: PersonaDto) => {
    if (!personasRepository.personaConDni(personaNueva.dni!)) {
        const persona: Persona = {
            id: randomUUID(),
            nombre: personaNueva.nombre!,
            apellido: personaNueva.apellido!,
            dni: personaNueva.dni!,
            fechaNacimiento: new Date(personaNueva.fechaNacimiento!),
            genero: personaNueva.genero!,
            esDonante: personaNueva.esDonante!,
            img: personaNueva.img!,
            autos: new Array<Auto>()
        };
        personasRepository.agregarPersona(persona);
        return personasRepository.personaConDni(persona.dni);
    }
    return undefined;
};

const modificaPersona = (idPersona: string, datosNuevos: Persona) => {
    const personasAModificar = personasRepository.personaConId(idPersona);
    // console.log('Persona A Modificar');
    // console.log(personasAModificar);
    // console.log('Persona para Modificar');
    // console.log(datosNuevos);
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
    const persona = personasRepository.personaConDni(auto.idDueño);
    if (persona !== undefined) {
        persona.autos.push(auto);
        return true;
    }
    return false;
};

const eliminarAutodePersona = (idPersona: string, auto: AutoDto) => {
    const persona = personasRepository.personaConId(idPersona);
    if (persona !== undefined) {
        const autoIndex = persona.autos.findIndex((a) => a.id === auto.id);
        if (autoIndex !== undefined) {
            if (autoService.eliminaAuto(auto.id!) !== undefined) {
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
    // personaConDni,
    personaConId,
    agregarPersona,
    modificaPersona,
    eliminarPersonaConId,
    agregarAutoAPersona,
    eliminarAutodePersona
};
