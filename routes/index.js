import clientRouter from "./clientRoutes.js";
import productRouter from "./productRoutes.js";

function buildRouter(app) {
    app.use('/api', productRouter);
    app.use('/api', clientRouter);
}

export default buildRouter