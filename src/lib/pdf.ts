import { pdfjs } from 'react-pdf';

// Initialize PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

export const initPDFWorker = () => {
  // This function exists to ensure the worker is initialized
  // We can add more PDF-related initialization here if needed
};