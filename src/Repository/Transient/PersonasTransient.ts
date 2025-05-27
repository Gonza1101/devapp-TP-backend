import personasDB from '../../DataBase/Transient/PersonasDB';
import { Persona } from '../../Model/Persona';
import { Auto } from '../../Model/Auto';

export const PersonasTransient = {
    listadoPersona: () => {
        console.log('PersonaTransient');
        const personas = personasDB.listaPersonas;
        return personas;
    },
    personaConDni: async (dni: string) => {
        return personasDB.listaPersonas.find((p) => p.dni === dni);
    },
    personaConId: (idPersona: string) => {
        return personasDB.listaPersonas.find((p) => p._id === idPersona);
    },
    agregarPersona: (personaNueva: Persona) => {
        personasDB.listaPersonas.push(personaNueva);
    },
    agregarAuto: (idPersona: string, auto: Auto) => {
        const persona = personasDB.listaPersonas.find((p) => p._id === idPersona);
        persona?.autos.push(auto);
    },
    eliminaPersona: (idPersona: string) => {
        const indexPersona = personasDB.listaPersonas.findIndex((p) => p._id === idPersona);
        personasDB.listaPersonas.splice(indexPersona, 1);
    },
    eliminarAuto: (idPersona: string, idAuto: number) => {
        const persona = personasDB.listaPersonas.find((p) => p._id === idPersona);
        persona?.autos.splice(idAuto, 1);
    }
};

// const listadoPersonas = () => {
//     return personasDB.listaPersonas;
// };

// const personaConDni = (dniPersona: string) => {
//     return personasDB.listaPersonas.find((p) => p.dni === dniPersona);
// };

// const personaConId = (idPersona: string) => {
//     return personasDB.listaPersonas.find((p) => p._id === idPersona);
// };

// const agregarPersona = (personaNueva: Persona) => {
//     personasDB.listaPersonas.push(personaNueva);
// };
// const agregarAuto = (idPersona: string, auto: Auto) => {
//     const persona = personasDB.listaPersonas.find((p) => p._id === idPersona);
//     persona?.autos.push(auto);
// };

// const eliminarAuto = (idPersona: string, index: number) => {
//     const persona = personasDB.listaPersonas.find((p) => p._id === idPersona);
//     persona?.autos.splice(index, 1);
// };

// const eliminaPersona = (idPersona: string) => {
//     const indexPersona = personasDB.listaPersonas.findIndex((p) => p._id === idPersona);
//     return personasDB.listaPersonas.splice(indexPersona, 1);
// };

// export default {
//     listadoPersonas,
//     personaConDni,
//     personaConId,
//     agregarPersona,
//     eliminaPersona,
//     agregarAuto,
//     eliminarAuto
// };
