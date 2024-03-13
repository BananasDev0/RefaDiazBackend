import express from 'express';
import { getAll, getModel, createModel, updateModel, deleteModel } from '../controllers/vehicleModelController.js';

const vehicleModelRouter = express.Router();

vehicleModelRouter.get('/models', getAll);
vehicleModelRouter.get('/model/:id', getModel);

vehicleModelRouter.post('/model', createModel);

vehicleModelRouter.put('/model/:id', updateModel);

vehicleModelRouter.delete('/model/:id', deleteModel);

export default vehicleModelRouter;
