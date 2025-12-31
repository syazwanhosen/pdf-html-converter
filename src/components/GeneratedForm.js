import { useState } from 'react';
import { FaSignature, FaDatabase } from 'react-icons/fa';

const GeneratedForm = ({ sections, extractedFields }) => {
  const [formData, setFormData] = useState({});
  const [signature, setSignature] = useState(null);

  const handleInputChange = (fieldId, value) => {
    setFormData(prev => ({
      ...prev,
      [fieldId]: value
    }));
  };

  const handleCheckboxChange = (fieldId, value, checked) => {
    setFormData(prev => {
      const currentValues = prev[fieldId] || [];
      let newValues;
      
      if (checked) {
        newValues = [...currentValues, value];
      } else {
        newValues = currentValues.filter(v => v !== value);
      }
      
      return {
        ...prev,
        [fieldId]: newValues
      };
    });
  };

  const captureSignature = () => {
    // In a real implementation, this would open a signature pad
    alert('Signature capture would open here. In a real app, use a signature pad library.');
    setSignature('signature-data-here');
  };

  const renderField = (field) => {
    const fieldData = extractedFields.find(f => f.id === field.id);
    const isRequired = field.required;
    
    switch (field.type) {
      case 'text':
      case 'email':
      case 'tel':
      case 'number':
      case 'date':
        return (
          <div className="form-group" key={field.id}>
            <label htmlFor={field.id}>
              {field.label}
              {fieldData && <span className="ocr-badge">OCR</span>}
              {isRequired && <span className="required"> *</span>}
            </label>
            <input
              type={field.type}
              id={field.id}
              className="form-control"
              value={formData[field.id] || field.value || ''}
              onChange={(e) => handleInputChange(field.id, e.target.value)}
              required={isRequired}
            />
            {fieldData && (
              <div className="field-info">
                <FaDatabase /> Extracted with {fieldData.confidence}% confidence
              </div>
            )}
          </div>
        );

      case 'select':
        return (
          <div className="form-group" key={field.id}>
            <label htmlFor={field.id}>
              {field.label}
              {fieldData && <span className="ocr-badge">OCR</span>}
            </label>
            <select
              id={field.id}
              className="form-control"
              value={formData[field.id] || field.value || ''}
              onChange={(e) => handleInputChange(field.id, e.target.value)}
            >
              <option value="">Select {field.label}</option>
              <option value="single">Single</option>
              <option value="married">Married</option>
              <option value="divorced">Divorced</option>
              <option value="widowed">Widowed</option>
            </select>
            {fieldData && (
              <div className="field-info">
                <FaDatabase /> Extracted with {fieldData.confidence}% confidence
              </div>
            )}
          </div>
        );

      case 'checkbox':
        return (
          <div className="form-group" key={field.id}>
            <label>
              {field.label}
              {fieldData && <span className="ocr-badge">OCR</span>}
            </label>
            <div className="checkbox-group">
              {['Own Business', 'Salary', 'Commission', 'Gift/Investment', 'Others'].map((option) => (
                <div className="checkbox-item" key={option}>
                  <input
                    type="checkbox"
                    id={`${field.id}_${option}`}
                    checked={(formData[field.id] || field.value || []).includes(option.toLowerCase())}
                    onChange={(e) => handleCheckboxChange(field.id, option.toLowerCase(), e.target.checked)}
                  />
                  <label htmlFor={`${field.id}_${option}`}>{option}</label>
                </div>
              ))}
            </div>
            {fieldData && (
              <div className="field-info">
                <FaDatabase /> Extracted with {fieldData.confidence}% confidence
              </div>
            )}
          </div>
        );

      case 'radio':
        return (
          <div className="form-group" key={field.id}>
            <label>
              {field.label}
              {fieldData && <span className="ocr-badge">OCR</span>}
              {isRequired && <span className="required"> *</span>}
            </label>
            <div className="radio-group">
              {['Mr', 'Mrs', 'Ms', 'Others'].map((option) => (
                <div className="radio-item" key={option}>
                  <input
                    type="radio"
                    id={`${field.id}_${option}`}
                    name={field.id}
                    value={option.toLowerCase()}
                    checked={formData[field.id] === option.toLowerCase() || field.value === option.toLowerCase()}
                    onChange={(e) => handleInputChange(field.id, e.target.value)}
                    required={isRequired}
                  />
                  <label htmlFor={`${field.id}_${option}`}>{option}</label>
                </div>
              ))}
            </div>
            {fieldData && (
              <div className="field-info">
                <FaDatabase /> Extracted with {fieldData.confidence}% confidence
              </div>
            )}
          </div>
        );

      case 'signature':
        return (
          <div className="form-group" key={field.id}>
            <label htmlFor={field.id}>
              {field.label}
              {isRequired && <span className="required"> *</span>}
            </label>
            <div 
              className="signature-area"
              onClick={captureSignature}
            >
              {signature ? (
                <img 
                  src={signature} 
                  alt="Signature" 
                  style={{ maxWidth: '100%', maxHeight: '100px' }}
                />
              ) : (
                <>
                  <div className="signature-icon">
                    <FaSignature />
                  </div>
                  <p>Click to add signature</p>
                </>
              )}
            </div>
            <div className="field-info">
              Digital signature field detected
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Form submitted successfully! Data: ' + JSON.stringify(formData, null, 2));
  };

  return (
    <form onSubmit={handleSubmit}>
      {sections.map((section) => (
        <div className="form-section" key={section.title}>
          <h3 className="section-title">
            <section.icon /> {section.title}
          </h3>
          
          <div className="form-row">
            {section.fields.map(renderField)}
          </div>
        </div>
      ))}
      
      <div style={{ textAlign: 'center', marginTop: '2rem' }}>
        <button type="submit" className="btn btn-primary btn-large">
          Submit Application
        </button>
      </div>
    </form>
  );
};

export default GeneratedForm;