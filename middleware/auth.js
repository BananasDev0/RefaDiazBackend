import { firebaseInstance } from "../config/fireBaseConfig.js";

const firebaseTokenVerification = async (req, res, next) => {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).send("No hay token añadido.");
    }

    try {
        const decodedToken = await firebaseInstance.auth().verifyIdToken(token);
        req.user = decodedToken;
        next();
    } catch(error) {
        console.error('Error al verificar token:', error);
        return res.status(401).send("Fallo al autenticar el token.");
    }
};

export default firebaseTokenVerification;
