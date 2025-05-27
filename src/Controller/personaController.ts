import { NextFunction, Request, Response } from 'express';
import personaService from '../Service/PersonaService';
//BROWSER
const browser = async (req: Request, res: Response, next: NextFunction) => {
    const personas = await personaService.listadoDePersonas();
    res.status(200).json(personas);
    next();
};
//READ
const read = (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json(req.locals.entity);
    next();
};
//EDIT
const edit = async (req: Request, res: Response, next: NextFunction) => {
    const persona = await personaService.modificaPersona(req.locals.entity);
    res.status(200).json(persona);
    next();
};
//ADD
const add = async (req: Request, res: Response, next: NextFunction) => {
    const nuevaPersona = await personaService.agregarPersona(req.locals.entity);
    res.status(200).json(nuevaPersona);
    next();
};
//DELETE
//TODO REVISARLO RAROOOOS
const delet = async (req: Request, res: Response, next: NextFunction) => {
    const eliminado = await personaService.eliminarPersonaConId(req.params.id);
    res.status(200);
    res.json(eliminado);
    next();
};

const eliminaAutoAPersona = async (req: Request, res: Response, next: NextFunction) => {
    await personaService.eliminarAutodePersona(req.params.idPersona, req.body);
    res.status(200).json('Se Elimino auto');
    next();
};

export default { browser, read, edit, add, delet, eliminaAutoAPersona };
