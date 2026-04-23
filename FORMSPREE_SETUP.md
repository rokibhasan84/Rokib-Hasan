# Formspree Setup - Get Real Emails in 2 Minutes!

## Current Status: 
Your form now opens the user's email client with a pre-filled message. This works immediately but requires users to have an email client.

## For Automatic Email Delivery (Recommended):

### Step 1: Create Formspree Account
1. Go to [https://formspree.io/](https://formspree.io/)
2. Click "Get Started" 
3. Sign up with any email (can be different from your target email)

### Step 2: Create New Form
1. After signing up, click "New Form"
2. Enter form name: "Portfolio Contact"
3. Enter your email: `rokibhassan75@gmail.com`
4. Click "Create Form"

### Step 3: Get Your Form Endpoint
You'll get a URL like: `https://formspree.io/f/mwpevgbl`
Copy the part after `/f/` (example: `mwpevgbl`)

### Step 4: Update Your Code
Replace the current handleSubmit function in `src/components/Contact.js`:

```javascript
const handleSubmit = async (e) => {
  e.preventDefault();
  setIsSubmitting(true);
  
  try {
    const response = await fetch('https://formspree.io/f/YOUR_FORM_ID_HERE', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        message: formData.message,
      }),
    });

    if (response.ok) {
      alert('Thank you for your message! I\'ll get back to you soon.');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } else {
      throw new Error('Form submission failed');
    }
  } catch (error) {
    console.error('Form submission error:', error);
    alert('Sorry, there was an error sending your message. Please try again.');
  } finally {
    setIsSubmitting(false);
  }
};
```

Replace `YOUR_FORM_ID_HERE` with your actual form ID from Step 3.

### Step 5: Test
Submit a test message - you should receive it in your email within seconds!

## Benefits:
- ✅ Users don't need email clients
- ✅ Messages sent automatically
- ✅ Free for 50 submissions/month
- ✅ Spam protection included