'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function AboutUs() {
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	return (
		<section id="about" className="py-32 bg-dblue text-white relative overflow-hidden">
			{/* Subtle background pattern */}
			<div className="absolute inset-0 opacity-5">
				<div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:40px_40px]" />
			</div>

			<div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
				{/* Header */}
				<div
					className={`text-center mb-20 transition-all duration-1000 ${
						mounted
							? 'opacity-100 translate-y-0'
							: 'opacity-0 translate-y-10'
					}`}
				>
					<p className="text-sm text-white/60 uppercase tracking-wider mb-4">
						About Us
					</p>
					<h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
						Welcome to Star Auto Sales
					</h2>
					<p className="max-w-2xl mx-auto text-lg text-white/80 leading-relaxed font-light">
						We are dedicated to providing exceptional pre-owned cars
						and outstanding customer service.
					</p>
				</div>

				{/* Content Grid */}
				<div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 max-w-5xl mx-auto">
					{/* Quality Selection */}
					<div
						className={`transition-all duration-1000 ${
							mounted
								? 'opacity-100 translate-y-0'
								: 'opacity-0 translate-y-10'
						}`}
						style={{ transitionDelay: '200ms' }}
					>
						<div className="relative aspect-[4/3] rounded-lg overflow-hidden mb-6 group">
							<Image
								className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
								src="/assets/abus1.png"
								alt="Quality Selection"
								fill
							/>
							<div className="absolute inset-0 bg-gradient-to-t from-dblue/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
						</div>
						<h3 className="text-2xl font-bold mb-3">
							Quality Selection
						</h3>
						<p className="text-white/70 leading-relaxed font-light">
							Our inventory consists of carefully selected
							pre-owned vehicles that meet our high standards for
							quality and reliability.
						</p>
					</div>

					{/* Exceptional Service */}
					<div
						className={`transition-all duration-1000 ${
							mounted
								? 'opacity-100 translate-y-0'
								: 'opacity-0 translate-y-10'
						}`}
						style={{ transitionDelay: '400ms' }}
					>
						<div className="relative aspect-[4/3] rounded-lg overflow-hidden mb-6 group">
							<Image
								className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
								src="/assets/abus2.png"
								alt="Exceptional Service"
								fill
							/>
							<div className="absolute inset-0 bg-gradient-to-t from-dblue/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
						</div>
						<h3 className="text-2xl font-bold mb-3">
							Exceptional Service
						</h3>
						<p className="text-white/70 leading-relaxed font-light">
							Our knowledgeable and friendly team is dedicated to
							providing you with a seamless car-buying experience.
						</p>
					</div>
				</div>
			</div>
		</section>
	);
}
