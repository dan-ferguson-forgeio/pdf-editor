export interface PDFField {
  id: string;
  type: 'text' | 'date' | 'signature' | 'checkbox' | 'radio';
  x: number;
  y: number;
  width: number;
  height: number;
  value?: string;
  required?: boolean;
  label?: string;
  groupName?: string;
  pageNumber: number;
}

export interface PDFDocument {
  id: string;
  name: string;
  fields: PDFField[];
  workflow: WorkflowStep[];
  version: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface WorkflowStep {
  id: string;
  order: number;
  assignee: string;
  status: 'pending' | 'completed';
  fields: string[];
}