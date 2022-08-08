import {
	postRoomService,
	getRoomsService,
	getRoomService,
	updateRoomService,
	deleteRoomService,
} from '../services/room.mjs';

export const postRoom = async (request, response) => {
	try {
		const room = request.body;
		const hotelId = request.params.id;
		response.send(await postRoomService(hotelId, room));
	} catch (error) {
		response.status(400).send(error.message);
	}
};

export const getRooms = async (request, response) => {
	try {
		response.send(await getRoomsService());
	} catch (error) {
		response.status(400).send(error.message);
	}
};

export const getRoom = async (request, response) => {
	try {
		response.send(await getRoomService(request.params.id));
	} catch (error) {
		response.status(400).send(error.message);
	}
};

export const updateRoom = async (request, response) => {
	try {
		response.send(await updateRoomService(request.params.id, request.body));
	} catch (error) {
		response.status(400).send(error.message);
	}
};

export const deleteRoom = async (request, response) => {
	try {
		response.send(
			await deleteRoomService(request.params.roomId, request.params.hotelId)
		);
	} catch (error) {
		response.status(400).send(error.message);
	}
};
