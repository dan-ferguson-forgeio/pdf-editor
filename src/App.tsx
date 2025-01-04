import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { HomePage } from './pages/HomePage';
import { AuthForm } from './components/auth/AuthForm';
import { DocumentsPage } from './pages/DocumentsPage';
import { EditorPage } from './pages/EditorPage';
import { useAuth } from './hooks/useAuth';

export default function App() {
  const { user, isLoading, initializeAuth } = useAuth();

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/auth" element={<AuthForm />} />
          <Route 
            path="/documents" 
            element={user ? <DocumentsPage /> : <AuthForm />} 
          />
          <Route 
            path="/editor/:id?" 
            element={user ? <EditorPage /> : <AuthForm />} 
          />
        </Routes>
      </div>
    </Router>
  );
}