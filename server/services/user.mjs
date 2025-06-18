import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import userSchema from "../models/user.mjs";

import dotenv from "dotenv";
dotenv.config({ path: "./configs/.env" });

export const postUserService = async (body) => {
  try {
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
    const user = await userSchema.findOne({ emailId: body.emailId });
    if (!user) throw new Error(`${body.emailId} not found`);

    const isPasswordCorrect = await bcrypt.compare(
      body.password,
      user.password
    );
    if (!isPasswordCorrect) throw new Error(`Wrong password`);
    const content = {
      id: user._id,
      email: user.emailId,
      isAdmin: user.isAdmin,
    };
    return jwt.sign(content, process.env.JWT_KEY);
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
    const user = await userSchema.findById(id);
    console.log(user._doc);
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
