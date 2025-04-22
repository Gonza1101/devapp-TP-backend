import { Genero } from '../Model/Genero';
import { Persona } from '../Model/Persona';
import { aAutoReq, AutoDto } from './autoDto';
interface PersonaDto {
    id?: string;
    nombre?: string;
    apellido?: string;
    dni?: string;
    fechaNacimiento?: string;
    genero?: Genero;
    esDonante?: boolean;
    autos?: AutoDto[];
}

const aPersonaDto = (persona: Persona | undefined) => {
    if (persona) {
        const personaDto: PersonaDto = {
            id: persona.id,
            nombre: persona.nombre,
            apellido: persona.apellido,
            dni: persona.dni,
            fechaNacimiento: persona.fechaNacimiento.toString(),
            genero: persona.genero,
            esDonante: persona.esDonante,
            autos: persona.autos
        };
        return personaDto;
    }
    return undefined;
};

const aPersonaReq = (persona: Persona) => {
    const personaReq: PersonaDto = {
        id: persona.id,
        dni: persona.dni,
        nombre: persona.nombre,
        apellido: persona.apellido,
        autos: persona.autos.map((auto) => {
            return aAutoReq(auto);
        })
    };
    return personaReq;
}

export { PersonaDto, aPersonaDto, aPersonaReq };
