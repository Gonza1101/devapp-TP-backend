import { NextFunction, Request, Response } from 'express';
import personaService from '../Service/personaService';
//BROWSER
const browser = (req: Request, res: Response, next: NextFunction): void => {
    const personas = personaService.listadoDePersonas();
    res.status(200).json(personas);
    next();
};
//READ
const read = (req: Request, res: Response) => {
    const persona = req.locals.entity;
    res.status(200).json(persona);
};
//EDIT
const edit = (req: Request, res: Response) => {
    const persona = personaService.modificaPersona(req.locals.entity);
    res.status(200).json(persona);
};
//ADD
const add = (req: Request, res: Response) => {
    const nuevaPersona = personaService.agregarPersona(req.locals.entity);
    res.status(200).json(nuevaPersona);
};
//DELETE
const delet = (req: Request, res: Response) => {
    const eliminado = personaService.eliminarPersonaConId(req.params.id);
    if (!eliminado) {
        res.status(404);
        res.json('No se Puede eliminar a un usuario que no existe');
    } else {
        res.status(200);
        res.json(eliminado);
    }
};

const eliminaAutoAPersona = (req: Request, res: Response) => {
    const persona = personaService.eliminarAutodePersona(req.params.idPersona, req.body);
    if (!persona) {
        res.status(404);
        res.json('No se Puede eliminar a un Auto a una Persona que no existe');
    } else {
        res.status(200);
        res.json(persona?.autos);
    }
};

export default { browser, read, edit, add, delet, eliminaAutoAPersona };
