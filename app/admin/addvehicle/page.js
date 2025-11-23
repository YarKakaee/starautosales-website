import { createClient } from '@/lib/supabase-server';
import AddUpdateVehicle from '@/app/components/admin/AddUpdateVehicle';
import UnauthorizedMessage from '@/app/components/admin/UnauthorizedMessage';

export default async function AddVehiclePage() {
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

	return (
		<section className="px-4 sm:px-6 md:px-24 lg:px-32 xl:px-48 2xl:px-64 pb-6 bg-lwhite text-dblue pt-40">
			<AddUpdateVehicle />
		</section>
	);
}

