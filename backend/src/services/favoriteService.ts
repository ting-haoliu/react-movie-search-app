import {
   findFavorite,
   addFavorite,
   removeFavorite,
   getUserFavorites,
   countUserFavorites,
} from '../models/favoriteModel.js';
import type { Favorite } from '@prisma/client';

export const toggleFavoriteService = async (
   userId: number,
   movieId: number
): Promise<{ isFavorite: boolean }> => {
   const existingFavorite = await findFavorite(userId, movieId);

   if (existingFavorite) {
      await removeFavorite(userId, movieId);
      return { isFavorite: false };
   }

   await addFavorite(userId, movieId);
   return { isFavorite: true };
};

export const listFavoriteService = async (
   userId: number
): Promise<Favorite[]> => {
   return await getUserFavorites(userId);
};

export const countFavoriteService = async (userId: number): Promise<number> => {
   return await countUserFavorites(userId);
};
