import type { Request, Response, NextFunction } from 'express';

export function errorHandler(
   err: Error,
   req: Request,
   res: Response,
   next: NextFunction
) {
   console.error(err);

   const status = (err as any).status || 500;
   const message = err.message || 'Internal Server Error';

   res.status(status).json({
      success: false,
      message,
   });
}
