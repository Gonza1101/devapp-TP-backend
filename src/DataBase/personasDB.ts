import { Persona } from '../Model/Persona';
import { Genero } from '../Model/Genero';
import autoLista from './autoDB';

const person1: Persona = {
    id: 'gonzalovillalba33423185',
    nombre: 'Gonzalo',
    apellido: 'Villalba',
    dni: '33423185',
    fechaNacimiento: new Date(1987 - 13 - 12),
    genero: Genero.Masculino,
    esDonante: true,
    autos: [autoLista.auto1]
};

const person2: Persona = {
    id: 'pambeesley33456123',
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