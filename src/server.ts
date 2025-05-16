/* 
    USO DEL SPRET para  "concatenar" datos de dos objetos;
    {...objeto} => crea un objeto con todos los campos del objeto;
    {...objeto1,...objeto2} => crea un objeto nuevo sumando los campos del objeto 1 + objeto 2;
                                si llegara a haber claves iguales se pisan y se guardan las del segundo objeto;
*/
//eslint-disable prettier/prettier
// Importamos nuestras dependencias
import express from 'express';
import cors from 'cors';
// import bodyParser from 'body-parser';
import helmet from 'helmet';
import process from 'process';
import { ResponseInterceptor, ResponseSender } from './Middleware/ResponseInterceptor';
import { RequestWithLocals } from './Middleware/RequestWithLocals';
import { PersonaRouters } from './Routers/PersonaRouters';
import { AutoRouters } from './Routers/AutoRouters';
// Creamos nuestra app express
const app = express();
// Leemos el puerto de las variables de entorno, si no está, usamos uno por default
const port = process.env.PORT || 9000;
// Configuramos los plugins

// MIDDLEWARE EXTERNOS *******
app.use(cors());
app.use(helmet());
// app.use(bodyParser.json());
app.use(express.json());
// MIDDLEWARE ARMADOS POR MI (reza Malena) *******
app.use(ResponseInterceptor); //config response
app.use(RequestWithLocals); //config request
//ahora si puedo trabajar con mis endpoints
// MIS ENDPOINTS ****
// app.get('/', (req, res) => {
//     res.json('Llegaste');
// });
app.use('/persona', PersonaRouters());
app.use('/auto', AutoRouters());
//TODO aca va el middleware de manejo de error
//Mando todo ya definido
app.use(ResponseSender);
// Levantamos el servidor en el puerto que configuramos
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
