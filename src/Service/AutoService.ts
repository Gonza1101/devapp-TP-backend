import { aAutoDto, aAutoReq } from '../DTO/AutoDto';
import { Auto } from '../Model/Auto';
import { aAuto } from '../DTO/AutoDto';
import { AutoDto } from '../DTO/AutoDto';
import personaService from './PersonaService';
import { randomUUID } from 'crypto';
import RepositoryConfig from '../Repository/RepositoryConfig';

const autoRepository = RepositoryConfig.AutoRepository();
const personaRepository = RepositoryConfig.PersonaRepository();
const listado = async () => {
    const lista = await autoRepository!.listaDeAuto();
    const autosDto = lista.map((auto) => aAutoReq(auto));
    return autosDto;
};
const autoConId = async (id: string) => {
    const auto = await autoRepository!.autoConId(id);
    if (auto) {
        return aAutoDto(auto);
    }
    return undefined;
};
const agregaAuto = async (autoNuevo: AutoDto) => {
    // console.log(autoNuevo);
    const auto: Auto = {
        _id: randomUUID(),
        idOwner: autoNuevo.idOwner!,
        marca: autoNuevo.marca!,
        modelo: autoNuevo.modelo!,
        anio: parseInt(autoNuevo.anio!),
        color: autoNuevo.color!,
        numeroChasis: autoNuevo.numeroChasis!,
        motor: autoNuevo.motor!,
        patente: autoNuevo.patente!,
        img: Math.floor(Math.random() * 100).toString()
    };
    //Verifico que exista el auto
    const autodb = await autoRepository!.autoConPatente(auto.patente);
    if (autodb) {
        throw 'Error - Ya hay un auto con esa patente';
    } else {
        const agregadoAPersona = personaService.agregarAutoAPersona(auto); //Se lo agrega a la Persona
        if (!agregadoAPersona) {
            throw 'Error - No se encuentra registrado el DNI del Dueño';
        }
        await autoRepository!.agregaAuto(auto); // Agrego a lista Gral.
        const autoAgregado = await autoRepository!.autoConPatente(auto.patente);
        const autoDto = aAutoDto(autoAgregado!);
        return autoDto;
    }
};

const modificaAuto = async (autoEdit: AutoDto) => {
    const dueño = await personaRepository!.personaConDni(autoEdit.idOwner!);
    if (!dueño) {
        throw 'Error - No Hay Dueño con El auto';
    }
    await autoRepository!.eliminaAuto(autoEdit.id!); //Borro de la lista De Autos Gral.
    await autoRepository!.agregaAuto(aAuto(autoEdit));
    //Edito la lista particular del Dueño
    personaService.eliminarAutodePersona(dueño!._id, autoEdit); //Borro de la lista de la persona particuar.
    // TODO error si no existe el auto en la persona
    await personaRepository!.agregarAuto(dueño!._id, aAuto(autoEdit));
    return autoEdit;
};

const eliminaAuto = (auto: AutoDto) => {
    return autoRepository!.eliminaAuto(auto.id!);
};

export default { listado, autoConId, modificaAuto, agregaAuto, eliminaAuto };
