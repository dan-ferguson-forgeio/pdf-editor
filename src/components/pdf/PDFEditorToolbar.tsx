import React from 'react';
import { ArrowLeft, Save } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { CoordinateDisplay } from './CoordinateDisplay';

interface PDFEditorToolbarProps {
  onSave: () => void;
  isSaving: boolean;
  pageCoords: { x: number; y: number } | null;
  documentCoords: { x: number; y: number } | null;
  elementClass: string | null;
}

export const PDFEditorToolbar: React.FC<PDFEditorToolbarProps> = ({ 
  onSave, 
  isSaving, 
  pageCoords, 
  documentCoords,
  elementClass
}) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white border-b px-4 py-2 flex items-center justify-between">
      <button
        onClick={() => navigate('/documents')}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
      >
        <ArrowLeft size={20} />
        <span>Back to Documents</span>
      </button>

      <CoordinateDisplay 
        pageCoords={pageCoords} 
        documentCoords={documentCoords} 
        elementClass={elementClass}
      />
      
      <button
        onClick={onSave}
        disabled={isSaving}
        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
      >
        <Save size={18} />
        {isSaving ? 'Saving...' : 'Save Changes'}
      </button>
    </div>
  );
};