import { Auto } from '../Model/Auto';
interface AutoDto {
    id?: string;
    idDueño?: string;
    marca?: string;
    modelo?: string;
    anio?: number;
    color?: string;
    numeroChasis?: string;
    motor?: string;
    patente?: string;
    img?: string;
}

const aAutoDto = (auto: Auto | undefined) => {
    if (auto) {
        const autoDto: AutoDto = {
            id: auto.id,
            idDueño: auto.idDueño,
            marca: auto.marca,
            modelo: auto.modelo,
            anio: auto.anio,
            color: auto.color,
            numeroChasis: auto.numeroChasis,
            motor: auto.motor,
            patente: auto.patente,
            img: auto.img
        };
        return autoDto;
    }
    return undefined;
};

const aAutoReq = (auto: Auto) => {
    const autoReq: AutoDto = {
        marca: auto.marca,
        modelo: auto.modelo,
        patente: auto.patente,
        img: auto.img
    };
    return autoReq;
};

export { AutoDto, aAutoDto, aAutoReq };
