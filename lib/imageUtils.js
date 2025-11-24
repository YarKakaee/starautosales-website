/**
 * Extract image path from Supabase Storage URL
 * @param {string} url - Full Supabase Storage URL
 * @returns {string} Path relative to bucket
 */
export function extractImagePath(url) {
	if (!url) return null;
	
	// Supabase Storage URLs look like:
	// https://[project].supabase.co/storage/v1/object/public/car-images/cars/listingId/image1.jpg
	const match = url.match(/\/car-images\/(.+)$/);
	return match ? match[1] : null;
}

/**
 * Extract all image paths from car object
 * @param {object} car - Car object with image1-image10 properties
 * @returns {string[]} Array of image paths
 */
export function extractCarImagePaths(car) {
	if (!car) return [];
	
	const paths = [];
	for (let i = 1; i <= 10; i++) {
		const imageUrl = car[`image${i}`];
		if (imageUrl) {
			const path = extractImagePath(imageUrl);
			if (path) paths.push(path);
		}
	}
	return paths;
}

/**
 * Validate image file
 * @param {File} file - File to validate
 * @returns {{valid: boolean, error?: string}}
 */
export function validateImageFile(file) {
	if (!file) {
		return { valid: false, error: 'No file provided' };
	}

	// Check file size (max 10MB for mobile photos)
	const maxSize = 10 * 1024 * 1024; // 10MB
	if (file.size > maxSize) {
		return {
			valid: false,
			error: 'File size too large. Maximum size is 10MB.',
		};
	}

	// Check file type - be more lenient for mobile devices
	const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/heic', 'image/heif'];
	const fileName = file.name.toLowerCase();
	const validExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.heic', '.heif'];
	
	// Check MIME type first
	if (file.type && validTypes.includes(file.type.toLowerCase())) {
		return { valid: true };
	}
	
	// If MIME type is missing or invalid, check file extension (common on mobile)
	if (validExtensions.some(ext => fileName.endsWith(ext))) {
		return { valid: true };
	}
	
	// If file has no type but has a size, allow it (mobile browsers sometimes don't set MIME type)
	if (!file.type && file.size > 0) {
		return { valid: true };
	}

	return {
		valid: false,
		error: 'Invalid file type. Only JPEG, PNG, and WebP are allowed.',
	};
}

/**
 * Create a preview URL for an image file
 * @param {File} file - Image file
 * @returns {string} Object URL for preview
 */
export function createImagePreview(file) {
	return URL.createObjectURL(file);
}

/**
 * Revoke a preview URL
 * @param {string} url - Preview URL to revoke
 */
export function revokeImagePreview(url) {
	if (url) {
		URL.revokeObjectURL(url);
	}
}

