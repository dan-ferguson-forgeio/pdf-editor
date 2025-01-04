export function getFirstNonOverlayElement(x: number, y: number): Element | null {
  const elements = document.elementsFromPoint(x, y);
  return elements.find(element => {
    if (element.hasAttribute('data-dnd-overlay') || 
        element.closest('[data-dnd-overlay]')) {
      return false;
    }
    
    if (element.hasAttribute('aria-describedby')) {
      const describedBy = element.getAttribute('aria-describedby');
      if (describedBy?.includes('DndDescribedBy')) {
        return false;
      }
    }

    return element.closest('.pdf-document-container') !== null;
  }) || null;
}

export function findPDFContainer(element: Element | null): Element | null {
  if (!element) return null;
  return element.closest('.pdf-document-container');
}

export function getElementCoordinates(container: Element | null, clientX: number, clientY: number) {
  if (!container) return null;

  const rect = container.getBoundingClientRect();
  const scrollContainer = container.closest('.overflow-auto');
  
  // Get scroll offsets
  const scrollOffset = {
    x: scrollContainer ? scrollContainer.scrollLeft : 0,
    y: scrollContainer ? scrollContainer.scrollTop : 0,
  };

  // Calculate position relative to PDF container, accounting for scroll
  const x = clientX - rect.left;
  const y = clientY - rect.top;

  return {
    x: Math.round(x + scrollOffset.x),
    y: Math.round(y + scrollOffset.y)
  };
}