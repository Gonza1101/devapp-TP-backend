import { closeMongodb, ConnectMongodb } from '../../DataBase/ConnectMongodb';
import { Auto } from '../../Model/Auto';

export const AutoMongodb = {
    listaDeAuto: async (): Promise<Auto[]> => {
        const db = await ConnectMongodb();
        const autos = db.collection<Auto>('auto').find({}).toArray();
        closeMongodb();
        return autos;
    },
    agregaAuto: async (auto: Auto) => {
        const db = await ConnectMongodb();
        db.collection<Auto>('auto').insertOne(auto);
    },
    autoConPatente: async (patente: string): Promise<Auto | null> => {
        const db = await ConnectMongodb();
        const auto = db.collection<Auto>('auto').findOne({ patente: { $eq: patente } });
        closeMongodb();
        return auto;
    },
    autoConId: async (id: string): Promise<Auto | null> => {
        const db = await ConnectMongodb();
        const auto = db.collection<Auto>('auto').findOne({ _id: { $eq: id } });
        closeMongodb();
        return auto;
    },
    eliminaAuto: async (id: string) => {
        const db = await ConnectMongodb();
        db.collection<Auto>('auto').deleteOne({ _id: { $eq: id } });
        closeMongodb();
    }
};
