import express from 'express';
// Asegúrate de que los nombres de las funciones importadas coincidan con los actualizados en el controlador
import {
    createCarModel,
    getAll,
    getCarModel,
    updateCarModel,
    deleteCarModel,
    getCarModelProducts,
    getAllCarModelsProducts
} from '../controllers/carModelController.js';  // Cambia el nombre del archivo importado si has renombrado el controlador

const carModelRouter = express.Router();

// Actualiza los endpoints para que reflejen el contexto de 'CarModel'
carModelRouter.get('/models', getAll);
carModelRouter.get('/model/:id', getCarModel);
carModelRouter.get('/model/:id/products', getCarModelProducts);
carModelRouter.get('/models/products', getAllCarModelsProducts);

carModelRouter.post('/model', createCarModel);

carModelRouter.put('/model/:id', updateCarModel);

carModelRouter.delete('/model/:id', deleteCarModel);

export default carModelRouter;
