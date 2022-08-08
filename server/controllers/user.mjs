import bcrypt from 'bcrypt';
import {
	postUserService,
	loginUserService,
	getUsersService,
	getUserByIdService,
	updateUserService,
	deleteUserService,
} from '../services/user.mjs';

export const postUser = async (request, response) => {
	try {
		const salt = bcrypt.genSaltSync(10);
		const hash = bcrypt.hashSync(request.body.password, salt);
		const user = {
			name: request.body.name,
			emailId: request.body.emailId,
			password: hash,
		};
		const res = await postUserService(user);
		response.status(201).send(res);
	} catch (error) {
		response.status(400).send(error.message);
	}
};

export const loginUser = async (request, response) => {
	try {
		const user = {
			emailId: request.body.emailId,
			password: request.body.password,
		};
		const token = await loginUserService(user);
		response
			.cookie('token', token, { httpOnly: true })
			.status(200)
			.send('Successfully Logged in');
	} catch (error) {
		response.status(400).send(error.message);
	}
};
export const getAllUsers = async (request, response) => {
	try {
		response.status(200).send(await getUsersService());
	} catch (error) {
		response.status(400).send(error.message);
	}
};

export const getUserByID = async (request, response) => {
	try {
		response.status(200).send(await getUserByIdService(request.params.id));
	} catch (error) {
		response.status(400).send(error.message);
	}
};

export const updateUser = async (request, response) => {
	try {
		const body = request.body;
		response.status(200).send(await updateUserService(request.params.id, body));
	} catch (error) {
		response.status(400).send(error.message);
	}
};

export const deleteUser = async (request, response) => {
	try {
		response.status(200).send(await deleteUserService(request.params.id));
	} catch (error) {
		response.status(400).send(error.message);
	}
};
