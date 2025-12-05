import { Router } from 'express';
import {
   toggleFavorite,
   listFavorite,
   countFavorite,
} from '../controllers/favoriteController.js';
import { auth } from '../middlewares/authMiddleware.js';

const router = Router();

// confirm to RESTful API design principles
router.post('/', auth, toggleFavorite);
router.get('/', auth, listFavorite);
router.get('/count', auth, countFavorite);

export default router;
