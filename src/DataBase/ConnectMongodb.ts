import { Db, MongoClient } from 'mongodb';

const uri = 'mongodb://localhost:'; // URL de conexión a tu base de datos
const dbNombre = 'DevAppTP'; // Nombre de tu base de datos
const client = new MongoClient(uri);
export const ConnectMongodb = async () => {
    await client.connect();
    const db: Db = client.db(dbNombre);
    console.log('Conexión a MongoDb hecha');
    return db;
};

export const closeMongodb = () => {
    client.close();
};
