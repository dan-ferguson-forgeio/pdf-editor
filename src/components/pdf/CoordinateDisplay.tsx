import React from 'react';

interface CoordinateDisplayProps {
  pageCoords: { x: number; y: number } | null;
  documentCoords: { x: number; y: number } | null;
  elementClass: string | null;
}

export const CoordinateDisplay: React.FC<CoordinateDisplayProps> = ({ 
  pageCoords, 
  documentCoords, 
  elementClass 
}) => {
  return (
    <div className="flex items-center gap-4 text-sm text-gray-600">
      <div>
        Page: {pageCoords ? `(${Math.round(pageCoords.x)}, ${Math.round(pageCoords.y)})` : '(-, -)'}
      </div>
      <div>
        Document: {documentCoords ? `(${Math.round(documentCoords.x)}, ${Math.round(documentCoords.y)})` : '(-, -)'}
      </div>
      <div>
        Element: {elementClass || '-'}
      </div>
    </div>
  );
};