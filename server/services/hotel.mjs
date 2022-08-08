import hotelSchema from '../models/hotel.mjs';

export const postHotelService = async (body) => {
	try {
		const hotel = new hotelSchema(body);
		return await hotel.save();
	} catch (error) {
		throw error;
	}
};

export const getHotelsService = async () => {
	try {
		return await hotelSchema.find(
			{},
			{ name: 1, type: 1, city: 1, description: 1 }
		);
	} catch (error) {
		throw error;
	}
};

export const getCities = async (cityArray) => {
	try {
		const list = await Promise.all(
			cityArray.map((city) => {
				return hotelSchema.countDocuments({ city });
			})
		);
		return list;
	} catch (err) {
		throw err;
	}
};

export const getCity = async (city) => {
	try {
		return await hotelSchema.find({ city });
	} catch (err) {
		throw err;
	}
};

export const getTypesService = async () => {
	try {
		const hotelsCount = await hotelSchema.countDocuments({ type: 'Hotel' });
		const apartmentsCount = await hotelSchema.countDocuments({
			type: 'Apartment',
		});
		const resortsCount = await hotelSchema.countDocuments({ type: 'Resort' });
		const villasCount = await hotelSchema.countDocuments({ type: 'Villa' });
		const cabinsCount = await hotelSchema.countDocuments({ type: 'Cabin' });
		return {
			Hotels: hotelsCount,
			Apartments: apartmentsCount,
			Villas: villasCount,
			Cabins: cabinsCount,
			Resorts: resortsCount,
		};
	} catch (err) {
		throw err;
	}
};

export const getFeaturedService = async (id) => {
	try {
		return await hotelSchema.find(
			{ featured: true },
			{ name: 1, type: 1, city: 1, description: 1, photos: 1, _id: 0 }
		);
	} catch (error) {
		throw error;
	}
};

export const getHotelService = async (id) => {
	try {
		return await hotelSchema.find({ _id: id });
	} catch (error) {
		throw error;
	}
};

export const updateHotelService = async (id, body) => {
	try {
		return await hotelSchema.findByIdAndUpdate(
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

export const deleteHotelService = async (id) => {
	try {
		return await hotelSchema.findByIdAndDelete({ _id: id });
	} catch (error) {
		throw error;
	}
};
