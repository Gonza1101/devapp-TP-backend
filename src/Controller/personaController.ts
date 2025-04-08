import { buscarPersonaConDni, listaDeAutosPorDniPersona, listaDePersonasResumida } from '../Service/personaService';

export const obtenerListaPersonas = () => {
    return listaDePersonasResumida;
};

export const listAutosDePersonaConDni = (id: string) => {
    return listaDeAutosPorDniPersona(id);
};

export const personaConDni = (id: string) => {
    return buscarPersonaConDni(id);
}
