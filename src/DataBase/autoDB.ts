import { Auto } from '../Model/Auto';

const auto1: Auto = {
    id: '13619a1f-4025-4a54-bb30-d86e9a6b2db8',
    idDueño: '33423185',
    marca: 'Ford',
    modelo: 'Taunus',
    anio: 1975,
    color: 'Naranja',
    numeroChasis: 'fotaus75123',
    motor: 'rumrrrum',
    patente: 'thc-420',
    img: Math.floor(Math.random() * 1000).toString()
};

const auto2: Auto = {
    id: '82803b8d-63d0-4147-95db-1f2263145b0e',
    idDueño: '33456123',
    marca: 'Chevrolet',
    modelo: '404',
    anio: 1965,
    color: 'Dorado',
    numeroChasis: 'chevchevi423',
    motor: 'prummprum',
    patente: 'frula-969',
    img: Math.floor(Math.random() * 1000).toString()
};

const listaAuto: Auto[] = [auto1, auto2];

export default { listaAuto, auto1, auto2 };
