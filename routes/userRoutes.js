import express from 'express';
import { createNewUser, getAll, getUser, deleteUser, updateUser } from '../controllers/userController.js';

const userRouter = express.Router();

userRouter.get('/users', getAll);
userRouter.get('/user/:id', getUser);

userRouter.post('/user', createNewUser);

userRouter.put('/user/:id', updateUser);

userRouter.delete('/user/:id', deleteUser);

// Export the router
export default userRouter;
