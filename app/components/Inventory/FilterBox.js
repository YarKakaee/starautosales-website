'use client';

import axios from 'axios';
import { useEffect, useState } from 'react';

export default function FilterBox({
	selectedMake,
	setSelectedMake,
	selectedModel,
	setSelectedModel,
	selectedTransmission,
	setSelectedTransmission,
	selectedBodyStyle,
	setSelectedBodyStyle,
	selectedYear,
	setSelectedYear,
	selectedMaxPrice,
	setSelectedMaxPrice,
	selectedMaxMileage,
	setSelectedMaxMileage,
	onSearch,
}) {
	const [inventoryData, setInventoryData] = useState([]);
	const [makes, setMakes] = useState([]);
	const [models, setModels] = useState([]);
	const [bodyStyles, setBodyStyles] = useState([]);

	useEffect(() => {
		async function fetchData() {
			try {
				const response = await axios.get('/api/getAllCars');
				const data = response.data;
				const uniqueMakes = [
					...new Set(data.cars.map((car) => car.make)),
				];
				const uniqueBodyStyles = [
					...new Set(data.cars.map((car) => car.body)),
				];
				setMakes(uniqueMakes);
				setBodyStyles(uniqueBodyStyles);
				setInventoryData(data.cars);
			} catch (error) {
				console.error('Error fetching data:', error);
			}
		}

		fetchData();
	}, []);

	const handleMakeChange = (e) => {
		const selectedMake = e.target.value;
		setSelectedMake(selectedMake);

		const filteredModels = inventoryData
			.filter((item) => item.make === selectedMake)
			.map((item) => item.model);
		const uniqueModels = Array.from(new Set(filteredModels));
		setModels(uniqueModels);

		setSelectedModel('');
	};

	const handleModelChange = (e) => {
		setSelectedModel(e.target.value);
	};

	const handleTransmissionChange = (e) => {
		setSelectedTransmission(e.target.value);
	};

	const handleBodyStyleChange = (e) => {
		setSelectedBodyStyle(e.target.value);
	};

	const handleYearChange = (e) => {
		setSelectedYear(e.target.value);
	};

	const handleMaxPriceChange = (e) => {
		setSelectedMaxPrice(e.target.value);
	};

	const handleMaxMileageChange = (e) => {
		setSelectedMaxMileage(e.target.value);
	};

	const handleResetFilters = () => {
		setSelectedMake('');
		setSelectedModel('');
		setSelectedTransmission('');
		setSelectedBodyStyle('');
		setSelectedYear('');
		setSelectedMaxPrice('');
		setSelectedMaxMileage('');
	};

	return (
		<div className="w-96 h-fit bg-white rounded-md drop-shadow-[1px_1px_20px_rgba(0,0,0,0.2)] p-7 text-dblue">
			<h1 className="text-xl font-bold">Filter Results</h1>
			<button
				className="mt-2 text-sm text-dblue hover:underline"
				onClick={handleResetFilters}
			>
				Reset Filters
			</button>
			<div className="mt-5">
				<div>
					<h3 className="mt-3 lg:mt-5 font-medium text-base">Make</h3>
					<select
						className="w-full rounded-md bg-white ring-lwhite ring-1 p-2 transition ease-in-out hover:drop-shadow-lg cursor-pointer mt-2 text-sm"
						onChange={handleMakeChange}
						value={selectedMake}
					>
						<option value="">Any</option>
						{makes.map((make) => (
							<option key={make} value={make}>
								{make}
							</option>
						))}
					</select>
				</div>
				<div>
					<h3 className="mt-3 lg:mt-5 font-medium text-base">Model</h3>
					<select
						className="w-full rounded-md bg-white ring-lwhite ring-1 p-2 transition ease-in-out hover:drop-shadow-lg cursor-pointer mt-2 text-sm"
						onChange={handleModelChange}
						value={selectedModel}
					>
						{selectedMake ? (
							<>
								<option value="">Any</option>
								{models.map((model) => (
									<option key={model} value={model}>
										{model}
									</option>
								))}
							</>
						) : (
							<option value="">Select a make</option>
						)}
					</select>
				</div>
				<div>
					<h3 className="mt-3 lg:mt-5 font-medium text-base">
						Transmission
					</h3>
					<select
						className="w-full rounded-md bg-white ring-lwhite ring-1 p-2 transition ease-in-out hover:drop-shadow-lg cursor-pointer mt-2 text-sm"
						onChange={handleTransmissionChange}
						value={selectedTransmission}
					>
						<option value="">Any</option>
						<option value="Automatic">Automatic</option>
						<option value="Manual">Manual</option>
					</select>
				</div>
				<div>
					<h3 className="mt-3 lg:mt-5 font-medium text-base">
						Body Style
					</h3>
					<select
						className="w-full rounded-md bg-white ring-lwhite ring-1 p-2 transition ease-in-out hover:drop-shadow-lg cursor-pointer mt-2 text-sm"
						onChange={handleBodyStyleChange}
						value={selectedBodyStyle}
					>
						<option value="">Any</option>
						{bodyStyles.map((style) => (
							<option key={style} value={style}>
								{style}
							</option>
						))}
					</select>
				</div>
				<div>
					<h3 className="mt-3 lg:mt-5 font-medium text-base">Year</h3>
					<select
						className="w-full rounded-md bg-white ring-lwhite ring-1 p-2 transition ease-in-out hover:drop-shadow-lg cursor-pointer mt-2 text-sm"
						onChange={handleYearChange}
						value={selectedYear}
					>
						<option value="">Any</option>
						<option value="Released before 2000">
							Released before 2000
						</option>
						<option value="2001 - 2005">2001 - 2005</option>
						<option value="2006 - 2010">2006 - 2010</option>
						<option value="2011 - 2015">2011 - 2015</option>
						<option value="2016 - 2020">2016 - 2020</option>
						<option value="Released in 2021 and later">
							Released in 2021 and later
						</option>
					</select>
				</div>
				<div>
					<h3 className="mt-3 lg:mt-5 font-medium text-base">
						Max. Price
					</h3>
					<select
						className="w-full rounded-md bg-white ring-lwhite ring-1 p-2 transition ease-in-out hover:drop-shadow-lg cursor-pointer mt-2 text-sm"
						onChange={handleMaxPriceChange}
						value={selectedMaxPrice}
					>
						<option value="">Unlimited</option>
						<option value="$5,000">$5,000</option>
						<option value="$10,000">$10,000</option>
						<option value="$20,000">$20,000</option>
						<option value="$30,000">$30,000</option>
						<option value="$40,000">$40,000</option>
						<option value="$50,000">$50,000</option>
					</select>
				</div>
				<div>
					<h3 className="mt-3 lg:mt-5 font-medium text-base">
						Max. Mileage
					</h3>
					<select
						className="w-full rounded-md bg-white ring-lwhite ring-1 p-2 transition ease-in-out hover:drop-shadow-lg cursor-pointer mt-2 text-sm"
						onChange={handleMaxMileageChange}
						value={selectedMaxMileage}
					>
						<option value="">Unlimited</option>
						<option value="25000">25,000 km</option>
						<option value="50000">50,000 km</option>
						<option value="100000">100,000 km</option>
						<option value="150000">150,000 km</option>
						<option value="200000">200,000 km</option>
						<option value="250000">250,000 km</option>
					</select>
				</div>
			</div>
			<button
				className="w-full bg-dblue text-white transition ease-in-out rounded-md mt-6 p-2 text-base font-medium drop-shadow-lg hover:drop-shadow-[1px_1px_20px_rgba(0,0,0,0.2)]"
				onClick={onSearch}
			>
				Search
			</button>
		</div>
	);
}

