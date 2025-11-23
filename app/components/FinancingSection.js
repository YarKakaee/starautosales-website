'use client';

import Link from 'next/link';

// Deterministic seeded random function to avoid hydration mismatch
function seededRandom(seed) {
	const x = Math.sin(seed) * 10000;
	return x - Math.floor(x);
}

// Helper to round to consistent decimal places
function roundTo(value, decimals = 2) {
	return Math.round(value * Math.pow(10, decimals)) / Math.pow(10, decimals);
}

// Pre-calculate positions for 20 particles using deterministic values
const particleData = Array.from({ length: 20 }, (_, i) => {
	const seed = i * 123.456; // Use index-based seed for consistency
	return {
		left: roundTo(seededRandom(seed) * 100, 2),
		top: roundTo(seededRandom(seed + 1) * 100, 2),
		animationDelay: roundTo(seededRandom(seed + 2) * 5, 3),
		animationDuration: roundTo(5 + seededRandom(seed + 3) * 10, 3),
	};
});

export default function FinancingSection({ variant = 'default' }) {
	const isInventory = variant === 'inventory';

	return (
		<section
			className={
				isInventory
					? 'relative py-10 flex justify-center items-center bg-gradient-to-r from-blue-100 via-white to-blue-50 overflow-hidden'
					: 'relative py-12 bg-dblue overflow-hidden group'
			}
		>
			{/* Background and effects */}
			{isInventory ? (
				<>
					{/* Glassmorphism card with blue accent shadow and fade-in */}
					<div className="w-full flex justify-center">
						<div className="relative max-w-2xl w-full mx-4 px-8 py-7 rounded-2xl bg-white/60 backdrop-blur-md shadow-2xl shadow-blue-200 border border-blue-100 flex flex-col items-center">
							<div className="mb-3">
								<svg
									className="w-10 h-10 text-blue-700 drop-shadow"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<circle
										cx="12"
										cy="12"
										r="10"
										strokeWidth="2"
										className="stroke-blue-300"
									/>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
										className="stroke-blue-700"
									/>
								</svg>
							</div>
							<div className="text-center">
								<span className="block text-xl md:text-2xl font-semibold text-blue-900 mb-2">
									Financing now available!
								</span>
								<span className="block text-base text-blue-800 mb-4">
									Get your dream car with flexible payment
									options.
								</span>
								<Link
									href="/contact"
									className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold shadow hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
								>
									Contact us for more info
								</Link>
							</div>
						</div>
					</div>
				</>
			) : (
				<>
					{/* Animated gradient background for home page */}
					<div className="absolute inset-0 bg-gradient-to-r from-dblue via-gray-900 to-dblue animate-gradient"></div>
					<div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer"></div>
					<div className="absolute -top-24 -left-24 w-96 h-96 bg-gray-800/20 rounded-full blur-3xl transition-all duration-500 group-hover:scale-110 group-hover:bg-gray-800/30"></div>
					<div className="absolute -bottom-24 -right-24 w-96 h-96 bg-gray-900/20 rounded-full blur-3xl transition-all duration-500 group-hover:scale-110 group-hover:bg-gray-900/30"></div>
					<div className="absolute inset-0 overflow-hidden">
						{particleData.map((particle, i) => (
							<div
								key={i}
								className="absolute w-1 h-1 bg-white/30 rounded-full animate-float"
								style={{
									left: `${particle.left}%`,
									top: `${particle.top}%`,
									animationDelay: `${particle.animationDelay}s`,
									animationDuration: `${particle.animationDuration}s`,
								}}
							/>
						))}
					</div>
					{/* Content for home page */}
					<div className="container mx-auto px-4 relative">
						<div className="max-w-4xl mx-auto">
							<div className="flex items-center justify-center space-x-4 backdrop-blur-sm bg-white/5 rounded-2xl p-6 shadow-xl transition-all duration-300 group-hover:bg-white/10 group-hover:shadow-2xl group-hover:scale-[1.02]">
								<div className="flex-shrink-0 transform transition-transform duration-300 group-hover:rotate-12">
									<svg
										className="w-8 h-8 text-white"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
											d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
										/>
									</svg>
								</div>
								<p className="text-xl text-white font-medium">
									Financing now available!{' '}
									<Link
										href="/contact"
										className="text-white hover:text-gray-200 font-semibold underline underline-offset-4 transition-colors duration-200 relative group/link"
									>
										Contact us
										<span className="absolute bottom-0 left-0 w-full h-0.5 bg-white/50 transform scale-x-0 group-hover/link:scale-x-100 transition-transform duration-300 origin-left"></span>
									</Link>{' '}
									for more information.
								</p>
							</div>
						</div>
					</div>
				</>
			)}
		</section>
	);
}

