'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import axios from 'axios';
import { FaTachometerAlt } from 'react-icons/fa';
import { TbManualGearboxFilled } from 'react-icons/tb';
import { HiOutlineShieldCheck } from 'react-icons/hi';

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
						<Link
							key={car.listingId}
							href={`/vehicles/${car.listingId}`}
							className="group"
						>
							<div
								className={`bg-white border border-gray-100 rounded-lg overflow-hidden transition-all duration-500 ease-out ${
									mounted
										? 'opacity-100 translate-y-0'
										: 'opacity-0 translate-y-8'
								} hover:shadow-xl hover:-translate-y-1 hover:border-gray-200`}
								style={{
									transitionDelay: `${index * 100}ms`,
								}}
							>
								{/* Image Container */}
								<div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
									{car.image1 ? (
										<Image
											src={car.image1}
											alt={`${car.year} ${car.make} ${car.model}`}
											fill
											className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
										/>
									) : (
										<div className="w-full h-full flex items-center justify-center">
											<svg
												className="w-16 h-16 text-gray-300"
												fill="none"
												stroke="currentColor"
												viewBox="0 0 24 24"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth={1.5}
													d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
												/>
											</svg>
										</div>
									)}
								</div>

								{/* Content */}
								<div className="p-6">
									{/* Title */}
									<h3 className="text-xl font-bold text-dblue mb-3 group-hover:text-gray-700 transition-colors duration-300">
										{car.year} {car.make} {car.model}
									</h3>

									{/* Key Details - Minimal */}
									<div className="grid grid-cols-2 gap-4 mb-4">
										<div className="flex items-center gap-2 text-sm text-gray-600 transition-colors duration-300 group-hover:text-gray-700">
											<FaTachometerAlt className="w-4 h-4 text-gray-400 flex-shrink-0 transition-colors duration-300 group-hover:text-gray-500" />
											<span>
												{car.mileage.toLocaleString()}{' '}
												km
											</span>
										</div>
										<div className="flex items-center gap-2 text-sm text-gray-600 justify-end transition-colors duration-300 group-hover:text-gray-700">
											<TbManualGearboxFilled className="w-4 h-4 text-gray-400 flex-shrink-0 transition-colors duration-300 group-hover:text-gray-500" />
											<span>{car.transmission}</span>
										</div>
									</div>

									{/* Price */}
									<div className="pt-4 border-t border-gray-100 flex items-end justify-between transition-colors duration-300 group-hover:border-gray-200">
										<p className="text-2xl font-bold text-dblue transition-colors duration-300 group-hover:text-gray-800">
											${car.price.toLocaleString()}
											<span className="text-[15px] font-medium text-gray-500 ml-1 transition-colors duration-300 group-hover:text-gray-600">
												+ HST
											</span>
										</p>
										{car.safety && (
											<div className="flex items-center gap-1.5 text-sm pb-0.5 transition-transform duration-300 group-hover:translate-x-0.5">
												<HiOutlineShieldCheck className="w-4 h-4 text-gray-400 flex-shrink-0 transition-colors duration-300 group-hover:text-gray-500" />
												<span
													className={`font-medium transition-colors duration-300 ${
														car.safety.toLowerCase() ===
														'certified'
															? 'text-lgreen group-hover:text-lgreen/80'
															: 'text-gray-600 group-hover:text-gray-700'
													}`}
												>
													{car.safety}
												</span>
											</div>
										)}
									</div>
								</div>
							</div>
						</Link>
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
