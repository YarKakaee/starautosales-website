import { createClient } from '@/lib/supabase-server';
import { supabase } from '@/lib/supabase';
import { transformCarFromDB } from '@/lib/transformCar';
import AddUpdateVehicle from '@/app/components/admin/AddUpdateVehicle';
import UnauthorizedMessage from '@/app/components/admin/UnauthorizedMessage';
import { redirect } from 'next/navigation';

export default async function AdminCarEditPage({ params }) {
	const supabaseServer = await createClient();
	const {
		data: { user },
	} = await supabaseServer.auth.getUser();

	if (!user) {
		return null; // Middleware will handle redirect to login
	}

	if (user.email !== 'starautosalesinfo@gmail.com') {
		return (
			<section className="px-4 sm:px-6 md:px-24 lg:px-32 xl:px-48 2xl:px-64 pb-6 bg-lwhite text-dblue pt-40">
				<UnauthorizedMessage userEmail={user.email} />
			</section>
		);
	}

	const listingId = parseInt(params.listingId);

	const { data: carData, error } = await supabase
		.from('cars')
		.select('*')
		.eq('listing_id', listingId)
		.single();

	if (error || !carData) {
		redirect('/admin');
	}

	const car = transformCarFromDB(carData);

	return (
		<section className="px-4 sm:px-6 md:px-24 lg:px-32 xl:px-48 2xl:px-64 pb-6 bg-lwhite text-dblue pt-40">
			<AddUpdateVehicle car={car} />
		</section>
	);
}

