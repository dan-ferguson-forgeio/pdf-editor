import React from 'react';
import { Type, Calendar, PenTool, CheckSquare } from 'lucide-react';

interface DragOverlayProps {
  type: string;
}

export const DragOverlay: React.FC<DragOverlayProps> = ({ type }) => {
  const getIcon = () => {
    switch (type) {
      case 'text':
        return <Type size={18} />;
      case 'date':
        return <Calendar size={18} />;
      case 'signature':
        return <PenTool size={18} />;
      case 'checkbox':
        return <CheckSquare size={18} />;
      default:
        return null;
    }
  };

  return (
    <div 
      className="flex items-center gap-2 p-3 bg-white/80 rounded-lg shadow-lg border-2 border-blue-500 pointer-events-none"
      style={{
        position: 'fixed',
        left: 0,
        top: 0,
        transform: `translate(var(--dnd-draggable-offset-x), var(--dnd-draggable-offset-y))`,
        zIndex: 1000,
        cursor: 'grabbing',
        width: 'fit-content'
      }}
      data-dnd-overlay="true"
    >
      {getIcon()}
      <span className="text-sm font-medium">{type}</span>
    </div>
  );
};