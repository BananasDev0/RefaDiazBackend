import express from 'express';
import { createVehicleModel, getAll, getVehicleModel,updateVehicle, deleteVehicle, getVehicleModelsRadiators } from '../controllers/vehicleModelController.js';
const vehicleModelRouter = express.Router();

vehicleModelRouter.get('/models', getAll);
vehicleModelRouter.get('/model/:id', getVehicleModel);
vehicleModelRouter.get('/model/:id/radiators', getVehicleModelsRadiators);

vehicleModelRouter.post('/model', createVehicleModel);

vehicleModelRouter.put('/model/:id', updateVehicle);

vehicleModelRouter.delete('/model/:id', deleteVehicle);

export default vehicleModelRouter;
