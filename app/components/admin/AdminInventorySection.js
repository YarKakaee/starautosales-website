'use client';

import axios from 'axios';
import { useEffect, useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';
import VehicleCard from '../VehicleCard';

export default function AdminInventorySection() {
	const [cars, setCars] = useState([]);
	const [filteredCars, setFilteredCars] = useState([]);
	const [loading, setLoading] = useState(true);
	const [mounted, setMounted] = useState(false);
	const [searchTerm, setSearchTerm] = useState('');
	const [selectedMake, setSelectedMake] = useState('');
	const [selectedTransmission, setSelectedTransmission] = useState('');
	const [selectedBodyStyle, setSelectedBodyStyle] = useState('');
	const [sortBy, setSortBy] = useState('newest');

	useEffect(() => {
		async function fetchCars() {
			try {
				const response = await axios.get('/api/getAllCars');
				// Show all cars in admin (including sold ones)
				const allCars = response.data.cars || [];
				setCars(allCars);
				setFilteredCars(allCars);
			} catch (error) {
				console.error('Error fetching cars:', error);
			} finally {
				setLoading(false);
				setTimeout(() => setMounted(true), 100);
			}
		}
		fetchCars();
	}, []);

	useEffect(() => {
		let filtered = [...cars];

		// Search filter
		if (searchTerm) {
			const term = searchTerm.toLowerCase();
			filtered = filtered.filter(
				(car) =>
					car.make.toLowerCase().includes(term) ||
					car.model.toLowerCase().includes(term) ||
					car.year.toString().includes(term)
			);
		}

		// Make filter
		if (selectedMake) {
			filtered = filtered.filter((car) => car.make === selectedMake);
		}

		// Transmission filter
		if (selectedTransmission) {
			filtered = filtered.filter(
				(car) => car.transmission === selectedTransmission
			);
		}

		// Body style filter
		if (selectedBodyStyle) {
			filtered = filtered.filter((car) => car.body === selectedBodyStyle);
		}

		// Sort
		switch (sortBy) {
			case 'newest':
				filtered.sort((a, b) => b.year - a.year);
				break;
			case 'oldest':
				filtered.sort((a, b) => a.year - b.year);
				break;
			case 'priceLow':
				filtered.sort((a, b) => a.price - b.price);
				break;
			case 'priceHigh':
				filtered.sort((a, b) => b.price - a.price);
				break;
			default:
				break;
		}

		setFilteredCars(filtered);
	}, [cars, searchTerm, selectedMake, selectedTransmission, selectedBodyStyle, sortBy]);

	const uniqueMakes = [...new Set(cars.map((car) => car.make))].sort();
	const uniqueTransmissions = [
		...new Set(cars.map((car) => car.transmission)),
	].sort();
	const uniqueBodyStyles = [...new Set(cars.map((car) => car.body))].sort();

	const resetFilters = () => {
		setSearchTerm('');
		setSelectedMake('');
		setSelectedTransmission('');
		setSelectedBodyStyle('');
		setSortBy('newest');
	};

	if (loading) {
		return (
			<section className="py-12 bg-white">
				<div className="max-w-7xl mx-auto px-6 lg:px-8">
					<div className="text-center text-gray-400">Loading...</div>
				</div>
			</section>
		);
	}

	return (
		<section className="py-12 bg-white">
			<div className="max-w-7xl mx-auto px-6 lg:px-8">
				{/* Filters */}
				<div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center mb-8">
					{/* Search */}
					<div className="flex-1 w-full lg:max-w-sm">
						<input
							type="text"
							placeholder="Search..."
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
							className="w-full px-4 py-2.5 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-dblue focus:border-dblue transition-all duration-200 text-sm"
						/>
					</div>

					{/* Filters Row */}
					<div className="flex flex-wrap gap-3 items-center">
						<div className="relative">
							<select
								value={selectedMake}
								onChange={(e) => setSelectedMake(e.target.value)}
								className="px-3 pr-8 py-2.5 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-dblue focus:border-dblue transition-all duration-200 text-sm bg-white appearance-none cursor-pointer"
							>
								<option value="">All Makes</option>
								{uniqueMakes.map((make) => (
									<option key={make} value={make}>
										{make}
									</option>
								))}
							</select>
							<FaChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-400 pointer-events-none" />
						</div>

						<div className="relative">
							<select
								value={selectedTransmission}
								onChange={(e) =>
									setSelectedTransmission(e.target.value)
								}
								className="px-3 pr-8 py-2.5 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-dblue focus:border-dblue transition-all duration-200 text-sm bg-white appearance-none cursor-pointer"
							>
								<option value="">Transmission</option>
								{uniqueTransmissions.map((trans) => (
									<option key={trans} value={trans}>
										{trans}
									</option>
								))}
							</select>
							<FaChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-400 pointer-events-none" />
						</div>

						<div className="relative">
							<select
								value={selectedBodyStyle}
								onChange={(e) =>
									setSelectedBodyStyle(e.target.value)
								}
								className="px-3 pr-8 py-2.5 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-dblue focus:border-dblue transition-all duration-200 text-sm bg-white appearance-none cursor-pointer"
							>
								<option value="">Body Style</option>
								{uniqueBodyStyles.map((body) => (
									<option key={body} value={body}>
										{body}
									</option>
								))}
							</select>
							<FaChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-400 pointer-events-none" />
						</div>

						<div className="relative">
							<select
								value={sortBy}
								onChange={(e) => setSortBy(e.target.value)}
								className="px-3 pr-8 py-2.5 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-dblue focus:border-dblue transition-all duration-200 text-sm bg-white appearance-none cursor-pointer"
							>
								<option value="newest">Newest</option>
								<option value="oldest">Oldest</option>
								<option value="priceLow">Price: Low</option>
								<option value="priceHigh">Price: High</option>
							</select>
							<FaChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-400 pointer-events-none" />
						</div>

						{(searchTerm ||
							selectedMake ||
							selectedTransmission ||
							selectedBodyStyle ||
							sortBy !== 'newest') && (
							<button
								onClick={resetFilters}
								className="px-3 py-2.5 text-sm text-gray-600 hover:text-dblue transition-colors duration-200"
							>
								Reset
							</button>
						)}
					</div>
				</div>

				{/* Results Count */}
				{filteredCars.length > 0 && (
					<div className="mb-8 pb-4 border-b border-gray-100">
						<div className="text-sm text-gray-500">
							{filteredCars.length}{' '}
							{filteredCars.length === 1 ? 'vehicle' : 'vehicles'}
						</div>
					</div>
				)}

				{/* Inventory Grid */}
				{filteredCars.length === 0 ? (
					<div className="text-center py-20">
						<p className="text-lg text-gray-400 mb-4">
							No vehicles found.
						</p>
						<button
							onClick={resetFilters}
							className="px-6 py-2.5 text-sm text-dblue hover:text-gray-700 transition-colors duration-200"
						>
							Clear filters
						</button>
					</div>
				) : (
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
						{filteredCars.map((car, index) => (
							<VehicleCard
								key={car.listingId}
								car={car}
								index={index}
								mounted={mounted}
								animationDelay={30}
								href={`/admin/addvehicle/${car.listingId}`}
							/>
						))}
					</div>
				)}
			</div>
		</section>
	);
}

