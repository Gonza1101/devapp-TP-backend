import { Auto } from '../Model/Auto';
import autoRepository from '../Repository/autoRepository';

const listado = () => {
    return autoRepository.listadoDeAuto();
};
const busquedaDeAutoConPatente = (patente: string) => {
    return autoRepository.autoConPatente(patente);
};
const modificaAuto = (id: string, autoEdit: Auto) => {
    //TODO tiene que llegar un autoDTO no un tipo Auto;
    const autoAModificar = autoRepository.autoConId(id);
    if (autoAModificar !== undefined) {
        autoRepository.borraAuto(autoAModificar!.id);
        autoRepository.agregaAuto({ ...autoAModificar, ...autoEdit });
        return { ...autoAModificar, ...autoEdit };
    }
    return undefined;
};
//TODO tiene que llegar un tipo autoDTO;
const agregaAuto = (autoNuevo: Auto) => {
    if (!autoRepository.idDeAutoConPatente(autoNuevo.patente)) {
        autoRepository.agregaAuto(autoNuevo);
        return autoRepository.autoConPatente(autoNuevo.patente);
    }
    return undefined;
};
const eliminaAuto = (id: string) => {
    console.log(autoRepository.autoConId(id));
    if (autoRepository.autoConId(id)) {
        return autoRepository.borraAuto(id);
    }
    return undefined;
};

export default { listado, busquedaDeAutoConPatente, modificaAuto, agregaAuto, eliminaAuto };
