/*
    este va a ser el repositoryBase
    va a configurar a que dataBase llamo segun el archivo env.
    el service va a llamar siempre aca
*/
exprot const PersonaRepository = () => {
    if (process.env.REPOSITORY === 'transient') {
        //TODO devuelve el repositorio en Memoria;
    };
    if (process.env.REPOSITORY === 'mongodb') {
        //TODO devuelve el repositorio a mongo;
    };
}