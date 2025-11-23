import { createServerClient } from '@/lib/supabase';
import { transformCarFromDB, transformCarToDB } from '@/lib/transformCar';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST(request) {
	try {
		// TODO: Add authentication check here
		// For now, we'll add a simple check
		// You can integrate Supabase Auth later
		
		const body = await request.json();

		const supabaseAdmin = createServerClient();

		// Clean up the data - remove undefined/null image fields and ensure required fields are present
		const cleanedBody = {
			...body,
			safety: body.safety || 'Certified',
			financingAvailable: body.financingAvailable || false,
			sold: body.sold || false,
		};

		// Remove undefined/null image fields to avoid database issues
		for (let i = 1; i <= 10; i++) {
			const imageKey = `image${i}`;
			if (!cleanedBody[imageKey]) {
				delete cleanedBody[imageKey];
			}
		}

		const carData = transformCarToDB(cleanedBody);

		const { data: newCar, error } = await supabaseAdmin
			.from('cars')
			.insert(carData)
			.select()
			.single();

		if (error) {
			console.error('Error creating car:', error);
			console.error('Car data attempted:', carData);
			return NextResponse.json(
				{ error: 'Failed to create car', details: error.message },
				{ status: 500 }
			);
		}

		const transformedCar = transformCarFromDB(newCar);
		return NextResponse.json(transformedCar, { status: 201 });
	} catch (error) {
		console.error('Unexpected error:', error);
		return NextResponse.json(
			{ error: 'Internal server error', details: error.message },
			{ status: 500 }
		);
	}
}

