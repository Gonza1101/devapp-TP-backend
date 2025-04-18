import { UUID } from 'crypto';
export interface Auto {
    id: UUID;
    idDueño: string;
    marca: string;
    modelo: string;
    anio: number;
    color: string;
    numeroChasis: string;
    motor: string;
    patente: string;
}
