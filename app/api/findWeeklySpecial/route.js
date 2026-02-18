import { supabase } from '@/lib/supabase';
import { transformCarFromDB } from '@/lib/transformCar';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
	try {
		const { data: car, error } = await supabase
			.from('cars')
			.select('*')
			.eq('weekly_special', true)
			.limit(1)
			.maybeSingle();

		if (error) {
			console.error('Error fetching weekly special:', error);
			return NextResponse.json(
				{ error: 'Failed to fetch weekly special' },
				{ status: 500 }
			);
		}

		if (!car) {
			return new NextResponse(JSON.stringify({ car: null }), {
				headers: {
					'Cache-Control': 'no-store',
					'Content-Type': 'application/json',
				},
			});
		}

		const transformedCar = transformCarFromDB(car);

		return new NextResponse(JSON.stringify({ car: transformedCar }), {
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
