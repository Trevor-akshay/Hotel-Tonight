import mongoose from 'mongoose';

const schema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		emailId: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
		},
		isAdmin: {
			type: Boolean,
			default: false,
		},
	},
	{ timestamps: true }
);

const userSchema = mongoose.model('users', schema);
export default userSchema;
