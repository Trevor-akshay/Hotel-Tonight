import {
	postHotelService,
	getHotelsService,
	getCities,
	getCity,
	getTypesService,
	getFeaturedService,
	getHotelService,
	updateHotelService,
	deleteHotelService,
} from '../services/hotel.mjs';

export const postHotel = async (request, response) => {
	try {
		const hotel = request.body;
		response.send(await postHotelService(hotel));
	} catch (error) {
		response.status(400).send(error.message);
	}
};

export const getHotels = async (request, response) => {
	try {
		if (request.query.cities)
			response
				.status(200)
				.send(await getCities(request.query.cities.split(',')));
		else if (request.query.city)
			response.status(200).send(await getCity(request.query.city));
		else response.status(200).send(await getHotelsService());
	} catch (error) {
		response.status(400).send(error.message);
	}
};

export const getTypes = async (request, response) => {
	try {
		response.status(200).send(await getTypesService());
	} catch (error) {
		response.status(400).send(error.message);
	}
};

export const getFeatured = async (request, response) => {
	try {
		response.status(200).send(await getFeaturedService());
	} catch (error) {
		response.status(400).send(error.message);
	}
};

export const getHotel = async (request, response) => {
	try {
		response.send(await getHotelService(request.params.id));
	} catch (error) {
		response.status(400).send(error.message);
	}
};

export const updateHotel = async (request, response) => {
	try {
		response.send(await updateHotelService(request.params.id, request.body));
	} catch (error) {
		response.status(400).send(error.message);
	}
};

export const deleteHotel = async (request, response) => {
	try {
		response.send(await deleteHotelService(request.params.id));
	} catch (error) {
		response.status(400).send(error.message);
	}
};
