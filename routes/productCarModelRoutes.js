import express from 'express';
import {
    getAll,
    createProductCarModelList,
    getProductCarModel,
    createProductCarModel,
    deleteProductCarModel,
    updateProductCarModel,
    getProductCarModels
} from '../controllers/productCarModelController.js'; // Cambiado a productCarModelController

const productCarModelRouter = express.Router(); // Cambiado el nombre del router para coherencia

// Actualiza las rutas para reflejar el cambio de "vehicle" a "car"
productCarModelRouter.get('/products/models', getAll);
productCarModelRouter.get('/product/:productId/model/:carModelId', getProductCarModel); // Cambiado vehicleModelId a carModelId
productCarModelRouter.get('/product/:productId/models', getProductCarModels);

productCarModelRouter.post('/products/models', createProductCarModel); // Cambiado a createProductCarModel
productCarModelRouter.post('/product/:productId/models', createProductCarModelList); // Cambiado a createProductCarModelList

productCarModelRouter.put('/product/:productId/model/:carModelId', updateProductCarModel); // Cambiado vehicleModelId a carModelId

productCarModelRouter.delete('/product/:productId/model/:carModelId', deleteProductCarModel); // Cambiado vehicleModelId a carModelId

export default productCarModelRouter; // Asegúrate de que el nombre exportado sea el nuevo y correcto
