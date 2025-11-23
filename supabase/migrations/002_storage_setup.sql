-- Create storage bucket for car images
INSERT INTO storage.buckets (id, name, public)
VALUES ('car-images', 'car-images', true)
ON CONFLICT (id) DO NOTHING;

-- Create policy to allow public read access
CREATE POLICY "Allow public read access" ON storage.objects
FOR SELECT
USING (bucket_id = 'car-images');

-- Create policy to allow authenticated users to upload images
CREATE POLICY "Allow authenticated upload" ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'car-images');

-- Create policy to allow authenticated users to update images
CREATE POLICY "Allow authenticated update" ON storage.objects
FOR UPDATE
TO authenticated
USING (bucket_id = 'car-images')
WITH CHECK (bucket_id = 'car-images');

-- Create policy to allow authenticated users to delete images
CREATE POLICY "Allow authenticated delete" ON storage.objects
FOR DELETE
TO authenticated
USING (bucket_id = 'car-images');

