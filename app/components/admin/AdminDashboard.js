'use client';

import { createClient } from '@/lib/supabase-client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FaPlus, FaSignOutAlt, FaSignInAlt } from 'react-icons/fa';

export default function AdminDashboard() {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);
	const [mounted, setMounted] = useState(false);
	const router = useRouter();
	const supabase = createClient();

	useEffect(() => {
		setMounted(true);
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
			<section className="pt-32 pb-16 bg-dblue text-white">
				<div className="max-w-7xl mx-auto px-6 lg:px-8">
					<div className="text-center">
						<p className="text-white/80">Loading...</p>
					</div>
				</div>
			</section>
		);
	}

	const isAuthorized = user?.email === 'starautosalesinfo@gmail.com';

	return (
		<section className="pt-32 pb-16 bg-dblue text-white relative overflow-hidden">
			{/* Gradient overlays */}
			<div className="absolute inset-0 bg-gradient-to-b from-dblue via-dblue to-dblue/95" />
			<div className="absolute inset-0 bg-gradient-to-r from-dblue/90 via-transparent to-dblue/80" />
			<div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.05),transparent_70%)]" />
			<div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(0,0,0,0.1),transparent_70%)]" />

			<div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
				<div
					className={`transition-all duration-1000 ${
						mounted
							? 'opacity-100 translate-y-0'
							: 'opacity-0 translate-y-10'
					}`}
				>
					<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
						<div>
							<h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-2">
								Admin Dashboard
							</h1>
							{user && (
								<p className="text-white/70 text-sm">
									Logged in as: {user.email}
								</p>
							)}
						</div>

						<div className="flex flex-wrap gap-3">
							{isAuthorized && (
								<Link
									href="/admin/addvehicle"
									className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white px-6 py-3 rounded-md font-medium transition-all duration-300 hover:bg-white/20 hover:border-white/30"
								>
									<FaPlus className="w-4 h-4" />
									Add Vehicle
								</Link>
							)}
							{user && (
								<button
									onClick={handleSignOut}
									className="inline-flex items-center gap-2 bg-lred text-white px-6 py-3 rounded-md font-medium transition-all duration-300 hover:bg-lred/90"
								>
									<FaSignOutAlt className="w-4 h-4" />
									Sign Out
								</button>
							)}
							{!user && (
								<Link
									href="/auth/login"
									className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white px-6 py-3 rounded-md font-medium transition-all duration-300 hover:bg-white/20 hover:border-white/30"
								>
									<FaSignInAlt className="w-4 h-4" />
									Login
								</Link>
							)}
						</div>
					</div>
				</div>
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
	);
}

