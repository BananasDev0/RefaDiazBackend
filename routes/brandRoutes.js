import express from 'express';
import { createNewBrand, getAll, getBrand, deleteBrand } from '../controllers/brandController.js';

const brandRouter = express.Router();

brandRouter.get('/brands', getAll);
brandRouter.get('/brand', getBrand);

brandRouter.post('/brand', createNewBrand);

router.put('/brands/:id', updateBrand);

brandRouter.delete('/brand/:id', deleteBrand);

// Exporta el router
export default brandRouter;
