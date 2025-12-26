'use client';

import Image from 'next/image';
import Link from 'next/link';
import { FaTachometerAlt } from 'react-icons/fa';
import { TbManualGearboxFilled } from 'react-icons/tb';
import { HiOutlineShieldCheck } from 'react-icons/hi';

export default function VehicleCard({
	car,
	index = 0,
	mounted = true,
	animationDelay = 30,
	href,
}) {
	const cardHref = href || `/vehicles/${car.listingId}`;

	return (
		<Link href={cardHref} className="group">
			<div
				className={`bg-white border border-gray-100 rounded-lg overflow-hidden transition-all duration-300 ${
					mounted
						? 'opacity-100 translate-y-0'
						: 'opacity-0 translate-y-4'
				} hover:shadow-lg hover:-translate-y-1`}
				style={{
					transitionDelay: `${Math.min(
						index * animationDelay,
						300
					)}ms`,
				}}
			>
				{/* Image Container */}
				<div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
					{car.image1 ? (
						<>
							<Image
								src={car.image1}
								alt={`${car.year} ${car.make} ${car.model}`}
								fill
								className={`object-cover transition-transform duration-500 group-hover:scale-105 ${
									car.sold ? 'opacity-40' : ''
								}`}
							/>
							{car.sold && (
								<div className="absolute inset-0 flex items-center justify-center bg-black/20">
									<div className="bg-red-600 text-white px-6 py-3 rounded-md font-bold text-lg shadow-lg transform rotate-[-8deg]">
										SOLD
									</div>
								</div>
							)}
						</>
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
					<h3 className="text-xl font-bold text-dblue mb-3 group-hover:text-gray-700 transition-colors truncate">
						{car.year} {car.make} {car.model}
					</h3>

					{/* Key Details */}
					<div className="grid grid-cols-2 gap-4 mb-4">
						<div className="flex items-center gap-2 text-sm text-gray-600">
							<FaTachometerAlt className="w-4 h-4 text-gray-400 shrink-0" />
							<span>{car.mileage.toLocaleString()} km</span>
						</div>
						<div className="flex items-center gap-2 text-sm text-gray-600 justify-end">
							<TbManualGearboxFilled className="w-4 h-4 text-gray-400 shrink-0" />
							<span>{car.transmission}</span>
						</div>
					</div>

					{/* Price and Safety */}
					<div className="pt-4 border-t border-gray-100 flex items-end justify-between">
						<p className="text-2xl font-bold text-dblue">
							${car.price.toLocaleString()}
							<span className="text-[15px] font-medium text-gray-500 ml-1">
								+ HST
							</span>
						</p>
						{car.safety && (
							<div className="flex items-center gap-1.5 text-sm pb-0.5">
								<HiOutlineShieldCheck className="w-4 h-4 text-gray-400 shrink-0" />
								<span
									className={`font-medium ${
										car.safety.toLowerCase() === 'certified'
											? 'text-lgreen'
											: 'text-gray-600'
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
	);
}
