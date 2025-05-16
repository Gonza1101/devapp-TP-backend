/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from 'express';
/*
    Voy a Configurar el Response para poder ir modificandolo
    mediado avance en mis middleware guardando lo que me llega en un originalJson
    y creo la funcion para una vez terminado todo mando al cliente.
*/
export const ResponseInterceptor = (req: Request, res: Response, next: NextFunction): void => {
    (res as any).body = undefined;
    (res as any).originalJson = res.json;
    (res as any).json = (bodyContents?: any) => {
        (res as any).body = bodyContents;
    };
    (res as any).realJson = () => {
        res.json = (res as any).originalJson;
        return res.json((res as any).body);
    };
    next();
};

export const ResponseSender = (req: Request, res: Response): void => {
    (res as any).realJson();
};
