import { Request, Response } from 'express';
import autoService from '../Service/autoService';
import validaciones from '../Helper/validaciones';

//BROWSER
const browser = (req: Request, res: Response) => {
    res.status(200).json(autoService.listado());
};
//READ
const read = (req: Request, res: Response) => {
    const auto = req.locals.entity;
    res.status(200).json(auto);
};

//EDIT
const edit = (req: Request, res: Response) => {
    if (!validaciones.sonDatosValidosDeAuto(req.body)) {
        res.status(400).json('Clasico Error de type');
    } else {
        const autoEditado = autoService.modificaAuto(req.params.id, req.body);
        if (autoEditado === undefined) {
            res.status(404);
            res.json('Auto invalido para su modificacion');
        } else {
            res.status(200);
            res.json(autoEditado);
        }
    }
};
//ADD
const add = (req: Request, res: Response) => {
    const nuevoAuto = autoService.agregaAuto(req.locals.entity);
    res.status(200).json(nuevoAuto);
};
//DELETES
const delet = (req: Request, res: Response) => {
    const eliminado = autoService.eliminaAuto(req.params.id);
    if (!eliminado) {
        res.status(404);
        res.json('No existe auto para ser eliminado');
    }
    res.status(200);
    res.json(eliminado);
};

export default { browser, read, edit, add, delet };
