import express from 'express';
import { getAll, createProviderProduct } from '../controllers/providerProductController.js';

// Crea una instancia del router de Express
const providerProductRouter = express.Router();

// Define la ruta para obtener todos los productos y asocia el controlador
// productRouter.get('/products', getAllProducts);

providerProductRouter.get('/providerProducts', getAll);
// providerProduct.get('/product/:id', getProduct);

providerProductRouter.post('/providerProduct', createProviderProduct);

// providerProduct.put('/product/:id', updateProduct);

// providerProduct.delete('/product/:id', deleteProduct);

// Exporta el router
export default providerProductRouter;
