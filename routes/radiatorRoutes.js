import express from 'express';
import { getAllRadiator, getRadiator, deleteRadiator, createRadiator, updateRadiator } from '../controllers/radiatorController.js';

// Crea una instancia del router de Express
const radiatorRouter = express.Router();

// Define la ruta para obtener todos los radiators y asocia el controlador
// radiatorRouter.get('/radiator', getAllRadiator);

radiatorRouter.get('/radiators', getAllRadiator);
radiatorRouter.get('/radiator/:dpi', getRadiator);

radiatorRouter.post('/radiator', createRadiator);

radiatorRouter.put('/radiator/:dpi', updateRadiator);

radiatorRouter.delete('/radiator/:id', deleteRadiator);

// Exporta el router
export default radiatorRouter;