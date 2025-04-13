import { Auto } from '../Model/Auto';
import autoRepository from '../Repository/autoRepository';

const listado = () => {
    return autoRepository.listadoDeAuto;
};
const busquedaDeAutoConPatente = (patente: string) => {
    return autoRepository.autoConPatente(patente);
};
const modificaAuto = (autoEdit: Auto) => {
    //TODO tiene que llegar un autoDTO no un tipo Auto;
    const autoAModificar = autoRepository.autoConId(autoEdit.id);
    const autoModificado = { ...autoAModificar, ...autoEdit };
    try {
        autoRepository.borraAuto(autoAModificar!.id);
        autoRepository.agregaAuto(autoModificado);
        return autoModificado;
    } catch (error) {
        console.log(error);
        return undefined;
    }
};
//TODO tiene que llegar un tipo autoDTO;
const agregaAutoNuevo = (autoNuevo: Auto) => {
    if (!autoRepository.idDeAutoConPatente(autoNuevo.patente)) {
        try {
            autoRepository.agregaAuto(autoNuevo);
            return autoRepository.autoConPatente(autoNuevo.patente);
        } catch (error) {
            console.log(error);
            return undefined;
        }
    }
    return undefined;
};
const eliminaAuto = (id: string) => {
    if (!autoRepository.autoConId(id)) {
        try {
            return autoRepository.borraAuto(id);
        } catch (error) {
            console.log(error);
            return undefined;
        }
    }
    return undefined;
};

export default { listado, busquedaDeAutoConPatente, modificaAuto, agregaAutoNuevo, eliminaAuto };
