import express from 'express';
import { createVehicleModel, getAll, getVehicleModel,updateVehicle, deleteVehicle } from '../controllers/vehicleModelController';
const vehicleModelRouter = express.Router();

vehicleModelRouter.get('/models', getAll);
vehicleModelRouter.get('/model/:id', getVehicleModel);

vehicleModelRouter.post('/model', createVehicleModel);

vehicleModelRouter.put('/model/:id', updateVehicle);

vehicleModelRouter.delete('/model/:id', deleteVehicle);

export default vehicleModelRouter;
