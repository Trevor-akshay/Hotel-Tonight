import Express from 'express';
import {
	getRooms,
	getRoom,
	postRoom,
	updateRoom,
	deleteRoom,
} from '../controllers/room.mjs';

import { verifyToken, verifyIsAdmin } from '../middleware/auth.mjs';

const roomRouter = Express.Router();
roomRouter.post('/:id', verifyToken, verifyIsAdmin, postRoom);
roomRouter.get('/', verifyToken, getRooms);
roomRouter.get('/:id', verifyToken, getRoom);
roomRouter.put('/:id', verifyToken, verifyIsAdmin, updateRoom);
roomRouter.delete('/:id/:hotelId', verifyToken, verifyIsAdmin, deleteRoom);

export default roomRouter;
