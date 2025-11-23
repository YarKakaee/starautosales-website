import { createClient } from '@/lib/supabase-server';
import AdminInventorySection from './AdminInventorySection';
import UnauthorizedMessage from './UnauthorizedMessage';

export default async function AdminInventory() {
	const supabase = await createClient();
	const {
		data: { user },
	} = await supabase.auth.getUser();

	if (!user) return null;

	return (
		<main className={`bg-lwhite`}>
			{user?.email === 'starautosalesinfo@gmail.com' ? (
				<AdminInventorySection />
			) : (
				<UnauthorizedMessage userEmail={user.email} />
			)}
		</main>
	);
}

