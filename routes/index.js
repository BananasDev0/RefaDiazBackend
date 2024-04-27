import clientRouter from "./clientRoutes.js";
import productRouter from "./productRoutes.js";
import brandRouter from './brandRoutes.js';
import carModelRouter from "./carModelRoutes.js";
import radiatorRouter from "./radiatorRoutes.js";
import userRouter from "./userRoutes.js";
import providerRouter from "./providerRoutes.js";
import productPriceRouter from "./productPriceRoutes.js";
import productCarModelRouter from "./productCarModelRoutes.js";

function buildRouter(app) {
    app.use('/api', userRouter);
    app.use('/api', radiatorRouter);
    app.use('/api', productRouter);
    app.use('/api', clientRouter);
    app.use('/api', brandRouter);
    app.use('/api', carModelRouter);
    app.use('/api',providerRouter);
    app.use('/api',productPriceRouter);
    app.use('/api',productCarModelRouter);
}

export default buildRouter