import { Auto } from '../Model/Auto';

const auto1: Auto = {
    id: 'FordTaunusthc',
    dniDueño: '33423185',
    marca: 'Ford',
    modelo: 'Taunus',
    anio: 1975,
    color: 'Naranja',
    numeroChasis: 'fotaus75123',
    motor: 'rumrrrum',
    patente: 'thc 420'
};

const auto2: Auto = {
    id: 'chevrolet404frula',
    dniDueño: '33456123',
    marca: 'Chevrolet',
    modelo: '404',
    anio: 1965,
    color: 'Dorado',
    numeroChasis: 'chevchevi423',
    motor: 'prummprum',
    patente: 'frula 969'
};

const listaAuto: Auto[] = [auto1, auto2];

export default { listaAuto, auto1, auto2 };
