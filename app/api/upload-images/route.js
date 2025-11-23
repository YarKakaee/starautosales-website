import { uploadImage } from '@/lib/storage';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST(request) {
	try {
		// TODO: Add authentication check here
		// For now, we'll add a simple check
		// You can integrate Supabase Auth later

		const formData = await request.formData();
		const listingId = formData.get('listingId') || 'temp';

		// Get all image files with their keys (image1, image2, etc.)
		const imageFiles = {};
		for (let i = 1; i <= 10; i++) {
			const file = formData.get(`image${i}`);
			if (file instanceof File && file.size > 0) {
				imageFiles[`image${i}`] = file;
			}
		}

		if (Object.keys(imageFiles).length === 0) {
			return NextResponse.json(
				{ error: 'No valid images provided' },
				{ status: 400 }
			);
		}

		// Upload each image with its specific key
		const uploadedUrls = {};
		const basePath = `cars/${listingId}`;

		for (const [key, file] of Object.entries(imageFiles)) {
			const fileExtension = file.name.split('.').pop().toLowerCase();
			const path = `${basePath}/${key}.${fileExtension}`;

			try {
				console.log(`Uploading ${key} to path: ${path}`);
				const result = await uploadImage(file, path);
				console.log(`Uploaded ${key} successfully. URL: ${result.url}`);
				
				// Validate URL format
				if (result.url && result.url.includes('supabase.co/storage/v1/object/public/car-images')) {
					uploadedUrls[key] = result.url;
				} else {
					console.error(`Invalid URL format for ${key}:`, result.url);
				}
			} catch (error) {
				console.error(`Error uploading ${key}:`, error);
				// Continue with other images even if one fails
			}
		}

		console.log('Final uploaded URLs:', uploadedUrls);
		console.log('URL count:', Object.keys(uploadedUrls).length);

		return NextResponse.json(
			{
				success: true,
				urls: uploadedUrls,
				count: Object.keys(uploadedUrls).length,
			},
			{ status: 200 }
		);
	} catch (error) {
		console.error('Error uploading images:', error);
		return NextResponse.json(
			{
				error: error.message || 'Failed to upload images',
			},
			{ status: 500 }
		);
	}
}

