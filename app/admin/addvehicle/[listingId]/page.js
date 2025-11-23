import { createClient } from '@/lib/supabase-server';
import { createServerClient } from '@/lib/supabase';
import { transformCarFromDB } from '@/lib/transformCar';
import AddUpdateVehicle from '@/app/components/admin/AddUpdateVehicle';
import UnauthorizedMessage from '@/app/components/admin/UnauthorizedMessage';

async function getCar(listingId) {
	try {
		const supabaseAdmin = createServerClient();
		const { data: car, error } = await supabaseAdmin
			.from('cars')
			.select('*')
			.eq('listing_id', listingId)
			.single();

		if (error || !car) {
			return null;
		}

		return transformCarFromDB(car);
	} catch (error) {
		console.error('Error fetching car:', error);
		return null;
	}
}

export default async function EditVehiclePage({ params }) {
	const resolvedParams = await params;
	const listingId = parseInt(resolvedParams.listingId, 10);

	const supabaseServer = await createClient();
	const {
		data: { user },
	} = await supabaseServer.auth.getUser();

	if (!user) {
		return null; // Middleware will handle redirect to login
	}

	if (user.email !== 'starautosalesinfo@gmail.com') {
		return (
			<div className="min-h-screen bg-white">
				<section className="pt-32 pb-16 bg-dblue text-white relative overflow-hidden">
					<div className="absolute inset-0 bg-gradient-to-b from-dblue via-dblue to-dblue/95" />
					<div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
						<UnauthorizedMessage userEmail={user.email} />
					</div>
				</section>
			</div>
		);
	}

	// Fetch the car data
	const car = await getCar(listingId);

	if (!car) {
		return (
			<div className="min-h-screen bg-white">
				<section className="pt-32 pb-16 bg-dblue text-white relative overflow-hidden">
					<div className="absolute inset-0 bg-gradient-to-b from-dblue via-dblue to-dblue/95" />
					<div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
						<h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4">
							Car Not Found
						</h1>
						<p className="text-lg text-white/80">
							The vehicle with listing ID {listingId} could not be found.
						</p>
					</div>
					<div className="absolute bottom-0 left-0 right-0 h-12">
						<svg
							className="absolute bottom-0 w-full h-full"
							viewBox="0 0 1440 120"
							preserveAspectRatio="none"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M0,120 L0,60 Q720,0 1440,60 L1440,120 Z"
								fill="white"
							/>
						</svg>
					</div>
				</section>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-white">
			{/* Dark Hero Header */}
			<section className="pt-32 pb-16 bg-dblue text-white relative overflow-hidden">
				{/* Gradient overlays */}
				<div className="absolute inset-0 bg-gradient-to-b from-dblue via-dblue to-dblue/95" />
				<div className="absolute inset-0 bg-gradient-to-r from-dblue/90 via-transparent to-dblue/80" />
				<div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.05),transparent_70%)]" />
				<div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(0,0,0,0.1),transparent_70%)]" />

				<div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
					<h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4">
						Edit Vehicle
					</h1>
					<p className="text-lg text-white/80">
						{car.year} {car.make} {car.model}
					</p>
				</div>
				{/* Curved transition */}
				<div className="absolute bottom-0 left-0 right-0 h-12">
					<svg
						className="absolute bottom-0 w-full h-full"
						viewBox="0 0 1440 120"
						preserveAspectRatio="none"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M0,120 L0,60 Q720,0 1440,60 L1440,120 Z"
							fill="white"
						/>
					</svg>
				</div>
			</section>

			{/* Form Section */}
			<section className="py-12 bg-white">
				<div className="max-w-7xl mx-auto px-6 lg:px-8">
					<AddUpdateVehicle car={car} />
				</div>
			</section>
		</div>
	);
}

