import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

const About = () => {
  const sectionRef = useRef(null);
  const statsRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [animatedStats, setAnimatedStats] = useState([0, 0, 0, 0]);

  const stats = [
    { number: '1+', label: 'Years Experience', value: 1 },
    { number: '10+', label: 'Projects Completed', value: 10 },
    { number: '10+', label: 'Happy Clients', value: 10 },
    { number: '100%', label: 'Client Satisfaction', value: 100 }
  ];

  useEffect(() => {
    if (isInView) {
      // Animate counters
      stats.forEach((stat, index) => {
        let start = 0;
        const end = stat.value;
        const duration = 2000; // 2 seconds
        const increment = end / (duration / 16); // 60fps

        const timer = setInterval(() => {
          start += increment;
          if (start >= end) {
            start = end;
            clearInterval(timer);
          }
          
          setAnimatedStats(prev => {
            const newStats = [...prev];
            newStats[index] = Math.floor(start);
            return newStats;
          });
        }, 16);

        return () => clearInterval(timer);
      });
    }
  }, [isInView]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
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

  const skillVariants = {
    hidden: { x: -50, opacity: 0 },
    visible: (i) => ({
      x: 0,
      opacity: 1,
      transition: {
        delay: i * 0.1,
        duration: 0.6,
        ease: "easeOut"
      }
    })
  };

  const formatStatNumber = (value, originalStat) => {
    if (originalStat.number.includes('%')) {
      return `${value}%`;
    } else if (originalStat.number.includes('+')) {
      return `${value}+`;
    }
    return value.toString();
  };

  return (
    <motion.div 
      ref={sectionRef}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className="py-10 px-4"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div variants={itemVariants} className="text-center mb-10">
          <motion.h2 
            className="text-3xl sm:text-4xl font-bold mb-4"
            whileHover={{ scale: 1.05 }}
          >
            About Me
          </motion.h2>
          <motion.p 
            className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto"
            whileHover={{ scale: 1.02 }}
          >
            Passionate frontend developer with a keen eye for design and user experience
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Content */}
          <motion.div variants={itemVariants} className="space-y-6">
            <motion.h3 
              className="text-2xl font-bold text-slate-900 dark:text-white"
              whileHover={{ scale: 1.02 }}
            >
              Creating Digital Experiences That Matter
            </motion.h3>
            <motion.p 
              className="text-slate-600 dark:text-slate-400 leading-relaxed"
              whileHover={{ scale: 1.01 }}
            >
              I'm a frontend developer who believes in the power of clean code and beautiful design. 
              With over 1 year of experience, I specialize in creating responsive, accessible, and 
              user-friendly web applications using modern technologies like React, JavaScript, and CSS.
            </motion.p>
            <motion.p 
              className="text-slate-600 dark:text-slate-400 leading-relaxed"
              whileHover={{ scale: 1.01 }}
            >
              My journey started with a curiosity about how websites work, and it has evolved into 
              a passion for crafting digital experiences that not only look great but also solve 
              real problems for users and businesses.
            </motion.p>
            
            {/* Skills List */}
            <div className="space-y-3">
              <motion.h4 
                className="font-semibold text-slate-900 dark:text-white"
                whileHover={{ scale: 1.02 }}
              >
                What I Do:
              </motion.h4>
              <ul className="space-y-2">
                {[
                  'Frontend Development with React & JavaScript',
                  'Responsive Web Design & Mobile-First Approach',
                  'Performance Optimization & SEO',
                  'Cross-browser Compatibility',
                ].map((skill, index) => (
                  <motion.li 
                    key={index} 
                    custom={index}
                    variants={skillVariants}
                    className="flex items-center gap-3 text-slate-600 dark:text-slate-400"
                    whileHover={{ x: 10, scale: 1.02 }}
                  >
                    <motion.span 
                      className="material-symbols-outlined text-primary text-lg"
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 2, delay: index * 0.2 }}
                    >
                      check_circle
                    </motion.span>
                    {skill}
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div 
            ref={statsRef}
            variants={itemVariants}
            className="grid grid-cols-2 gap-6"
          >
            {stats.map((stat, index) => (
              <motion.div 
                key={index} 
                className="text-center p-6 rounded-xl bg-white dark:bg-[#1a2027] shadow-lg"
                initial={{ scale: 0, opacity: 0 }}
                animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                transition={{ 
                  delay: index * 0.2, 
                  duration: 0.6,
                  type: "spring",
                  stiffness: 100
                }}
                whileHover={{ 
                  scale: 1.05, 
                  y: -5,
                  boxShadow: "0 20px 40px rgba(139, 92, 246, 0.3)"
                }}
              >
                <motion.div 
                  className="text-3xl font-bold text-primary mb-2"
                  whileHover={{ scale: 1.1 }}
                >
                  {formatStatNumber(animatedStats[index], stat)}
                </motion.div>
                <motion.div 
                  className="text-sm text-slate-600 dark:text-slate-400"
                  whileHover={{ scale: 1.05 }}
                >
                  {stat.label}
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default About;