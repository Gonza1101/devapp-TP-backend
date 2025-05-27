import { aAutoDto, aAutoReq } from '../DTO/AutoDto';
import { Auto } from '../Model/Auto';
import { aAuto } from '../DTO/AutoDto';
import { AutoDto } from '../DTO/AutoDto';
import autoRepository from '../../Repository/AutoRepository';
import personasRepository from '../Repository/PersonasRepository';
import personaService from './PersonaService';
import { randomUUID } from 'crypto';

const listado = () => {
    return autoRepository.listadoDeAuto().map((auto) => aAutoReq(auto));
};
const autoConId = (id: string) => {
    const auto = autoRepository.autoConId(id);
    if (auto) {
        return aAutoDto(auto);
    }
    return undefined;
};
const agregaAuto = (autoNuevo: AutoDto) => {
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
    if (autoRepository.idDeAutoConPatente(auto.patente)) {
        throw 'Error - Ya hay un auto con esa patente';
    } else {
        const agregadoAPersona = personaService.agregarAutoAPersona(auto); //Se lo agrega a la Persona
        if (!agregadoAPersona) {
            throw 'Error - No se encuentra registrado el DNI del Dueño';
        }
        autoRepository.agregaAuto(auto); // Agrego a lista Gral.
        const autoAgregado = autoRepository.autoConPatente(auto.patente);
        const autoDto = aAutoDto(autoAgregado!);
        return autoDto;
    }
};

const modificaAuto = (autoEdit: AutoDto) => {
    const dueño = personasRepository.personaConDni(autoEdit.idDueño!);
    if (!dueño) {
        throw 'Error - No Hay Dueño con El auto';
    }
    autoRepository.borraAuto(autoEdit.id!); //Borro de la lista De Autos Gral.
    autoRepository.agregaAuto(aAuto(autoEdit));
    //Edito la lista particular del Dueño
    personaService.eliminarAutodePersona(dueño!.id, autoEdit); //Borro de la lista de la persona particuar.
    // TODO error si no existe el auto en la persona
    personasRepository.agregarAuto(dueño!.id, aAuto(autoEdit));
    return autoEdit;
};

const eliminaAuto = (auto: AutoDto) => {
    return autoRepository.borraAuto(auto.id!).map((auto) => aAutoReq(auto));
};

export default { listado, autoConId, modificaAuto, agregaAuto, eliminaAuto };
