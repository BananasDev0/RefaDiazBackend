import express from 'express';
import { createNewBrand, getAll, getBrand, deleteBrand, updateBrand } from '../controllers/brandController.js';
import firebaseTokenVerification from '../middleware/auth.js';

const brandRouter = express.Router();

brandRouter.get('/brands', firebaseTokenVerification, getAll);
brandRouter.get('/brand/:id', firebaseTokenVerification, getBrand);

brandRouter.post('/brand', firebaseTokenVerification, createNewBrand);

brandRouter.put('/brand/:id', firebaseTokenVerification, updateBrand);

brandRouter.delete('/brand/:id', firebaseTokenVerification, deleteBrand);

export default brandRouter;
