import express from 'express';
import { createNewPerson, getAll, getPerson, deletePerson, updatePerson } from '../controllers/personController.js';

const personRouter = express.Router();

personRouter.get('/persons', getAll);
personRouter.get('/person/:id', getPerson);

personRouter.post('/person', createNewPerson);

personRouter.put('/person/:id', updatePerson);

personRouter.delete('/person/:id', deletePerson);

// Export the router
export default personRouter;
