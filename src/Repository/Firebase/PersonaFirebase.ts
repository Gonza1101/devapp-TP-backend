import { Persona } from '../../Model/Persona';
import { Auto } from '../../Model/Auto';
import { firebasedb } from '../../DataBase/ConnectFirebase';
import { collection, getDocs } from 'firebase/firestore/lite';

export const PersonaMongodb = {
    listadoPersona: async (): Promise<Persona[]> => {
        const personaCol = collection(firebasedb, 'persona');
        const personaSnapshot = await getDocs(personaCol);
        const personas = personaSnapshot.docs.map((doc) => doc.data() as Persona);
        return personas;
    },
    personaConDni: async (dni: string): Promise<Persona | null> => {
        // const db = await ConnectMongodb();
        const persona = await db.collection<Persona>('persona').findOne({ dni: { $eq: dni } });
        // closeMongodb();
        return persona;
    },
    personaConId: async (id: string): Promise<Persona | null> => {
        // const db = await ConnectMongodb();
        const persona = await db.collection<Persona>('persona').findOne({ _id: { $eq: id } });
        // closeMongodb();
        return persona;
    },

    agregarPersona: async (persona: Persona) => {
        // const db = await ConnectMongodb();
        // await db.collection<Persona>('persona').insertOne(persona);
        // closeMongodb();
    },
    agregarAuto: async (idPersona: string, auto: Auto) => {
        // const db = await ConnectMongodb();
        // await db.collection<Persona>('persona').updateOne({ _id: { $eq: idPersona } }, { $push: { autos: auto } });
        // await db.collection<Auto>('auto').insertOne(auto);
        // closeMongodb();
    },
    eliminaPersona: async (idPersona: string) => {
        // const db = await ConnectMongodb();
        // await db.collection<Persona>('persona').deleteOne({ _id: { $eq: idPersona } });
        // closeMongodb();
    },
    eliminarAuto: async (idPersona: string, idAuto: string) => {
        // const db = await ConnectMongodb();
        // db.collection<Persona>('persona').updateOne(
        // { _id: { $eq: idPersona } },
        // { $pull: { autos: { _id: { $eq: idAuto } } } }
        // );
        // closeMongodb();
    }
};
