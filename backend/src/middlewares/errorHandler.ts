import type { Request, Response, NextFunction } from 'express';

export function errorHandler(
   err: Error,
   req: Request,
   res: Response,
   next: NextFunction
) {
   console.error('Error:', err);

   const status = (err as any).status || 500;
   const message = err.message || 'Internal Server Error';

   res.status(status).json({
      success: false,
      message,
      ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
   });
}
