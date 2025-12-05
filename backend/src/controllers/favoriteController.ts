import type { Request, Response, NextFunction } from 'express';
import {
   toggleFavoriteService,
   listFavoriteService,
   countFavoriteService,
} from '../services/favoriteService.js';

export const toggleFavorite = async (
   req: Request,
   res: Response,
   next: NextFunction
) => {
   try {
      const userId = (req as any).user.userId;

      const { movieId } = req.body;

      if (!movieId || isNaN(Number(movieId))) {
         return res.status(400).json({
            success: false,
            message: 'Invalid movieId',
         });
      }

      const result = await toggleFavoriteService(userId, Number(movieId));

      res.status(200).json({ success: true, data: result });
   } catch (error: any) {
      next(error);
   }
};

export const listFavorite = async (
   req: Request,
   res: Response,
   next: NextFunction
) => {
   try {
      const userId = (req as any).user.userId;

      const favorites = await listFavoriteService(userId);

      res.status(200).json({ success: true, data: favorites });
   } catch (error: any) {
      next(error);
   }
};

export const countFavorite = async (
   req: Request,
   res: Response,
   next: NextFunction
) => {
   try {
      const userId = (req as any).user.userId;

      const count = await countFavoriteService(userId);

      res.status(200).json({ success: true, data: { count } });
   } catch (error: any) {
      next(error);
   }
};
