import { Persona } from '../Model/persona';

export const existePersonsa = (list: Persona[], id: string) => {
    const persona = list.find((p) => p.dni === id);
    if (persona === undefined) {
        return false;
    } else {
        return true;
    }
};
