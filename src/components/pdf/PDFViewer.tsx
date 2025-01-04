import React, { useEffect } from 'react';
import { Document, Page } from 'react-pdf';
import { useParams } from 'react-router-dom';
import { useDroppable } from '@dnd-kit/core';
import { usePDFStore } from '../../stores/pdfStore';
import { PDFField } from '../../types/pdf';
import { PDFPage } from './PDFPage';
import { initPDFWorker } from '../../lib/pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

interface PDFViewerProps {
  fields: PDFField[];
  isDragging: boolean;
}

export const PDFViewer: React.FC<PDFViewerProps> = ({ fields, isDragging }) => {
  const { id } = useParams<{ id: string }>();
  const [url, setUrl] = React.useState<string>();
  const [numPages, setNumPages] = React.useState<number>();
  const [scale, setScale] = React.useState(1);
  const { getPDFUrl } = usePDFStore();
  const { setNodeRef, isOver } = useDroppable({ 
    id: 'pdf-viewer',
  });

  useEffect(() => {
    initPDFWorker();
  }, []);

  useEffect(() => {
    if (id) {
      getPDFUrl(id).then(setUrl).catch(console.error);
    }
  }, [id, getPDFUrl]);

  const handleDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  if (!url) {
    return <PDFLoadingState />;
  }

  return (
    <div 
      ref={setNodeRef}
      className={`w-full h-full overflow-auto bg-gray-100 p-4 ${
        isOver || isDragging ? 'bg-blue-50' : ''
      }`}
    >
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg">
        <Document
          file={url}
          onLoadSuccess={handleDocumentLoadSuccess}
          loading={<PDFLoadingState />}
          error={<PDFErrorState />}
        >
          {Array.from(new Array(numPages), (_, index) => (
            <PDFPage
              key={`page_${index + 1}`}
              pageNumber={index + 1}
              fields={fields}
              scale={scale}
            />
          ))}
        </Document>
      </div>
    </div>
  );
};

const PDFLoadingState: React.FC = () => (
  <div className="flex items-center justify-center h-96">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
  </div>
);

const PDFErrorState: React.FC = () => (
  <div className="flex items-center justify-center h-96 text-red-600">
    Failed to load PDF. Please try again.
  </div>
);