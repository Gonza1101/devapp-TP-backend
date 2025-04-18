import { Request, Response } from 'express';
import personaService from '../Service/personaService';
import validaciones from '../Helper/validaciones';
//BROWSER
const browser = (req: Request, res: Response) => {
    const dni = req.query.dni?.toString();
    if (dni) {
        const autosDe = personaService.listaDeAutosDePersonaConDni(dni);
        res.status(200);
        res.json(autosDe);
    } else {
        const personas = personaService.listadoDePersonas().personas;
        res.status(200);
        res.json(personas);
    }
};
//READ
const read = (req: Request, res: Response) => {
    const persona = personaService.busquedaDePersonaConDni(req.params.dni);
    if (!persona) {
        res.status(404);
        res.json(`No hay Persona Registrada con ${req.body.dni}`);
    }
    res.status(200);
    res.json(persona);
};
//EDIT
const edit = (req: Request, res: Response) => {
    if (!validaciones.sonDatosValidosDePersona(req.body)) {
        res.status(400);
        res.json('Datos incorrectos');
    }
    console.log(req.params.id);
    const persona = personaService.modificaPersona(req.params.id, req.body);
    if (persona) {
        res.status(200);
        res.json(persona);
    }
    res.status(404);
    res.json(`La Persona no se encuentra registrado`);
};
//ADD
const add = (req: Request, res: Response) => {
    if (!validaciones.sonDatosValidosDePersona(req.body)) {
        res.status(400);
        res.json('Verificar Datos ingresados');
    }
    const personaAgregada = personaService.agregarPersona(req.body);
    if (!personaAgregada) {
        res.status(400);
        res.json(`Usuario con DNI ${req.body.dni} ya se encuentra registrado`);
    }
    res.json(`Se agrego una Persona`);
    res.status(200);
};
//DELETE
const delet = (req: Request, res: Response) => {
    const eliminado = personaService.eliminarPersonaConId(req.params.id);
    if (!eliminado) {
        res.status(404);
        res.json('No se Puede eliminar a un usuario que no existe');
    }
    res.status(200);
    res.json(eliminado);
};

export default { browser, read, edit, add, delet };
