# Supabase Storage Setup for Car Images

## Step 1: Run the Storage Migration

1. Go to your Supabase dashboard
2. Navigate to **SQL Editor**
3. Click "New query"
4. Open the file `supabase/migrations/002_storage_setup.sql` from your project
5. Copy and paste the entire SQL into the editor
6. Click "Run"
7. You should see "Success. No rows returned"

## Step 2: Verify Storage Bucket (Optional)

1. In Supabase dashboard, go to **Storage** (in the left sidebar)
2. You should see a bucket named `car-images`
3. Click on it to verify it's set to **Public**

## Step 3: Test Image Upload

The storage is now ready! You can test it using the API endpoint:

### Upload Images API

**Endpoint:** `POST /api/upload-images`

**Request:**

-   Method: `POST`
-   Content-Type: `multipart/form-data`
-   Body:
    -   `images`: Array of image files (File objects)
    -   `listingId`: Optional - listing ID or 'temp' for new listings

**Response:**

```json
{
	"success": true,
	"urls": [
		"https://[project].supabase.co/storage/v1/object/public/car-images/cars/listingId/image1.jpg",
		"https://[project].supabase.co/storage/v1/object/public/car-images/cars/listingId/image2.jpg"
	],
	"count": 2
}
```

### Delete Image API

**Endpoint:** `DELETE /api/delete-image?path=car-images/cars/listingId/image1.jpg`

**Response:**

```json
{
	"success": true,
	"message": "Image deleted successfully"
}
```

## Usage in Admin Page

When creating the admin page, you can use these utilities:

```javascript
import { uploadMultipleImages } from '@/lib/storage';
import { validateImageFile } from '@/lib/imageUtils';

// Example: Upload images
const formData = new FormData();
files.forEach((file) => {
	formData.append('images', file);
});
formData.append('listingId', listingId);

const response = await fetch('/api/upload-images', {
	method: 'POST',
	body: formData,
});

const { urls } = await response.json();
// urls contains the public URLs for all uploaded images
```

## Image Storage Structure

Images are stored in the following structure:

```
car-images/
  └── cars/
      └── [listingId]/
          ├── image1.jpg
          ├── image2.jpg
          ├── image3.jpg
          └── ...
```

## File Limits

-   **Max file size:** 5MB per image
-   **Allowed formats:** JPEG, JPG, PNG, WebP
-   **Max images per car:** 10 (image1 through image10)

## Security

-   Public read access is enabled (anyone can view images)
-   Only authenticated users can upload/update/delete images
-   You'll need to implement authentication in the admin routes

## Next Steps

1. Implement authentication for admin routes
2. Create the admin page component for image uploads
3. Add image preview functionality
4. Add image deletion when updating/deleting cars
