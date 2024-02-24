import express from 'express';
import { getAll, getProduct, deleteProduct, createProduct, updateProduct } from '../controllers/productController.js';

// Crea una instancia del router de Express
const productRouter = express.Router();

// Define la ruta para obtener todos los productos y asocia el controlador
// productRouter.get('/products', getAllProducts);

productRouter.get('/products', getAll);
productRouter.get('/product/:id', getProduct);

productRouter.post('/product', createProduct);

productRouter.put('/product/:id', updateProduct);

productRouter.delete('/product/:id', deleteProduct);

// Exporta el router
export default productRouter;
