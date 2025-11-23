import { deleteImage } from '@/lib/storage';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function DELETE(request) {
	try {
		// TODO: Add authentication check here
		// For now, we'll add a simple check
		// You can integrate Supabase Auth later

		const { searchParams } = new URL(request.url);
		const path = searchParams.get('path');

		if (!path) {
			return NextResponse.json(
				{ error: 'Image path is required' },
				{ status: 400 }
			);
		}

		await deleteImage(path);

		return NextResponse.json(
			{
				success: true,
				message: 'Image deleted successfully',
			},
			{ status: 200 }
		);
	} catch (error) {
		console.error('Error deleting image:', error);
		return NextResponse.json(
			{
				error: error.message || 'Failed to delete image',
			},
			{ status: 500 }
		);
	}
}

