import React, { useState, useCallback } from 'react';
import { DndContext, DragEndEvent, MouseSensor, TouchSensor, useSensor, useSensors, DragOverlay as DndDragOverlay } from '@dnd-kit/core';
import { PDFFieldList } from './PDFFieldList';
import { PDFEditorToolbar } from './PDFEditorToolbar';
import { PDFViewer } from './PDFViewer';
import { DragOverlay } from './DragOverlay';
import { PDFFieldOverlay } from './PDFFieldOverlay';
import { PDFField } from '../../types/pdf';
import { useParams } from 'react-router-dom';
import { getFirstNonOverlayElement, findPDFContainer, getElementCoordinates } from '../../utils/dom';

export const PDFEditor: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [fields, setFields] = useState<PDFField[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [pageCoords, setPageCoords] = useState<{ x: number; y: number } | null>(null);
  const [documentCoords, setDocumentCoords] = useState<{ x: number; y: number } | null>(null);
  const [elementClass, setElementClass] = useState<string | null>(null);

  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: { distance: 10 },
  });
  
  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: { delay: 250, tolerance: 5 },
  });

  const sensors = useSensors(mouseSensor, touchSensor);

  const handleSave = async () => {
    if (!id) return;
    
    setIsSaving(true);
    try {
      // Save logic will be implemented here
      await new Promise(resolve => setTimeout(resolve, 1000));
    } finally {
      setIsSaving(false);
    }
  };

  const handleDragStart = (event: { active: { id: string } }) => {
    setActiveId(event.active.id);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);
    
    if (!over || !over.id === 'pdf-viewer' || !documentCoords) return;

    // Check if this is a new field being added
    if (active.id.toString().startsWith('new-')) {
      const newField: PDFField = {
        id: crypto.randomUUID(),
        type: active.id.toString().replace('new-', '') as PDFField['type'],
        x: documentCoords.x,
        y: documentCoords.y,
        width: 150,
        height: 40,
        pageNumber: Number(document.elementFromPoint(
          event.activatorEvent.clientX,
          event.activatorEvent.clientY
        )?.closest('.pdf-document-container')?.getAttribute('data-page-number')) || 1,
      };
      setFields([...fields, newField]);
    } else {
      // Update existing field position
      setFields(fields.map(field => {
        if (field.id === active.id) {
          return {
            ...field,
            x: documentCoords.x,
            y: documentCoords.y,
            pageNumber: Number(document.elementFromPoint(
              event.activatorEvent.clientX,
              event.activatorEvent.clientY
            )?.closest('.pdf-document-container')?.getAttribute('data-page-number')) || field.pageNumber,
          };
        }
        return field;
      }));
    }
  };

  const handleMouseMove = useCallback((e: MouseEvent) => {
    setPageCoords({ x: e.clientX, y: e.clientY });

    const element = getFirstNonOverlayElement(e.clientX, e.clientY);
    const container = findPDFContainer(element);
    
    if (container) {
      const coords = getElementCoordinates(container, e.clientX, e.clientY);
      if (coords) {
        setDocumentCoords(coords);
        setElementClass(element?.className || null);
      }
    } else {
      setDocumentCoords(null);
      setElementClass(null);
    }
  }, []);

  React.useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [handleMouseMove]);

  const getDragOverlay = () => {
    if (!activeId) return null;
    
    if (activeId.toString().startsWith('new-')) {
      return <DragOverlay type={activeId.toString().replace('new-', '')} />;
    }
    
    const field = fields.find(f => f.id === activeId);
    if (field) {
      return (
        <PDFFieldOverlay
          field={field}
          pageSize={{ width: 1, height: 1 }} // Size doesn't matter for drag overlay
        />
      );
    }
    
    return null;
  };

  return (
    <div className="h-screen flex flex-col">
      <PDFEditorToolbar 
        onSave={handleSave} 
        isSaving={isSaving}
        pageCoords={pageCoords}
        documentCoords={documentCoords}
        elementClass={elementClass}
      />
      <DndContext 
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd} 
        sensors={sensors}
      >
        <div className="flex flex-1 overflow-hidden">
          <PDFFieldList />
          <div className="flex-1 overflow-auto">
            <PDFViewer 
              fields={fields}
              isDragging={activeId !== null}
            />
          </div>
        </div>
        <DndDragOverlay>
          {getDragOverlay()}
        </DndDragOverlay>
      </DndContext>
    </div>
  );
};