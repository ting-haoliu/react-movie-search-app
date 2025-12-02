import type { User } from '@prisma/client';
import prisma from '../utils/prisma.js';

export const createUser = async (
   email: string,
   password: string,
   name: string
): Promise<User> => {
   return prisma.user.create({
      data: { email, password, name },
   });
};

export const findUserByEmail = async (email: string): Promise<User | null> => {
   return prisma.user.findUnique({
      where: { email },
   });
};
