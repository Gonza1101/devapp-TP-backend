import { listaPersonas } from '../DataBase/personasDB';

const listaDePersonas = () => {
    return { personas: listaPersonas };
};

const personaConDni = (id: string) => {
    return listaPersonas.find((p) => id === p.dni);
};

export default { listaDePersonas, personaConDni };
