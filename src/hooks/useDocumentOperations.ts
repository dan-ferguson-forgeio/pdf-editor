import { supabase } from '../lib/supabase';

export function useDocumentOperations() {
  const deleteDocument = async (id: string, storagePath: string) => {
    try {
      // Delete from storage first
      const { error: storageError } = await supabase.storage
        .from('pdfs')
        .remove([storagePath]);

      if (storageError) throw storageError;

      // Then delete from the documents table
      const { error: dbError } = await supabase
        .from('documents')
        .delete()
        .eq('id', id);

      if (dbError) throw dbError;

      return true;
    } catch (error) {
      console.error('Error deleting document:', error);
      throw error;
    }
  };

  return { deleteDocument };
}