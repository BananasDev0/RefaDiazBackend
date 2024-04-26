import express from 'express';
import { getAll, getProvider, deleteProvider, createProvider, updateProvider } from '../controllers/providerController.js';

// Crea una instancia del router de Express
const providerRouter = express.Router();

// Define la ruta para obtener todos los provideros y asocia el controlador
// providerRouter.get('/providers', getAllProviders);

providerRouter.get('/providers', getAll);
providerRouter.get('/provider/:id', getProvider);

providerRouter.post('/provider', createProvider);

providerRouter.put('/provider/:id', updateProvider);

providerRouter.delete('/provider/:id', deleteProvider);

// Exporta el router
export default providerRouter;
