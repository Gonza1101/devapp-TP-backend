import { Request, Response } from 'express';
import autoService from '../Service/autoService';
import validaciones from '../Helper/validaciones';

const browser = (req: Request, res: Response) => {
    const autos = autoService.listar();
    res.json(autos);
    res.status(200);
};

const read = (req: Request, res: Response) => {
    const persona = autoService.buscarAutoConid(req.body.dni);
    if (persona === undefined) {
        res.status(404);
        res.json(`No hay Persona Registrada con ${req.body.dni}`);
    }
    res.json(persona);
    res.status(200);
};

const edit = (req: Request, res: Response) => {
    const idDni = req.params.dni;
    const reqBody = req.body;
    const existe: boolean = autoService.existePersonsa(idDni);
    if (!existe) {
        res.status(404);
        res.json(`La Persona con DNI ${idDni} no se encuentra registrado`);
    }
    if (validaciones.sonDatosValidosParaEditar(reqBody)) {
        const per = autoService.actualizarPersonaConDni(idDni, reqBody);
        res.status(200);
        res.json(per);
    } else {
        res.status(400);
        res.json('Clasico Error de type');
    }
};

const add = (req: Request, res: Response) => {
    const reqBody = req.body; // TODO implementar DTO
    if (autoService.existePersonsa(reqBody.dni)) {
        res.status(400);
        res.json(`Usuario con DNI ${reqBody.dni} ya se encuentra registrado`);
    } else {
        autoService.agregarPersona(reqBody);
        res.json(`Se agrego a ${reqBody.nombre} con DNI ${reqBody.dni}`);
        res.status(200);
    }
};

const delet = (req: Request, res: Response) => {
    const idDni = req.params.dni;
    if (!personaService.existePersonsa(idDni)) {
        res.status(404);
        res.json('No se Puede eliminar a un usuario que no existe');
    } else {
        const list = personaService.eliminarPersonaConDni(idDni);
        res.status(200);
        res.json(list);
    }
};

export default { browser, read, edit, add, delet };
