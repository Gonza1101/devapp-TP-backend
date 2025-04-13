import { Request, Response } from 'express';
import personaService from '../Service/personaService';
import validaciones from '../Helper/validaciones';
//BROWSER
const browser = (req: Request, res: Response) => {
    const dni = req.query.dni?.toString();
    if (dni !== undefined) {
        const autosDe = personaService.listaDeAutosDePersonaConDni(dni);
        res.json(autosDe);
        res.status(200);
    }
    const personas = personaService.listadoDePersonas();
    res.json(personas);
    res.status(200);
};
//READ
const read = (req: Request, res: Response) => {
    const persona = personaService.busquedaDePersonaConDni(req.body.dni);
    if (persona === undefined) {
        res.status(404);
        res.json(`No hay Persona Registrada con ${req.body.dni}`);
    }
    res.json(persona);
    res.status(200);
};
//EDIT
const edit = (req: Request, res: Response) => {
    if (!validaciones.sonDatosValidosDePersona(req.body)) {
        res.status(400);
        res.json('Datos incorrectos');
    }
    const persona = personaService.modificaPersona(req.params.id, req.body);
    if (persona === undefined) {
        res.status(404);
        res.json(`La Persona no se encuentra registrado`);
    }
    res.status(200);
    res.json(persona);
};
//ADD
const add = (req: Request, res: Response) => {
    // TODO implementar DTO
    if (!validaciones.sonDatosValidosDePersona(req.body)) {
        res.status(400);
        res.json('Verificar Datos ingresados');
    }
    const personaAgregada = personaService.agregarPersona(req.body);
    if (personaAgregada === undefined) {
        res.status(400);
        res.json(`Usuario con DNI ${req.body.dni} ya se encuentra registrado`);
    }
    res.json(`Se agrego a ${req.body.nombre} con DNI ${req.body.dni}`);
    res.status(200);
};
//DELETE
const delet = (req: Request, res: Response) => {
    const eliminado = personaService.eliminarPersonaConDni(req.params.dni);
    if (eliminado === undefined) {
        res.status(404);
        res.json('No se Puede eliminar a un usuario que no existe');
    }
    res.status(200);
    res.json(eliminado);
};

export default { browser, read, edit, add, delet };
