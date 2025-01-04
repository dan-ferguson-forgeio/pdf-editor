import React from 'react';
import { FileSignature } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Hero: React.FC = () => {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20">
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center">
          <FileSignature size={64} className="mb-8" />
          <h1 className="text-5xl font-bold text-center mb-4">
            PDF Editor & eSignature Platform
          </h1>
          <p className="text-xl text-center mb-8 max-w-2xl">
            Create, edit, and manage PDF documents with our powerful drag-and-drop editor. 
            Add signatures, form fields, and manage document workflows - all for free.
          </p>
          <Link
            to="/documents"
            className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
          >
            Get Started
          </Link>
        </div>
      </div>
    </div>
  );
};