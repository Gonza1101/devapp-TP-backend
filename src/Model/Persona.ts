import { Auto } from './Auto';
import { Genero } from './Genero';
import { UUID } from 'crypto';

export interface Persona {
    id: UUID;
    nombre: string;
    apellido: string;
    dni: string;
    fechaNacimiento: Date;
    genero: Genero;
    esDonante?: boolean;
    img: string;
    autos: Auto[];
}
