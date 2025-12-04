// Authentication middleware to verify JWT tokens in Express.js applications
// Favorite API need to know who is making the request
import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
   throw new Error('JWT_SECRET is not defined in environment variables');
}

export const auth = (req: Request, res: Response, next: NextFunction) => {
   // Authentication header format: "Bearer <token>"
   const authHeader = req.headers.authorization;

   if (!authHeader) {
      return res
         .status(401)
         .json({ success: false, message: 'No token provided' });
   }

   // Check if the authorization header is in the correct format
   const parts = authHeader.split(' ');
   if (parts.length !== 2 || parts[0] !== 'Bearer') {
      return res.status(401).json({
         success: false,
         message: 'Invalid token format. Use: Bearer <token>',
      });
   }

   // Verify the token
   const token = parts[1];
};
