import { supabase } from '@/lib/supabase';
import { transformCarFromDB } from '@/lib/transformCar';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
	try {
		const { data: cars, error } = await supabase
			.from('cars')
			.select('*')
			.order('stock_id', { ascending: false });

		if (error) {
			console.error('Error fetching cars:', error);
			return NextResponse.json(
				{ error: 'Failed to fetch cars' },
				{ status: 500 }
			);
		}

		const transformedCars = (cars || []).map(transformCarFromDB);

		return new NextResponse(JSON.stringify({ cars: transformedCars }), {
			headers: {
				'Cache-Control': 'no-store',
				'Content-Type': 'application/json',
			},
		});
	} catch (error) {
		console.error('Unexpected error:', error);
		return NextResponse.json(
			{ error: 'Internal server error' },
			{ status: 500 }
		);
	}
}

