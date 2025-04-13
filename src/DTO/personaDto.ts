import { Genero } from '../Model/Genero';
import { AutoDto } from './autoDto';
export interface PersonaDto {
    id?: string;
    nombre?: string;
    apellido?: string;
    dni?: string;
    fechaNacimiento?: Date;
    genero?: Genero;
    esDonante?: boolean;
    autos?: AutoDto[];
}