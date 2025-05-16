import { aAutoReq, AutoDto } from '../DTO/autoDto';
import { aPersona, aPersonaDto, aPersonaReq } from '../DTO/personaDto';
import { Persona } from '../Model/Persona';
import { Auto } from '../Model/Auto';
import { PersonaDto } from '../DTO/personaDto';
import personasRepository from '../Repository/personasRepository';
import { randomUUID } from 'crypto';
import autoService from './autoService';

const listadoDePersonas = () => {
    const lista = personasRepository.listadoPersonas();
    const personasDto = lista.map((persona) => {
        return aPersonaDto(persona);
    });
    return personasDto;
};

const listaDeAutosDePersonaConDni = (dni: string) => {
    return {
        autos: personasRepository.personaConDni(dni)?.autos.map((auto) => {
            return aAutoReq(auto);
        })
    };
};

const personaConId = (idPersona: string) => {
    const persona = personasRepository.personaConId(idPersona);
    if (!persona) {
        throw `Error - Persona No Existe`;
    }
    return aPersonaDto(persona);
};

const agregarPersona = (personaNueva: PersonaDto) => {
    if (personasRepository.personaConDni(personaNueva.dni!)) {
        throw 'Error, El dni ya se encuentra registrado';
    } else {
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
        return aPersonaDto(persona);
    }
};

const modificaPersona = (personaDTO: PersonaDto) => {
    const personaModificada = aPersona(personaDTO);
    personasRepository.eliminaPersona(personaDTO.id!);
    personasRepository.agregarPersona(personaModificada);
    return aPersonaDto(personaModificada);
};

const eliminarPersonaConId = (idPersona: string) => {
    const persona = personasRepository.personaConId(idPersona);
    if (persona) {
        //elimino los auto de la lista gral.
        persona.autos.map((a) => autoService.eliminaAuto(a.id));
        //elimino la persona
        return personasRepository.eliminaPersona(idPersona).map((p) => aPersonaReq(p));
    }
    return undefined;
};
const agregarAutoAPersona = (auto: Auto) => {
    const persona = personasRepository.personaConId(auto.idDueño);
    if (persona !== undefined) {
        personasRepository.agregarAuto(persona.id, auto);
        return true;
    }
    return false;
};

const eliminarAutodePersona = (idPersona: string, auto: AutoDto) => {
    const persona = personasRepository.personaConId(idPersona);
    if (persona !== undefined) {
        const autoIndex = persona.autos.findIndex((a) => a.id === auto.id);
        if (autoIndex !== undefined) {
            persona.autos.splice(autoIndex, 1);
            personasRepository.eliminaPersona(persona.id);
            personasRepository.agregarPersona(persona);
            return persona;
        }
    }
    return undefined;
};

export default {
    listadoDePersonas,
    listaDeAutosDePersonaConDni,
    personaConId,
    agregarPersona,
    modificaPersona,
    eliminarPersonaConId,
    agregarAutoAPersona,
    eliminarAutodePersona
};
