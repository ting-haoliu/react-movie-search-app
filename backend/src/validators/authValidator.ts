import { body } from 'express-validator';

export const registerValidator = [
   body('email')
      .trim()
      .isEmail()
      .withMessage('Invalid email format')
      .normalizeEmail(),

   body('password')
      .isLength({ min: 6 })
      .withMessage('Password must be at least 6 characters')
      .matches(/^(?=.*[A-Za-z])(?=.*\d)/)
      .withMessage('Password must contain letters and numbers'),

   body('name')
      .optional()
      .trim()
      .isLength({ min: 1, max: 50 })
      .withMessage('Name must be 1-50 characters'),
];

export const loginValidator = [
   body('email').trim().isEmail().withMessage('Invalid email format'),

   body('password').notEmpty().withMessage('Password is required'),
];
