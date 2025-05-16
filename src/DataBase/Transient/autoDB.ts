import { Auto } from '../Model/Auto';

const auto1: Auto = {
    id: '13619a1f-4025-4a54-bb30-d86e9a6b2db8',
    idDueño: '3b6a51ec-951e-4463-be91-a16f980fc309',
    marca: 'Ford',
    modelo: 'Taunus',
    anio: 1975,
    color: 'Naranja',
    numeroChasis: 'fotaus75123',
    motor: 'rumrrrum',
    patente: 'thc-420',
    img: '101'
};

const auto2: Auto = {
    id: '82803b8d-63d0-4147-95db-1f2263145b0e',
    idDueño: '2c136831-e001-43ef-9d29-5e9aac92cbbd',
    marca: 'Chevrolet',
    modelo: '404',
    anio: 1965,
    color: 'Dorado',
    numeroChasis: 'chevchevi423',
    motor: 'prummprum',
    patente: 'frula-969',
    img: '102'
};

const auto3: Auto = {
    id: 'c1a6d0b6-772f-4f76-b1c9-fede5e25a762',
    idDueño: '3b6a51ec-951e-4463-be91-a16f980fc309',
    marca: 'Renault',
    modelo: '405',
    anio: 1985,
    color: 'Dorado',
    numeroChasis: '192.185.136.185',
    motor: 'prummprum',
    patente: 'ABC-123',
    img: '103'
};

const listaAuto: Auto[] = [auto1, auto2, auto3];

export default { listaAuto, auto1, auto2, auto3 };
