import roomSchema from '../models/room.mjs';
import hotelSchema from '../models/hotel.mjs';

export const postRoomService = async (hotelId, body) => {
	try {
		const room = new roomSchema(body);
		const roomData = await room.save();
		try {
			await hotelSchema.findByIdAndUpdate(
				{ _id: hotelId },
				{ $push: { rooms: roomData._id } }
			);
			return roomData;
		} catch (err) {
			throw err;
		}
	} catch (error) {
		throw error;
	}
};

export const getRoomsService = async () => {
	try {
		return await roomSchema.find({});
	} catch (error) {
		throw error;
	}
};

export const getRoomService = async (id) => {
	try {
		return await roomSchema.find({ _id: id });
	} catch (error) {
		throw error;
	}
};

export const updateRoomService = async (id, body) => {
	try {
		return await roomSchema.findByIdAndUpdate(
			{ _id: id },
			{
				$set: body,
			},
			{ new: true }
		);
	} catch (error) {
		throw error;
	}
};

export const deleteRoomService = async (roomId, hotelId) => {
	try {
		try {
			const room = await roomSchema.findByIdAndDelete({ _id: roomId });
			await hotelSchema.findByIdAndUpdate(
				{ _id: hotelId },
				{ $pull: { rooms: room._id } }
			);
			return room;
		} catch (err) {
			throw err;
		}
	} catch (error) {
		throw error;
	}
};
