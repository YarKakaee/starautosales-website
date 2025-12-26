'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaTachometerAlt, FaPhone, FaEnvelope, FaCar, FaDollarSign } from 'react-icons/fa';
import { IoColorPalette } from 'react-icons/io5';
import { LuClipboardList } from 'react-icons/lu';
import { MdOutlineNumbers } from 'react-icons/md';
import { TbManualGearboxFilled } from 'react-icons/tb';
import { HiOutlineShieldCheck } from 'react-icons/hi';
import { BsFuelPump } from 'react-icons/bs';
import { RiDoorOpenLine } from 'react-icons/ri';
import { FaUsers, FaArrowLeft, FaArrowRight } from 'react-icons/fa6';

export default function VehicleDetailClient({ car }) {
	const {
		stockId,
		listingId,
		year,
		make,
		model,
		transmission,
		body,
		eColor,
		iColor,
		mileage,
		price,
		engine,
		fuel,
		seats,
		doors,
		vin,
		safety,
		financingAvailable,
		sold,
		description,
		image1,
		image2,
		image3,
		image4,
		image5,
		image6,
		image7,
		image8,
		image9,
		image10,
	} = car;

	// Collect all available images
	const images = [
		image1,
		image2,
		image3,
		image4,
		image5,
		image6,
		image7,
		image8,
		image9,
		image10,
	].filter((img) => img && img.trim() !== '');

	const [currentImageIndex, setCurrentImageIndex] = useState(0);
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	const selectedImage = images[currentImageIndex] || null;

	const goToPreviousImage = () => {
		setCurrentImageIndex((prev) =>
			prev === 0 ? images.length - 1 : prev - 1
		);
	};

	const goToNextImage = () => {
		setCurrentImageIndex((prev) =>
			prev === images.length - 1 ? 0 : prev + 1
		);
	};

	const formatStockId = (id) => {
		if (id < 10) return `00${id}`;
		if (id < 100) return `0${id}`;
		return id;
	};

	return (
		<div className="min-h-screen bg-white">
			{/* Dark Hero Section */}
			<section className="pt-32 pb-28 bg-dblue text-white relative overflow-hidden">
				{/* Gradient overlays */}
				<div className="absolute inset-0 bg-gradient-to-b from-dblue via-dblue to-dblue/95" />
				<div className="absolute inset-0 bg-gradient-to-r from-dblue/90 via-transparent to-dblue/80" />
				<div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.05),transparent_70%)]" />
				<div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(0,0,0,0.1),transparent_70%)]" />
				<div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
					{/* Back button */}
					<Link
						href="/vehicles"
						className={`inline-flex items-center text-white/90 hover:text-white mb-6 transition-colors ${
							mounted
								? 'opacity-100 translate-y-0'
								: 'opacity-0 translate-y-10'
						}`}
						style={{ transitionDelay: '100ms' }}
					>
						<FaArrowLeft className="mr-2 w-4 h-4" />
						<span className="font-medium">Back to Inventory</span>
					</Link>

					{/* Title */}
					<div
						className={`transition-all duration-1000 ${
							mounted
								? 'opacity-100 translate-y-0'
								: 'opacity-0 translate-y-10'
						}`}
						style={{ transitionDelay: '200ms' }}
					>
						<h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-3">
							{year} {make} {model}
						</h1>
						<div className="flex items-center gap-4 text-white/80 flex-wrap">
							<span className="flex items-center gap-2">
								<LuClipboardList className="w-4 h-4" />
								Stock #: SAS{formatStockId(stockId)}
							</span>
							{financingAvailable && !sold && (
								<span className="px-4 py-1.5 bg-lgreen rounded-full text-sm font-semibold text-white flex items-center gap-2 shadow-lg">
									<FaDollarSign className="w-3.5 h-3.5" />
									Financing Available
								</span>
							)}
							{sold && (
								<span className="px-3 py-1 bg-red-600 rounded-full text-sm font-semibold text-white">
									SOLD
								</span>
							)}
						</div>
					</div>
				</div>
				{/* Smooth transition curve */}
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

			{/* Main Content Section */}
			<div className="max-w-7xl mx-auto px-6 lg:px-8 pt-12 pb-2">
				{/* Main Image */}
				<div
					className={`mb-8 transition-all duration-1000 ${
						mounted
							? 'opacity-100 translate-y-0'
							: 'opacity-0 translate-y-10'
					}`}
					style={{ transitionDelay: '300ms' }}
				>
					{selectedImage ? (
						<div className="relative w-full aspect-[16/9] rounded-lg overflow-hidden bg-gray-100 group">
							<Image
								src={selectedImage}
								alt={`${year} ${make} ${model}`}
								fill
								className="object-cover transition-opacity duration-300"
								priority
							/>
							{/* Navigation Arrows */}
							{images.length > 1 && (
								<>
									{/* Left Arrow */}
									<button
										onClick={goToPreviousImage}
										className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white backdrop-blur-sm rounded-full p-3 shadow-lg transition-all duration-300 hover:scale-110 opacity-70 group-hover:opacity-100 z-10 cursor-pointer"
										aria-label="Previous image"
									>
										<FaArrowLeft className="w-5 h-5 text-dblue" />
									</button>
									{/* Right Arrow */}
									<button
										onClick={goToNextImage}
										className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white backdrop-blur-sm rounded-full p-3 shadow-lg transition-all duration-300 hover:scale-110 opacity-70 group-hover:opacity-100 z-10 cursor-pointer"
										aria-label="Next image"
									>
										<FaArrowRight className="w-5 h-5 text-dblue" />
									</button>
								</>
							)}
						</div>
					) : (
						<div className="w-full aspect-[16/9] rounded-lg bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
							<span className="text-gray-400 text-lg">
								No image available
							</span>
						</div>
					)}
				</div>
			</div>

			<div className="max-w-7xl mx-auto px-6 lg:px-8 pb-18">
				<div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
					{/* Main Content */}
					<div className="lg:col-span-2 space-y-8">
						{/* Image Gallery */}
						{images.length > 1 && (
							<div
								className={`transition-all duration-1000 ${
									mounted
										? 'opacity-100 translate-y-0'
										: 'opacity-0 translate-y-10'
								}`}
								style={{ transitionDelay: '200ms' }}
							>
								<h2 className="text-2xl font-bold text-dblue mb-4">
									Photo Gallery
								</h2>
								<div className="grid grid-cols-4 sm:grid-cols-5 gap-3">
									{images.map((img, index) => (
										<button
											key={index}
											onClick={() =>
												setCurrentImageIndex(index)
											}
											className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${
												currentImageIndex === index
													? 'border-dblue ring-2 ring-dblue/20 scale-105'
													: 'border-gray-200 hover:border-dblue/50'
											}`}
										>
											<Image
												src={img}
												alt={`${year} ${make} ${model} - Image ${
													index + 1
												}`}
												fill
												className="object-cover"
											/>
										</button>
									))}
								</div>
							</div>
						)}

						{/* Description */}
						{description && (
							<div
								className={`transition-all duration-1000 ${
									mounted
										? 'opacity-100 translate-y-0'
										: 'opacity-0 translate-y-10'
								}`}
								style={{ transitionDelay: '300ms' }}
							>
								<h2 className="text-2xl font-bold text-dblue mb-4">
									About This Vehicle
								</h2>
								<div className="bg-white border border-gray-100 rounded-lg p-6">
									<p className="text-gray-700 leading-relaxed whitespace-pre-line">
										{description}
									</p>
								</div>
							</div>
						)}

						{/* Specifications */}
						<div
							className={`transition-all duration-1000 ${
								mounted
									? 'opacity-100 translate-y-0'
									: 'opacity-0 translate-y-10'
							}`}
							style={{ transitionDelay: '400ms' }}
						>
							<h2 className="text-2xl font-bold text-dblue mb-6">
								Specifications
							</h2>
							<div className="bg-white border border-gray-100 rounded-lg p-6">
								<div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
									{mileage && (
										<div className="flex items-center gap-3">
											<div className="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center">
												<FaTachometerAlt className="w-5 h-5 text-gray-600" />
											</div>
											<div>
												<div className="text-sm text-gray-500">
													Mileage
												</div>
												<div className="font-semibold text-dblue">
													{mileage.toLocaleString()}{' '}
													km
												</div>
											</div>
										</div>
									)}
									{transmission && (
										<div className="flex items-center gap-3">
											<div className="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center">
												<TbManualGearboxFilled className="w-5 h-5 text-gray-600" />
											</div>
											<div>
												<div className="text-sm text-gray-500">
													Transmission
												</div>
												<div className="font-semibold text-dblue">
													{transmission}
												</div>
											</div>
										</div>
									)}
									{body && (
										<div className="flex items-center gap-3">
											<div className="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center">
												<FaCar className="w-5 h-5 text-gray-600" />
											</div>
											<div>
												<div className="text-sm text-gray-500">
													Body Style
												</div>
												<div className="font-semibold text-dblue">
													{body}
												</div>
											</div>
										</div>
									)}
									{eColor && (
										<div className="flex items-center gap-3">
											<div className="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center">
												<IoColorPalette className="w-5 h-5 text-gray-600" />
											</div>
											<div>
												<div className="text-sm text-gray-500">
													Exterior
												</div>
												<div className="font-semibold text-dblue">
													{eColor}
												</div>
											</div>
										</div>
									)}
									{iColor && (
										<div className="flex items-center gap-3">
											<div className="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center">
												<IoColorPalette className="w-5 h-5 text-gray-600" />
											</div>
											<div>
												<div className="text-sm text-gray-500">
													Interior
												</div>
												<div className="font-semibold text-dblue">
													{iColor}
												</div>
											</div>
										</div>
									)}
									{engine && (
										<div className="flex items-center gap-3">
											<div className="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center">
												<BsFuelPump className="w-5 h-5 text-gray-600" />
											</div>
											<div>
												<div className="text-sm text-gray-500">
													Engine
												</div>
												<div className="font-semibold text-dblue">
													{engine}
												</div>
											</div>
										</div>
									)}
									{fuel && (
										<div className="flex items-center gap-3">
											<div className="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center">
												<BsFuelPump className="w-5 h-5 text-gray-600" />
											</div>
											<div>
												<div className="text-sm text-gray-500">
													Fuel Type
												</div>
												<div className="font-semibold text-dblue">
													{fuel}
												</div>
											</div>
										</div>
									)}
									{seats && (
										<div className="flex items-center gap-3">
											<div className="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center">
												<FaUsers className="w-5 h-5 text-gray-600" />
											</div>
											<div>
												<div className="text-sm text-gray-500">
													Seats
												</div>
												<div className="font-semibold text-dblue">
													{seats}
												</div>
											</div>
										</div>
									)}
									{doors && (
										<div className="flex items-center gap-3">
											<div className="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center">
												<RiDoorOpenLine className="w-5 h-5 text-gray-600" />
											</div>
											<div>
												<div className="text-sm text-gray-500">
													Doors
												</div>
												<div className="font-semibold text-dblue">
													{doors}
												</div>
											</div>
										</div>
									)}
									{vin && (
										<div className="flex items-center gap-3">
											<div className="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center">
												<MdOutlineNumbers className="w-5 h-5 text-gray-600" />
											</div>
											<div>
												<div className="text-sm text-gray-500">
													VIN
												</div>
												<div className="font-semibold text-dblue font-mono text-sm">
													{vin}
												</div>
											</div>
										</div>
									)}
									{safety && (
										<div className="flex items-center gap-3">
											<div className="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center">
												<HiOutlineShieldCheck className="w-5 h-5 text-gray-600" />
											</div>
											<div>
												<div className="text-sm text-gray-500">
													Safety
												</div>
												<div
													className={`font-semibold ${
														safety.toLowerCase() ===
														'certified'
															? 'text-lgreen'
															: 'text-dblue'
													}`}
												>
													{safety}
												</div>
											</div>
										</div>
									)}
								</div>
							</div>
						</div>
					</div>

					{/* Sidebar - Sticky */}
					<div className="lg:col-span-1">
						<div className="lg:sticky lg:top-24 space-y-6">
							{/* Price Card */}
							<div
								className={`bg-white border border-gray-100 rounded-lg p-6 shadow-sm transition-all duration-1000 ${
									mounted
										? 'opacity-100 translate-y-0'
										: 'opacity-0 translate-y-10'
								}`}
								style={{ transitionDelay: '300ms' }}
							>
								<div className="text-center mb-6">
									<div className="text-sm text-gray-500 mb-2">
										Price
									</div>
									<div className="text-4xl font-extrabold text-dblue mb-1">
										${price.toLocaleString()}
										<span className="text-xl font-normal text-gray-500 ml-1">
											+ HST
										</span>
									</div>
									{financingAvailable && !sold && (
										<div className="mt-3 mb-2 px-4 py-2 bg-lgreen/10 border-2 border-lgreen rounded-lg">
											<div className="flex items-center justify-center gap-2 text-lgreen font-semibold">
												<FaDollarSign className="w-4 h-4" />
												<span className="text-base">Financing Available</span>
											</div>
										</div>
									)}
									{safety && (
										<div className="flex items-center justify-center gap-1.5 mt-3">
											<HiOutlineShieldCheck
												className={`w-4 h-4 ${
													safety.toLowerCase() ===
													'certified'
														? 'text-lgreen'
														: 'text-gray-400'
												}`}
											/>
											<span
												className={`text-sm font-medium ${
													safety.toLowerCase() ===
													'certified'
														? 'text-lgreen'
														: 'text-gray-600'
												}`}
											>
												{safety}
											</span>
										</div>
									)}
								</div>

								{!sold && (
									<div className="space-y-3">
										<a
											href="tel:+15197012378"
											className="w-full bg-dblue text-white py-3 px-6 rounded-md font-semibold hover:bg-dblue/90 transition-colors flex items-center justify-center gap-2"
										>
											<FaPhone className="w-4 h-4 scale-x-[-1]" />
											Call Now
										</a>
										<a
											href="mailto:starautosalesinfo@gmail.com"
											className="w-full bg-lred text-white py-3 px-6 rounded-md font-semibold hover:bg-lred/90 transition-colors flex items-center justify-center gap-2"
										>
											<FaEnvelope className="w-4 h-4" />
											Email Us
										</a>
									</div>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
