import autoDB from '../../DataBase/Transient/AutoDB';
import { Auto } from '../../Model/Auto';

export const AutoTransient = {
    listaDeAuto: (): Auto[] => {
        return autoDB.listaAuto;
    },
    agregaAuto: (auto: Auto) => {
        // console.log('AutoRepository -> agregarAuto');
        // console.log(auto);
        autoDB.listaAuto.push(auto);
    },
    autoConPatente: (patente: string) => {
        const auto = autoDB.listaAuto.find((a) => a.patente === patente);
        return auto!;
    },
    autoConId: (id: string) => {
        const auto = autoDB.listaAuto.find((a) => a._id === id);
        return auto;
    },
    eliminaAuto: (id: string) => {
        const indexAuto = autoDB.listaAuto.findIndex((a) => a._id === id);
        return autoDB.listaAuto.splice(indexAuto, 1);
    }
};

// const listadoDeAuto = (): Auto[] => {
//     return autoDB.listaAuto;
// };

// // const idDeAutoConPatente = (patente: string) => {
// //     return autoDB.listaAuto.find((a) => a.patente === patente)?._id;
// // };

// const autoConId = (id: string) => {
//     const auto = autoDB.listaAuto.find((a) => a.id === id);
//     return auto;
// };
// const autoConPatente = (patente: string) => {
//     const auto = autoDB.listaAuto.find((a) => a.patente === patente);
//     return auto;
// };

// const agregaAuto = (auto: Auto) => {
//     // console.log('AutoRepository -> agregarAuto');
//     // console.log(auto);
//     autoDB.listaAuto.push(auto);
//     return `Se agrego auto ${auto.id}`;
// };

// const eliminaAuto = (id: string) => {
//     const indexAuto = autoDB.listaAuto.findIndex((a) => a.id === id);
//     return autoDB.listaAuto.splice(indexAuto, 1);
// };

// export default { listadoDeAuto, autoConId, autoConPatente, idDeAutoConPatente, agregaAuto, eliminaAuto };
