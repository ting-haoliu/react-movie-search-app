// Authentication middleware to verify JWT tokens in Express.js applications
// Favorite API need to know who is making the request
import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
   throw new Error('JWT_SECRET is not defined in environment variables');
}

export const auth = (req: Request, res: Response, next: NextFunction) => {
   try {
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
         const error = new Error('No token provided');
         (error as any).status = 401;
         throw error;
      }

      const token = authHeader.split(' ')[1]!;
      // decode token, format: { userId: number, iat: number, exp: number }
      const decoded = jwt.verify(token, JWT_SECRET) as unknown as {
         userId: number;
      };

      (req as any).user = { userId: decoded.userId };

      next(); // Proceed to the next middleware or controller
   } catch (error: any) {
      if (error.name === 'JsonWebTokenError') {
         error.message = 'Invalid token';
         error.status = 401;
      }

      if (error.name === 'TokenExpiredError') {
         error.message = 'Token expired';
         error.status = 401;
      }

      if (!error.status) {
         error.status = 401;
      }

      next(error);
   }
};
