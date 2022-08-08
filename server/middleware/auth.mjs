import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config({ path: '../configs/.env' });

export const verifyToken = (request, response, next) => {
	const token = request.cookies.token;
	if (!token) {
		response.status(401).send("Not Authenticated");
		return;
	}
	jwt.verify(token, process.env.JWT_KEY, (err, user) => {
		if (err) {
			response.status(400).send(err.message);
			return;
		}
		request.user = user;
		next();
	});
};

export const verifyIsAdmin = (request, response, next) => {
	const user = request.user;
	if (user.isAdmin)
		next();
	else
		response.status(401).send('You need to be an administrator to perform that request');
}
