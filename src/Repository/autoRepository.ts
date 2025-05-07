import autoDB from '../DataBase/autoDB';
import { Auto } from '../Model/Auto';

const listadoDeAuto = () => {
    return autoDB.listaAuto;
};

const idDeAutoConPatente = (patente: string) => {
    return autoDB.listaAuto.find((a) => a.patente === patente)?.id;
};

const autoConId = (id: string) => {
    const auto = autoDB.listaAuto.find((a) => a.id === id);
    return auto;
};
const autoConPatente = (patente: string) => {
    const auto = autoDB.listaAuto.find((a) => a.patente === patente);
    return auto;
};

const agregaAuto = (auto: Auto) => {
    console.log('AutoRepository -> agregarAuto');
    console.log(auto);
    autoDB.listaAuto.push(auto);
    return `Se agrego auto ${auto.id}`;
};

const borraAuto = (id: string) => {
    const indexAuto = autoDB.listaAuto.findIndex((a) => a.id === id);
    return autoDB.listaAuto.splice(indexAuto, 1);
};

export default { listadoDeAuto, autoConId, autoConPatente, idDeAutoConPatente, agregaAuto, borraAuto };
