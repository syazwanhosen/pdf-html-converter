import { useRef } from 'react';
import { FaTimes, FaCopy, FaCode } from 'react-icons/fa';

const CodePreview = ({ htmlCode, onClose }) => {
  const codeRef = useRef(null);

  const handleCopyCode = () => {
    if (codeRef.current) {
      navigator.clipboard.writeText(htmlCode)
        .then(() => {
          alert('HTML code copied to clipboard!');
        })
        .catch(err => {
          console.error('Failed to copy code:', err);
          alert('Failed to copy code to clipboard');
        });
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3><FaCode /> Generated HTML Code</h3>
          <button className="close-btn" onClick={onClose}>
            <FaTimes />
          </button>
        </div>
        
        <p>Copy this code to use in your project:</p>
        
        <div className="code-preview" ref={codeRef}>
          {htmlCode}
        </div>
        
        <div style={{ marginTop: '1.5rem', display: 'flex', gap: '1rem' }}>
          <button className="btn btn-primary" onClick={handleCopyCode}>
            <FaCopy /> Copy to Clipboard
          </button>
          <button className="btn btn-secondary" onClick={onClose}>
            <FaTimes /> Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default CodePreview;