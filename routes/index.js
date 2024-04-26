import clientRouter from "./clientRoutes.js";
import productRouter from "./productRoutes.js";
import brandRouter from './brandRoutes.js';
import vehicleModelRouter from "./vehicleModelRoutes.js";
import radiatorRouter from "./radiatorRoutes.js";
import userRouter from "./userRoutes.js";
import providerRouter from "./providerRoutes.js";
import productPriceRouter from "./productPriceRoutes.js";
import providerProductRoutes from './providerProductRoutes.js'

function buildRouter(app) {
    app.use('/api', userRouter);
    app.use('/api', radiatorRouter);
    app.use('/api', productRouter);
    app.use('/api', clientRouter);
    app.use('/api', brandRouter);
    app.use('/api', vehicleModelRouter);
    app.use('/api',providerRouter);
    app.use('/api',productPriceRouter);
    app.use('/api', providerProductRoutes);
}

export default buildRouter