import prisma from '../utils/prisma.js';
import type { Favorite } from '@prisma/client';

export const getUserFavorites = async (userId: number): Promise<Favorite[]> => {
   return prisma.favorite.findMany({
      where: {
         userId,
      },
      orderBy: {
         createdAt: 'desc',
      },
   });
};

export const findFavorite = async (
   userId: number,
   movieId: number
): Promise<Favorite | null> => {
   return prisma.favorite.findUnique({
      where: {
         userId_movieId: {
            userId,
            movieId,
         },
      },
   });
};

export const addFavorite = async (
   userId: number,
   movieId: number
): Promise<Favorite> => {
   return prisma.favorite.create({
      data: {
         userId,
         movieId,
      },
   });
};

export const removeFavorite = async (
   userId: number,
   movieId: number
): Promise<Favorite> => {
   return prisma.favorite.delete({
      where: {
         userId_movieId: {
            userId,
            movieId,
         },
      },
   });
};

export const countUserFavorites = async (userId: number): Promise<number> => {
   return prisma.favorite.count({
      where: {
         userId,
      },
   });
};
