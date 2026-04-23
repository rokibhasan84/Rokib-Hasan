import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const quickLinks = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Contact', href: '#contact' }
  ];

  const socialLinks = [
    { icon: 'business_center', href: '#', label: 'LinkedIn' },
    { icon: 'code_blocks', href: '#', label: 'GitHub' },
    { icon: 'campaign', href: '#', label: 'Twitter' },
    { icon: 'palette', href: '#', label: 'Dribbble' }
  ];

  return (
    <footer className="relative z-10 bg-slate-900 dark:bg-[#0a0e13] text-white">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/20 text-primary">
                <span className="material-symbols-outlined text-2xl">code</span>
              </div>
              <h3 className="text-xl font-bold">Rokib Hasan</h3>
            </div>
            <p className="text-slate-400 leading-relaxed">
              Frontend Developer passionate about creating 
              beautiful and functional digital experiences.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-10 h-10 bg-slate-800 hover:bg-primary rounded-lg transition-colors group"
                  aria-label={social.label}
                >
                  <span className="material-symbols-outlined text-slate-400 group-hover:text-white text-lg">
                    {social.icon}
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-slate-400 hover:text-primary transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Get In Touch</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary">mail</span>
                <a href="mailto:rokibhassan75@gmail.com" className="text-slate-400 hover:text-primary transition-colors">
                  rokibhassan75@.com
                </a>
              </div>
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary">phone</span>
                <a href="tel:+15551234567" className="text-slate-400 hover:text-primary transition-colors">
                  +601129247275
                </a>
              </div>
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary">location_on</span>
                <span className="text-slate-400">Pochong, Selengor, Malaysia</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-slate-800 mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-slate-400 text-sm">
            © {currentYear} Rokib Hasan. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <a href="#" className="text-slate-400 hover:text-primary transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-slate-400 hover:text-primary transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;