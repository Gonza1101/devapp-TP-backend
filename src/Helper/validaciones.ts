import { Persona } from '../Model/Persona';

const esDatoValido = (dato: unknown, tipo: string) => {
    return typeof dato === tipo || dato === undefined;
};

const esFechaValida = (fecha: unknown) => {
    return (
        fecha === undefined ||
        (typeof fecha === 'string' && !Number.isNaN(new Date(fecha)) && new Date(fecha) > new Date())
    );
};

const esGeneroValido = (genero: unknown) => {
    return (
        genero === undefined ||
        (typeof genero === 'string' &&
            (genero.toString() === 'masculino' ||
                genero.toString() === 'femenino' ||
                genero.toString() === 'noBinario'))
    );
};

const sonDatosValidosParaEditar = (persona: Persona) => {
    return (
        esDatoValido(persona.nombre, 'string') &&
        esDatoValido(persona.apellido, 'string') &&
        esDatoValido(persona.dni, 'string') &&
        esFechaValida(persona.fechaNacimiento) &&
        esGeneroValido(persona.genero)
    );
};

export default { esDatoValido, esFechaValida, esGeneroValido, sonDatosValidosParaEditar };
