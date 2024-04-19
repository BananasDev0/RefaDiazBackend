import express from 'express';
import {getAll,getProductVehicleModel,createProductVehicleModel,deleteProductVehicleModel,updateProductVehicleModel} from '../controllers/productVehicleModelController.js';


const productVehicleModelRouter = express.Router();

productVehicleModelRouter.get('/productvehiclemodels',getAll);
productVehicleModelRouter.get('/product/:productId/vehiclemodel/:vehicleModelId',getProductVehicleModel); 


productVehicleModelRouter.post('/productvehiclemodel',createProductVehicleModel);

productVehicleModelRouter.put('/product/:productId/vehiclemodel/:vehicleModelId',updateProductVehicleModel); /////  odificar para que solo edite el price , y no haga nada en el productprice

productVehicleModelRouter.delete('/product/:productId/vehiclemodel/:vehicleModelId',deleteProductVehicleModel);

export default productVehicleModelRouter;