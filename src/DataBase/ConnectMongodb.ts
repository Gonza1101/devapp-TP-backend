import { Db, MongoClient } from 'mongodb';

const uri = 'mongodb://root:root@localhost:27017'; // URL de conexión a tu base de datos
const dbNombre = 'persona'; // Nombre de tu base de datos
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
