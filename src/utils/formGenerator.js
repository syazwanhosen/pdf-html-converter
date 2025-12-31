export class FormGenerator {
  static generateFormHTML(fields) {
    const formSections = this.groupFields(fields);
    
    let html = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Generated Form</title>
          <style>
              /* Add your styles here */
              body {
                  font-family: Arial, sans-serif;
                  padding: 20px;
                  background: #f5f7fa;
              }
              .form-container {
                  max-width: 800px;
                  margin: 0 auto;
                  background: white;
                  padding: 30px;
                  border-radius: 10px;
                  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
              }
              /* ... more styles ... */
          </style>
      </head>
      <body>
          <div class="form-container">
              <h1>Generated Form from PDF</h1>
    `;

    formSections.forEach(section => {
      html += `
        <div class="form-section">
          <h2>${section.title}</h2>
      `;

      section.fields.forEach(field => {
        html += this.generateFieldHTML(field);
      });

      html += `</div>`;
    });

    html += `
          </div>
          <script>
              // Add your JavaScript here
              function submitForm() {
                  alert('Form submitted!');
              }
          </script>
      </body>
      </html>
    `;

    return html;
  }

  static generateFieldHTML(field) {
    switch (field.type) {
      case 'text':
        return `
          <div class="form-group">
            <label for="${field.id}">${field.label}</label>
            <input type="text" id="${field.id}" value="${field.value || ''}" class="form-control">
          </div>
        `;
      // Add more field types...
      default:
        return '';
    }
  }

  static groupFields(fields) {
    // Group fields by category
    const groups = {
      'Personal Information': [],
      'Contact Details': [],
      'Account Information': [],
      'Other Information': []
    };

    fields.forEach(field => {
      const label = field.label.toLowerCase();
      if (label.includes('name') || label.includes('dob') || label.includes('birth')) {
        groups['Personal Information'].push(field);
      } else if (label.includes('email') || label.includes('phone') || label.includes('address')) {
        groups['Contact Details'].push(field);
      } else if (label.includes('account') || label.includes('deposit') || label.includes('amount')) {
        groups['Account Information'].push(field);
      } else {
        groups['Other Information'].push(field);
      }
    });

    return Object.entries(groups)
      .filter(([_, fields]) => fields.length > 0)
      .map(([title, fields]) => ({ title, fields }));
  }
}