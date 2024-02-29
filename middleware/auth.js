import firebaseAdmin from 'firebase-admin';
import dotenv from 'dotenv';

dotenv.config();

const serviceAccount = require(process.env.FIREBASE_JSON_ADMIN);

firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(serviceAccount)
});


const firebaseTokenVerification = async (req, res, next) => {
    const token = req.header('x-auth-token');

    if (!token) {
        return res.status(401).send("No hay token añadido.");
    }

    try {
        const decodedToken = await firebaseAdmin.auth().verifyIdToken(token);
        req.user = decodedToken;
        next();
    } catch(error) {
        console.error('Error al verificar token:', error);
        return res.status(403).send("Fallo al autenticar el token.");
    }
};

export default firebaseTokenVerification;
