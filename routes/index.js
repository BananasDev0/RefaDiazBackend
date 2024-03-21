import clientRouter from "./clientRoutes.js";
import productRouter from "./productRoutes.js";
import brandRouter from './brandRoutes.js';
<<<<<<< HEAD
import vehicleModelRouter from "./vehicleModelRoutes.js";
=======
import radiatorRouter from "./radiatorRoutes.js";
import userRouter from "./userRoutes.js";
>>>>>>> 255d1efe56d4be6f482371212480255f0679bb39

function buildRouter(app) {
    app.use('/api', productRouter);
    app.use('/api', clientRouter);
    app.use('/api', brandRouter);
<<<<<<< HEAD
    app.use('/api', vehicleModelRouter);
=======
    app.use('/api', radiatorRouter);
    app.use('/api', userRouter);
>>>>>>> 255d1efe56d4be6f482371212480255f0679bb39
}

export default buildRouter