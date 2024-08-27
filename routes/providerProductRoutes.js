import express from 'express';
import { getAll, createProviderProduct, getProductById, updateProviderProduct, deleteProviderProduct } from '../controllers/providerProductController.js';

// Crea una instancia del router de Express
const providerProductRouter = express.Router();



providerProductRouter.get('/providerProducts', getAll);
providerProductRouter.get('/product/:id/providers', getProductById);

providerProductRouter.post('/providerProduct', createProviderProduct);

providerProductRouter.put('/providerProduct/:id', updateProviderProduct);

providerProductRouter.delete('/providerProduct/:id', deleteProviderProduct);


// Exporta el router
export default providerProductRouter;
