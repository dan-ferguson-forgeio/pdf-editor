import React from 'react';
import { MousePointerClick, Users, History, Download } from 'lucide-react';

const features = [
  {
    icon: <MousePointerClick size={24} />,
    title: 'Drag & Drop Editor',
    description: 'Intuitive interface to add text, signatures, dates, and more to your PDFs'
  },
  {
    icon: <Users size={24} />,
    title: 'Workflow Management',
    description: 'Define signing order and manage document workflows effortlessly'
  },
  {
    icon: <History size={24} />,
    title: 'Version Control',
    description: 'Track changes and maintain document history with built-in versioning'
  },
  {
    icon: <Download size={24} />,
    title: 'Easy Export',
    description: 'Download your edited PDFs instantly in standard PDF format'
  }
];

export const Features: React.FC = () => {
  return (
    <div className="py-16 bg-gray-50">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12">Everything You Need</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-blue-600 mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};