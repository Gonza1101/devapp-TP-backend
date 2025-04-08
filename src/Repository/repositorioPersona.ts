import { listaPersonas } from './ListadoPersona';

export const listaDePersonas = () => {
    return { personas: listaPersonas };
};

export const personaConDni = (id: string) => {
    return listaPersonas.find((p) => id === p.dni);
};
