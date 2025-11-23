'use client';

import { createClient } from '@/lib/supabase-client';
import { useRouter } from 'next/navigation';

export default function UnauthorizedMessage({ userEmail }) {
	const router = useRouter();
	const supabase = createClient();

	const handleSignOut = async () => {
		await supabase.auth.signOut();
		router.push('/');
		router.refresh();
	};

	return (
		<section className="px-4 sm:px-6 md:px-24 lg:px-32 xl:px-48 2xl:px-64 mb-96 -mt-96 bg-lwhite text-dblue">
			<div className="text-center py-8">
				<h2 className="text-2xl font-bold text-lred mb-4">
					Unauthorized Email
				</h2>
				<p className="text-lg mb-6">
					You are signed in as <strong>{userEmail}</strong>, but this email
					does not have access to the admin dashboard.
				</p>
				<button
					onClick={handleSignOut}
					className="bg-lred text-lwhite py-3 px-8 rounded-md text-base font-semibold transition duration-300 uppercase drop-shadow-[1px_1px_20px_rgba(0,0,0,0.2)] hover:drop-shadow-[1px_1px_20px_rgba(0,0,0,0.5)] ease-out"
				>
					Sign Out
				</button>
			</div>
		</section>
	);
}

