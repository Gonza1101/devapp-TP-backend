import { aAutoDto, aAutoReq } from '../DTO/autoDto';
import { Auto } from '../Model/Auto';
import { AutoDto } from '../DTO/autoDto';
import autoRepository from '../Repository/autoRepository';
import { randomUUID } from 'crypto';

const listado = () => {
    return autoRepository.listadoDeAuto().map((auto) => aAutoReq(auto));
};
const busquedaDeAutoConPatente = (patente: string) => {
    return aAutoDto(autoRepository.autoConPatente(patente));
};

const busquedaDeAutoConId = (id: string) => {
    return aAutoDto(autoRepository.autoConId(id));
};

const modificaAuto = (id: string, autoEdit: Auto) => {
    const autoAModificar = autoRepository.autoConId(id);
    if (autoAModificar) {
        autoRepository.borraAuto(autoAModificar.id);
        autoRepository.agregaAuto({ ...autoAModificar, ...autoEdit });
        return aAutoDto({ ...autoAModificar, ...autoEdit });
    }
    return undefined;
};

const agregaAuto = (autoNuevo: AutoDto) => {
    const auto: Auto = {
        id: randomUUID(),
        idDueño: autoNuevo.idDueño!,
        marca: autoNuevo.marca!,
        modelo: autoNuevo.modelo!,
        anio: autoNuevo.anio!,
        color: autoNuevo.color!,
        numeroChasis: autoNuevo.numeroChasis!,
        motor: autoNuevo.motor!,
        patente: autoNuevo.patente!
    };
    if (!autoRepository.idDeAutoConPatente(auto.patente)) {
        autoRepository.agregaAuto(auto);
        return aAutoDto(autoRepository.autoConPatente(auto.patente));
    }
    return undefined;
};
const eliminaAuto = (id: string) => {
    if (autoRepository.autoConId(id)) {
        return autoRepository.borraAuto(id).map((auto) => aAutoReq(auto));
    }
    return undefined;
};

export default { listado, busquedaDeAutoConPatente, busquedaDeAutoConId, modificaAuto, agregaAuto, eliminaAuto };
