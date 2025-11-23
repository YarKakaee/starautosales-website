'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import VehicleCard from './VehicleCard';

export default function NewArrivals() {
	const [cars, setCars] = useState([]);
	const [loading, setLoading] = useState(true);
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		async function fetchNewArrivals() {
			try {
				const response = await axios.get('/api/findNewArrivals');
				const availableCars = (response.data.cars || []).filter(
					(car) => !car.sold && car.image1
				);
				setCars(availableCars.slice(0, 4));
			} catch (error) {
				console.error('Error fetching new arrivals:', error);
			} finally {
				setLoading(false);
				// Trigger animation after a brief delay
				setTimeout(() => setMounted(true), 100);
			}
		}
		fetchNewArrivals();
	}, []);

	if (loading) {
		return (
			<section className="py-24 bg-white">
				<div className="max-w-7xl mx-auto px-6 lg:px-8">
					<div className="text-center text-gray-400">Loading...</div>
				</div>
			</section>
		);
	}

	if (cars.length === 0) {
		return null;
	}

	return (
		<section className="py-24 bg-white">
			<div className="max-w-7xl mx-auto px-6 lg:px-8">
				{/* Section Header - Minimal & Elegant */}
				<div className="mb-16 text-center">
					<p className="text-sm text-gray-500 uppercase tracking-wider mb-4">
						Just Arrived
					</p>
					<h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-dblue mb-4">
				Latest Arrivals
					</h2>
					<div className="w-24 h-0.5 bg-dblue mx-auto" />
				</div>

				{/* Car Grid - Gallery Style */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
					{cars.map((car, index) => (
						<VehicleCard
							key={car.listingId}
							car={car}
							index={index}
							mounted={mounted}
							animationDelay={100}
						/>
					))}
				</div>

				{/* View All Link - Subtle */}
				<div
					className={`mt-16 text-center transition-all duration-700 ${
						mounted
							? 'opacity-100 translate-y-0'
							: 'opacity-0 translate-y-4'
					}`}
					style={{ transitionDelay: '400ms' }}
				>
					<Link
						href="/vehicles"
						className="inline-flex items-center gap-2 text-dblue hover:text-gray-700 transition-all duration-300 font-medium group/link"
					>
						View Full Inventory
						<svg
							className="w-5 h-5 transition-transform duration-300 group-hover/link:translate-x-1"
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
					</Link>
				</div>
			</div>
		</section>
	);
}
