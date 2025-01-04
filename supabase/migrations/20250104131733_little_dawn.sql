/*
  # Add document delete policy

  1. Changes
    - Add policy to allow authenticated users to delete their own documents
  
  2. Security
    - Ensures users can only delete documents they own
    - Maintains data isolation between users
*/

-- Add delete policy for documents table
CREATE POLICY "Users can delete their own documents"
  ON documents
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);