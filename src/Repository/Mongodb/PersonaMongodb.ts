import { Persona } from '../../Model/Persona';
import { closeMongodb, ConnectMongodb } from '../../DataBase/ConnectMongodb';

export const PersonaMongodbRepository = {
    listadoPersona: async (): Promise<Persona[]> => {
        const db = await ConnectMongodb();
        const personas = db.collection<Persona>('persona').find({}).toArray();
        closeMongodb();
        return personas;
    },
    personaConId: async (id: string): Promise<Persona | null> => {
        const db = await ConnectMongodb();
        const persona = db.collection<Persona>('persona').findOne({ id: id });
        closeMongodb();
        return persona;
    },
    personaConDni: async (dni: string): Promise<Persona | null> => {
        const db = await ConnectMongodb();
        const persona = db.collection<Persona>('persona').findOne({ dni: dni });
        closeMongodb();
        return persona;
    },
    agregarPersona: async (persona: Persona) => {
        const db = await ConnectMongodb();
        const personas = db.collection<Persona>('persona');
        personas.insertOne(persona);
    }
};
