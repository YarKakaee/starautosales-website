import { createServerClient } from '@/lib/supabase';
import { transformCarFromDB } from '@/lib/transformCar';
import { notFound } from 'next/navigation';
import VehicleDetailClient from './VehicleDetailClient';

export const dynamic = 'force-dynamic';

export default async function VehicleDetailPage({ params }) {
	const resolvedParams = await params;
	const listingId = parseInt(resolvedParams.listingId);

	if (!listingId || isNaN(listingId)) {
		notFound();
	}

	const supabase = createServerClient();

	const { data: carData, error } = await supabase
		.from('cars')
		.select('*')
		.eq('listing_id', listingId)
		.single();

	if (error || !carData) {
		notFound();
	}

	const car = transformCarFromDB(carData);

	return <VehicleDetailClient car={car} />;
}

