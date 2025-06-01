import { aAutoDto, aAutoReq, AutoDto } from '../DTO/AutoDto';
import { aPersona, aPersonaDto } from '../DTO/PersonaDto';
import { Persona } from '../Model/Persona';
import { Auto } from '../Model/Auto';
import { PersonaDto } from '../DTO/PersonaDto';
import { randomUUID } from 'crypto';
import autoService from './AutoService';
import RepositoryConfig from '../Repository/RepositoryConfig';

const personaRepository = RepositoryConfig.PersonaRepository();

const listadoDePersonas = async () => {
    const lista: Persona[] = await personaRepository!.listadoPersona();
    const personasDto = lista.map((persona) => {
        return aPersonaDto(persona);
    });
    return personasDto;
};

const listaDeAutosDePersonaConDni = async (dni: string) => {
    const persona: Persona = await personaRepository!.personaConDni(dni);
    const autos = persona!.autos.map((a) => aAutoReq(a));
    return autos;
};

const personaConId = async (idPersona: string) => {
    const persona = await personaRepository!.personaConId(idPersona);
    if (!persona) {
        throw `Error - Persona No Existe`;
    }
    return aPersonaDto(persona);
};

const agregarPersona = async (personaNueva: PersonaDto) => {
    const persona = await personaConId(personaNueva.dni!);
    if (persona) {
        throw 'Error, El dni ya se encuentra registrado';
    } else {
        const persona: Persona = {
            _id: randomUUID(),
            nombre: personaNueva.nombre!,
            apellido: personaNueva.apellido!,
            dni: personaNueva.dni!,
            fechaNacimiento: new Date(personaNueva.fechaNacimiento!),
            genero: personaNueva.genero!,
            esDonante: personaNueva.esDonante!,
            img: personaNueva.img!,
            autos: new Array<Auto>()
        };
        await personaRepository!.agregarPersona(persona);
        return aPersonaDto(persona);
    }
};

const modificaPersona = async (personaDTO: PersonaDto) => {
    await eliminarPersonaConId(personaDTO.id!);
    //await personaRepository!.eliminaPersona(personaDTO.id!);
    await agregarPersona(personaDTO);
    //await personaRepository!.agregarPersona(personaModificada);
    return personaDTO;
};

const eliminarPersonaConId = async (idPersona: string) => {
    const persona = await personaRepository!.personaConId(idPersona);
    if (persona) {
        //elimino los auto de la lista gral.
        persona.autos.map((a) => autoService.eliminaAuto(aAutoDto(a)));
        //elimino la persona
        return await personaRepository!.eliminaPersona(idPersona);
    }
    return undefined;
};
const agregarAutoAPersona = async (auto: Auto) => {
    const persona = await personaRepository!.personaConId(auto.idOwner);
    if (persona) {
        personaRepository!.agregarAuto(persona!._id, auto);
        return true;
    }
    return false;
};

const eliminarAutodePersona = async (idPersona: string, auto: AutoDto) => {
    const persona = await personaRepository!.personaConId(idPersona);
    if (persona) {
        const autoIndex = persona.autos.findIndex((a) => a._id === auto.id);
        if (autoIndex !== undefined) {
            persona.autos.splice(autoIndex, 1);
            personaRepository!.eliminaPersona(persona._id);
            personaRepository!.agregarPersona(persona);
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
