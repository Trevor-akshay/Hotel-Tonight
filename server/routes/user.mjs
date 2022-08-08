import Express from 'express';
import {
	postUser,
	loginUser,
	getAllUsers,
	getUserByID,
	updateUser,
	deleteUser,
} from '../controllers/user.mjs';

import { verifyToken, verifyIsAdmin } from '../middleware/auth.mjs';
const userRouter = Express.Router();

userRouter.post('/signup', postUser);
userRouter.post('/login', loginUser);
userRouter.get('/', verifyToken, verifyIsAdmin, getAllUsers);
userRouter.get('/:id', verifyToken, getUserByID);
userRouter.put('/:id', verifyToken, updateUser);
userRouter.delete('/:id', verifyToken, deleteUser);

export default userRouter;
