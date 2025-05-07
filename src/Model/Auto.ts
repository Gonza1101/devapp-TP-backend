import { AutoDto } from '../DTO/autoDto';
interface Auto {
    id: string;
    idDueño: string;
    marca: string;
    modelo: string;
    anio: number;
    color: string;
    numeroChasis: string;
    motor: string;
    patente: string;
    img: string;
}

const aAuto = (autoDto: AutoDto) => {
    const auto: Auto = {
        id: autoDto.id!,
        idDueño: autoDto.idDueño!,
        marca: autoDto.marca!,
        modelo: autoDto.modelo!,
        anio: parseInt(autoDto.anio!),
        color: autoDto.color!,
        numeroChasis: autoDto.numeroChasis!,
        motor: autoDto.motor!,
        patente: autoDto.patente!,
        img: autoDto.img!
    };
    return auto;
};

export { Auto, aAuto };
