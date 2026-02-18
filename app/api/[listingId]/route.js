import { createServerClient } from '@/lib/supabase';
import { transformCarFromDB, transformCarToDB } from '@/lib/transformCar';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(request, { params }) {
	try {
		// Await params in Next.js 16+
		const resolvedParams = await params;
		
		// Handle both string and number listingId
		let listingId;
		if (typeof resolvedParams.listingId === 'string') {
			listingId = parseInt(resolvedParams.listingId, 10);
		} else {
			listingId = resolvedParams.listingId;
		}

		if (!listingId || isNaN(listingId)) {
			return NextResponse.json(
				{ error: 'Invalid listing ID', received: resolvedParams.listingId },
				{ status: 400 }
			);
		}

		const supabaseAdmin = createServerClient();

		const { data: car, error } = await supabaseAdmin
			.from('cars')
			.select('*')
			.eq('listing_id', listingId)
			.single();

		if (error || !car) {
			return NextResponse.json(
				{ error: 'Car not found' },
				{ status: 404 }
			);
		}

		const transformedCar = transformCarFromDB(car);
		return NextResponse.json(transformedCar);
	} catch (error) {
		console.error('Unexpected error:', error);
		return NextResponse.json(
			{ error: 'Internal server error', details: error.message },
			{ status: 500 }
		);
	}
}

export async function PATCH(request, { params }) {
	try {
		// TODO: Add authentication check here
		// For now, we'll add a simple check
		// You can integrate Supabase Auth later

		const body = await request.json();
		
		// Await params in Next.js 16+
		const resolvedParams = await params;
		
		// Handle both string and number listingId
		let listingId;
		if (typeof resolvedParams.listingId === 'string') {
			listingId = parseInt(resolvedParams.listingId, 10);
		} else {
			listingId = resolvedParams.listingId;
		}

		if (!listingId || isNaN(listingId)) {
			console.error('Invalid listing ID:', resolvedParams.listingId, 'Parsed as:', listingId);
			return NextResponse.json(
				{ error: 'Invalid listing ID', received: resolvedParams.listingId },
				{ status: 400 }
			);
		}

		// Check if body is empty
		if (!body || Object.keys(body).length === 0) {
			console.error('Empty update body received');
			return NextResponse.json(
				{ error: 'No data provided for update' },
				{ status: 400 }
			);
		}

		const supabaseAdmin = createServerClient();

		// Clean up the data - remove undefined/null image fields and reject blob URLs
		const cleanedBody = { ...body };
		for (let i = 1; i <= 20; i++) {
			const imageKey = `image${i}`;
			const imageValue = cleanedBody[imageKey];
			
			// Remove null, undefined, or empty values
			if (imageValue === null || imageValue === undefined || imageValue === '') {
				delete cleanedBody[imageKey];
			} 
			// Reject blob URLs - these are temporary preview URLs, not valid image URLs
			else if (typeof imageValue === 'string' && imageValue.startsWith('blob:')) {
				console.error(`Rejected blob URL for ${imageKey}:`, imageValue);
				delete cleanedBody[imageKey];
			}
			// Validate that image URLs are proper Supabase storage URLs
			else if (typeof imageValue === 'string' && !imageValue.includes('supabase.co/storage/v1/object/public/car-images')) {
				console.warn(`Invalid image URL format for ${imageKey}:`, imageValue);
				// Still allow it, but log a warning
			}
		}

		console.log('Cleaned body for update:', cleanedBody);
		console.log('Image fields in update:', Object.keys(cleanedBody).filter(key => key.startsWith('image')));

		// If only image fields are being updated, handle them directly
		const isImageOnlyUpdate = Object.keys(cleanedBody).every(key => key.startsWith('image'));
		
		let carData;
		if (isImageOnlyUpdate) {
			// For image-only updates, use the data as-is (image1-image10 don't need transformation)
			carData = cleanedBody;
		} else {
			// For full updates, use the transform function
			carData = transformCarToDB(cleanedBody);
			// Remove any null/undefined values from carData
			Object.keys(carData).forEach(key => {
				if (carData[key] === null || carData[key] === undefined) {
					delete carData[key];
				}
			});
		}

		console.log('Updating car with data:', carData);
		console.log('Image fields being updated:', Object.keys(carData).filter(key => key.startsWith('image')));

		// If this car is being set as weekly special, clear all others first
		if (body.weeklySpecial === true || carData.weekly_special === true) {
			await supabaseAdmin
				.from('cars')
				.update({ weekly_special: false })
				.eq('weekly_special', true);
		}

		const { data: updatedCar, error } = await supabaseAdmin
			.from('cars')
			.update(carData)
			.eq('listing_id', listingId)
			.select()
			.single();

		if (error) {
			console.error('Error updating car:', error);
			console.error('Car data attempted:', carData);
			console.error('Listing ID used:', listingId);
			return NextResponse.json(
				{ error: 'Failed to update car', details: error.message },
				{ status: 500 }
			);
		}

		if (!updatedCar) {
			console.error('Update succeeded but no car data returned');
			return NextResponse.json(
				{ error: 'Update succeeded but no data returned' },
				{ status: 500 }
			);
		}

		console.log('Car updated successfully. Image fields in response:');
		for (let i = 1; i <= 10; i++) {
			const imageKey = `image${i}`;
			if (updatedCar[imageKey]) {
				console.log(`  ${imageKey}: ${updatedCar[imageKey]}`);
			}
		}

		const transformedCar = transformCarFromDB(updatedCar);
		return NextResponse.json(transformedCar);
	} catch (error) {
		console.error('Unexpected error:', error);
		return NextResponse.json(
			{ error: 'Internal server error', details: error.message },
			{ status: 500 }
		);
	}
}

export async function DELETE(request, { params }) {
	try {
		// TODO: Add authentication check here
		// For now, we'll add a simple check
		// You can integrate Supabase Auth later

		// Await params in Next.js 16+
		const resolvedParams = await params;
		const listingId = parseInt(resolvedParams.listingId);

		const supabaseAdmin = createServerClient();

		// First, get the car to extract image paths
		const { data: car, error: fetchError } = await supabaseAdmin
			.from('cars')
			.select('*')
			.eq('listing_id', listingId)
			.single();

		if (fetchError) {
			console.error('Error fetching car:', fetchError);
			return NextResponse.json(
				{ error: 'Car not found' },
				{ status: 404 }
			);
		}

		// Delete the car from database
		const { error: deleteError } = await supabaseAdmin
			.from('cars')
			.delete()
			.eq('listing_id', listingId);

		if (deleteError) {
			console.error('Error deleting car:', deleteError);
			return NextResponse.json(
				{ error: 'Failed to delete car' },
				{ status: 500 }
			);
		}

		// Delete associated images from storage
		try {
			const { extractCarImagePaths } = await import('@/lib/imageUtils');
			const imagePaths = extractCarImagePaths(car);
			
			if (imagePaths.length > 0) {
				const { deleteMultipleImages } = await import('@/lib/storage');
				await deleteMultipleImages(imagePaths);
			}
		} catch (storageError) {
			// Log error but don't fail the request if images can't be deleted
			console.error('Error deleting car images:', storageError);
		}

		return NextResponse.json({
			success: true,
			message: 'Car deleted successfully',
		});
	} catch (error) {
		console.error('Unexpected error:', error);
		return NextResponse.json(
			{ error: 'Internal server error' },
			{ status: 500 }
		);
	}
}

