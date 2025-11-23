import { supabase } from '@/lib/supabase';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
	try {
		const { data: cars, error } = await supabase
			.from('cars')
			.select('stock_id')
			.order('stock_id', { ascending: false })
			.limit(1);

		if (error) {
			console.error('Error fetching last car:', error);
			return NextResponse.json(
				{ error: 'Failed to fetch last car' },
				{ status: 500 }
			);
		}

		// If no cars exist, return 0 as the last car ID
		const lastCarId = cars && cars.length > 0 ? cars[0].stock_id : 0;
		return NextResponse.json({ lastCarId });
	} catch (error) {
		console.error('Unexpected error:', error);
		return NextResponse.json(
			{ error: 'Internal server error' },
			{ status: 500 }
		);
	}
}
