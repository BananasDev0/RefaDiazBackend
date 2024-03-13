import clientRouter from "./clientRoutes.js";
import productRouter from "./productRoutes.js";
import brandRouter from './brandRoutes.js';
import vehicleModelRouter from "./vehicleModelRoutes.js";

function buildRouter(app) {
    app.use('/api', productRouter);
    app.use('/api', clientRouter);
    app.use('/api', brandRouter);
    app.use('/api', vehicleModelRouter);
}

export default buildRouter