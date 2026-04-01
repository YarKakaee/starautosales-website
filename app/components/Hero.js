'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function Hero() {
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	return (
		<section className="relative min-h-screen flex items-center overflow-hidden bg-dblue">
			{/* Dealership Photo Background */}
			<div className="absolute inset-0">
				<Image
					src="/assets/abus1.png"
					alt="Star Auto Sales Dealership"
					fill
					sizes="100vw"
					className="object-cover"
					priority
					quality={90}
				/>
				{/* Dark overlay for text readability */}
				<div className="absolute inset-0 bg-dblue/70" />
				{/* Subtle gradient overlay */}
				<div className="absolute inset-0 bg-gradient-to-r from-dblue via-dblue/60 to-transparent" />
			</div>

			{/* Content */}
			<div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full">
				<div
					className={`py-32 space-y-8 transition-all duration-1000 ${
						mounted
							? 'opacity-100 translate-y-0'
							: 'opacity-0 translate-y-10'
					}`}
				>
					{/* Badge */}
					<div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-[0_0_15px_rgba(255,255,255,0.1)] text-white text-sm sm:text-base font-bold tracking-wide transition-all hover:scale-105 hover:bg-white/15 hover:border-white/30 cursor-default">
						<span className="text-xl">💰</span> We Finance All Credit
					</div>

					{/* Main Heading */}
					<div className="space-y-2 max-w-2xl">
						<h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white leading-[1.1]">
							Quality Cars.
							<br />
							<span className="bg-gradient-to-b from-white to-white/80 bg-clip-text text-transparent">
								Honest Prices.
							</span>
						</h1>
					</div>

					{/* Subheading */}
					<p className="max-w-xl text-lg sm:text-xl text-white/95 leading-relaxed font-light">
						We're not just selling cars - we're helping you find the
						right one. Every vehicle in our lot is hand-picked for
						reliability and value.
					</p>

					{/* CTA Buttons */}
					<div className="flex flex-col sm:flex-row items-start gap-4 pt-2">
						<Link
							href="/vehicles"
							className="group relative px-8 py-4 bg-lred text-white font-medium rounded-md transition-all duration-300 hover:bg-lred/90"
						>
							<span className="relative z-10 flex items-center gap-2">
								View Our Inventory
								<svg
									className="w-5 h-5 transition-transform group-hover:translate-x-1"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M17 8l4 4m0 0l-4 4m4-4H3"
									/>
								</svg>
							</span>
						</Link>
						<a
							href="https://www.google.com/maps?ll=43.009903,-81.153694&z=17&t=m&hl=en&gl=US&mapclient=embed&q=2271+Dundas+St+London,+ON+N5V+1R4"
							target="_blank"
							rel="noopener noreferrer"
							className="px-8 py-4 bg-white/5 backdrop-blur-sm border border-white/20 text-white/90 font-medium rounded-md transition-all duration-300 hover:bg-white/10 hover:border-white/30"
						>
							Visit Our Lot
						</a>
					</div>
				</div>
			</div>
		</section>
	);
}
