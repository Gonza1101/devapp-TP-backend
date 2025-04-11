import { Persona } from '../Model/Persona';
import { Genero } from '../Model/Genero';
import autoLista from './autoLista';

const person1: Persona = {
    nombre: 'Gonzalo',
    apellido: 'Villalba',
    dni: '33423185',
    fechaNacimiento: new Date(1987 - 13 - 12),
    genero: Genero.Masculino,
    esDonante: true,
    autos: [autoLista.auto1]
};

const person2: Persona = {
    nombre: 'Pam',
    apellido: 'Beesley',
    dni: '35456123',
    fechaNacimiento: new Date(1988 - 1 - 10),
    genero: Genero.Femenino,
    esDonante: false,
    autos: [autoLista.auto2]
};

export const listaPersonas: Persona[] = [person1, person2];
