import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import buildRouter from './routes/index.js';
import sequelize from './config/dbConnection.js';
import firebaseTokenVerification from './middleware/auth.js';

const app = express();

app.use(express.json()); // Para parsear application/json
app.use(express.urlencoded({ extended: true })); // Para parsear application/x-www-form-urlencoded
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(firebaseTokenVerification());

// Utiliza las rutas en tu aplicación Express
buildRouter(app)

app.listen(3000, () => {
  console.log('El servidor está corriendo en el puerto 3000');
});

//prueba conexion a la bdd
try {
  sequelize.authenticate();
  console.log('Conexion a la base de datos, exitosa');
} catch (error) {
  console.error('No se puedo conectar a la base de datos: ', error);
}

