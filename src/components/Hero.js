import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';

const Hero = ({ scrollToSection }) => {
  const heroRef = useRef(null);
  const imageRef = useRef(null);
  const textRef = useRef(null);

  const socialLinks = [
    { icon: 'business_center', href: 'https://www.linkedin.com/in/rokib-hasan-75rh/', label: 'LinkedIn' },
    { icon: 'code_blocks', href: 'https://github.com/rokibhasan84', label: 'GitHub' },
    { icon: 'campaign', href: 'https://twitter.com', label: 'Twitter' },
    { icon: 'palette', href: 'https://dribbble.com', label: 'Dribbble' }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // GSAP Timeline for complex animations
      const tl = gsap.timeline();
      
      // Animate text elements
      tl.from(textRef.current.children, {
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out"
      });

      // Animate image with rotation and scale
      gsap.from(imageRef.current, {
        scale: 0,
        rotation: 180,
        duration: 1.5,
        ease: "back.out(1.7)",
        delay: 0.5
      });

      // Floating animation for image
      gsap.to(imageRef.current, {
        y: -20,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut"
      });

    }, heroRef);

    return () => ctx.revert();
  }, []);

  const handleGetInTouch = () => {
    scrollToSection('contact');
  };

  const handleViewWork = () => {
    scrollToSection('projects');
  };

  const handleDownloadResume = () => {
    const link = document.createElement('a');
    link.href = 'https://drive.google.com/file/d/121Iax_2kAhNy2mz00E5U6WSRL0Mrr9m9/view?usp=drive_link';
    link.download = 'Rokib_Hasan_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  return (
    <motion.div 
      ref={heroRef}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="flex items-center justify-center py-8 px-4"
    >
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid lg:grid-cols-2 gap-6 items-center">
          
          {/* Left Side - Content */}
          <motion.div 
            ref={textRef}
            variants={itemVariants}
            className="space-y-8 text-left"
          >
            {/* Text Content */}
            <div className="space-y-6 pl-2 md:pl-16">
              <div className="space-y-2">
                <motion.p 
                  className="text-lg text-primary font-medium"
                  whileHover={{ scale: 1.05 }}
                >
                  Hello, I'm
                </motion.p>
                <motion.h1 
                  className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight"
                  whileHover={{ scale: 1.02 }}
                >
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-slate-900 via-slate-700 to-slate-900 dark:from-white dark:via-slate-200 dark:to-slate-400">
                    Rokib Hasan
                  </span>
                </motion.h1>
              </div>
              
              <motion.h2 
                className="text-xl sm:text-2xl lg:text-3xl font-medium text-primary"
                whileHover={{ scale: 1.02 }}
              >
                Frontend Developer & UI/UX Enthusiast
              </motion.h2>
              
              <motion.p 
                className="text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed max-w-xl"
                whileHover={{ scale: 1.01 }}
              >
                I craft seamless digital experiences by bridging the gap between design and code. 
                Passionate about pixel-perfect UIs and accessible web applications that solve real-world problems.
              </motion.p>
            </div>
            
            {/* Action Buttons */}
            <motion.div 
              className="flex flex-wrap gap-4 pl-2 md:pl-16"
              variants={itemVariants}
            >
              <motion.button 
                onClick={handleGetInTouch}
                className="flex items-center justify-center h-12 px-8 rounded-lg bg-gradient-to-r from-primary to-secondary hover:from-primary-dark hover:to-pink-600 text-white text-base font-bold transition-all shadow-lg shadow-purple-500/40 min-w-[140px]"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                Get In Touch
              </motion.button>
              <motion.button 
                onClick={handleViewWork}
                className="flex items-center justify-center h-12 px-8 rounded-lg bg-white/10 dark:bg-white/5 backdrop-blur-md border border-white/20 dark:border-white/10 hover:bg-white/20 dark:hover:bg-white/10 text-slate-900 dark:text-white text-base font-bold transition-all shadow-lg min-w-[140px]"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                View My Work
              </motion.button>
              <motion.button 
                onClick={handleDownloadResume}
                className="flex items-center justify-center gap-2 h-12 px-8 rounded-lg bg-transparent border border-slate-300 dark:border-slate-600 hover:border-primary text-slate-700 dark:text-slate-300 hover:text-primary transition-all min-w-[140px] font-bold"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>Resume</span>
                <motion.span 
                  className="material-symbols-outlined text-lg"
                  animate={{ y: [0, -2, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  download
                </motion.span>
              </motion.button>
            </motion.div>
            
            {/* Social Icons */}
            <motion.div 
              className="flex items-center gap-6 pl-2 md:pl-16"
              variants={itemVariants}
            >
              <span className="text-sm text-slate-500 dark:text-slate-400 font-medium">Follow me:</span>
              {socialLinks.map((social, index) => (
                <motion.a 
                  key={index}
                  className="group flex items-center justify-center w-10 h-10 rounded-full bg-slate-100 dark:bg-[#1a2027] hover:bg-gradient-to-r hover:from-primary hover:to-secondary transition-all" 
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  whileHover={{ scale: 1.2, rotate: 360 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                >
                  <span className="material-symbols-outlined text-slate-500 group-hover:text-white text-lg transition-colors">
                    {social.icon}
                  </span>
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Side - Photo */}
          <motion.div 
            className="flex justify-center lg:justify-center"
            variants={itemVariants}
          >
            <div className="relative group">
              {/* Animated Background Elements */}
              <motion.div 
                className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full blur-2xl opacity-50"
                animate={{
                  scale: [1, 1.1, 1],
                  rotate: [0, 180, 360],
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
              <motion.div 
                className="absolute -inset-2 bg-gradient-to-r from-primary to-secondary rounded-full blur opacity-30"
                animate={{
                  scale: [1.1, 1, 1.1],
                  rotate: [360, 180, 0],
                }}
                transition={{
                  duration: 15,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
              
              {/* Photo Container */}
              <motion.div 
                ref={imageRef}
                className="relative w-80 h-80 lg:w-96 lg:h-96 rounded-full p-2 bg-gradient-to-r from-primary to-secondary"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <div className="w-full h-full rounded-full p-1 bg-background-light dark:bg-background-dark">
                  <img 
                    alt="Professional portrait of Rokib Hasan" 
                    className="w-full h-full rounded-full object-cover border-4 border-background-light dark:border-background-dark shadow-2xl" 
                    src="/Rokib.png"
                  />
                </div>
              </motion.div>

              {/* Floating Elements */}
              <motion.div 
                className="absolute top-10 -left-6 w-20 h-20 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-full blur-xl"
                animate={{
                  y: [0, -20, 0],
                  x: [0, 10, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <motion.div 
                className="absolute bottom-10 -right-6 w-16 h-16 bg-gradient-to-r from-secondary/10 to-primary/10 rounded-full blur-xl"
                animate={{
                  y: [0, 20, 0],
                  x: [0, -10, 0],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1
                }}
              />
            </div>
          </motion.div>

        </div>
      </div>
    </motion.div>
  );
};

export default Hero;