import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { createUser, findUserByEmail } from '../models/userModel.js';

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
   throw new Error('JWT_SECRET is not defined in environment variables');
}

export const registerService = async (
   email: string,
   password: string,
   name: string
) => {
   const existingUser = await findUserByEmail(email);
   if (existingUser) {
      const error = new Error('User already exists');
      (error as any).status = 409;
      throw error;
   }

   const hashedPassword = await bcrypt.hash(password, 10);

   const user = await createUser(email, hashedPassword, name);

   const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
      expiresIn: '1h',
   });

   return {
      token,
      user: { id: user.id, email: user.email, name: user.name },
   };
};

export const loginService = async (email: string, password: string) => {
   const user = await findUserByEmail(email);
   if (!user) {
      const error = new Error('Invalid email or password');
      (error as any).status = 401;
      throw error;
   }

   const isMatch = await bcrypt.compare(password, user.password);
   if (!isMatch) {
      const error = new Error('Invalid email or password');
      (error as any).status = 401;
      throw error;
   }

   const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
      expiresIn: '1h',
   });

   return {
      token,
      user: { id: user.id, email: user.email, name: user.name },
   };
};
