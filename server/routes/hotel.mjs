import Express from 'express';
import {
	getHotels,
	getHotel,
	getTypes,
	getFeatured,
	postHotel,
	updateHotel,
	deleteHotel,
} from '../controllers/hotel.mjs';

import { verifyToken, verifyIsAdmin } from '../middleware/auth.mjs';

const hotelRouter = Express.Router();

hotelRouter.post('/', verifyToken, verifyIsAdmin, postHotel);
hotelRouter.get('/', getHotels);
hotelRouter.get('/gettypes', getTypes);
hotelRouter.get('/getfeatured',getFeatured);
hotelRouter.get('/:id', getHotel);
hotelRouter.put('/:id', verifyToken, verifyIsAdmin, updateHotel);
hotelRouter.delete('/:id', verifyToken, verifyIsAdmin, deleteHotel);

export default hotelRouter;
