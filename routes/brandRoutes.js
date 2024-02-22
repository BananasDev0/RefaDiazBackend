import express from 'express';
import { createNewBrand } from '../controllers/brandController.js';
import Brand  from '../models/brand.js';

const brandRouter = express.Router();

brandRouter.get('/brand', async (req, res) => {
    try {
        const brands = await Brand.findAll(); // Recupera todas las marcas de la base de datos
        res.send(brands); // Envía todas las marcas como respuesta
    } catch (error) {
        console.error('Error al recuperar las marcas:', error);
        res.status(500).send('Error interno del servidor');
    }
});

brandRouter.post('/create-brand', async (req, res) => {
    try {
        const brandData = {
            brandName: req.body.brandName, // Suponiendo que los datos de la marca están en el cuerpo de la solicitud
            active: req.body.active
        };  
        await createNewBrand(brandData); // Llama a la función del controlador y pasa los datos de la marca
        res.status(200).send('Marca creada');
    } catch (error) {
        res.status(500).send(error.message);
    }
  });

// Exporta el router
export default brandRouter;
