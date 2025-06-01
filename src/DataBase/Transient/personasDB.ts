import { Persona } from '../../Model/Persona';
import { Genero } from '../../Model/Genero';
import autoLista from './AutoDB';
const person1: Persona = {
    _id: '3b6a51ec-951e-4463-be91-a16f980fc309',
    nombre: 'Gonzalo',
    apellido: 'Villalba',
    dni: '33423185',
    fechaNacimiento: new Date(1987, 11, 13), //11 porque es el indice de la ubicacion del mes en una array
    genero: Genero.Masculino,
    esDonante: true,
    img: '2',
    autos: [autoLista.auto1, autoLista.auto3]
};

const person2: Persona = {
    _id: '2c136831-e001-43ef-9d29-5e9aac92cbbd',
    nombre: 'Pam',
    apellido: 'Beesley',
    dni: '35456123',
    fechaNacimiento: new Date(1988, 9, 1),
    genero: Genero.Femenino,
    esDonante: false,
    img: '3',
    autos: [autoLista.auto2]
};

const listaPersonas: Persona[] = [person1, person2];

export default { listaPersonas };

// {
//     _id: '3b6a51ec-951e-4463-be91-a16f980fc309',
//     nombre: 'Gonzalo',
//     apellido: 'Villalba',
//     dni: '33423185',
//     fechaNacimiento: new Date(1987, 11, 13),
//     genero: 'Masculino',
//     esDonante: true,
//     img: '2',
//     autos: [{
//     _id: '13619a1f-4025-4a54-bb30-d86e9a6b2db8',
//     idOwner: '3b6a51ec-951e-4463-be91-a16f980fc309',
//     marca: 'Ford',
//     modelo: 'Taunus',
//     anio: 1975,
//     color: 'Naranja',
//     numeroChasis: 'fotaus75123',
//     motor: 'rumrrrum',
//     patente: 'thc-420',
//     img: '101'
// },
// {
//     _id: 'c1a6d0b6-772f-4f76-b1c9-fede5e25a762',
//     idOwner: '3b6a51ec-951e-4463-be91-a16f980fc309',
//     marca: 'Renault',
//     modelo: '405',
//     anio: 1985,
//     color: 'Dorado',
//     numeroChasis: '192.185.136.185',
//     motor: 'prummprum',
//     patente: 'ABC-123',
//     img: '103'
// }]
// }

// {
//     _id: '2c136831-e001-43ef-9d29-5e9aac92cbbd',
//     nombre: 'Pam',
//     apellido: 'Beesley',
//     dni: '35456123',
//     fechaNacimiento: new Date(1988, 9, 1),
//     genero: 'Femenino',
//     esDonante: false,
//     img: '3',
//     autos: [{
//     _id: '82803b8d-63d0-4147-95db-1f2263145b0e',
//     idOwner: '2c136831-e001-43ef-9d29-5e9aac92cbbd',
//     marca: 'Chevrolet',
//     modelo: '404',
//     anio: 1965,
//     color: 'Dorado',
//     numeroChasis: 'chevchevi423',
//     motor: 'prummprum',
//     patente: 'frula-969',
//     img: '102'
// }]
// }
