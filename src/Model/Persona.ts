import { Auto } from './Auto';
import { Genero } from './Genero';

export interface Persona {
    nombre: string;
    apellido: string;
    dni: string;
    fechaNacimiento: Date;
    genero: Genero;
    esDonante?: boolean;
    autos: Auto[];
}
