import { aAutoDto, aAutoReq } from '../DTO/autoDto';
import { Auto, aAuto } from '../Model/Auto';
import { AutoDto } from '../DTO/autoDto';
import autoRepository from '../Repository/autoRepository';
import personasRepository from '../Repository/personasRepository';
import personaService from './personaService';
import { randomUUID } from 'crypto';
// import { randomUUID } from 'crypto';
// import autoDB from '../DataBase/autoDB';

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
    const auto: Auto = {
        id: randomUUID(),
        idDueño: autoNuevo.idDueño!,
        marca: autoNuevo.marca!,
        modelo: autoNuevo.modelo!,
        anio: parseInt(autoNuevo.anio!),
        color: autoNuevo.color!,
        numeroChasis: autoNuevo.numeroChasis!,
        motor: autoNuevo.motor!,
        patente: autoNuevo.patente!,
        img: Math.floor(Math.random() * 10).toString()
    };
    // console.log('Service -> AutoNuevo<Auto>');
    // console.log(auto);
    //Verifico que exista el auto
    if (!autoRepository.idDeAutoConPatente(auto.patente)) {
        const agregadoAPersona = personaService.agregarAutoAPersona(auto); //Se lo agrega a la Persona
        // console.log('Service -> Persona a la cual se agrega Persona');
        // console.log(agregadoAPersona);
        // Verifico que se Agrego.
        if (agregadoAPersona) {
            autoRepository.agregaAuto(auto); // Agrego a lista Gral.
            // console.log('Service -> busco el auto nuevo por su Patente');
            // console.log(autoRepository.autoConPatente(auto.patente));
            const autoAgregado = autoRepository.autoConPatente(auto.patente);
            const autoDto = aAutoDto(autoAgregado!);
            return autoDto;
        }
    }
};

const modificaAuto = (id: string, autoEdit: AutoDto) => {
    // console.log('AutoServicio -> autoEdit');
    // console.log(autoEdit);
    const auto = autoRepository.autoConId(id);
    // console.log('AutoService -> autoEdit.idDuenio');
    // console.log(autoEdit.idDueño!);
    const dueño = personasRepository.personaConDni(autoEdit.idDueño!);
    // console.log('AutoService-> autoAModificar');
    // console.log(autoAModificar);
    // console.log('AutoService-> dueño');
    // console.log(dueño);
    if (auto && dueño) {
        const autoModificado = { ...aAutoDto(auto), ...autoEdit };
        // console.log('modificarAuto -> autoAModificar');
        // console.log(autoAModificar);
        //edito la lista general de Autos
        autoRepository.borraAuto(auto.id!); //Borro de la lista De Autos Gral.
        autoRepository.agregaAuto(aAuto(autoModificado));
        //Edito la lista particular del Dueño
        personaService.eliminarAutodePersona(dueño.id!, autoModificado); //Borro de la lista de la persona particuar.
        // TODO error si no existe el auto en la persona
        personasRepository.agregarAuto(dueño.id, aAuto(autoModificado));
        return autoModificado;
    } else {
        return undefined;
    }
};

const eliminaAuto = (id: string) => {
    if (autoRepository.autoConId(id)) {
        return autoRepository.borraAuto(id).map((auto) => aAutoReq(auto));
    }
    return undefined;
};

export default { listado, autoConId, modificaAuto, agregaAuto, eliminaAuto };
