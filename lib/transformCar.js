// Transform Supabase snake_case to camelCase for frontend
export function transformCarFromDB(car) {
	if (!car) return null;

	return {
		listingId: car.listing_id,
		stockId: car.stock_id,
		make: car.make,
		model: car.model,
		price: car.price,
		year: car.year,
		transmission: car.transmission,
		mileage: car.mileage,
		eColor: car.e_color,
		iColor: car.i_color,
		body: car.body,
		fuel: car.fuel,
		seats: car.seats,
		doors: car.doors,
		engine: car.engine,
		vin: car.vin,
		safety: car.safety,
		image1: car.image1,
		image2: car.image2,
		image3: car.image3,
		image4: car.image4,
		image5: car.image5,
		image6: car.image6,
		image7: car.image7,
		image8: car.image8,
		image9: car.image9,
		image10: car.image10,
		financingAvailable: car.financing_available,
		sold: car.sold,
		description: car.description,
		createdAt: car.created_at,
		updatedAt: car.updated_at,
	};
}

// Transform camelCase to snake_case for database
export function transformCarToDB(car) {
	if (!car) return null;

	const transformed = {
		make: car.make,
		model: car.model,
		price: car.price,
		year: car.year,
		transmission: car.transmission,
		mileage: car.mileage,
		e_color: car.eColor,
		i_color: car.iColor,
		body: car.body,
		fuel: car.fuel,
		seats: car.seats,
		doors: car.doors,
		engine: car.engine,
		vin: car.vin,
		safety: car.safety || 'Certified',
		financing_available: car.financingAvailable || false,
		sold: car.sold || false,
		description: car.description,
	};

	// Only include image fields if they have values
	for (let i = 1; i <= 10; i++) {
		const imageKey = `image${i}`;
		if (car[imageKey]) {
			transformed[imageKey] = car[imageKey];
		}
	}

	return transformed;
}

