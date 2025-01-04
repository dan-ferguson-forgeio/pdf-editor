import React from 'react';
import { Page } from 'react-pdf';
import { PDFField } from '../../types/pdf';
import { PDFFieldOverlay } from './PDFFieldOverlay';

interface PDFPageProps {
  pageNumber: number;
  fields: PDFField[];
  scale?: number;
}

export const PDFPage: React.FC<PDFPageProps> = ({ pageNumber, fields, scale = 1 }) => {
  const [pageSize, setPageSize] = React.useState<{ width: number; height: number }>();

  const handlePageLoadSuccess = ({ width, height }: { width: number; height: number }) => {
    setPageSize({ width: width * scale, height: height * scale });
  };

  return (
    <div 
      className="relative pdf-document-container mb-4"
      data-page-number={pageNumber}
    >
      <Page
        pageNumber={pageNumber}
        renderTextLayer={false}
        renderAnnotationLayer={false}
        onLoadSuccess={handlePageLoadSuccess}
        scale={scale}
        className="shadow-lg"
      />
      {pageSize && fields
        .filter(field => field.pageNumber === pageNumber)
        .map((field) => (
          <PDFFieldOverlay
            key={field.id}
            field={field}
            pageSize={pageSize}
          />
        ))}
    </div>
  );
};