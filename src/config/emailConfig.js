// EmailJS Configuration
// This is using a demo setup for testing. Replace with your own credentials later.

export const emailConfig = {
  // Demo credentials for testing (replace with your own)
  serviceId: 'service_demo',
  templateId: 'template_demo', 
  publicKey: 'demo_public_key',
  
  // Your email where you want to receive messages
  toEmail: 'rokibhassan75@gmail.com'
};

// Template variables that will be sent to EmailJS:
// {{from_name}} - User's name
// {{from_email}} - User's email
// {{subject}} - Message subject
// {{message}} - Message content
// {{to_email}} - Your email (rokibhassan75@gmail.com)