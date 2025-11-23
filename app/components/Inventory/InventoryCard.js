'use client';

import Image from 'next/image';
import Link from 'next/link';
import { FaCar, FaTachometerAlt } from 'react-icons/fa';
import { FaAngleRight } from 'react-icons/fa6';
import { FiEdit } from 'react-icons/fi';
import { IoColorPalette } from 'react-icons/io5';
import { LuClipboardList } from 'react-icons/lu';
import { MdOutlineNumbers } from 'react-icons/md';
import { TbManualGearboxFilled } from 'react-icons/tb';

export default function InventoryCard({ car, view }) {
	const {
		stockId,
		listingId,
		year,
		make,
		model,
		transmission,
		body,
		eColor,
		mileage,
		price,
		image1,
		vin,
		sold,
	} = car;

	return (
		<div className="relative w-full h-fit bg-white rounded-md drop-shadow-lg flex flex-col sm:flex-row text-dblue mb-4">
			{sold && (
				<div className="absolute top-4 left-4 z-10 bg-[#f14747] text-white px-4 py-2 rounded-md font-bold text-lg shadow-lg transform -rotate-12">
					SOLD!
				</div>
			)}

			<div className="w-1/3 xl:w-2/5">
				{image1 && image1.trim() !== '' ? (
					<Image
						src={image1}
						alt={`${year} ${make} ${model}`}
						width={1000}
						height={1000}
						className={`w-full h-2/5 sm:h-full object-cover cursor-pointer absolute sm:w-1/3 xl:w-2/5 overflow-hidden top-0 left-0 right-0 bottom-0 rounded-tl-md rounded-tr-md sm:rounded-bl-md sm:rounded-tr-none ${
							sold ? 'opacity-50' : ''
						}`}
					/>
				) : (
					<div className={`w-full h-2/5 sm:h-full bg-gray-200 flex items-center justify-center absolute sm:w-1/3 xl:w-2/5 overflow-hidden top-0 left-0 right-0 bottom-0 rounded-tl-md rounded-tr-md sm:rounded-bl-md sm:rounded-tr-none ${
						sold ? 'opacity-50' : ''
					}`}>
						<FaCar className="text-gray-400 text-6xl" />
					</div>
				)}
			</div>
			<div className="flex flex-col mt-52 sm:ml-28 sm:mt-2 p-8 flex-grow">
				<div className="flex flex-row space-x-2">
					<h2 className="text-xl text-lgrey font-medium pl-1">
						{year}
					</h2>
					<h2 className="text-xl text-dblue font-extrabold">
						{make}
					</h2>
					<h2 className="text-xl text-dblue font-extrabold">
						{model}
					</h2>
				</div>
				<div className="flex mt-1 justify-between flex-wrap">
					<div className="flex items-center space-x-2 text-lgrey mt-4 p-1.5 rounded-md hover:bg-lwhite">
						<TbManualGearboxFilled />
						<p className="text-base">{transmission}</p>
					</div>
					<div className="flex items-center space-x-2 text-lgrey mt-4 p-1.5 rounded-md hover:bg-lwhite">
						<FaCar />
						<p className="text-base">{body}</p>
					</div>
					<div className="flex items-center space-x-2 text-lgrey mt-4 p-1.5 rounded-md hover:bg-lwhite">
						<IoColorPalette />
						<p className="text-base">{eColor}</p>
					</div>
					<div className="flex items-center space-x-2 text-lgrey mt-4 p-1.5 rounded-md hover:bg-lwhite">
						<FaTachometerAlt />
						<p className="text-base">
							{mileage.toLocaleString()} km
						</p>
					</div>
					<div className="flex items-center space-x-2 text-lgrey mt-4 p-1.5 rounded-md hover:bg-lwhite">
						<MdOutlineNumbers />
						<p className="text-base">{vin}</p>
					</div>
					<div className="flex items-center space-x-2 text-lgrey mt-4 p-1.5 rounded-md hover:bg-lwhite">
						<LuClipboardList />
						<p className="text-base">
							SAS
							{stockId < 10
								? `00${stockId}`
								: stockId < 100
								? `0${stockId}`
								: stockId}
						</p>
					</div>
				</div>
				<div className="flex flex-row justify-between mt-5 flex-wrap">
					<h2 className="pl-1 mt-1 text-2xl text-dblue font-extrabold">
						$ {price.toLocaleString()}
						<span className="text-base font-normal text-gray-500 ml-1">
							+HST
						</span>
					</h2>
					{view === 'normal' ? (
						<Link href={`/vehicles/${listingId}`}>
							<button className="w-fit bg-dblue text-white transition ease-in-out rounded-md py-1.5 px-3 border text-sm font-medium drop-shadow-lg hover:bg-white hover:text-dblue hover:font-medium flex items-center space-x-2 sm:mt-0.5">
								<h2>More Details</h2>
								<FaAngleRight />
							</button>
						</Link>
					) : (
						<Link href={`/admin/${listingId}`}>
							<button className="w-fit bg-dblue text-white transition ease-in-out rounded-md py-1.5 px-3 border text-sm font-medium drop-shadow-lg hover:bg-white hover:text-dblue hover:font-medium flex items-center space-x-2 sm:mt-0.5">
								<h2>Edit Vehicle</h2>
								<FiEdit />
							</button>
						</Link>
					)}
				</div>
			</div>
		</div>
	);
}

