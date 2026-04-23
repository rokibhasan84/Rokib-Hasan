import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Temporary solution: Create mailto link with form data
      const subject = encodeURIComponent(`Portfolio Contact: ${formData.subject}`);
      const body = encodeURIComponent(
        `Name: ${formData.name}\n` +
        `Email: ${formData.email}\n` +
        `Subject: ${formData.subject}\n\n` +
        `Message:\n${formData.message}\n\n` +
        `---\nSent from portfolio contact form`
      );
      
      const mailtoLink = `mailto:rokibhassan75@gmail.com?subject=${subject}&body=${body}`;
      
      // Open email client
      window.location.href = mailtoLink;
      
      // Show success message
      setTimeout(() => {
        alert('Your email client should open now. Please send the email to complete your message.');
        setFormData({ name: '', email: '', subject: '', message: '' });
        setIsSubmitting(false);
      }, 1000);
      
    } catch (error) {
      console.error('Form submission error:', error);
      alert('Sorry, there was an error. Please email me directly at rokibhassan75@gmail.com');
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: 'mail',
      title: 'Email',
      value: 'rokibhassan75@.com',
      link: 'mailto:rokibhassan75@gmail.com'
    },
    {
      icon: 'phone',
      title: 'Phone',
      value: '+601129247275',
      link: 'tel:+601129247275'
    },
    {
      icon: 'location_on',
      title: 'Location',
      value: 'Pochong, Selengor, Malaysia',
      link: '#'
    }
  ];

  return (
    <div className="py-10 px-4 bg-slate-50 dark:bg-[#0f1419]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Get In Touch</h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Have a project in mind? Let's discuss how we can work together to bring your ideas to life.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold mb-6 text-slate-900 dark:text-white">
                Let's Start a Conversation
              </h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-8">
                I'm always interested in new opportunities and exciting projects. 
                Whether you have a question about my work, want to collaborate, or just want to say hello, 
                I'd love to hear from you.
              </p>
            </div>

            {/* Contact Details */}
            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <a
                  key={index}
                  href={info.link}
                  className="flex items-center gap-4 p-4 bg-white dark:bg-[#1a2027] rounded-lg hover:shadow-md transition-all group"
                >
                  <div className="flex items-center justify-center w-12 h-12 bg-primary/10 text-primary rounded-lg group-hover:bg-primary group-hover:text-white transition-colors">
                    <span className="material-symbols-outlined">{info.icon}</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 dark:text-white">{info.title}</h4>
                    <p className="text-slate-600 dark:text-slate-400">{info.value}</p>
                  </div>
                </a>
              ))}
            </div>

            {/* Social Links */}
            <div>
              <h4 className="font-semibold text-slate-900 dark:text-white mb-4">Follow Me</h4>
              <div className="flex gap-4">
                {[
                  { icon: 'business_center', href: '#', label: 'LinkedIn' },
                  { icon: 'code_blocks', href: '#', label: 'GitHub' },
                  { icon: 'campaign', href: '#', label: 'Twitter' },
                  { icon: 'palette', href: '#', label: 'Dribbble' }
                ].map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-12 h-12 bg-white dark:bg-[#1a2027] rounded-lg hover:bg-primary hover:text-white transition-colors group"
                    aria-label={social.label}
                  >
                    <span className="material-symbols-outlined text-slate-500 group-hover:text-white">
                      {social.icon}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white dark:bg-[#1a2027] rounded-xl p-8 shadow-lg">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Contact form powered by EmailJS */}
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Subject *
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                  placeholder="What's this about?"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-slate-800 text-slate-900 dark:text-white resize-none"
                  placeholder="Tell me about your project..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center h-12 px-6 rounded-lg bg-gradient-to-r from-primary to-secondary hover:from-primary-dark hover:to-pink-600 disabled:from-purple-400 disabled:to-pink-400 text-white font-bold transition-all shadow-lg shadow-purple-500/40 transform hover:scale-105 disabled:transform-none"
              >
                {isSubmitting ? (
                  <>
                    <span className="material-symbols-outlined animate-spin mr-2">refresh</span>
                    Sending...
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined mr-2">send</span>
                    Send Message
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;