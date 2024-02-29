import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config({
    path: `.env.${process.env.NODE_ENV}`
  });

const firebaseTokenVerification = (req, res, next) => {
    const token = req.header('x-auth-token');

    if (!token) {
        return res.status(401).send("No hay token añadido.");
    }

    try {
        const decoded = jwt.verify(token, process.env.FIREBASE_PRIVATE_KEY);
        req.user = decoded;
        next();
    } catch(error) {
        return res.status(403).send("Fallo al autenticar el token.");
    }
};

export default firebaseTokenVerification;
