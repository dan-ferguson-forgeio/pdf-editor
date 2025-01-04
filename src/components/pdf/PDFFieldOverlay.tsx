import React from 'react';
import { Type, Calendar, PenTool, CheckSquare } from 'lucide-react';
import { useDraggable } from '@dnd-kit/core';
import { PDFField } from '../../types/pdf';

interface PDFFieldOverlayProps {
  field: PDFField;
  pageSize: { width: number; height: number };
}

export const PDFFieldOverlay: React.FC<PDFFieldOverlayProps> = ({ field, pageSize }) => {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: field.id,
    data: { field },
  });

  const getIcon = () => {
    switch (field.type) {
      case 'text':
        return <Type size={16} />;
      case 'date':
        return <Calendar size={16} />;
      case 'signature':
        return <PenTool size={16} />;
      case 'checkbox':
        return <CheckSquare size={16} />;
      default:
        return null;
    }
  };

  // Convert absolute coordinates to percentages for better scaling
  const style = {
    position: 'absolute' as const,
    left: field.x,
    top: field.y,
    width: `${field.width}px`,
    height: `${field.height}px`,
    opacity: isDragging ? 0.5 : 1,
    cursor: 'move',
    transformOrigin: '0 0',
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="border-2 border-blue-500 bg-blue-50 bg-opacity-30 rounded group hover:border-blue-600 hover:bg-blue-100"
      {...listeners}
      {...attributes}
      data-field-id={field.id}
    >
      <div className="absolute -top-6 left-0 text-xs bg-blue-500 text-white px-2 py-1 rounded flex items-center gap-1 pointer-events-none">
        {getIcon()}
        <span>{field.type}</span>
      </div>
    </div>
  );
};