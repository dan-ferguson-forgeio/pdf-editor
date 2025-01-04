import React from 'react';
import { DocumentList } from '../components/documents/DocumentList';
import { UploadButton } from '../components/documents/UploadButton';
import { useAuth } from '../hooks/useAuth';
import { Navigate } from 'react-router-dom';

export const DocumentsPage: React.FC = () => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">My Documents</h1>
        <UploadButton />
      </div>
      <DocumentList />
    </div>
  );
};