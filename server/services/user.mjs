import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import userSchema from '../models/user.mjs';

import dotenv from 'dotenv';
dotenv.config({ path: './configs/.env' });

export const postUserService = async (body) => {
	try {
		if (await userSchema.findOne({ emailId: body.emailId }))
			throw new Error('User already exists');
		const user = new userSchema(body);
		await user.save();
		const { isAdmin, password, ...otherDetails } = user._doc;
		return { ...otherDetails };
	} catch (error) {
		throw error;
	}
};

export const loginUserService = async (body) => {
	try {
		const userData = await userSchema.findOne({ emailId: body.emailId });
		if (!userData) throw new Error(`${body.emailId} not found`);

		const isPasswordCorrect = await bcrypt.compare(
			body.password,
			userData.password
		);
		if (!isPasswordCorrect) throw new Error(`Wrong password`);
		const content = {
			id: userData._id,
			email: userData.emailId,
			isAdmin: userData.isAdmin,
		};
		const userContent = { Email: userData.emailId, Username: userData.name };
		return { token: jwt.sign(content, process.env.JWT_KEY), user: userContent };
	} catch (error) {
		throw error;
	}
};

export const changePasswordService = async (userDetails) => {
	try {
		const userData = await userSchema.findOne({ emailId: userDetails.email });
		const isPasswordCorrect = await bcrypt.compare(
			userDetails.oldPassword,
			userData.password
		);
		if (!isPasswordCorrect) throw new Error(`Current password is incorrect`);
		const salt = bcrypt.genSaltSync(10);
		const hash = bcrypt.hashSync(userDetails.confirmNewPassword, salt);
		await userSchema.findOneAndUpdate(
			{ emailId: userDetails.email },
			{
				password: hash,
			}
		);
		return 'Successful';
	} catch (error) {
		throw error;
	}
};

export const getUsersService = async () => {
	try {
		return await userSchema.find();
	} catch (error) {
		throw error;
	}
};

export const getUserByIdService = async (id) => {
	try {
		const user = await userSchema.find({ _id: id });
		const { isAdmin, password, ...otherDetails } = user._doc;
		return { ...otherDetails };
	} catch (error) {
		throw error;
	}
};

export const updateUserService = async (id, body) => {
	try {
		const user = await userSchema.findByIdAndUpdate(
			{ _id: id },
			{
				$set: body,
			},
			{ new: true }
		);
		const { isAdmin, password, ...otherDetails } = user._doc;
		return { ...otherDetails };
	} catch (error) {
		throw error;
	}
};

export const deleteUserService = async (id) => {
	try {
		const user = await userSchema.findByIdAndDelete({ _id: id });
		const { isAdmin, password, ...otherDetails } = user._doc;
		return { ...otherDetails };
	} catch (error) {
		throw error;
	}
};
