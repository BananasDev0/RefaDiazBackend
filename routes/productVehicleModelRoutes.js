import express from 'express';
import {getAll,createProductVehicleModelList,getProductVehicleModel,createProductVehicleModel,deleteProductVehicleModel,updateProductVehicleModel, getProductVehicleModels} from '../controllers/productVehicleModelController.js';


const productVehicleModelRouter = express.Router();

productVehicleModelRouter.get('/products/models',getAll);
productVehicleModelRouter.get('/product/:productId/model/:vehicleModelId',getProductVehicleModel); 
productVehicleModelRouter.get('/product/:productId/models',getProductVehicleModels);


productVehicleModelRouter.post('/products/models',createProductVehicleModel);
productVehicleModelRouter.post('/product/:productId/models',createProductVehicleModelList);

productVehicleModelRouter.put('/product/:productId/model/:vehicleModelId',updateProductVehicleModel); 

productVehicleModelRouter.delete('/product/:productId/model/:vehicleModelId',deleteProductVehicleModel);

export default productVehicleModelRouter;