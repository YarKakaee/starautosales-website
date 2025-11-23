'use client';

import { createClient } from '@/lib/supabase-client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function AdminDashboard() {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);
	const router = useRouter();
	const supabase = createClient();

	useEffect(() => {
		const getUser = async () => {
			const {
				data: { user },
			} = await supabase.auth.getUser();
			setUser(user);
			setLoading(false);
		};

		getUser();

		const {
			data: { subscription },
		} = supabase.auth.onAuthStateChange((_event, session) => {
			setUser(session?.user ?? null);
		});

		return () => subscription.unsubscribe();
	}, [supabase]);

	const handleSignOut = async () => {
		await supabase.auth.signOut();
		router.push('/');
		router.refresh();
	};

	if (loading) {
		return (
			<section className="px-4 sm:px-6 md:px-24 lg:px-32 xl:px-48 2xl:px-64 pb-6 bg-lwhite text-dblue pt-40">
				<div>Loading...</div>
			</section>
		);
	}

	const isAuthorized = user?.email === 'starautosalesinfo@gmail.com';

	return (
		<section className="px-4 sm:px-6 md:px-24 lg:px-32 xl:px-48 2xl:px-64 pb-6 bg-lwhite text-dblue pt-40">
			<div>
				<div className="sm:flex justify-between items-center mb-96">
					<h1 className="text-3xl mt-5 mb-3 md:my-4 font-bold 2xl:text-4xl">
						Admin Dashboard
					</h1>

					<div className="flex space-x-4">
						{isAuthorized && (
							<button className="bg-dblue text-lwhite py-2 px-6 rounded-md text-sm sm:text-md font-semibold transition duration-300 uppercase drop-shadow-[1px_1px_20px_rgba(0,0,0,0.2)] hover:drop-shadow-[1px_1px_20px_rgba(0,0,0,0.5)] ease-out">
								<Link href="/admin/addvehicle">Add Vehicle</Link>
							</button>
						)}
						{user && (
							<button
								onClick={handleSignOut}
								className="bg-lred text-lwhite py-2 px-6 rounded-md text-sm sm:text-md font-semibold transition duration-300 uppercase drop-shadow-[1px_1px_20px_rgba(0,0,0,0.2)] hover:drop-shadow-[1px_1px_20px_rgba(0,0,0,0.5)] ease-out"
							>
								Sign Out
							</button>
						)}
						{!user && (
							<button className="bg-dblue text-lwhite py-3 px-8 rounded-md text-md font-semibold transition duration-300 uppercase drop-shadow-[1px_1px_20px_rgba(0,0,0,0.2)] hover:drop-shadow-[1px_1px_20px_rgba(0,0,0,0.5)] ease-out">
								<Link href="/auth/login">Login</Link>
							</button>
						)}
					</div>
				</div>
			</div>
		</section>
	);
}

