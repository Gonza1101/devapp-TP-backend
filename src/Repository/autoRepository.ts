import autoDB from '../DataBase/autoDB';
import { Auto } from '../Model/Auto';

const listadoDeAuto = () => {
    return autoDB.listaAuto;
};

const idDeAutoConPatente = (patente: string) => {
    return autoDB.listaAuto.find((a) => a.patente === patente)?.id;
};

const autoConId = (id: string) => {
    const idAuto = autoDB.listaAuto.find((a) => a.id === id);
    return idAuto;
};
const autoConPatente = (patente: string) => {
    const idAuto = autoDB.listaAuto.find((a) => a.patente === patente);
    return idAuto;
};

const agregaAuto = (auto: Auto) => {
    autoDB.listaAuto.push(auto);
};

const borraAuto = (id: string) => {
    const indexAuto = autoDB.listaAuto.findIndex((a) => a.id === id);
    return autoDB.listaAuto.splice(indexAuto, 1);
};

export default { listadoDeAuto, autoConId, autoConPatente, idDeAutoConPatente, agregaAuto, borraAuto };
