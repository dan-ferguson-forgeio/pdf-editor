import React from 'react';
import { Link } from 'react-router-dom';
import { FileSignature } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { UserMenu } from './UserMenu';

export const Navbar: React.FC = () => {
  const { user } = useAuth();

  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <FileSignature className="text-blue-600" size={24} />
            <span className="font-bold text-xl">PDFEditor</span>
          </Link>
          
          <div className="flex items-center space-x-4">
            {user ? (
              <UserMenu />
            ) : (
              <Link
                to="/auth"
                className="text-gray-700 hover:text-blue-600 transition-colors"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};