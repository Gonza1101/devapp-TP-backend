import { Request, Response } from 'express';
import autoService from '../Service/autoService';
import validaciones from '../Helper/validaciones';

//BROWSER
const browser = (req: Request, res: Response) => {
    //TODO cambialo para que devuelva un autoDto o ago parecido
    res.status(200);
    res.json(autoService.listado());
};
//READ
const read = (req: Request, res: Response) => {
    //TODO lo que me lllega lo valido si es una patente;
    const auto = autoService.busquedaDeAutoConPatente(req.body.patente);
    if (auto === undefined) {
        res.status(404);
        res.json(`NO existe tal AUTO con Patente ${req.body.patente}`);
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
    //TODO cambiar a autoDto para devolcerlo al frontend
    const autoEditado = autoService.modificaAuto(req.params.id, req.body);
    if (autoEditado === undefined) {
        res.status(404);
        res.json('Auto invalido para su modificacion');
    }
    res.status(200);
    res.json(autoEditado);
};
//ADD
const add = (req: Request, res: Response) => {
    const autoAdd = req.body; // TODO implementar DTO
    if (!validaciones.sonDatosValidosDeAuto(autoAdd)) {
        res.status(400);
        res.json('Clasico Error de type');
    }
    const autoAgregado = autoService.agregaAuto(autoAdd);
    if (autoAgregado === undefined) {
        res.status(400);
        res.json('Auto invalido para Agregar');
    }
    res.status(200);
    res.json(`Se agrego el auto con patente ${autoAgregado?.id}`);
};
//DELETES
const delet = (req: Request, res: Response) => {
    const eliminado = autoService.eliminaAuto(req.params.id);
    if (eliminado === undefined) {
        res.status(404);
        res.json('No existe auto para ser eliminado');
    }
    res.status(200);
    res.json(eliminado);
};

export default { browser, read, edit, add, delet };
