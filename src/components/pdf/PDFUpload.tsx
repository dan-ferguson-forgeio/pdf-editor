import React from 'react';
import { Upload } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { usePDFStore } from '../../stores/pdfStore';

export const PDFUpload: React.FC = () => {
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
    <div className="p-8 border-2 border-dashed rounded-lg hover:border-blue-500 transition-colors">
      <label className="flex flex-col items-center cursor-pointer">
        <Upload className="w-12 h-12 text-gray-400" />
        <span className="mt-2 text-sm text-gray-500">Upload PDF</span>
        <input
          type="file"
          accept=".pdf"
          onChange={handleUpload}
          className="hidden"
        />
      </label>
    </div>
  );
};