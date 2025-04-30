import { AutoDto } from '../DTO/autoDto';
import { PersonaDto } from '../DTO/personaDto';

const esDatoValido = (dato: unknown, tipo: string) => {
    return typeof dato === tipo || dato === undefined;
};

const esFechaValida = (fecha: unknown) => {
    return (
        fecha === undefined ||
        (typeof fecha === 'string' && !Number.isNaN(new Date(fecha)) && new Date(fecha) < new Date())
    );
};

const esGeneroValido = (genero: unknown) => {
    return (
        genero === undefined ||
        (typeof genero === 'string' &&
            (genero.toString() === 'masculino' ||
                genero.toString() === 'femenino' ||
                genero.toString() === 'nobinario'))
    );
};

const sonDatosValidosDePersona = (persona: PersonaDto) => {
    return (
        esDatoValido(persona.id, 'string') &&
        esDatoValido(persona.nombre, 'string') &&
        esDatoValido(persona.apellido, 'string') &&
        esDatoValido(persona.dni, 'string') &&
        esFechaValida(persona.fechaNacimiento) &&
        esGeneroValido(persona.genero)
    );
};

const sonDatosValidosDeAuto = (auto: AutoDto) => {
    return (
        esDatoValido(auto.idDueño, 'string') &&
        esDatoValido(auto.marca, 'string') &&
        esDatoValido(auto.modelo, 'string') &&
        esDatoValido(auto.anio, 'number') &&
        esDatoValido(auto.color, 'string') &&
        esDatoValido(auto.numeroChasis, 'string') &&
        esDatoValido(auto.motor, 'string') &&
        esDatoValido(auto.patente, 'string')
    );
};

export default { esDatoValido, esFechaValida, esGeneroValido, sonDatosValidosDePersona, sonDatosValidosDeAuto };
