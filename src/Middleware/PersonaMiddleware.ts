import { NextFunction, Request, Response } from 'express';
import personaService from '../Service/PersonaService';
import validaciones from '../Helper/Validaciones';

const fetchPersonaByParamid = async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const persona = await personaService.personaConId(id);
    req.locals.entity = persona;
    next();
};
const fetchPersonaFromBody = (req: Request, res: Response, next: NextFunction) => {
    const persona = req.body;
    req.locals.entity = persona;
    next();
};
const mergePersonaWithBody = (req: Request, res: Response, next: NextFunction) => {
    const personaEdit = { ...req.locals.entity, ...req.body };
    req.locals.entity = personaEdit;
    next();
};
const validatePersona = (req: Request, res: Response, next: NextFunction) => {
    const validacion = validaciones.sonDatosValidosDePersona(req.locals.entity);
    if (!validacion) {
        throw 'Error de Validacion de datos de Persona';
    }
    next();
};

export default { fetchPersonaByParamid, fetchPersonaFromBody, mergePersonaWithBody, validatePersona };
