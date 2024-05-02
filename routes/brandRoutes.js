import express from 'express';
import { createNewBrand, getAll, getBrand, deleteBrand, updateBrand, getBrandCarModels } from '../controllers/brandController.js';

const brandRouter = express.Router();

brandRouter.get('/brands', getAll);
brandRouter.get('/brand/:id', getBrand);

brandRouter.post('/brand', createNewBrand);

brandRouter.put('/brand/:id', updateBrand);

brandRouter.delete('/brand/:id', deleteBrand);

brandRouter.get('/brand/:id/models', getBrandCarModels);

export default brandRouter;
