import express from 'express';
import { getAllProducts } from '../controllers/productController.js';

// Crea una instancia del router de Express
const productRouter = express.Router();

// Define la ruta para obtener todos los productos y asocia el controlador
productRouter.get('/products', getAllProducts);

// Exporta el router
export default productRouter;
