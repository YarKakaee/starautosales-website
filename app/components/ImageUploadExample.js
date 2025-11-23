'use client';

/**
 * Example component showing how to upload images in the admin page
 * This is a reference - you can use this pattern when building your admin page
 */

import { useState } from 'react';
import { validateImageFile, createImagePreview, revokeImagePreview } from '@/lib/imageUtils';

export default function ImageUploadExample({ listingId, onImagesUploaded }) {
	const [files, setFiles] = useState([]);
	const [previews, setPreviews] = useState([]);
	const [uploading, setUploading] = useState(false);
	const [error, setError] = useState(null);

	const handleFileChange = (e) => {
		const selectedFiles = Array.from(e.target.files);
		const validFiles = [];
		const newPreviews = [];

		selectedFiles.forEach((file) => {
			const validation = validateImageFile(file);
			if (validation.valid) {
				validFiles.push(file);
				newPreviews.push({
					file,
					preview: createImagePreview(file),
				});
			} else {
				setError(validation.error);
			}
		});

		setFiles((prev) => [...prev, ...validFiles]);
		setPreviews((prev) => [...prev, ...newPreviews]);
	};

	const removeFile = (index) => {
		// Revoke preview URL to free memory
		revokeImagePreview(previews[index].preview);
		
		setFiles((prev) => prev.filter((_, i) => i !== index));
		setPreviews((prev) => prev.filter((_, i) => i !== index));
	};

	const handleUpload = async () => {
		if (files.length === 0) {
			setError('Please select at least one image');
			return;
		}

		setUploading(true);
		setError(null);

		try {
			const formData = new FormData();
			files.forEach((file) => {
				formData.append('images', file);
			});
			formData.append('listingId', listingId || 'temp');

			const response = await fetch('/api/upload-images', {
				method: 'POST',
				body: formData,
			});

			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(errorData.error || 'Failed to upload images');
			}

			const data = await response.json();
			
			// Clean up preview URLs
			previews.forEach((preview) => {
				revokeImagePreview(preview.preview);
			});

			// Reset state
			setFiles([]);
			setPreviews([]);

			// Callback with uploaded URLs
			if (onImagesUploaded) {
				onImagesUploaded(data.urls);
			}

			alert(`Successfully uploaded ${data.count} image(s)!`);
		} catch (err) {
			setError(err.message);
		} finally {
			setUploading(false);
		}
	};

	return (
		<div className="space-y-4">
			<div>
				<label className="block text-sm font-medium mb-2">
					Upload Car Images (Max 10, 5MB each)
				</label>
				<input
					type="file"
					multiple
					accept="image/jpeg,image/jpg,image/png,image/webp"
					onChange={handleFileChange}
					className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-lred file:text-lwhite hover:file:bg-lredhover"
					disabled={uploading || files.length >= 10}
				/>
				<p className="mt-1 text-xs text-gray-500">
					{files.length} / 10 images selected
				</p>
			</div>

			{error && (
				<div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded">
					{error}
				</div>
			)}

			{previews.length > 0 && (
				<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
					{previews.map((preview, index) => (
						<div key={index} className="relative">
							<img
								src={preview.preview}
								alt={`Preview ${index + 1}`}
								className="w-full h-32 object-cover rounded border"
							/>
							<button
								type="button"
								onClick={() => removeFile(index)}
								className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600"
							>
								×
							</button>
							<p className="text-xs mt-1 truncate">
								{preview.file.name}
							</p>
						</div>
					))}
				</div>
			)}

			<button
				type="button"
				onClick={handleUpload}
				disabled={uploading || files.length === 0}
				className="bg-lred text-lwhite px-6 py-2 rounded-md font-semibold hover:bg-lredhover disabled:opacity-50 disabled:cursor-not-allowed"
			>
				{uploading ? 'Uploading...' : `Upload ${files.length} Image(s)`}
			</button>
		</div>
	);
}

