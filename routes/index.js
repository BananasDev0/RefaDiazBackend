import clientRouter from "./clientRoutes.js";
import productRouter from "./productRoutes.js";
import brandRouter from './brandRoutes.js';
import carModelRouter from "./carModelRoutes.js";
import userRouter from "./userRoutes.js";
import providerRouter from "./providerRoutes.js";
import productPriceRouter from "./productPriceRoutes.js";
import productCarModelRouter from "./productCarModelRoutes.js";

const API_PREFIX = '/api';

function buildRouter(app) {
    app.use(API_PREFIX, userRouter);
    app.use(API_PREFIX, productRouter);
    app.use(API_PREFIX, clientRouter);
    app.use(API_PREFIX, brandRouter);
    app.use(API_PREFIX, carModelRouter);
    app.use(API_PREFIX, providerRouter);
    app.use(API_PREFIX, productPriceRouter);
    app.use(API_PREFIX, productCarModelRouter);
}

export default buildRouter