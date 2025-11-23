'use client';

import { Suspense } from 'react';
import { createClient } from '@/lib/supabase-client';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

function LoginForm() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const [loading, setLoading] = useState(false);
	const supabase = createClient();

	const handleGoogleLogin = async () => {
		setLoading(true);
		const redirectTo = searchParams.get('redirect') || '/admin';

		// Use environment variable for production, fallback to window.location.origin for development
		const siteUrl =
			process.env.NEXT_PUBLIC_SITE_URL || window.location.origin;

		const { error } = await supabase.auth.signInWithOAuth({
			provider: 'google',
			options: {
				redirectTo: `${siteUrl}/auth/callback?redirect=${encodeURIComponent(
					redirectTo
				)}`,
			},
		});

		if (error) {
			console.error('Error signing in:', error);
			setLoading(false);
		}
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-lwhite">
			<div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
				<h1 className="text-3xl font-bold text-dblue mb-6 text-center">
					Admin Login
				</h1>
				<p className="text-center text-gray-600 mb-6">
					Sign in with your Google account to access the admin
					dashboard
				</p>
				<button
					onClick={handleGoogleLogin}
					disabled={loading}
					className="w-full bg-dblue text-lwhite py-3 px-6 rounded-md text-base font-semibold transition duration-300 hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
				>
					{loading ? (
						<>
							<span className="animate-spin">⏳</span>
							Signing in...
						</>
					) : (
						<>
							<svg
								className="w-5 h-5"
								viewBox="0 0 24 24"
								fill="currentColor"
							>
								<path
									d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
									fill="#4285F4"
								/>
								<path
									d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
									fill="#34A853"
								/>
								<path
									d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
									fill="#FBBC05"
								/>
								<path
									d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
									fill="#EA4335"
								/>
							</svg>
							Sign in with Google
						</>
					)}
				</button>
			</div>
		</div>
	);
}

export default function LoginPage() {
	return (
		<Suspense
			fallback={
				<div className="min-h-screen flex items-center justify-center bg-lwhite">
					<div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
						<div className="text-center">
							<p className="text-gray-600">Loading...</p>
						</div>
					</div>
				</div>
			}
		>
			<LoginForm />
		</Suspense>
	);
}
