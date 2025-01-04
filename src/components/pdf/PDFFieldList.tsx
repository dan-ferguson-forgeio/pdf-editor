import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import { Type, Calendar, PenTool, CheckSquare } from 'lucide-react';

interface FieldTypeProps {
  type: string;
  icon: React.ReactNode;
  label: string;
}

const FieldType: React.FC<FieldTypeProps> = ({ type, icon, label }) => {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `new-${type}`,
  });

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={{
        touchAction: 'none',
      }}
      className={`flex items-center gap-2 p-3 bg-white rounded-lg shadow-sm cursor-move hover:bg-gray-50 ${
        isDragging ? 'opacity-50' : ''
      }`}
    >
      {icon}
      <span className="text-sm font-medium">{label}</span>
    </div>
  );
};

export const PDFFieldList: React.FC = () => {
  return (
    <div className="w-64 bg-gray-100 p-4 flex flex-col gap-3">
      <h2 className="font-semibold text-gray-700 mb-2">Fields</h2>
      <FieldType type="text" icon={<Type size={18} />} label="Text Field" />
      <FieldType type="date" icon={<Calendar size={18} />} label="Date Field" />
      <FieldType type="signature" icon={<PenTool size={18} />} label="Signature" />
      <FieldType type="checkbox" icon={<CheckSquare size={18} />} label="Checkbox" />
    </div>
  );
};