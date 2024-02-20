import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import productRouter from './routes/productRoutes.js';

const app = express();

app.use(express.json()); // Para parsear application/json
app.use(express.urlencoded({ extended: true })); // Para parsear application/x-www-form-urlencoded
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

// Utiliza las rutas en tu aplicación Express
app.use('/api', productRouter);

app.listen(3000, () => {
  console.log('El servidor está corriendo en el puerto 3000');
});

app.get('/', (req, res) => {
  res.send('Hola Mundo con Express!');
});
