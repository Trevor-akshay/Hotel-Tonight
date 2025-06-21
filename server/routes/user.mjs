import Express from 'express';
import {
	postUser,
	loginUser,
	changePassword,
	getAllUsers,
	getUserByID,
	updateUser,
	deleteUser,
} from '../controllers/user.mjs';

import { verifyToken, verifyIsAdmin } from '../middleware/auth.mjs';
const userRouter = Express.Router();

userRouter.post('/signup', postUser);
userRouter.post('/login', loginUser);
userRouter.post('/changepassword', changePassword);
userRouter.get('/', verifyToken, verifyIsAdmin, getAllUsers);
userRouter.get('/:id', verifyToken, getUserByID);
userRouter.put('/:id', verifyToken, updateUser);
userRouter.delete('/:id', verifyToken, deleteUser);

export default userRouter;
