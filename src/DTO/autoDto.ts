import { Auto } from '../Model/Auto';
interface AutoDto {
    id?: string;
    idOwner?: string;
    marca?: string;
    modelo?: string;
    anio?: string;
    color?: string;
    numeroChasis?: string;
    motor?: string;
    patente?: string;
    img?: string;
}

const aAutoDto = (auto: Auto) => {
    const autoDto: AutoDto = {
        id: auto._id,
        idOwner: auto.idOwner,
        marca: auto.marca,
        modelo: auto.modelo,
        anio: auto.anio.toString(),
        color: auto.color,
        numeroChasis: auto.numeroChasis,
        motor: auto.motor,
        patente: auto.patente,
        img: auto.img
    };
    return autoDto;
};

const aAutoReq = (auto: Auto) => {
    const autoReq: AutoDto = {
        id: auto._id,
        marca: auto.marca,
        modelo: auto.modelo,
        patente: auto.patente,
        img: auto.img
    };
    return autoReq;
};

const aAuto = (autoDto: AutoDto) => {
    const auto: Auto = {
        _id: autoDto.id!,
        idOwner: autoDto.idOwner!,
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

export { AutoDto, aAutoDto, aAutoReq, aAuto };
