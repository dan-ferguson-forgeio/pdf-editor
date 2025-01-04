import React, { useRef } from 'react';
import { Upload } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { usePDFStore } from '../../stores/pdfStore';

export const UploadButton: React.FC = () => {
  const fileInput = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const { uploadPDF } = usePDFStore();

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const id = await uploadPDF(file);
      navigate(`/editor/${id}`);
    } catch (error) {
      console.error('Failed to upload PDF:', error);
    }
  };

  return (
    <>
      <button
        onClick={() => fileInput.current?.click()}
        className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        <Upload className="h-4 w-4 mr-2" />
        Upload PDF
      </button>
      <input
        type="file"
        ref={fileInput}
        onChange={handleUpload}
        accept=".pdf"
        className="hidden"
      />
    </>
  );
};