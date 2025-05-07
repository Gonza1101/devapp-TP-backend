import { Genero } from '../Model/Genero';
import { Persona } from '../Model/Persona';
import { aAutoDto, aAutoReq, AutoDto } from './autoDto';
interface PersonaDto {
    id?: string;
    nombre?: string;
    apellido?: string;
    dni?: string;
    fechaNacimiento?: string;
    genero?: Genero;
    esDonante?: boolean;
    img?: string;
    autos?: AutoDto[];
}

const aPersonaDto = (persona: Persona) => {
    const personaDto: PersonaDto = {
        id: persona.id,
        nombre: persona.nombre,
        apellido: persona.apellido,
        dni: persona.dni,
        fechaNacimiento: formateoFecha(persona.fechaNacimiento),
        genero: persona.genero,
        esDonante: persona.esDonante,
        img: persona.img,
        autos: persona.autos.map((auto) => {
            return aAutoDto(auto);
        })
    };
    return personaDto;
};

const aPersonaReq = (persona: Persona) => {
    const personaReq: PersonaDto = {
        id: persona.id,
        dni: persona.dni,
        nombre: persona.nombre,
        apellido: persona.apellido,
        img: persona.img,
        autos: persona.autos.map((auto) => {
            return aAutoReq(auto);
        })
    };
    return personaReq;
};

const formateoFecha = (fecha: Date) => {
    const anio = fecha.getUTCFullYear().toString();
    let mes = (fecha.getUTCMonth() + 1).toString();
    let dia = fecha.getUTCDate().toString();

    if (fecha.getUTCMonth() + 1 < 10) {
        mes = `0${fecha.getUTCMonth()}`;
    }
    if (fecha.getUTCDate() < 10) {
        dia = `0${fecha.getUTCDate()}`;
    }
    return anio.concat('-').concat(mes.toString()).concat('-').concat(dia.toString());
};

export { PersonaDto, aPersonaDto, aPersonaReq };
