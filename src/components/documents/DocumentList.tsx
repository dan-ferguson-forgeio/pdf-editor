import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText } from 'lucide-react';
import { useDocuments } from '../../hooks/useDocuments';
import { DocumentCard } from './DocumentCard';

export const DocumentList: React.FC = () => {
  const navigate = useNavigate();
  const { documents, isLoading, error, refetch } = useDocuments();

  const handleDelete = useCallback(() => {
    refetch();
  }, [refetch]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8 text-red-600">
        <p>Error loading documents: {error}</p>
      </div>
    );
  }

  if (!documents?.length) {
    return (
      <div className="text-center py-12">
        <FileText className="mx-auto h-12 w-12 text-gray-400" />
        <h3 className="mt-2 text-sm font-semibold text-gray-900">No documents</h3>
        <p className="mt-1 text-sm text-gray-500">Upload a PDF to get started</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {documents.map((doc) => (
        <DocumentCard
          key={doc.id}
          document={doc}
          onDelete={handleDelete}
          onClick={() => navigate(`/editor/${doc.id}`)}
        />
      ))}
    </div>
  );
};