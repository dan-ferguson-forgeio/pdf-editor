import React, { useState } from 'react';
import { DndContext, DragEndEvent } from '@dnd-kit/core';
import { PDF } from 'react-pdf';
import SignatureCanvas from 'react-signature-canvas';
import { Calendar, CheckSquare, Type, PenTool } from 'lucide-react';
import { PDFField } from '../types/pdf';

export const PDFEditor: React.FC = () => {
  const [fields, setFields] = useState<PDFField[]>([]);
  const [selectedField, setSelectedField] = useState<PDFField | null>(null);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over) {
      const newField: PDFField = {
        id: crypto.randomUUID(),
        type: active.id as PDFField['type'],
        x: over.rect.x,
        y: over.rect.y,
        width: 100,
        height: 30,
      };
      setFields([...fields, newField]);
    }
  };

  return (
    <div className="flex h-screen">
      <div className="w-64 bg-gray-100 p-4 border-r">
        <h2 className="text-lg font-semibold mb-4">Fields</h2>
        <div className="space-y-2">
          <div className="drag-item p-2 bg-white rounded shadow flex items-center gap-2">
            <Type size={20} />
            <span>Text Field</span>
          </div>
          <div className="drag-item p-2 bg-white rounded shadow flex items-center gap-2">
            <Calendar size={20} />
            <span>Date Field</span>
          </div>
          <div className="drag-item p-2 bg-white rounded shadow flex items-center gap-2">
            <PenTool size={20} />
            <span>Signature</span>
          </div>
          <div className="drag-item p-2 bg-white rounded shadow flex items-center gap-2">
            <CheckSquare size={20} />
            <span>Checkbox</span>
          </div>
        </div>
      </div>

      <DndContext onDragEnd={handleDragEnd}>
        <div className="flex-1 p-4">
          <div className="pdf-container relative">
            {/* PDF Viewer Component */}
            {fields.map((field) => (
              <div
                key={field.id}
                style={{
                  position: 'absolute',
                  left: field.x,
                  top: field.y,
                  width: field.width,
                  height: field.height,
                }}
                className="border-2 border-blue-500"
                onClick={() => setSelectedField(field)}
              />
            ))}
          </div>
        </div>
      </DndContext>

      {selectedField && (
        <div className="w-64 bg-gray-100 p-4 border-l">
          <h2 className="text-lg font-semibold mb-4">Field Properties</h2>
          {/* Field properties editor */}
        </div>
      )}
    </div>
  );
}