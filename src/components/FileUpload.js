import { useCallback } from 'react';
import { FaCloudUploadAlt, FaFilePdf } from 'react-icons/fa';

const FileUpload = ({ onFileSelect, processingState, fileInputRef }) => {
  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    e.currentTarget.classList.add('drag-over');
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    e.currentTarget.classList.remove('drag-over');
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.currentTarget.classList.remove('drag-over');
    
    const file = e.dataTransfer.files[0];
    if (file && file.type === 'application/pdf') {
      onFileSelect(file);
    } else {
      alert('Please drop a valid PDF file');
    }
  }, [onFileSelect]);

  const handleFileInput = useCallback((e) => {
    const file = e.target.files[0];
    if (file) {
      onFileSelect(file);
    }
  }, [onFileSelect]);

  return (
    <div className="upload-area"
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="upload-icon">
        <FaCloudUploadAlt />
      </div>
      <h3>Drag & Drop PDF File Here</h3>
      <p>or click to browse (max 10MB)</p>
      
      <input
        type="file"
        ref={fileInputRef}
        accept=".pdf"
        onChange={handleFileInput}
        style={{ display: 'none' }}
      />
      
      <button
        className="btn btn-primary btn-large"
        onClick={() => fileInputRef.current?.click()}
        disabled={processingState === 'processing'}
      >
        <FaFilePdf /> Browse PDF Files
      </button>
      
      {processingState === 'processing' && (
        <div style={{ marginTop: '1rem' }}>
          <div className="loading-spinner"></div>
          <p>Processing PDF...</p>
        </div>
      )}
    </div>
  );
};

export default FileUpload;