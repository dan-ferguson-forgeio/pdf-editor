import { create } from 'zustand';
import { supabase } from '../lib/supabase';

interface PDFStore {
  currentPDF: string | null;
  uploadPDF: (file: File) => Promise<string>;
  getPDFUrl: (id: string) => Promise<string>;
}

export const usePDFStore = create<PDFStore>((set) => ({
  currentPDF: null,
  uploadPDF: async (file: File) => {
    const fileName = `${crypto.randomUUID()}.pdf`;
    const { error: uploadError } = await supabase.storage
      .from('pdfs')
      .upload(fileName, file);
    
    if (uploadError) throw uploadError;

    const { data } = await supabase
      .from('documents')
      .insert([{ name: file.name, storage_path: fileName }])
      .select()
      .single();

    return data.id;
  },
  getPDFUrl: async (id: string) => {
    const { data: document } = await supabase
      .from('documents')
      .select()
      .eq('id', id)
      .single();

    const { data } = supabase.storage
      .from('pdfs')
      .getPublicUrl(document.storage_path);

    return data.publicUrl;
  },
}));