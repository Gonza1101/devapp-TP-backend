import { NextFunction, Request, Response } from 'express';
import autoService from '../Service/AutoService';
import validaciones from '../Helper/Validaciones';

const fecthAutoByParamId = async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const auto = await autoService.autoConId(id);
    req.locals.entity = auto;
    next();
};

const fetchAutoFromBody = (req: Request, res: Response, next: NextFunction) => {
    const auto = req.body;
    req.locals.entity = auto;
    next();
};

const mergePersonaWithBody = (req: Request, res: Response, next: NextFunction) => {
    const autoEdit = { ...req.locals.entity, ...req.body };
    req.locals.entity = autoEdit;
    next();
};

const validateAuto = (req: Request, res: Response, next: NextFunction) => {
    const validacion = validaciones.sonDatosValidosDeAuto(req.locals.entity);
    if (!validacion) {
        throw 'Error - Datos de Auto Invalido';
    }
    next();
};

export default { fecthAutoByParamId, fetchAutoFromBody, mergePersonaWithBody, validateAuto };
