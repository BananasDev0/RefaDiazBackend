import express from 'express';
import {getAll,createProductVehicleModelList,getProductVehicleModel,createProductVehicleModel,deleteProductVehicleModel,updateProductVehicleModel} from '../controllers/productVehicleModelController.js';


const productVehicleModelRouter = express.Router();

productVehicleModelRouter.get('/products/models',getAll);
productVehicleModelRouter.get('/product/:productId/model/:vehicleModelId',getProductVehicleModel); 


productVehicleModelRouter.post('/products/models',createProductVehicleModel);
productVehicleModelRouter.post('/products/:productId/models',createProductVehicleModelList);

productVehicleModelRouter.put('/product/:productId/model/:vehicleModelId',updateProductVehicleModel); 

productVehicleModelRouter.delete('/product/:productId/model/:vehicleModelId',deleteProductVehicleModel);

export default productVehicleModelRouter;