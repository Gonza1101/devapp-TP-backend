import { Persona } from '../Model/Persona';
import { Genero } from '../Model/Genero';
import autoLista from './autoDB';
import { randomUUID } from 'crypto';

const person1: Persona = {
    id: '3b6a51ec-951e-4463-be91-a16f980fc309',
    nombre: 'Gonzalo',
    apellido: 'Villalba',
    dni: '33423185',
    fechaNacimiento: new Date(1987 - 13 - 12),
    genero: Genero.Masculino,
    esDonante: true,
    autos: [autoLista.auto1]
};

const person2: Persona = {
    id: '2c136831-e001-43ef-9d29-5e9aac92cbbd',
    nombre: 'Pam',
    apellido: 'Beesley',
    dni: '35456123',
    fechaNacimiento: new Date(1988 - 1 - 10),
    genero: Genero.Femenino,
    esDonante: false,
    autos: [autoLista.auto2]
};

const listaPersonas: Persona[] = [person1, person2];

export default { listaPersonas };
