import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

import dotenv from 'dotenv';
dotenv.config({ path: './configs/.env' });

import createConnection from './configs/mongodbConnection.mjs';
import userRouter from './routes/user.mjs';
import hotelRouter from './routes/hotel.mjs';
import roomRouter from './routes/room.mjs';

const app = express();

createConnection()
	.then(() => {
		app.use(cookieParser());
		app.use(cors());
		app.use(bodyParser.json());
		app.use('/users', userRouter);
		app.use('/hotels', hotelRouter);
		app.use('/rooms', roomRouter);

		app.listen(process.env.PORT, () => {
			console.log(`Server started @${process.env.PORT}`);
		});
	})
	.catch((err) => {
		console.log(err.message);
	});
