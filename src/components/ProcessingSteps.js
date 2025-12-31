const ProcessingSteps = ({ steps, activeStep, progress }) => {
  return (
    <div className="processing-steps">
      <h3>Processing Steps</h3>
      
      <div className="steps-container">
        {steps.map((step) => {
          const isActive = step.id === activeStep;
          const isCompleted = step.id < activeStep;
          const status = isCompleted ? 'completed' : isActive ? 'active' : '';
          
          return (
            <div key={step.id} className={`step ${status}`}>
              <div className="step-icon">
                {isActive ? (
                  <step.icon className="fa-spin" />
                ) : isCompleted ? (
                  <step.icon />
                ) : (
                  <step.icon />
                )}
              </div>
              <div className="step-content">
                <div className="step-title">{step.title}</div>
                <div className="step-description">{step.description}</div>
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="progress-container">
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <div className="progress-text">
          <span>Processing</span>
          <span>{Math.round(progress)}%</span>
        </div>
      </div>
    </div>
  );
};

export default ProcessingSteps;