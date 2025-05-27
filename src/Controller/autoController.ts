import { NextFunction, Request, Response } from 'express';
import autoService from '../Service/AutoService';

//BROWSER
const browser = async (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json(await autoService.listado());
    next();
};
//READ
const read = async (req: Request, res: Response, next: NextFunction) => {
    const auto = await req.locals.entity;
    res.status(200).json(auto);
    next();
};

//EDIT
const edit = async (req: Request, res: Response, next: NextFunction) => {
    const autoEditado = await autoService.modificaAuto(req.locals.entity);
    res.status(200).json(autoEditado);
    next();
};
//ADD
const add = async (req: Request, res: Response, next: NextFunction) => {
    const nuevoAuto = await autoService.agregaAuto(req.locals.entity);
    res.status(200).json(nuevoAuto);
    next();
};
//DELETE
const delet = async (req: Request, res: Response, next: NextFunction) => {
    const eliminado = await autoService.eliminaAuto(req.locals.entity);
    res.status(200).json(eliminado);
    next();
};

export default { browser, read, edit, add, delet };
