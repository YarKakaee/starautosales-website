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
 * @param {object} car - Car object with image1-image20 properties
 * @returns {string[]} Array of image paths
 */
export function extractCarImagePaths(car) {
	if (!car) return [];

	const paths = [];
	for (let i = 1; i <= 20; i++) {
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
	const validTypes = [
		'image/jpeg',
		'image/jpg',
		'image/png',
		'image/webp',
		'image/heic',
		'image/heif',
	];
	const fileName = file.name.toLowerCase();
	const validExtensions = [
		'.jpg',
		'.jpeg',
		'.png',
		'.webp',
		'.heic',
		'.heif',
	];

	// Check MIME type first
	if (file.type && validTypes.includes(file.type.toLowerCase())) {
		return { valid: true };
	}

	// If MIME type is missing or invalid, check file extension (common on mobile)
	if (validExtensions.some((ext) => fileName.endsWith(ext))) {
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

/**
 * Convert HEIC/HEIF or any image to JPEG format
 * This is especially important for iPhone images
 * @param {File} file - Image file to convert
 * @returns {Promise<File>} Converted JPEG file
 */
export async function convertImageToJpeg(file) {
	// Constants for compression
	const MAX_WIDTH = 1920;
	const MAX_HEIGHT = 1920;
	const MAX_SIZE_MB = 1; // Strict limit 1MB to allow for larger chunks (3-4 images per request)
	const INITIAL_QUALITY = 0.8;

	return new Promise((resolve, reject) => {
		const reader = new FileReader();

		reader.onload = (e) => {
			const img = new Image();

			img.onload = () => {
				// Calculate new dimensions
				let width = img.width;
				let height = img.height;

				if (width > MAX_WIDTH || height > MAX_HEIGHT) {
					const ratio = Math.min(
						MAX_WIDTH / width,
						MAX_HEIGHT / height,
					);
					width = Math.round(width * ratio);
					height = Math.round(height * ratio);
				}

				// Create canvas
				const canvas = document.createElement('canvas');
				canvas.width = width;
				canvas.height = height;

				const ctx = canvas.getContext('2d');
				ctx.drawImage(img, 0, 0, width, height);

				// Recursive function to compress until under limit
				const compress = (quality) => {
					canvas.toBlob(
						(blob) => {
							if (!blob) {
								reject(new Error('Canvas to Blob failed'));
								return;
							}

							// Check size (convert to MB)
							const sizeMB = blob.size / (1024 * 1024);
							console.log(
								`Compressed to ${width}x${height} at Q${quality}: ${sizeMB.toFixed(2)}MB`,
							);

							if (sizeMB <= MAX_SIZE_MB || quality <= 0.1) {
								// Convert blob to File
								const baseName =
									(file.name || 'image').replace(
										/\.[^/.]+$/,
										'',
									) || 'image';
								const jpegFile = new File(
									[blob],
									`${baseName}.jpg`,
									{
										type: 'image/jpeg',
										lastModified: Date.now(),
									},
								);
								resolve(jpegFile);
							} else {
								// Reduce quality and try again
								compress(Math.max(quality - 0.1, 0.1));
							}
						},
						'image/jpeg',
						quality,
					);
				};

				// Start with initial quality
				compress(INITIAL_QUALITY);
			};

			img.onerror = () => {
				console.error('Image load failed');
				// Fallback to original ONLY if it's small enough, otherwise fail
				if (file.size / (1024 * 1024) <= MAX_SIZE_MB) {
					console.warn('Using original file as fallback (size ok)');
					// Ensure .jpg extension
					const baseName =
						(file.name || 'image').replace(/\.[^/.]+$/, '') ||
						'image';
					if (
						file.type === 'image/jpeg' &&
						file.name.endsWith('.jpg')
					) {
						resolve(file);
					} else {
						resolve(
							new File([file], `${baseName}.jpg`, {
								type: 'image/jpeg',
								lastModified: Date.now(),
							}),
						);
					}
				} else {
					reject(
						new Error(
							`Image could not be processed and original is too large (${(file.size / 1024 / 1024).toFixed(2)}MB)`,
						),
					);
				}
			};

			img.src = e.target.result;
		};

		reader.onerror = (err) => reject(err);
		reader.readAsDataURL(file);
	});
}
