'use client';

import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Spinner from '../Spinner';
import {
	createImagePreview,
	revokeImagePreview,
	validateImageFile,
	convertImageToJpeg,
} from '@/lib/imageUtils';

export default function AddUpdateVehicle({ car }) {
	const [currentCarId, setCurrentCarId] = useState('');
	const [isSubmitting, setSubmitting] = useState(false);
	const [isDeleting, setDeleting] = useState(false);
	const [imageFiles, setImageFiles] = useState({});
	const [imagePreviews, setImagePreviews] = useState({});
	const [uploadingImages, setUploadingImages] = useState(false);

	const router = useRouter();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		mode: 'onBlur',
	});

	useEffect(() => {
		const fetchLastCarId = async () => {
			try {
				const response = await axios.get('/api/findLastCar');
				const { lastCarId } = response.data;
				setCurrentCarId(lastCarId + 1);
			} catch (error) {
				console.error('Error fetching last car ID:', error);
			}
		};

		if (!car) {
			fetchLastCarId();
		}
	}, [car]);

	// Load existing images if editing
	useEffect(() => {
		if (car) {
			const previews = {};
			for (let i = 1; i <= 20; i++) {
				if (car[`image${i}`]) {
					previews[`image${i}`] = car[`image${i}`];
				}
			}
			setImagePreviews(previews);
		}
	}, [car]);

	const handleMultipleImages = (e) => {
		const files = Array.from(e.target.files || []);
		console.log(`Multiple images selected: ${files.length} files`);

		if (files.length === 0) return;

		// Check if more than 20 images
		if (files.length > 20) {
			alert(
				`You can only upload up to 20 images. You selected ${files.length}. Please select 20 or fewer.`
			);
			e.target.value = ''; // Reset input
			return;
		}

		// Find available slots (starting from 1)
		const availableSlots = [];
		for (let i = 1; i <= 20; i++) {
			if (!imagePreviews[`image${i}`]) {
				availableSlots.push(i);
			}
		}

		// Check if we have enough slots
		if (availableSlots.length < files.length) {
			alert(
				`You can only upload ${availableSlots.length} more image(s). Please remove some existing images first.`
			);
			e.target.value = ''; // Reset input
			return;
		}

		// Validate and assign files to slots
		const newFiles = {};
		const newPreviews = {};

		files.forEach((file, index) => {
			const validation = validateImageFile(file);
			if (!validation.valid) {
				alert(`Image ${index + 1}: ${validation.error}`);
				return;
			}

			// Ensure file is properly stored - create a new File object if needed
			// This helps with mobile browsers that might not properly handle File objects
			let fileToStore = file;
			if (!(file instanceof File)) {
				// If it's a Blob, convert to File
				fileToStore = new File(
					[file],
					file.name || `image${availableSlots[index]}.jpg`,
					{
						type: file.type || 'image/jpeg',
						lastModified: file.lastModified || Date.now(),
					}
				);
			}

			const slotNumber = availableSlots[index];
			const preview = createImagePreview(fileToStore);
			newFiles[`image${slotNumber}`] = fileToStore;
			newPreviews[`image${slotNumber}`] = preview;
		});

		// Update state with all new images
		setImageFiles((prev) => ({
			...prev,
			...newFiles,
		}));
		setImagePreviews((prev) => ({
			...prev,
			...newPreviews,
		}));

		// Reset the input
		e.target.value = '';
	};

	const handleImageChange = (e, imageNumber) => {
		const file = e.target.files[0];
		if (!file) {
			console.log('No file selected');
			return;
		}

		console.log(`File selected for image${imageNumber}:`, {
			name: file.name,
			size: file.size,
			type: file.type,
			lastModified: file.lastModified,
		});

		const validation = validateImageFile(file);
		if (!validation.valid) {
			alert(validation.error);
			return;
		}

		// Ensure file is properly stored - create a new File object if needed
		// This helps with mobile browsers that might not properly handle File objects
		let fileToStore = file;
		if (!(file instanceof File)) {
			// If it's a Blob, convert to File
			fileToStore = new File(
				[file],
				file.name || `image${imageNumber}.jpg`,
				{
					type: file.type || 'image/jpeg',
					lastModified: file.lastModified || Date.now(),
				}
			);
		}

		const preview = createImagePreview(fileToStore);
		setImageFiles((prev) => ({
			...prev,
			[`image${imageNumber}`]: fileToStore,
		}));
		setImagePreviews((prev) => ({
			...prev,
			[`image${imageNumber}`]: preview,
		}));
	};

	const removeImage = (imageNumber) => {
		const key = `image${imageNumber}`;
		if (imagePreviews[key] && !imagePreviews[key].startsWith('http')) {
			revokeImagePreview(imagePreviews[key]);
		}
		setImageFiles((prev) => {
			const newFiles = { ...prev };
			delete newFiles[key];
			return newFiles;
		});
		setImagePreviews((prev) => {
			const newPreviews = { ...prev };
			delete newPreviews[key];
			return newPreviews;
		});
	};

	const uploadImages = async (listingId) => {
		const filesToUpload = Object.entries(imageFiles).filter(
			([_, file]) => file instanceof File || file instanceof Blob
		);

		if (filesToUpload.length === 0) {
			console.log('No files to upload');
			return {};
		}

		setUploadingImages(true);
		let uploadedUrls = {};

		try {
			const formData = new FormData();

			// Log files before appending for debugging
			console.log(`Preparing to upload ${filesToUpload.length} files`);

			// Process images sequentially on mobile to avoid timeouts and memory issues
			// Convert all images to JPEG before uploading (especially important for HEIC/iPhone images)
			console.log(
				`Processing ${filesToUpload.length} images sequentially for mobile compatibility`
			);

			for (const [key, file] of filesToUpload) {
				try {
					console.log(
						`Processing ${key}: size=${file.size}, type=${
							file.type || 'unknown'
						}, name=${file.name || 'unknown'}`
					);

					// For mobile, use a shorter timeout and simpler conversion
					// Set a timeout for conversion (2 seconds) to prevent hanging on mobile
					let jpegFile;
					try {
						const conversionPromise = convertImageToJpeg(file);
						const timeoutPromise = new Promise((_, reject) =>
							setTimeout(
								() => reject(new Error('Conversion timeout')),
								2000
							)
						);
						jpegFile = await Promise.race([
							conversionPromise,
							timeoutPromise,
						]);
						console.log(
							`Converted ${key} to JPEG: size=${jpegFile.size}, type=${jpegFile.type}`
						);
					} catch (conversionError) {
						console.warn(
							`Conversion failed or timed out for ${key}, using original with JPEG metadata:`,
							conversionError.message
						);
						// Fallback: use original file but ensure it has proper name/type
						if (!(file instanceof File)) {
							jpegFile = new File([file], `${key}.jpg`, {
								type: 'image/jpeg',
								lastModified: file.lastModified || Date.now(),
							});
						} else if (!file.name || !file.name.endsWith('.jpg')) {
							// Ensure file has .jpg extension
							const baseName =
								(file.name || key).replace(/\.[^/.]+$/, '') ||
								key;
							jpegFile = new File([file], `${baseName}.jpg`, {
								type: file.type || 'image/jpeg',
								lastModified: file.lastModified || Date.now(),
							});
						} else {
							jpegFile = file;
						}
					}

					// Append immediately after processing to avoid memory issues
					formData.append(key, jpegFile, `${key}.jpg`);
					console.log(
						`Added ${key} to FormData: size=${jpegFile.size}`
					);

					// Small delay between files on mobile to prevent overwhelming the system
					if (filesToUpload.length > 1) {
						await new Promise((resolve) =>
							setTimeout(resolve, 100)
						);
					}
				} catch (error) {
					console.error(`Failed to process ${key}:`, error);
					// Still try to add the file with basic metadata
					try {
						const fallbackFile = new File([file], `${key}.jpg`, {
							type: 'image/jpeg',
							lastModified: file.lastModified || Date.now(),
						});
						formData.append(key, fallbackFile, `${key}.jpg`);
						console.log(`Added ${key} as fallback`);
					} catch (fallbackError) {
						console.error(
							`Could not add ${key} even as fallback:`,
							fallbackError
						);
					}
				}
			}

			formData.append('listingId', String(listingId || 'temp'));

			// Verify FormData has files before sending
			console.log('FormData prepared, sending to /api/upload-images');
			console.log(`Listing ID: ${listingId}`);

			const response = await fetch('/api/upload-images', {
				method: 'POST',
				body: formData,
				// Don't set Content-Type header - let browser set it with boundary
			});

			console.log(
				'Upload response status:',
				response.status,
				response.statusText
			);

			if (!response.ok) {
				const errorText = await response.text();
				console.error('Upload failed - response text:', errorText);
				let errorData;
				try {
					errorData = JSON.parse(errorText);
				} catch {
					errorData = { error: errorText || 'Unknown error' };
				}
				console.error('Upload failed - parsed error:', errorData);
				throw new Error(errorData.error || 'Failed to upload images');
			}

			const data = await response.json();
			console.log('Upload response data:', data);
			uploadedUrls = data.urls || {};

			if (Object.keys(uploadedUrls).length === 0) {
				console.warn(
					'No URLs returned from upload, but request succeeded'
				);
				throw new Error(
					'Images were uploaded but no URLs were returned'
				);
			}

			console.log(
				`Successfully uploaded ${
					Object.keys(uploadedUrls).length
				} images`
			);

			// Clean up preview URLs
			Object.values(imagePreviews).forEach((preview) => {
				if (preview && !preview.startsWith('http')) {
					revokeImagePreview(preview);
				}
			});
		} catch (error) {
			console.error('Error uploading images:', error);
			console.error('Error stack:', error.stack);
			throw error;
		} finally {
			setUploadingImages(false);
		}

		return uploadedUrls;
	};

	const isNumber = (value) => !isNaN(value) || 'This field must be a number';

	const onSubmit = handleSubmit(async (data) => {
		setSubmitting(true);

		try {
			let listingId = car?.listingId;
			let uploadedImageUrls = {};

			// If editing, upload new images first
			if (car && Object.keys(imageFiles).length > 0) {
				uploadedImageUrls = await uploadImages(listingId);
			}

			// Combine form data with image URLs
			const imageData = {};
			for (let i = 1; i <= 20; i++) {
				const key = `image${i}`;
				// Use uploaded URL if available
				if (uploadedImageUrls[key]) {
					imageData[key] = uploadedImageUrls[key];
				} else if (car && imagePreviews[key]) {
					// For editing: only include existing images (HTTP URLs), not blob URLs
					// Blob URLs are temporary preview URLs, not actual image URLs
					if (imagePreviews[key].startsWith('http')) {
						imageData[key] = imagePreviews[key];
					}
				}
				// For new cars: don't include blob URLs - images will be uploaded after creation
			}

			const vehicleData = {
				...data,
				price: parseInt(data.price, 10),
				year: parseInt(data.year, 10),
				mileage: parseInt(data.mileage, 10),
				seats: parseInt(data.seats, 10),
				doors: parseInt(data.doors, 10),
				sold: Boolean(data.sold),
				financingAvailable: Boolean(data.financingAvailable),
				...imageData,
			};

			if (car) {
				await axios.patch(`/api/${car.listingId}`, vehicleData);
			} else {
				// For new cars, create first, then upload images
				const response = await axios.post(
					'/api/createCar',
					vehicleData
				);
				listingId = response.data.listingId;

				console.log(
					'Car created, listingId:',
					listingId,
					'Type:',
					typeof listingId
				);
				console.log('Full response:', response.data);

				// Now upload images with the actual listingId
				if (Object.keys(imageFiles).length > 0) {
					try {
						console.log(
							'Starting image upload for listingId:',
							listingId
						);
						uploadedImageUrls = await uploadImages(listingId);
						console.log(
							'Uploaded image URLs received:',
							uploadedImageUrls
						);
						console.log(
							'Number of URLs:',
							Object.keys(uploadedImageUrls).length
						);

						// Validate URLs before updating
						const validUrls = {};
						Object.entries(uploadedImageUrls).forEach(
							([key, url]) => {
								if (
									url &&
									typeof url === 'string' &&
									url.includes(
										'supabase.co/storage/v1/object/public/car-images'
									)
								) {
									validUrls[key] = url;
									console.log(`Valid URL for ${key}:`, url);
								} else {
									console.error(
										`Invalid URL for ${key}:`,
										url
									);
								}
							}
						);

						console.log('Valid URLs to update:', validUrls);
						console.log(
							'Valid URL count:',
							Object.keys(validUrls).length
						);

						if (Object.keys(validUrls).length > 0) {
							// Ensure listingId is a number
							const numericListingId =
								typeof listingId === 'string'
									? parseInt(listingId, 10)
									: Number(listingId);

							console.log(
								'Numeric listing ID:',
								numericListingId,
								'Type:',
								typeof numericListingId
							);

							if (!numericListingId || isNaN(numericListingId)) {
								throw new Error(
									`Invalid listing ID: ${listingId} (parsed as: ${numericListingId})`
								);
							}

							console.log(
								`Sending PATCH request to /api/${numericListingId} with ${
									Object.keys(validUrls).length
								} image URLs:`,
								validUrls
							);

							try {
								const updateResponse = await axios.patch(
									`/api/${numericListingId}`,
									validUrls
								);
								console.log(
									'Update successful:',
									updateResponse.data
								);

								// Verify images were actually saved
								const savedImages = Object.keys(
									validUrls
								).filter(
									(key) =>
										updateResponse.data[key] &&
										updateResponse.data[key].includes(
											'supabase.co'
										)
								);
								console.log(
									`Verified ${savedImages.length} images saved to database`
								);

								if (savedImages.length === 0) {
									console.error(
										'WARNING: Images uploaded but not saved to database!'
									);
									alert(
										'Images were uploaded but may not have been saved. Please check the car and re-upload if needed.'
									);
								}
							} catch (patchError) {
								console.error(
									'PATCH request failed:',
									patchError
								);
								console.error(
									'PATCH error response:',
									patchError.response?.data
								);
								throw new Error(
									`Failed to update car with images: ${patchError.message}`
								);
							}
						} else {
							console.error('No valid image URLs to update');
							console.error('Uploaded URLs:', uploadedImageUrls);
							alert(
								'Images were uploaded but no valid URLs were returned. Please check the console for details and try editing the car to add images manually.'
							);
						}
					} catch (uploadError) {
						console.error(
							'Error uploading/updating images:',
							uploadError
						);
						console.error('Error response:', uploadError.response);
						console.error(
							'Error status:',
							uploadError.response?.status
						);
						console.error(
							'Error details:',
							uploadError.response?.data
						);
						console.error('Error message:', uploadError.message);
						// Don't fail the whole operation if image upload fails
						// The car was already created successfully
						alert(
							'Car created successfully, but there was an error updating images. You can edit the car to add images manually.'
						);
					}
				}
			}

			router.push('/admin');
			router.refresh();
		} catch (error) {
			console.error('Error submitting form:', error);
			alert('Failed to save vehicle. Please try again.');
		} finally {
			setSubmitting(false);
		}
	});

	const deleteCar = async () => {
		try {
			setDeleting(true);
			await axios.delete(`/api/${car.listingId}`);
			router.push('/admin');
			router.refresh();
		} catch (error) {
			console.error('Error deleting car:', error);
			alert('Failed to delete vehicle. Please try again.');
			setDeleting(false);
		}
	};

	return (
		<div>
			<form
				className="max-w-2xl mx-auto lg:mx-0 rounded-md drop-shadow-[1px_1px_20px_rgba(0,0,0,0.5)] bg-white p-6 mt-8 mb-20"
				onSubmit={handleSubmit(onSubmit)}
			>
				<div className="border border-lwhite w-full text-dblue font-bold rounded-md px-4 py-3 text-center mb-4">
					<h1>
						Stock ID: SAS
						{car
							? car.stockId < 10
								? `00${car.stockId}`
								: car.stockId < 100
								? `0${car.stockId}`
								: car.stockId
							: currentCarId < 10
							? `00${currentCarId}`
							: currentCarId < 100
							? `0${currentCarId}`
							: currentCarId}
					</h1>
				</div>
				<div className="grid grid-cols-2 gap-4">
					<div>
						<input
							defaultValue={car?.make}
							className="w-full px-4 py-3 text-sm mb-4 border border-lwhite rounded-md focus:outline-dblue"
							placeholder="Make"
							{...register('make', {
								required: 'Make is required',
							})}
						/>
						{errors.make && (
							<p className="text-red-500">
								{errors.make.message}
							</p>
						)}

						<input
							defaultValue={car?.price}
							className="w-full px-4 py-3 text-sm mb-4 border border-lwhite rounded-md focus:outline-dblue"
							placeholder="Price"
							{...register('price', {
								required: 'Price is required',
								validate: isNumber,
							})}
						/>
						{errors.price && (
							<p className="text-red-500">
								{errors.price.message}
							</p>
						)}

						<input
							defaultValue={car?.transmission}
							className="w-full px-4 py-3 text-sm mb-4 border border-lwhite rounded-md focus:outline-dblue"
							placeholder="Transmission"
							{...register('transmission', {
								required: 'Transmission is required',
							})}
						/>
						{errors.transmission && (
							<p className="text-red-500">
								{errors.transmission.message}
							</p>
						)}

						<input
							defaultValue={car?.eColor}
							className="w-full px-4 py-3 text-sm mb-4 border border-lwhite rounded-md focus:outline-dblue"
							placeholder="Exterior Color"
							{...register('eColor', {
								required: 'Exterior Color is required',
							})}
						/>
						{errors.eColor && (
							<p className="text-red-500">
								{errors.eColor.message}
							</p>
						)}

						<input
							defaultValue={car?.body}
							className="w-full px-4 py-3 text-sm mb-4 border border-lwhite rounded-md focus:outline-dblue"
							placeholder="Body Type"
							{...register('body', {
								required: 'Body Type is required',
							})}
						/>
						{errors.body && (
							<p className="text-red-500">
								{errors.body.message}
							</p>
						)}

						<input
							defaultValue={car?.seats}
							className="w-full px-4 py-3 text-sm mb-4 border border-lwhite rounded-md focus:outline-dblue"
							placeholder="# of Seats"
							{...register('seats', {
								required: 'Seats are required',
								validate: isNumber,
							})}
						/>
						{errors.seats && (
							<p className="text-red-500">
								{errors.seats.message}
							</p>
						)}

						<input
							defaultValue={car?.engine}
							className="w-full px-4 py-3 text-sm mb-4 border border-lwhite rounded-md focus:outline-dblue"
							placeholder="Engine"
							{...register('engine', {
								required: 'Engine is required',
							})}
						/>
						{errors.engine && (
							<p className="text-red-500">
								{errors.engine.message}
							</p>
						)}
					</div>
					<div>
						<input
							defaultValue={car?.model}
							className="w-full px-4 py-3 text-sm mb-4 border border-lwhite rounded-md focus:outline-dblue"
							placeholder="Model"
							{...register('model', {
								required: 'Model is required',
							})}
						/>
						{errors.model && (
							<p className="text-red-500">
								{errors.model.message}
							</p>
						)}

						<input
							defaultValue={car?.year}
							className="w-full px-4 py-3 text-sm mb-4 border border-lwhite rounded-md focus:outline-dblue"
							placeholder="Year"
							{...register('year', {
								required: 'Year is required',
								validate: isNumber,
							})}
						/>
						{errors.year && (
							<p className="text-red-500">
								{errors.year.message}
							</p>
						)}

						<input
							defaultValue={car?.mileage}
							className="w-full px-4 py-3 text-sm mb-4 border border-lwhite rounded-md focus:outline-dblue"
							placeholder="Mileage"
							{...register('mileage', {
								required: 'Mileage is required',
								validate: isNumber,
							})}
						/>
						{errors.mileage && (
							<p className="text-red-500">
								{errors.mileage.message}
							</p>
						)}

						<input
							defaultValue={car?.iColor}
							className="w-full px-4 py-3 text-sm mb-4 border border-lwhite rounded-md focus:outline-dblue"
							placeholder="Interior Color"
							{...register('iColor', {
								required: 'Interior Color is required',
							})}
						/>
						{errors.iColor && (
							<p className="text-red-500">
								{errors.iColor.message}
							</p>
						)}

						<input
							defaultValue={car?.fuel}
							className="w-full px-4 py-3 text-sm mb-4 border border-lwhite rounded-md focus:outline-dblue"
							placeholder="Fuel"
							{...register('fuel', {
								required: 'Fuel is required',
							})}
						/>
						{errors.fuel && (
							<p className="text-red-500">
								{errors.fuel.message}
							</p>
						)}

						<input
							defaultValue={car?.doors}
							className="w-full px-4 py-3 text-sm mb-4 border border-lwhite rounded-md focus:outline-dblue"
							placeholder="# of Doors"
							{...register('doors', {
								required: 'Doors are required',
								validate: isNumber,
							})}
						/>
						{errors.doors && (
							<p className="text-red-500">
								{errors.doors.message}
							</p>
						)}

						<input
							defaultValue={car?.vin}
							className="w-full px-4 py-3 text-sm mb-4 border border-lwhite rounded-md focus:outline-dblue"
							placeholder="VIN"
							{...register('vin', {
								required: 'VIN is required',
							})}
						/>
						{errors.vin && (
							<p className="text-red-500">{errors.vin.message}</p>
						)}
					</div>
				</div>

				<input
					defaultValue={car?.safety}
					className="w-full px-4 py-3 text-sm mb-4 border border-lwhite rounded-md focus:outline-dblue"
					placeholder="Safety"
					{...register('safety', {
						required: 'Safety information is required',
					})}
				/>
				{errors.safety && (
					<p className="text-red-500">{errors.safety.message}</p>
				)}

				{/* Description Textarea */}
				<textarea
					defaultValue={car?.description}
					className="w-full px-4 py-3 text-sm mb-4 border border-lwhite rounded-md focus:outline-dblue resize-y min-h-[120px]"
					placeholder="Vehicle Description (e.g., special features, condition, highlights...)"
					{...register('description')}
				/>

				{/* Sold Status Checkbox */}
				<div className="mb-4 flex items-center gap-3">
					<input
						type="checkbox"
						id="sold"
						defaultChecked={car?.sold || false}
						className="w-5 h-5 text-dblue border-gray-300 rounded focus:ring-dblue focus:ring-2 cursor-pointer"
						{...register('sold', {
							setValueAs: (value) =>
								value === true || value === 'on',
						})}
					/>
					<label
						htmlFor="sold"
						className="text-sm font-medium text-dblue cursor-pointer"
					>
						Mark as Sold
					</label>
				</div>

				{/* Financing Available Checkbox */}
				<div className="mb-4 flex items-center gap-3">
					<input
						type="checkbox"
						id="financingAvailable"
						defaultChecked={car?.financingAvailable || false}
						className="w-5 h-5 text-dblue border-gray-300 rounded focus:ring-dblue focus:ring-2 cursor-pointer"
						{...register('financingAvailable', {
							setValueAs: (value) =>
								value === true || value === 'on',
						})}
					/>
					<label
						htmlFor="financingAvailable"
						className="text-sm font-medium text-dblue cursor-pointer"
					>
						Financing Available
					</label>
				</div>

				<h3 className="mt-1 mb-3 font-bold text-center text-lg">
					Vehicle Images (Upload up to 20 images, 5MB each)
				</h3>

				{/* Bulk Upload Option */}
				<div className="mb-6 p-4 bg-gray-50 rounded-md border-2 border-dashed border-gray-300">
					<label className="block text-center cursor-pointer">
						<div className="flex flex-col items-center justify-center py-4">
							<svg
								className="w-12 h-12 text-gray-400 mb-2"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
								/>
							</svg>
							<p className="text-sm font-semibold text-dblue mb-1">
								Upload Multiple Images at Once
							</p>
							<p className="text-xs text-gray-500 mb-2">
								Select up to 20 images - they will be
								automatically assigned to available slots
							</p>
							<input
								type="file"
								accept="image/jpeg,image/jpg,image/png,image/webp"
								multiple
								onChange={handleMultipleImages}
								className="hidden"
								id="bulk-upload"
							/>
							<button
								type="button"
								onClick={() =>
									document
										.getElementById('bulk-upload')
										.click()
								}
								className="bg-dblue text-lwhite py-2 px-6 rounded-md text-sm font-semibold transition duration-300 hover:bg-gray-800"
							>
								Choose Images
							</button>
						</div>
					</label>
				</div>

				{/* Individual Image Slots */}
				<p className="text-sm text-gray-600 mb-3 text-center">
					Or upload images one by one below:
				</p>
				<div className="grid grid-cols-2 gap-4">
					{Array.from({ length: 20 }, (_, i) => i + 1).map((num) => {
						const imageKey = `image${num}`;
						const preview = imagePreviews[imageKey];
						return (
							<div key={num} className="relative">
								<div className="mb-1 text-xs text-gray-500 font-medium">
									Image {num}
								</div>
								{preview ? (
									<div className="relative">
										<img
											src={preview}
											alt={`Preview ${num}`}
											className="w-full h-32 object-cover rounded border mb-2"
										/>
										<button
											type="button"
											onClick={() => removeImage(num)}
											className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600"
										>
											×
										</button>
									</div>
								) : null}
								<input
									type="file"
									accept="image/jpeg,image/jpg,image/png,image/webp"
									onChange={(e) => handleImageChange(e, num)}
									className="w-full px-4 py-3 text-sm mb-4 border border-lwhite rounded-md focus:outline-dblue"
								/>
							</div>
						);
					})}
				</div>

				<button
					type="submit"
					disabled={isSubmitting || uploadingImages}
					className="bg-dblue text-lwhite py-3 px-6 rounded-md text-base font-semibold transition duration-300 drop-shadow-[1px_1px_20px_rgba(0,0,0,0.2)] hover:drop-shadow-[1px_1px_20px_rgba(0,0,0,0.5)] ease-out w-full mt-2 disabled:opacity-50"
				>
					{car ? 'Update Vehicle' : 'Add Vehicle'}{' '}
					{(isSubmitting || uploadingImages) && <Spinner />}
				</button>
				{car && (
					<button
						type="button"
						className="bg-lred text-lwhite py-3 px-6 rounded-md text-base font-semibold transition duration-300 drop-shadow-[1px_1px_20px_rgba(0,0,0,0.2)] hover:drop-shadow-[1px_1px_20px_rgba(0,0,0,0.5)] ease-out w-full mt-3"
						disabled={isDeleting}
						onClick={deleteCar}
					>
						Delete Vehicle {isDeleting && <Spinner />}
					</button>
				)}
			</form>
		</div>
	);
}
