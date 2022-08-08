import mongoose from 'mongoose';

const schema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
		},
		prices: {
			type: Number,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		maxPeople: {
			type: Number,
			required: true,
		},
		roomNumbers: [
			{
				number: Number,
				unavailableDates: { type: [Date] },
			},
		],
	},
	{ timestamps: true }
);

const roomSchema = mongoose.model('rooms', schema);
export default roomSchema;
