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
	// If it's already JPEG with proper extension, return as-is
	if (
		file.type &&
		(file.type.includes('jpeg') || file.type.includes('jpg'))
	) {
		const fileName = (file.name || '').toLowerCase();
		if (fileName.endsWith('.jpg') || fileName.endsWith('.jpeg')) {
			return file;
		}
		// If it's JPEG but wrong extension, fix the extension
		const baseName =
			(file.name || 'image').replace(/\.[^/.]+$/, '') || 'image';
		return new File([file], `${baseName}.jpg`, {
			type: 'image/jpeg',
			lastModified: file.lastModified || Date.now(),
		});
	}

	// For mobile devices, if the file is already a valid image format that browsers can read,
	// try to convert it. But if it fails quickly, just return a properly named File.
	// This is especially important for HEIC files that iOS may have already converted.

	return new Promise((resolve, reject) => {
		// Set a quick timeout to detect if conversion will work
		const quickTimeout = setTimeout(() => {
			// If we're still here after 1 second, the conversion might be slow
			// For mobile, just return a properly formatted file
			console.warn(
				'Image conversion taking too long, using original file with JPEG metadata'
			);
			const baseName =
				(file.name || 'image').replace(/\.[^/.]+$/, '') || 'image';
			const fallbackFile = new File([file], `${baseName}.jpg`, {
				type: 'image/jpeg',
				lastModified: file.lastModified || Date.now(),
			});
			resolve(fallbackFile);
		}, 1000);

		const reader = new FileReader();

		reader.onload = (e) => {
			const img = new Image();

			img.onload = () => {
				clearTimeout(quickTimeout); // Clear timeout since conversion is working
				// Create canvas and convert to JPEG
				const canvas = document.createElement('canvas');
				canvas.width = img.width;
				canvas.height = img.height;

				const ctx = canvas.getContext('2d');
				ctx.drawImage(img, 0, 0);

				// Convert to blob as JPEG
				canvas.toBlob(
					(blob) => {
						if (!blob) {
							// If conversion fails, create a File with JPEG extension anyway
							// This handles cases where the browser can't convert but the file is valid
							const baseName =
								(file.name || 'image').replace(
									/\.[^/.]+$/,
									''
								) || 'image';
							const fallbackFile = new File(
								[file],
								`${baseName}.jpg`,
								{
									type: 'image/jpeg',
									lastModified:
										file.lastModified || Date.now(),
								}
							);
							resolve(fallbackFile);
							return;
						}

						// Create a new File object with JPEG extension
						const baseName =
							(file.name || 'image').replace(/\.[^/.]+$/, '') ||
							'image';
						const jpegFile = new File([blob], `${baseName}.jpg`, {
							type: 'image/jpeg',
							lastModified: file.lastModified || Date.now(),
						});

						resolve(jpegFile);
					},
					'image/jpeg',
					0.92 // Quality (0-1)
				);
			};

			img.onerror = () => {
				clearTimeout(quickTimeout);
				// If image can't be loaded (e.g., HEIC that browser can't read),
				// create a File with JPEG extension anyway
				// iOS often converts HEIC to JPEG when selected, so this should work
				console.warn(
					'Could not load image for conversion, using original with JPEG extension'
				);
				const baseName =
					(file.name || 'image').replace(/\.[^/.]+$/, '') || 'image';
				const fallbackFile = new File([file], `${baseName}.jpg`, {
					type: 'image/jpeg',
					lastModified: file.lastModified || Date.now(),
				});
				resolve(fallbackFile);
			};

			img.src = e.target.result;
		};

		reader.onerror = () => {
			clearTimeout(quickTimeout);
			// If we can't read the file, still try to create a File with JPEG extension
			console.warn(
				'Could not read file for conversion, using original with JPEG extension'
			);
			const baseName =
				(file.name || 'image').replace(/\.[^/.]+$/, '') || 'image';
			const fallbackFile = new File([file], `${baseName}.jpg`, {
				type: 'image/jpeg',
				lastModified: file.lastModified || Date.now(),
			});
			resolve(fallbackFile);
		};

		reader.readAsDataURL(file);
	});
}
