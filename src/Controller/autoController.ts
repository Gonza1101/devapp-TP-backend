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
    const auto = autoService.busquedaDeAutoConPatente(req.params.patente);
    if (!auto) {
        res.status(404);
        res.json(`No existe tal AUTO`);
    }
    res.json(auto);
    res.status(200);
};
const readId = (req: Request, res: Response) => {
    const auto = autoService.busquedaDeAutoConId(req.params.id);
    if (!auto) {
        res.status(404);
        res.json(`No existe tal Auto`);
    }
    res.status(200);
    res.json(auto);
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
    if (!validaciones.sonDatosValidosDeAuto(req.body)) {
        res.status(400);
        res.json('Campos Invalido');
    }
    const autoAgregado = autoService.agregaAuto(req.body);
    if (!autoAgregado) {
        res.status(400);
        res.json('Error al Cargar AutoS');
    }
    res.status(200);
    res.json(`Se agrego el auto con patente ${autoAgregado?.patente}`);
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

export default { browser, read, readId, edit, add, delet };
