import React from 'react';
import { PDFEditor } from '../components/pdf/PDFEditor';
import { PDFUpload } from '../components/pdf/PDFUpload';
import { useParams } from 'react-router-dom';

export const EditorPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  if (id) {
    return <PDFEditor />;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-xl mx-auto mt-12">
        <PDFUpload />
      </div>
    </div>
  );
};