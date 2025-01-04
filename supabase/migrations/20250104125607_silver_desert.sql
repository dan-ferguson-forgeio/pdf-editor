/*
  # Create documents table and storage bucket

  1. New Tables
    - `documents`
      - `id` (uuid, primary key)
      - `name` (text)
      - `storage_path` (text)
      - `created_at` (timestamp)
      - `user_id` (uuid, references auth.users)
  
  2. Security
    - Enable RLS on `documents` table
    - Add policies for authenticated users to manage their documents
*/

-- Create documents table
CREATE TABLE IF NOT EXISTS documents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  storage_path text NOT NULL,
  created_at timestamptz DEFAULT now(),
  user_id uuid REFERENCES auth.users NOT NULL DEFAULT auth.uid()
);

-- Enable RLS
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own documents"
  ON documents
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own documents"
  ON documents
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);