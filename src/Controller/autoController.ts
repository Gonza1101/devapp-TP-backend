import { Request, Response } from 'express';
import autoService from '../Service/autoService';
import validaciones from '../Helper/validaciones';

//BROWSER
const browser = (req: Request, res: Response) => {
    res.status(200);
    res.json(autoService.listado());
};
//READ
const read = (req: Request, res: Response) => {
    const auto = autoService.busquedaDeAutoConPatente(req.body.patente);
    if (!auto) {
        res.status(404);
        res.json(`No existe tal AUTO`);
    }
    res.json(auto);
    res.status(200);
};
//EDIT
const edit = (req: Request, res: Response) => {
    if (!validaciones.sonDatosValidosDeAuto(req.body)) {
        res.status(400);
        res.json('Clasico Error de type');
    }
    const autoEditado = autoService.modificaAuto(req.params.id, req.body);
    if (!autoEditado) {
        res.status(404);
        res.json('Auto invalido para su modificacion');
    }
    res.status(200);
    res.json(autoEditado);
};
//ADD
const add = (req: Request, res: Response) => {
    const autoAdd = req.body;
    if (!validaciones.sonDatosValidosDeAuto(autoAdd)) {
        res.status(400);
        res.json('Clasico Error de type');
    }
    const autoAgregado = autoService.agregaAuto(autoAdd);
    if (!autoAgregado) {
        res.status(400);
        res.json('Auto invalido para Agregar');
    }
    res.status(200);
    res.json(`Se agrego el auto con patente ${autoAgregado?.id}`);
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
