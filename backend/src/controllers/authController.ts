import type { Request, Response, NextFunction } from 'express';
import { registerService, loginService } from '../services/authService.js';

export const register = async (
   req: Request,
   res: Response,
   next: NextFunction
) => {
   try {
      const { email, password, name } = req.body;
      const result = await registerService(email, password, name);

      res.status(201).json({ success: true, data: result }); // 201 Created
   } catch (error: any) {
      next(error);
   }
};

export const login = async (
   req: Request,
   res: Response,
   next: NextFunction
) => {
   try {
      const { email, password } = req.body;
      const result = await loginService(email, password);

      res.status(200).json({ success: true, data: result }); // 200 OK
   } catch (error: any) {
      next(error);
   }
};
