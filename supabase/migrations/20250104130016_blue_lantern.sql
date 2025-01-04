/*
  # Create PDF storage bucket and policies
  
  1. Storage
    - Create 'pdfs' bucket for storing PDF files
  
  2. Security
    - Enable RLS policies for authenticated users to upload and read PDFs
*/

-- Enable storage by inserting the bucket
INSERT INTO storage.buckets (id, name, public)
VALUES ('pdfs', 'pdfs', true)
ON CONFLICT DO NOTHING;

-- Set up RLS policies for the storage bucket
CREATE POLICY "Allow authenticated users to upload PDFs"
ON storage.objects FOR INSERT TO authenticated
WITH CHECK (bucket_id = 'pdfs');

CREATE POLICY "Allow users to read their PDFs"
ON storage.objects FOR SELECT TO authenticated
USING (bucket_id = 'pdfs');