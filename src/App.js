import { useState, useRef } from 'react';
import { FaFilePdf, FaMagic, FaCloudUploadAlt, FaCode, FaDownload, FaLink, FaCheck, FaSpinner, FaUser, FaFileAlt, FaSignature } from 'react-icons/fa';
import FileUpload from './components/FileUpload';
import ProcessingSteps from './components/ProcessingSteps';
import ExtractedData from './components/ExtractedData';
import GeneratedForm from './components/GeneratedForm';
import CodePreview from './components/CodePreview';
import './App.css';

function App() {
  const [pdfFile, setPdfFile] = useState(null);
  const [processingState, setProcessingState] = useState('idle'); // idle, uploading, processing, completed, error
  const [progress, setProgress] = useState(0);
  const [extractedFields, setExtractedFields] = useState([]);
  const [generatedForm, setGeneratedForm] = useState(null);
  const [showCodePreview, setShowCodePreview] = useState(false);
  const [activeStep, setActiveStep] = useState(1);
  const fileInputRef = useRef(null);

  // Sample data structure for extracted fields
  const sampleFields = [
    { id: 'field_1', label: 'Applicant Name', value: 'MD. ABDUL KARIM', type: 'text', confidence: 98, required: true },
    { id: 'field_2', label: 'Father Name', value: 'MD. ABDUL HALIM', type: 'text', confidence: 92, required: false },
    { id: 'field_3', label: 'Date of Birth', value: '1985-06-15', type: 'date', confidence: 96, required: true },
    { id: 'field_4', label: 'National ID No', value: '19958516125000123', type: 'text', confidence: 97, required: true },
    { id: 'field_5', label: 'Mobile Number', value: '01712345678', type: 'tel', confidence: 95, required: true },
    { id: 'field_6', label: 'Email ID', value: 'abdul.karim@example.com', type: 'email', confidence: 90, required: false },
    { id: 'field_7', label: 'Deposit Amount', value: '500000', type: 'number', confidence: 99, required: true },
    { id: 'field_8', label: 'Account Title', value: 'Mr', type: 'radio', confidence: 82, required: true },
    { id: 'field_9', label: 'Marital Status', value: 'married', type: 'select', confidence: 80, required: false },
    { id: 'field_10', label: 'Source of Income', value: ['salary'], type: 'checkbox', confidence: 75, required: false },
  ];

  // Process steps
  const steps = [
    { id: 1, title: 'Upload PDF', icon: FaCloudUploadAlt, description: 'Select your PDF form' },
    { id: 2, title: 'OCR Processing', icon: FaSpinner, description: 'Extracting text and fields' },
    { id: 3, title: 'HTML Generation', icon: FaCode, description: 'Creating interactive form' },
    { id: 4, title: 'Data Binding', icon: FaLink, description: 'Connecting OCR data' },
  ];

  const handleFileUpload = (file) => {
    if (!file) return;
    
    setPdfFile(file);
    setProcessingState('uploading');
    setActiveStep(1);
    setProgress(10);

    // Simulate PDF processing
    setTimeout(() => {
      setActiveStep(2);
      setProgress(30);
      
      setTimeout(() => {
        setExtractedFields(sampleFields);
        setActiveStep(3);
        setProgress(60);
        
        setTimeout(() => {
          generateFormFromFields(sampleFields);
          setActiveStep(4);
          setProgress(80);
          
          setTimeout(() => {
            setProcessingState('completed');
            setProgress(100);
          }, 1000);
        }, 1500);
      }, 2000);
    }, 1000);
  };

  const generateFormFromFields = (fields) => {
    // Generate form sections based on field types
    const formSections = [
      {
        title: 'Personal Information',
        icon: FaUser,
        fields: fields.filter(f => 
          ['text', 'date', 'select', 'radio'].includes(f.type) && 
          ['name', 'father', 'mother', 'dob', 'marital'].some(key => 
            f.label.toLowerCase().includes(key)
          )
        )
      },
      {
        title: 'Contact Details',
        icon: FaFileAlt,
        fields: fields.filter(f => 
          ['email', 'tel', 'text'].includes(f.type) && 
          ['email', 'phone', 'mobile', 'address'].some(key => 
            f.label.toLowerCase().includes(key)
          )
        )
      },
      {
        title: 'Account Information',
        icon: FaFileAlt,
        fields: fields.filter(f => 
          ['number', 'select', 'checkbox'].includes(f.type) && 
          ['account', 'deposit', 'amount', 'income'].some(key => 
            f.label.toLowerCase().includes(key)
          )
        )
      },
      {
        title: 'Signature',
        icon: FaSignature,
        fields: [{ 
          id: 'signature', 
          label: 'Digital Signature', 
          value: '', 
          type: 'signature', 
          confidence: 100, 
          required: true 
        }]
      }
    ];

    setGeneratedForm(formSections);
  };

  const handleAutoBindData = () => {
    // Simulate auto-binding data
    alert('OCR data automatically bound to form fields!');
  };

  const handleExportHTML = () => {
    const htmlCode = generateHTMLCode();
    const blob = new Blob([htmlCode], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'generated-form.html';
    a.click();
    URL.revokeObjectURL(url);
  };

  const generateHTMLCode = () => {
    return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Generated Form from PDF</title>
    <style>
        /* Add your styles here */
        body { font-family: Arial, sans-serif; padding: 20px; }
        .form-container { max-width: 800px; margin: 0 auto; }
        .form-group { margin-bottom: 15px; }
        /* ... more styles ... */
    </style>
</head>
<body>
    <div class="form-container">
        <h1>Generated Form from PDF</h1>
        <!-- Form content will be here -->
    </div>
</body>
</html>`;
  };

  const handleReset = () => {
    setPdfFile(null);
    setProcessingState('idle');
    setProgress(0);
    setExtractedFields([]);
    setGeneratedForm(null);
    setActiveStep(1);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="app">
      {/* Header */}
      <header className="app-header">
        <div className="header-content">
          <FaMagic className="header-icon" />
          <h1>Auto PDF to HTML Form Converter</h1>
          <p>Upload any PDF form and automatically generate an interactive HTML form with OCR data binding</p>
        </div>
      </header>

      <div className="main-container">
        {/* Left Panel */}
        <div className="left-panel">
          <FileUpload 
            onFileSelect={handleFileUpload}
            processingState={processingState}
            fileInputRef={fileInputRef}
          />

          <div className="processing-section">
            <ProcessingSteps 
              steps={steps}
              activeStep={activeStep}
              progress={progress}
            />

            {extractedFields.length > 0 && (
              <ExtractedData 
                fields={extractedFields}
                onAutoBind={handleAutoBindData}
              />
            )}
          </div>
        </div>

        {/* Right Panel */}
        <div className="right-panel">
          {generatedForm ? (
            <>
              <div className="generated-form-container">
                <div className="form-header">
                  <h2><FaFilePdf /> LankaBangla Deposit Scheme Application</h2>
                  <p>Automatically generated from PDF form</p>
                </div>

                <GeneratedForm 
                  sections={generatedForm}
                  extractedFields={extractedFields}
                />
              </div>

              <div className="form-actions">
                <button 
                  className="btn btn-secondary"
                  onClick={() => setShowCodePreview(true)}
                >
                  <FaCode /> Preview Code
                </button>
                <button 
                  className="btn btn-success"
                  onClick={handleExportHTML}
                >
                  <FaDownload /> Export HTML
                </button>
                <button 
                  className="btn btn-primary"
                  onClick={handleAutoBindData}
                >
                  <FaLink /> Auto-Bind Data
                </button>
                <button 
                  className="btn btn-danger"
                  onClick={handleReset}
                >
                  Reset
                </button>
              </div>
            </>
          ) : (
            <div className="empty-state">
              <FaFilePdf className="empty-icon" />
              <h3>No PDF Processed Yet</h3>
              <p>Upload a PDF form to see the generated HTML form here</p>
            </div>
          )}
        </div>
      </div>

      {/* Code Preview Modal */}
      {showCodePreview && (
        <CodePreview 
          htmlCode={generateHTMLCode()}
          onClose={() => setShowCodePreview(false)}
        />
      )}
    </div>
  );
}

export default App;