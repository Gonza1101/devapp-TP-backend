import { Router } from 'express';
import autoController from '../Controller/AutoController';
import AutoMiddleware from '../Middleware/AutoMiddleware';

export const AutoRouters = () => {
    const router = Router();
    //AutoListado
    router.get('/', autoController.browser.bind(autoController));
    //AutoConId
    router.get('/:id', AutoMiddleware.fecthAutoByParamId.bind(AutoMiddleware));
    router.get('/:id', autoController.read.bind(autoController));
    //AutoAgregar
    router.post('/', AutoMiddleware.fetchAutoFromBody.bind(AutoMiddleware));
    router.post('/', AutoMiddleware.validateAuto.bind(AutoMiddleware));
    router.post('/', autoController.add.bind(autoController));
    //AutoEditar
    router.put('/:id', AutoMiddleware.fecthAutoByParamId.bind(AutoMiddleware));
    router.put('/:id', AutoMiddleware.mergePersonaWithBody.bind(AutoMiddleware));
    router.put('/:id', AutoMiddleware.validateAuto.bind(AutoMiddleware));
    router.put('/:id', autoController.edit.bind(autoController));
    //AutoEliminar
    router.delete('/:id', AutoMiddleware.fecthAutoByParamId.bind(AutoMiddleware));
    router.delete('/:id', autoController.delet.bind(autoController));

    return router;
};
