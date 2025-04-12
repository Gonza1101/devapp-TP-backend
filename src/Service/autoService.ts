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
    const datosNuevos = autoEdit;
    const autoAModificar = autoRepository.autoConId(autoEdit.id);
    const autoModificado = { ...autoAModificar, ...datosNuevos };
    try {
        autoRepository.borraAuto(autoAModificar!.id);
        autoRepository.agregaAuto(autoModificado);
        return autoModificado;
    } catch (error) {
        console.log(error);
        return undefined;
    }
    autoRepository.borraAuto(autoAModificar!.id);
    autoRepository.agregaAuto(autoModificado);
};
//TODO tiene que llegar un tipo autoDTO;
const agregaAutoNuevo = (autoNuevo : Auto) => {
    try {
        autoRepository.agregaAuto(autoNuevo);
        return autoRepository.autoConPatente(autoNuevo.patente);
    } catch (error) {
        console.log(error);
        return undefined;
    }
}

const eliminaAuto = (id: string) => {
    try {
        autoRepository.borraAuto(id);
        return 'Se Elimino el auto con';
    } catch (error) {
        console.log(error);
        return undefined;
    }
}

export default { listado, busquedaDeAutoConPatente, modificaAuto, agregaAutoNuevo, eliminaAuto };
