import { createServerClient } from './supabase';

/**
 * Upload a single image to Supabase Storage
 * @param {File} file - The image file to upload
 * @param {string} path - The path where the image should be stored (e.g., 'cars/listingId/image1.jpg')
 * @returns {Promise<{url: string, path: string}>} The public URL and path of the uploaded image
 */
export async function uploadImage(file, path) {
	const supabaseAdmin = createServerClient();

	// Validate file type
	const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
	if (!validTypes.includes(file.type)) {
		throw new Error(
			'Invalid file type. Only JPEG, PNG, and WebP are allowed.'
		);
	}

	// Validate file size (max 5MB)
	const maxSize = 5 * 1024 * 1024; // 5MB
	if (file.size > maxSize) {
		throw new Error('File size too large. Maximum size is 5MB.');
	}

	const { data, error } = await supabaseAdmin.storage
		.from('car-images')
		.upload(path, file, {
			cacheControl: '3600',
			upsert: true, // Allow overwriting existing files
		});

	if (error) {
		console.error('Error uploading image:', error);
		console.error('Path attempted:', path);
		throw new Error(`Failed to upload image: ${error.message}`);
	}

	if (!data || !data.path) {
		console.error('Upload succeeded but no data returned');
		throw new Error('Upload succeeded but no path returned');
	}

	// Get public URL
	const { data: urlData } = supabaseAdmin.storage
		.from('car-images')
		.getPublicUrl(data.path);

	if (!urlData || !urlData.publicUrl) {
		console.error('Failed to get public URL for path:', data.path);
		throw new Error('Failed to get public URL for uploaded image');
	}

	console.log(`Image uploaded successfully. Path: ${data.path}, URL: ${urlData.publicUrl}`);

	return {
		url: urlData.publicUrl,
		path: data.path,
	};
}

/**
 * Upload multiple images to Supabase Storage
 * @param {File[]} files - Array of image files to upload
 * @param {string} basePath - Base path for storing images (e.g., 'cars/listingId')
 * @returns {Promise<string[]>} Array of public URLs for uploaded images
 */
export async function uploadMultipleImages(files, basePath) {
	const uploadPromises = files.map((file, index) => {
		const fileName = `image${index + 1}.${file.name.split('.').pop()}`;
		const path = `${basePath}/${fileName}`;
		return uploadImage(file, path);
	});

	try {
		const results = await Promise.all(uploadPromises);
		return results.map((result) => result.url);
	} catch (error) {
		console.error('Error uploading multiple images:', error);
		throw error;
	}
}

/**
 * Delete an image from Supabase Storage
 * @param {string} path - The path of the image to delete
 * @returns {Promise<void>}
 */
export async function deleteImage(path) {
	const supabaseAdmin = createServerClient();

	const { error } = await supabaseAdmin.storage
		.from('car-images')
		.remove([path]);

	if (error) {
		console.error('Error deleting image:', error);
		throw new Error(`Failed to delete image: ${error.message}`);
	}
}

/**
 * Delete multiple images from Supabase Storage
 * @param {string[]} paths - Array of image paths to delete
 * @returns {Promise<void>}
 */
export async function deleteMultipleImages(paths) {
	const supabaseAdmin = createServerClient();

	const { error } = await supabaseAdmin.storage
		.from('car-images')
		.remove(paths);

	if (error) {
		console.error('Error deleting images:', error);
		throw new Error(`Failed to delete images: ${error.message}`);
	}
}

/**
 * Get public URL for an image
 * @param {string} path - The path of the image
 * @returns {string} Public URL of the image
 */
export function getImageUrl(path) {
	const supabaseAdmin = createServerClient();
	const { data } = supabaseAdmin.storage
		.from('car-images')
		.getPublicUrl(path);
	return data.publicUrl;
}
