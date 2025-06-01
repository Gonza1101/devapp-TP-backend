import { AutoMongodb } from './Mongodb/AutoMongodb';
import { PersonaMongodb } from './Mongodb/PersonaMongodb';
import { AutoTransient } from './Transient/AutoTransient';
import { PersonasTransient } from './Transient/PersonasTransient';

/*
    este va a ser el repositoryBase
    va a configurar a que dataBase llamo segun el archivo env.
    el service va a llamar siempre aca
*/
const PersonaRepository = () => {
    if (process.env.REPOSITORY === 'transient') {
        //TODO devuelve el repositorio en Memoria;
        //console.log('Repository');
        return PersonasTransient;
    }
    if (process.env.REPOSITORY === 'mongodb') {
        //TODO devuelve el repositorio a mongo;
        return PersonaMongodb;
    }
};
const AutoRepository = () => {
    if (process.env.REPOSITORY === 'transient') {
        //TODO devuelve el repositorio en Memoria;
        return AutoTransient;
    }
    if (process.env.REPOSITORY === 'mongodb') {
        //TODO devuelve el repositorio a mongo;
        return AutoMongodb;
    }
};

export default { PersonaRepository, AutoRepository };
