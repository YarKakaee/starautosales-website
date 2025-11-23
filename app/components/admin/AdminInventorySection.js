'use client';

import axios from 'axios';
import { useEffect, useState } from 'react';
import FilterBox from '../Inventory/FilterBox';
import InventoryCard from '../Inventory/InventoryCard';
import Pagination from '../Inventory/Pagination';

export default function AdminInventorySection() {
	const [inventoryData, setInventoryData] = useState([]);
	const [filteredInventoryData, setFilteredInventoryData] = useState([]);
	const [selectedMake, setSelectedMake] = useState('');
	const [selectedModel, setSelectedModel] = useState('');
	const [selectedTransmission, setSelectedTransmission] = useState('');
	const [selectedBodyStyle, setSelectedBodyStyle] = useState('');
	const [selectedYear, setSelectedYear] = useState('');
	const [selectedMaxPrice, setSelectedMaxPrice] = useState('');
	const [selectedMaxMileage, setSelectedMaxMileage] = useState('');
	const [selectedSortOption, setSelectedSortOption] = useState('');
	const [currentPage, setCurrentPage] = useState(1);
	const pageSize = 6;

	useEffect(() => {
		async function fetchAllCars() {
			try {
				const response = await axios.get('/api/getAllCars');
				const data = response.data;
				setInventoryData(data.cars);
				setFilteredInventoryData(data.cars);
			} catch (error) {
				console.error('Error fetching all cars:', error);
			}
		}

		fetchAllCars();
	}, []);

	const handleSearch = () => {
		const filteredData = inventoryData.filter((car) => {
			if (selectedMake && car.make !== selectedMake) {
				return false;
			}
			if (selectedModel && car.model !== selectedModel) {
				return false;
			}
			if (
				selectedTransmission &&
				car.transmission !== selectedTransmission
			) {
				return false;
			}
			if (selectedBodyStyle && car.body !== selectedBodyStyle) {
				return false;
			}

			if (selectedYear) {
				const year = car.year;
				switch (selectedYear) {
					case 'Released before 2000':
						if (year >= 2000) {
							return false;
						}
						break;
					case '2001 - 2005':
						if (year < 2001 || year > 2005) {
							return false;
						}
						break;
					case '2006 - 2010':
						if (year < 2006 || year > 2010) {
							return false;
						}
						break;
					case '2011 - 2015':
						if (year < 2011 || year > 2015) {
							return false;
						}
						break;
					case '2016 - 2020':
						if (year < 2016 || year > 2020) {
							return false;
						}
						break;
					case 'Released in 2021 and later':
						if (year < 2021) {
							return false;
						}
						break;
					default:
						break;
				}
			}

			if (selectedMaxPrice) {
				const price = car.price;
				switch (selectedMaxPrice) {
					case '$5,000':
						if (price > 5000) {
							return false;
						}
						break;
					case '$10,000':
						if (price > 10000) {
							return false;
						}
						break;
					case '$20,000':
						if (price > 20000) {
							return false;
						}
						break;
					case '$30,000':
						if (price > 30000) {
							return false;
						}
						break;
					case '$40,000':
						if (price > 40000) {
							return false;
						}
						break;
					case '$50,000':
						if (price > 50000) {
							return false;
						}
						break;
					default:
						break;
				}
			}

			if (selectedMaxMileage) {
				const mileage = car.mileage;
				switch (selectedMaxMileage) {
					case '25000':
						if (mileage > 25000) {
							return false;
						}
						break;
					case '50000':
						if (mileage > 50000) {
							return false;
						}
						break;
					case '100000':
						if (mileage > 100000) {
							return false;
						}
						break;
					case '150000':
						if (mileage > 150000) {
							return false;
						}
						break;
					case '200000':
						if (mileage > 200000) {
							return false;
						}
						break;
					case '250000':
						if (mileage > 250000) {
							return false;
						}
						break;
					default:
						break;
				}
			}
			return true;
		});

		setFilteredInventoryData(filteredData);
		setCurrentPage(1);
	};

	const handleSortChange = (e) => {
		const sortOption = e.target.value;
		setSelectedSortOption(sortOption);

		let sortedData = [...filteredInventoryData];

		switch (sortOption) {
			case 'priceAsc':
				sortedData.sort((a, b) => a.price - b.price);
				break;
			case 'priceDesc':
				sortedData.sort((a, b) => b.price - a.price);
				break;
			case 'yearAsc':
				sortedData.sort((a, b) => b.year - a.year);
				break;
			case 'yearDesc':
				sortedData.sort((a, b) => a.year - b.year);
				break;
			default:
				break;
		}

		setFilteredInventoryData(sortedData);
		setCurrentPage(1);
	};

	const indexOfLastCar = currentPage * pageSize;
	const indexOfFirstCar = indexOfLastCar - pageSize;
	const currentItems = filteredInventoryData.slice(
		indexOfFirstCar,
		indexOfLastCar
	);

	const paginate = (pageNumber) => setCurrentPage(pageNumber);

	return (
		<div>
			<section className="px-4 sm:px-6 md:px-24 lg:px-32 xl:px-48 2xl:px-64 pt-6 pb-16 bg-lwhite text-dblue -mt-96">
				<div className="flex flex-col lg:flex-row">
					<div className="mx-auto lg:ml-0">
						<FilterBox
							selectedMake={selectedMake}
							setSelectedMake={setSelectedMake}
							selectedModel={selectedModel}
							setSelectedModel={setSelectedModel}
							selectedTransmission={selectedTransmission}
							setSelectedTransmission={setSelectedTransmission}
							selectedBodyStyle={selectedBodyStyle}
							setSelectedBodyStyle={setSelectedBodyStyle}
							selectedYear={selectedYear}
							setSelectedYear={setSelectedYear}
							selectedMaxPrice={selectedMaxPrice}
							setSelectedMaxPrice={setSelectedMaxPrice}
							selectedMaxMileage={selectedMaxMileage}
							setSelectedMaxMileage={setSelectedMaxMileage}
							onSearch={handleSearch}
						/>
					</div>
					<div className="w-full flex flex-col lg:ml-12">
						<div className="flex flex-row justify-between mt-12 lg:mt-7 gap-5">
							<h1 className="xl:text-lg font-medium mb-10">
								{filteredInventoryData.length === 0 ? (
									<p>
										No cars found with the applied filters.
									</p>
								) : filteredInventoryData.length > pageSize ? (
									<>
										Showing{' '}
										<strong>
											{indexOfFirstCar + 1} -{' '}
											{Math.min(
												indexOfLastCar,
												filteredInventoryData.length
											)}{' '}
										</strong>
										of{' '}
										<strong>
											{filteredInventoryData.length}
										</strong>{' '}
										vehicles
									</>
								) : (
									<>
										Showing{' '}
										<strong>
											{filteredInventoryData.length}
										</strong>{' '}
										vehicle
										{filteredInventoryData.length !== 1 &&
											's'}
									</>
								)}
							</h1>
							<div>
								<h3 className="-mt-5 font-medium text-base">
									Sort By
								</h3>
								<select
									className="w-full rounded-md bg-white ring-lwhite ring-1 p-2 transition ease-in-out hover:drop-shadow-lg cursor-pointer text-sm"
									value={selectedSortOption}
									onChange={handleSortChange}
								>
									<option value="">Default</option>
									<option value="priceAsc">
										Price (Low to High)
									</option>
									<option value="priceDesc">
										Price (High to Low)
									</option>
									<option value="yearAsc">
										Year (New to Old)
									</option>
									<option value="yearDesc">
										Year (Old to New)
									</option>
								</select>
							</div>
						</div>

						{currentItems.map((car) => (
							<InventoryCard
								key={car.stockId}
								car={car}
								view="admin"
							/>
						))}

						{filteredInventoryData.length > pageSize && (
							<Pagination
								currentPage={currentPage}
								totalPages={Math.ceil(
									filteredInventoryData.length / pageSize
								)}
								onPageChange={paginate}
								view="admin"
							/>
						)}
					</div>
				</div>
			</section>
		</div>
	);
}

