import { NextFunction, Request, Response } from 'express';
import autoService from '../Service/AutoService';

//BROWSER
const browser = (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json(autoService.listado());
    next();
};
//READ
const read = (req: Request, res: Response, next: NextFunction) => {
    const auto = req.locals.entity;
    res.status(200).json(auto);
    next();
};

//EDIT
const edit = (req: Request, res: Response, next: NextFunction) => {
    const autoEditado = autoService.modificaAuto(req.locals.entity);
    res.status(200).json(autoEditado);
    next();
};
//ADD
const add = (req: Request, res: Response, next: NextFunction) => {
    const nuevoAuto = autoService.agregaAuto(req.locals.entity);
    res.status(200).json(nuevoAuto);
    next();
};
//DELETE
const delet = (req: Request, res: Response, next: NextFunction) => {
    const eliminado = autoService.eliminaAuto(req.locals.entity);
    res.status(200).json(eliminado);
    next();
};

export default { browser, read, edit, add, delet };
