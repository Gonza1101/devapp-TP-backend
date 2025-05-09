import { Request, Response } from 'express';
import autoService from '../Service/autoService';
import validaciones from '../Helper/validaciones';

//BROWSER
const browser = (req: Request, res: Response) => {
    res.status(200).json(autoService.listado());
};
//READ
const read = (req: Request, res: Response) => {
    const auto = autoService.autoConId(req.params.id);
    if (!auto) {
        res.status(404).json(`No existe tal AUTO`);
    }
    res.status(200).json(auto);
};

//EDIT
const edit = (req: Request, res: Response) => {
    // console.log('AutoController req.params,id');
    // console.log(req.params.id);
    // console.log('AutoController req.body');
    // console.log(req.body);
    if (!validaciones.sonDatosValidosDeAuto(req.body)) {
        // console.log('Clasico Error de type');
        res.status(400).json('Clasico Error de type');
    } else {
        const autoEditado = autoService.modificaAuto(req.params.id, req.body);
        if (autoEditado === undefined) {
            // console.log('AutoController -> autoEditado undefine');
            // console.log(autoEditado);
            res.status(404);
            res.json('Auto invalido para su modificacion');
        } else {
            // console.log('AutoController -> autoEditado');
            // console.log(autoEditado);
            res.status(200);
            res.json(autoEditado);
        }
    }
};
//ADD
const add = (req: Request, res: Response) => {
    if (!validaciones.sonDatosValidosDeAuto(req.body)) {
        // console.log('Datos NoValidos');
        res.status(400);
        res.json('Campos Invalido');
    } else {
        const autoAgregado = autoService.agregaAuto(req.body);
        // console.log('ControllerAuto -> muestro el autoAgregado');
        // console.log(autoAgregado);
        if (!autoAgregado) {
            // console.log('autoAgregado status 400');
            res.status(400);
            res.json('Error al Cargar Auto');
        }
        // console.log('autoAgregado status 200');
        res.status(200);
        res.json(`Se agrego el auto con patente ${autoAgregado!.patente}`);
    }
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
