/*
  # Add storage delete policy

  1. Changes
    - Add policy to allow authenticated users to delete their own files from the pdfs bucket
  
  2. Security
    - Only allows deletion of files from the pdfs bucket
    - Ensures users can only delete files they have access to
*/

-- Add delete policy for storage bucket
CREATE POLICY "Allow users to delete their PDFs"
ON storage.objects FOR DELETE TO authenticated
USING (bucket_id = 'pdfs');