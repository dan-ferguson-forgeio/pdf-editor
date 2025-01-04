import React, { useState } from 'react';
import { FileText, Calendar, Trash2 } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { Document } from '../../types/document';
import { useDocumentOperations } from '../../hooks/useDocumentOperations';

interface DocumentCardProps {
  document: Document;
  onDelete: () => void;
  onClick: () => void;
}

export const DocumentCard: React.FC<DocumentCardProps> = ({ document, onDelete, onClick }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const { deleteDocument } = useDocumentOperations();

  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isDeleting) return;

    try {
      setIsDeleting(true);
      await deleteDocument(document.id, document.storage_path);
      onDelete();
    } catch (error) {
      console.error('Failed to delete document:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div
      onClick={onClick}
      className="group relative bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow cursor-pointer"
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-3">
          <FileText className="h-6 w-6 text-blue-500" />
          <div>
            <h3 className="text-sm font-medium text-gray-900">{document.name}</h3>
            <div className="flex items-center mt-1 text-xs text-gray-500">
              <Calendar className="h-3 w-3 mr-1" />
              <span>
                {formatDistanceToNow(new Date(document.created_at), { addSuffix: true })}
              </span>
            </div>
          </div>
        </div>
        <button
          onClick={handleDelete}
          disabled={isDeleting}
          className="opacity-0 group-hover:opacity-100 p-1 hover:bg-red-50 rounded transition-all"
        >
          {isDeleting ? (
            <div className="h-5 w-5 border-2 border-red-500 border-t-transparent rounded-full animate-spin" />
          ) : (
            <Trash2 className="h-5 w-5 text-red-500" />
          )}
        </button>
      </div>
    </div>
  );
}