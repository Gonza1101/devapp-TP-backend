import { NextFunction, Request, Response } from 'express';
export const RequestWithLocals = (req: Request, res: Response, next: NextFunction): void => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (req as any).locals = {};
    next();
};
