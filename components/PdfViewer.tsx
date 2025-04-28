import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import { useState } from 'react';
import styles from './PdfViewer.module.css';
import dynamic from 'next/dynamic';

// Set worker source from local public folder
pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.mjs';

type PdfViewerProps = {
  file: string;
};

const PdfViewer = ({ file }: PdfViewerProps) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      const fileUrl = URL.createObjectURL(selectedFile);
      setFile(fileUrl);
    }
  };

  const [localFile, setFile] = useState(file);
  const [numPages, setNumPages] = useState<number>();
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [scale, setScale] = useState<number>(1.0);
  const [error, setError] = useState<string | null>(null);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages);
    setError(null);
  }

  function onDocumentLoadError(error: Error): void {
    console.error('PDF load error:', error);
    setError('Failed to load PDF. Please try again.');
  }

  function handlePageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const newPage = parseInt(e.target.value);
    if (!isNaN(newPage) && newPage >= 1 && newPage <= (numPages || 1)) {
      setPageNumber(newPage);
    }
  }

  return (
    <div className={styles.viewerContainer}>
      {error && <div className={styles.error}>{error}</div>}
      <div className={styles.fileInput}>
        <input 
          type="file" 
          accept=".pdf" 
          onChange={handleFileChange}
        />
      </div>
      <Document
        file={localFile}
        onLoadSuccess={onDocumentLoadSuccess}
        onLoadError={onDocumentLoadError}
        loading={<div className={styles.loading}>Loading PDF...</div>}
      >
        <Page 
          pageNumber={pageNumber} 
          scale={scale}
          className={styles.page}
        />
      </Document>
      <div className={styles.controls}>
        <div className={styles.zoomControls}>
          <button 
            onClick={() => setScale(prev => Math.max(prev - 0.25, 0.5))}
            disabled={scale <= 0.5}
          >
            Zoom Out
          </button>
          <span>Zoom: {(scale * 100).toFixed(0)}%</span>
          <button 
            onClick={() => setScale(prev => Math.min(prev + 0.25, 2.0))}
            disabled={scale >= 2.0}
          >
            Zoom In
          </button>
        </div>
        <div className={styles.pageControls}>
          <button 
            onClick={() => setPageNumber(prev => Math.max(prev - 1, 1))}
            disabled={pageNumber <= 1}
          >
            Previous
          </button>
          <div className={styles.pageInput}>
            <span>Page </span>
            <input
              type="number"
              min="1"
              max={numPages}
              value={pageNumber}
              onChange={handlePageChange}
            />
            <span> of {numPages || '--'}</span>
          </div>
          <button 
            onClick={() => setPageNumber(prev => Math.min(prev + 1, numPages || 1))}
            disabled={pageNumber >= (numPages || 1)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default dynamic(() => Promise.resolve(PdfViewer), {
  ssr: false
});
