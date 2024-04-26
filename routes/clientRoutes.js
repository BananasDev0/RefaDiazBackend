import express from 'express';

const clientRouter = express.Router();


// Define la ruta para obtener todos los productos y asocia el controlador
clientRouter.get('/clients', (req, res) => {
    res.send({})
});

// Exporta el router
export default clientRouter;
