import { Persona } from '../Model/Persona';
import { Genero } from '../Model/Genero';
import { auto1, auto2 } from './ListadoAuto';

const person1: Persona = {
    nombre: 'Gonzalo',
    apellido: 'Villalba',
    dni: '33423185',
    fechaNacimiento: new Date(1987 - 13 - 12),
    genero: Genero.Masculino,
    esDonante: true,
    autos: [auto1]
};

const person2: Persona = {
    nombre: 'Pam',
    apellido: 'Beesley',
    dni: '35456123',
    fechaNacimiento: new Date(1988 - 1 - 10),
    genero: Genero.Femenino,
    esDonante: false,
    autos: [auto2]
};

export const listaPersona: Persona[] = [person1, person2];
