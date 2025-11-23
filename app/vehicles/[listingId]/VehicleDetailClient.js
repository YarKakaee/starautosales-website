'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaCar, FaTachometerAlt, FaPhone, FaEnvelope } from 'react-icons/fa';
import { IoColorPalette } from 'react-icons/io5';
import { LuClipboardList } from 'react-icons/lu';
import { MdOutlineNumbers } from 'react-icons/md';
import { TbManualGearboxFilled } from 'react-icons/tb';
import { HiOutlineShieldCheck } from 'react-icons/hi';
import { BsFuelPump } from 'react-icons/bs';
import { RiDoorOpenLine } from 'react-icons/ri';
import { FaUsers, FaArrowLeft } from 'react-icons/fa6';

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

	const [selectedImage, setSelectedImage] = useState(images[0] || null);

	const formatStockId = (id) => {
		if (id < 10) return `00${id}`;
		if (id < 100) return `0${id}`;
		return id;
	};

	return (
		<div className="min-h-screen bg-lwhite pt-36 lg:pt-48">
			{/* Back button - positioned below navbar */}
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
				<Link
					href="/"
					className="inline-flex items-center text-dblue hover:text-lred transition-colors"
				>
					<FaArrowLeft className="mr-2" />
					<span className="font-medium">Back to Inventory</span>
				</Link>
			</div>

			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
				{/* Sold Badge */}
				{sold && (
					<div className="mb-6 flex justify-center">
						<div className="bg-[#f14747] text-white px-6 py-3 rounded-md font-bold text-xl shadow-lg">
							SOLD
						</div>
					</div>
				)}

				{/* Title Section */}
				<div className="mb-8">
					<h1 className="text-4xl md:text-5xl font-extrabold text-dblue mb-2">
						{year} {make} {model}
					</h1>
					<div className="flex items-center space-x-4 text-lgrey">
						<span className="flex items-center">
							<LuClipboardList className="mr-2" />
							Stock #: SAS{formatStockId(stockId)}
						</span>
					</div>
				</div>

				<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
					{/* Left Column - Images */}
					<div className="lg:col-span-2">
						{/* Main Image */}
						<div className="bg-white rounded-lg shadow-lg overflow-hidden mb-4">
							{selectedImage ? (
								<div className="relative w-full aspect-video">
									<Image
										src={selectedImage}
										alt={`${year} ${make} ${model}`}
										fill
										className="object-cover"
										priority
									/>
								</div>
							) : (
								<div className="w-full aspect-video bg-gray-200 flex items-center justify-center">
									<FaCar className="text-gray-400 text-8xl" />
								</div>
							)}
						</div>

						{/* Thumbnail Gallery */}
						{images.length > 1 && (
							<div className="grid grid-cols-5 gap-2">
								{images.map((img, index) => (
									<button
										key={index}
										onClick={() => setSelectedImage(img)}
										className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${
											selectedImage === img
												? 'border-dblue ring-2 ring-dblue'
												: 'border-gray-200 hover:border-dblue'
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
						)}
					</div>

					{/* Right Column - Details & Price */}
					<div className="lg:col-span-1">
						{/* Price Card */}
						<div className="bg-white rounded-lg shadow-lg p-6 mb-6">
							<div className="text-center">
								<div className="text-sm text-lgrey mb-2">
									Price
								</div>
								<div className="text-4xl font-extrabold text-dblue mb-4">
									${price.toLocaleString()}
									<span className="text-xl font-normal text-gray-500 ml-1.5">
										+HST
									</span>
								</div>
								{financingAvailable && (
									<div className="text-sm text-lgreen font-medium mb-4">
										✓ Financing Available
									</div>
								)}
								{!sold && (
									<>
										<a
											href="tel:+15197012378"
											className="block w-full bg-dblue text-white py-3 px-6 rounded-md font-semibold hover:bg-gray-800 transition-colors mb-3 flex items-center justify-center"
										>
											<FaPhone className="mr-2" />
											Call Now
										</a>
										<a
											href="mailto:starautosalesinfo@gmail.com"
											className="block w-full bg-lred text-white py-3 px-6 rounded-md font-semibold hover:bg-lredhover transition-colors flex items-center justify-center"
										>
											<FaEnvelope className="mr-2" />
											Email Us
										</a>
									</>
								)}
							</div>
						</div>

						{/* Quick Info Card */}
						<div className="bg-white rounded-lg shadow-lg p-6">
							<h3 className="text-xl font-bold text-dblue mb-4">
								Quick Info
							</h3>
							<div className="space-y-3">
								<div className="flex items-center justify-between py-2 border-b border-gray-100">
									<div className="flex items-center text-lgrey">
										<FaTachometerAlt className="mr-2" />
										<span>Mileage</span>
									</div>
									<span className="font-semibold text-dblue">
										{mileage.toLocaleString()} km
									</span>
								</div>
								<div className="flex items-center justify-between py-2 border-b border-gray-100">
									<div className="flex items-center text-lgrey">
										<TbManualGearboxFilled className="mr-2" />
										<span>Transmission</span>
									</div>
									<span className="font-semibold text-dblue">
										{transmission}
									</span>
								</div>
								<div className="flex items-center justify-between py-2 border-b border-gray-100">
									<div className="flex items-center text-lgrey">
										<FaCar className="mr-2" />
										<span>Body Style</span>
									</div>
									<span className="font-semibold text-dblue">
										{body}
									</span>
								</div>
								<div className="flex items-center justify-between py-2 border-b border-gray-100">
									<div className="flex items-center text-lgrey">
										<IoColorPalette className="mr-2" />
										<span>Exterior</span>
									</div>
									<span className="font-semibold text-dblue">
										{eColor}
									</span>
								</div>
								{iColor && (
									<div className="flex items-center justify-between py-2 border-b border-gray-100">
										<div className="flex items-center text-lgrey">
											<IoColorPalette className="mr-2" />
											<span>Interior</span>
										</div>
										<span className="font-semibold text-dblue">
											{iColor}
										</span>
									</div>
								)}
							</div>
						</div>
					</div>
				</div>

				{/* Detailed Specifications */}
				<div className="mt-8 bg-white rounded-lg shadow-lg p-6 md:p-8">
					<h2 className="text-2xl font-bold text-dblue mb-6">
						Specifications
					</h2>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						{engine && (
							<div className="flex items-start space-x-3">
								<FaCar className="text-lred text-xl mt-1" />
								<div>
									<div className="text-sm text-lgrey">
										Engine
									</div>
									<div className="font-semibold text-dblue">
										{engine}
									</div>
								</div>
							</div>
						)}
						{fuel && (
							<div className="flex items-start space-x-3">
								<BsFuelPump className="text-lred text-xl mt-1" />
								<div>
									<div className="text-sm text-lgrey">
										Fuel Type
									</div>
									<div className="font-semibold text-dblue">
										{fuel}
									</div>
								</div>
							</div>
						)}
						{seats && (
							<div className="flex items-start space-x-3">
								<FaUsers className="text-lred text-xl mt-1" />
								<div>
									<div className="text-sm text-lgrey">
										Seats
									</div>
									<div className="font-semibold text-dblue">
										{seats}
									</div>
								</div>
							</div>
						)}
						{doors && (
							<div className="flex items-start space-x-3">
								<RiDoorOpenLine className="text-lred text-xl mt-1" />
								<div>
									<div className="text-sm text-lgrey">
										Doors
									</div>
									<div className="font-semibold text-dblue">
										{doors}
									</div>
								</div>
							</div>
						)}
						{vin && (
							<div className="flex items-start space-x-3">
								<MdOutlineNumbers className="text-lred text-xl mt-1" />
								<div>
									<div className="text-sm text-lgrey">
										VIN
									</div>
									<div className="font-semibold text-dblue font-mono text-sm">
										{vin}
									</div>
								</div>
							</div>
						)}
						{safety && (
							<div className="flex items-start space-x-3">
								<HiOutlineShieldCheck className="text-lred text-xl mt-1" />
								<div>
									<div className="text-sm text-lgrey">
										Safety
									</div>
									<div className="font-semibold text-dblue">
										{safety}
									</div>
								</div>
							</div>
						)}
					</div>
				</div>

				{/* Contact Section */}
				{!sold && (
					<div className="mt-8 bg-gradient-to-r from-dblue to-gray-800 rounded-lg shadow-lg p-8 text-white">
						<h2 className="text-2xl font-bold mb-4">
							Interested in this vehicle?
						</h2>
						<p className="text-gray-200 mb-6">
							Contact us today to schedule a test drive or get
							more information about this vehicle.
						</p>
						<div className="flex flex-col sm:flex-row gap-4">
							<a
								href="tel:+15197012378"
								className="flex-1 bg-white text-dblue py-3 px-6 rounded-md font-semibold hover:bg-gray-100 transition-colors flex items-center justify-center"
							>
								<FaPhone className="mr-2" />
								Call (519) 701-2378
							</a>
							<a
								href="mailto:starautosalesinfo@gmail.com"
								className="flex-1 bg-lred text-white py-3 px-6 rounded-md font-semibold hover:bg-lredhover transition-colors flex items-center justify-center"
							>
								<FaEnvelope className="mr-2" />
								Email Us
							</a>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
