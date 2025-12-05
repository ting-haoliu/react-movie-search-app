import { Router } from 'express';
import { register, login } from '../controllers/authController.js';
import {
   registerValidator,
   loginValidator,
} from '../validators/authValidator.js';
import { validate } from '../middlewares/validate.js';

const router = Router();

router.post('/register', registerValidator, validate, register);
router.post('/login', loginValidator, validate, login);

export default router;
