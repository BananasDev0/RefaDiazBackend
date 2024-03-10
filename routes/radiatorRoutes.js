import express from 'express';
import { getAll, getRadiator, deleteRadiator, createRadiator, updateRadiator } from '../controllers/radiatorController.js';

// Crea una instancia del router de Express
const radiatorRouter = express.Router();

// Define la ruta para obtener todos los radiators y asocia el controlador
// radiatorRouter.get('/radiator', getAllRadiator);

radiatorRouter.get('/radiators', getAll);
radiatorRouter.get('/radiator/:id', getRadiator);

radiatorRouter.post('/radiator', createRadiator);

radiatorRouter.put('/radiator/:id', updateRadiator);

radiatorRouter.delete('/radiator/:id', deleteRadiator);

// Exporta el router
export default radiatorRouter;