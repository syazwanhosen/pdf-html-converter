import { FaDatabase } from 'react-icons/fa';

const ExtractedData = ({ fields, onAutoBind }) => {
  const getConfidenceClass = (confidence) => {
    if (confidence >= 90) return 'confidence-high';
    if (confidence >= 70) return 'confidence-medium';
    return 'confidence-low';
  };

  return (
    <div className="extracted-data">
      <div className="data-header">
        <h3><FaDatabase /> Extracted Data</h3>
        <span>{fields.length} fields</span>
      </div>
      
      <div className="data-list">
        {fields.map((field) => (
          <div key={field.id} className="data-item">
            <div className="data-field">{field.label}</div>
            <div className="data-value">{field.value || '(empty)'}</div>
            <div className={`data-confidence ${getConfidenceClass(field.confidence)}`}>
              {field.confidence}%
            </div>
          </div>
        ))}
      </div>
      
      <button 
        className="btn btn-primary"
        onClick={onAutoBind}
        style={{ marginTop: '1rem', width: '100%' }}
      >
        Auto-Bind Data to Form
      </button>
    </div>
  );
};

export default ExtractedData;