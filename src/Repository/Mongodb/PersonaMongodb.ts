import { Persona } from '../../Model/Persona';
import { closeMongodb, ConnectMongodb } from '../../DataBase/ConnectMongodb';
import { Auto } from '../../Model/Auto';

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
        db.collection<Persona>('persona').insertOne(persona);
        closeMongodb();
    },
    agregarAuto: async (idPersona: string, auto: Auto) => {
        const db = await ConnectMongodb();
        db.collection<Persona>('persona').updateOne({ _id: { $eq: idPersona } }, { $push: { autos: auto } });
        db.collection<Auto>('auto').insertOne(auto);
        closeMongodb();
    },
    eliminarPersona: async (idPersona: string) => {
        const db = await ConnectMongodb();
        db.collection<Persona>('persona').deleteOne({ _id: { $eq: idPersona } });
        db.collection<Auto>('auto').deleteMany({ idOwner: { $eq: idPersona } });
        closeMongodb();
    },
    eliminarAuto: async (idPersona: string, idAuto: string) => {
        const db = await ConnectMongodb();
        db.collection<Persona>('persona').updateOne(
            { _id: { $eq: idPersona } },
            { $pull: { autos: { _id: { $eq: idAuto } } } }
        );
        db.collection<Auto>('auto').deleteOne({ _id: { $eq: idAuto } });
        closeMongodb();
    }
};
