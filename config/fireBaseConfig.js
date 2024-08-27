import firebaseAdmin from 'firebase-admin';
import dotenv from 'dotenv';

dotenv.config({
    path: `.env.${process.env.NODE_ENV}`
});

console.log(process.env.FIREBASE_JSON_ADMIN)

const serviceAccount = process.env.FIREBASE_JSON_ADMIN;

firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(serviceAccount),
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET
});

export { firebaseAdmin as firebaseInstance };