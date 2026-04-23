import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

const Skills = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [animatedBars, setAnimatedBars] = useState({});

  const skillCategories = [
    {
      title: 'Frontend Technologies',
      icon: 'web',
      skills: [
        { name: 'React.js', level: 90 },
        { name: 'JavaScript (ES6+)', level: 85 },
        { name: 'HTML5 & CSS3', level: 95 },
        { name: 'Tailwind CSS', level: 88 },
        { name: 'TypeScript', level: 50 }
      ]
    },
    {
      title: 'Design & Tools',
      icon: 'palette',
      skills: [
        { name: 'Figma', level: 85 },
        { name: 'Adobe XD', level: 53 },
        { name: 'Responsive Design', level: 92 },
        { name: 'UI/UX Design', level: 56 },
        { name: 'Prototyping', level: 63 }
      ]
    },
    {
      title: 'Development Tools',
      icon: 'build',
      skills: [
        { name: 'Git & GitHub', level: 88 },
        { name: 'VS Code', level: 95 },
        { name: 'Webpack', level: 60 },
        { name: 'npm/yarn', level: 85 },
        { name: 'Chrome DevTools', level: 90 }
      ]
    }
  ];

  useEffect(() => {
    if (isInView) {
      // Animate skill bars with a delay
      const timer = setTimeout(() => {
        skillCategories.forEach((category, categoryIndex) => {
          category.skills.forEach((skill, skillIndex) => {
            const key = `${categoryIndex}-${skillIndex}`;
            setTimeout(() => {
              setAnimatedBars(prev => ({
                ...prev,
                [key]: skill.level
              }));
            }, (categoryIndex * 200) + (skillIndex * 100));
          });
        });
      }, 500);

      return () => clearTimeout(timer);
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

  const cardVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <motion.div 
      ref={sectionRef}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className="py-10 px-4 bg-slate-50 dark:bg-[#0f1419]"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div variants={itemVariants} className="text-center mb-10">
          <motion.h2 
            className="text-3xl sm:text-4xl font-bold mb-4"
            whileHover={{ scale: 1.05 }}
          >
            Skills & Expertise
          </motion.h2>
          <motion.p 
            className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto"
            whileHover={{ scale: 1.02 }}
          >
            Technologies and tools I use to bring ideas to life
          </motion.p>
        </motion.div>

        <motion.div 
          variants={itemVariants}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {skillCategories.map((category, categoryIndex) => (
            <motion.div 
              key={categoryIndex} 
              variants={cardVariants}
              className="bg-white dark:bg-[#1a2027] rounded-xl p-6 shadow-lg"
              whileHover={{ 
                y: -10, 
                scale: 1.02,
                boxShadow: "0 20px 40px rgba(139, 92, 246, 0.2)"
              }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <motion.div 
                  className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 text-primary"
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                >
                  <span className="material-symbols-outlined">{category.icon}</span>
                </motion.div>
                <motion.h3 
                  className="text-xl font-bold"
                  whileHover={{ scale: 1.05 }}
                >
                  {category.title}
                </motion.h3>
              </div>

              <div className="space-y-4">
                {category.skills.map((skill, skillIndex) => {
                  const key = `${categoryIndex}-${skillIndex}`;
                  const animatedWidth = animatedBars[key] || 0;
                  
                  return (
                    <motion.div 
                      key={skillIndex}
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                          {skill.name}
                        </span>
                        <span className="text-sm text-slate-500 dark:text-slate-400">
                          {skill.level}%
                        </span>
                      </div>
                      <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2 overflow-hidden">
                        <motion.div 
                          className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${animatedWidth}%` }}
                          transition={{ 
                            duration: 1.5, 
                            ease: "easeOut",
                            delay: 0.2
                          }}
                          whileHover={{ 
                            boxShadow: "0 0 20px rgba(139, 92, 246, 0.5)" 
                          }}
                        />
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Additional Technologies */}
        <motion.div variants={itemVariants} className="mt-10 text-center">
          <motion.h3 
            className="text-xl font-bold mb-6"
            whileHover={{ scale: 1.05 }}
          >
            Other Technologies I Work With
          </motion.h3>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              'Node.js', 'Express.js', 'MongoDB', 'Firebase', 'Netlify', 'Vercel',
              'SASS/SCSS', 'Bootstrap', 'Material-UI', 'Framer Motion', 'REST APIs'
            ].map((tech, index) => (
              <motion.span 
                key={index}
                className="px-4 py-2 bg-white dark:bg-[#1a2027] rounded-full text-sm font-medium text-slate-700 dark:text-slate-300 shadow-sm border border-slate-200 dark:border-slate-600"
                whileHover={{ 
                  scale: 1.1, 
                  y: -2,
                  backgroundColor: "rgba(139, 92, 246, 0.1)",
                  borderColor: "rgba(139, 92, 246, 0.3)"
                }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ 
                  opacity: 1, 
                  y: 0,
                  transition: { delay: index * 0.1 }
                }}
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Skills;