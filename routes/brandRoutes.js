import express from 'express';
import { createNewBrand, getAll } from '../controllers/brandController.js';

const brandRouter = express.Router();

brandRouter.get('/brands', getAll);

brandRouter.post('/brand', createNewBrand);

// Exporta el router
export default brandRouter;
