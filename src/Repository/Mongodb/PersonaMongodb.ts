import { Persona } from '../../Model/Persona';
import { closeMongodb, ConnectMongodb } from '../../DataBase/ConnectMongodb';
import { Auto } from '../../Model/Auto';

export const PersonaMongodb = {
    listadoPersona: async (): Promise<Persona[]> => {
        const db = await ConnectMongodb();
        const personas = await db.collection<Persona>('persona').find({}).toArray();
        closeMongodb();
        return personas;
    },
    personaConDni: async (dni: string): Promise<Persona | null> => {
        const db = await ConnectMongodb();
        const persona = await db.collection<Persona>('persona').findOne({ dni: { $eq: dni } });
        closeMongodb();
        return persona;
    },
    personaConId: async (id: string): Promise<Persona | null> => {
        const db = await ConnectMongodb();
        const persona = await db.collection<Persona>('persona').findOne({ _id: { $eq: id } });
        closeMongodb();
        return persona;
    },

    agregarPersona: async (persona: Persona) => {
        const db = await ConnectMongodb();
        await db.collection<Persona>('persona').insertOne(persona);
        closeMongodb();
    },
    agregarAuto: async (idPersona: string, auto: Auto) => {
        const db = await ConnectMongodb();
        await db.collection<Persona>('persona').updateOne({ _id: { $eq: idPersona } }, { $push: { autos: auto } });
        await db.collection<Auto>('auto').insertOne(auto);
        closeMongodb();
    },
    eliminaPersona: async (idPersona: string) => {
        const db = await ConnectMongodb();
        await db.collection<Persona>('persona').deleteOne({ _id: { $eq: idPersona } });
        await db.collection<Auto>('auto').deleteMany({ idOwner: { $eq: idPersona } });
        closeMongodb();
    },
    eliminarAuto: async (idPersona: string, idAuto: string) => {
        const db = await ConnectMongodb();
        db.collection<Persona>('persona').updateOne(
            { _id: { $eq: idPersona } },
            { $pull: { autos: { _id: { $eq: idAuto } } } }
        );
        closeMongodb();
    }
};
