import personaController from '../Controller/PersonaController';
import { Router } from 'express';
import PersonaMiddleware from '../Middleware/PersonaMiddleware';

export const PersonaRouters = () => {
    const router = Router();
    //listadoPersona
    router.get('/', personaController.browser.bind(personaController));
    //PersonaConId
    router.get('/:id', PersonaMiddleware.fetchPersonaByParamid.bind(PersonaMiddleware));
    router.get('/:id', personaController.read.bind(personaController));
    //PersonaAgregar
    router.post('/', PersonaMiddleware.fetchPersonaFromBody.bind(PersonaMiddleware));
    router.post('/', PersonaMiddleware.validatePersona.bind(PersonaMiddleware)); //valida que los datos esten correctos
    router.post('/', personaController.add.bind(personaController));
    //PersonaEditar
    router.put('/:id', PersonaMiddleware.fetchPersonaByParamid.bind(PersonaMiddleware));
    router.put('/:id', PersonaMiddleware.mergePersonaWithBody.bind(PersonaMiddleware));
    router.put('/:id', PersonaMiddleware.validatePersona.bind(PersonaMiddleware));
    router.put('/:id', personaController.edit.bind(personaController));
    //PersonaAgregoAutoA
    router.patch('/:id', PersonaMiddleware.mergePersonaWithBody.bind(PersonaMiddleware));
    //PersonaEliminar
    router.delete('/:id', PersonaMiddleware.fetchPersonaByParamid.bind(PersonaMiddleware));

    return router;
};
