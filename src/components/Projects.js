import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { projectsData } from '../data/projectsData';

const Projects = ({ navigateToProjects }) => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [displayProjects, setDisplayProjects] = useState([]);

  const filters = [
    { id: 'all', label: 'All Projects' },
    { id: 'web', label: 'Web Apps' },
    { id: 'mobile', label: 'Mobile' },
    { id: 'design', label: 'UI/UX Design' }
  ];

  useEffect(() => {
    // Get featured projects first, then fill with non-featured if needed
    const featuredProjects = projectsData.filter(project => project.featured);
    const nonFeaturedProjects = projectsData.filter(project => !project.featured);
    
    // Combine featured and non-featured to get exactly 6 projects
    const combinedProjects = [...featuredProjects, ...nonFeaturedProjects].slice(0, 6);
    setDisplayProjects(combinedProjects);
  }, []);

  // Filter projects based on active filter
  const filteredProjects = activeFilter === 'all' 
    ? displayProjects 
    : displayProjects.filter(project => project.category === activeFilter);

  const handleViewDetails = (project) => {
    // Create a modal or navigate to project details
    alert(`Viewing details for: ${project.title}\n\n${project.longDescription || project.description}\n\nTechnologies: ${project.technologies.join(', ')}`);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className="py-10 px-4"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div variants={itemVariants} className="text-center mb-10">
          <motion.h2 
            className="text-3xl sm:text-4xl font-bold mb-4"
            whileHover={{ scale: 1.05 }}
          >
            Featured Projects
          </motion.h2>
          <motion.p 
            className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto"
            whileHover={{ scale: 1.02 }}
          >
            A showcase of my recent work and creative solutions
          </motion.p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div 
          variants={itemVariants}
          className="flex flex-wrap justify-center gap-4 mb-8"
        >
          {filters.map((filter) => (
            <motion.button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`px-6 py-2 rounded-full font-medium transition-all ${
                activeFilter === filter.id
                  ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-lg shadow-purple-500/30 transform scale-105'
                  : 'bg-white dark:bg-[#1a2027] text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-[#283039] border border-slate-200 dark:border-slate-600'
              }`}
              whileHover={{ scale: activeFilter === filter.id ? 1.05 : 1.02 }}
              whileTap={{ scale: 0.95 }}
            >
              {filter.label}
            </motion.button>
          ))}
        </motion.div>

        {/* Projects Count */}
        <motion.div variants={itemVariants} className="text-center mb-6">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Showing {filteredProjects.length} projects
            {activeFilter !== 'all' && ` in ${filters.find(f => f.id === activeFilter)?.label}`}
          </p>
        </motion.div>

        {/* Projects Grid */}
        <AnimatePresence mode="wait">
          <motion.div 
            key={activeFilter}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredProjects.length > 0 ? (
              filteredProjects.map((project, index) => (
                <motion.div 
                  key={project.id} 
                  variants={itemVariants}
                  custom={index}
                  className="group bg-white dark:bg-[#1a2027] rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col h-full"
                  whileHover={{ y: -8, scale: 1.02 }}
                  layout
                >
                  <div className="relative overflow-hidden">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                      <motion.a 
                        href={project.liveUrl}
                        className="flex items-center justify-center w-12 h-12 bg-white rounded-full text-slate-900 hover:bg-gradient-to-r hover:from-primary hover:to-secondary hover:text-white transition-all"
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.1, rotate: 360 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <span className="material-symbols-outlined text-xl">open_in_new</span>
                      </motion.a>
                      <motion.a 
                        href={project.githubUrl}
                        className="flex items-center justify-center w-12 h-12 bg-white rounded-full text-slate-900 hover:bg-gradient-to-r hover:from-primary hover:to-secondary hover:text-white transition-all"
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.1, rotate: -360 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <span className="material-symbols-outlined text-xl">code</span>
                      </motion.a>
                    </div>

                    {/* Featured Badge */}
                    {project.featured && (
                      <motion.div 
                        className="absolute top-4 left-4 px-3 py-1 bg-gradient-to-r from-primary to-secondary text-white text-xs font-bold rounded-full shadow-lg"
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ delay: index * 0.1 + 0.5, type: "spring", stiffness: 200 }}
                      >
                        ⭐ Featured
                      </motion.div>
                    )}

                    {/* Category Badge */}
                    <div className="absolute top-4 right-4 px-2 py-1 bg-black/50 backdrop-blur-sm text-white text-xs font-medium rounded-full capitalize">
                      {project.category}
                    </div>
                  </div>
                  
                  {/* Card Content - Flex grow to push buttons to bottom */}
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-primary transition-colors flex-1">
                        {project.title}
                      </h3>
                      <span className="text-xs text-slate-500 dark:text-slate-400 ml-2 whitespace-nowrap">
                        {new Date(project.date).toLocaleDateString('en-US', { 
                          month: 'short', 
                          year: 'numeric' 
                        })}
                      </span>
                    </div>
                    
                    <p className="text-slate-600 dark:text-slate-400 mb-4 text-sm leading-relaxed flex-grow">
                      {project.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.slice(0, 3).map((tech, techIndex) => (
                        <motion.span 
                          key={techIndex}
                          className="px-3 py-1 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-full text-xs font-medium"
                          whileHover={{ scale: 1.05, backgroundColor: "rgba(139, 92, 246, 0.1)" }}
                        >
                          {tech}
                        </motion.span>
                      ))}
                      {project.technologies.length > 3 && (
                        <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium">
                          +{project.technologies.length - 3} more
                        </span>
                      )}
                    </div>

                    {/* Action Buttons - Always at bottom */}
                    <div className="flex gap-2 mt-auto">
                      <motion.button
                        onClick={() => handleViewDetails(project)}
                        className="flex-1 flex items-center justify-center gap-2 h-10 px-4 rounded-lg bg-gradient-to-r from-primary to-secondary text-white font-medium text-sm transition-all shadow-md hover:shadow-lg"
                        whileHover={{ scale: 1.02, y: -1 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <span className="material-symbols-outlined text-sm">visibility</span>
                        View Details
                      </motion.button>
                      
                      <motion.a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center w-10 h-10 rounded-lg border border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-400 hover:border-primary hover:text-primary transition-all"
                        whileHover={{ scale: 1.1, rotate: 360 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <span className="material-symbols-outlined text-sm">open_in_new</span>
                      </motion.a>
                      
                      <motion.a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center w-10 h-10 rounded-lg border border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-400 hover:border-primary hover:text-primary transition-all"
                        whileHover={{ scale: 1.1, rotate: -360 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <span className="material-symbols-outlined text-sm">code</span>
                      </motion.a>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <motion.div 
                className="col-span-full text-center py-12"
                variants={itemVariants}
              >
                <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-slate-100 dark:bg-[#1a2027] rounded-full">
                  <span className="material-symbols-outlined text-2xl text-slate-400">search_off</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">No projects found</h3>
                <p className="text-slate-600 dark:text-slate-400 mb-4">
                  No projects match the selected filter.
                </p>
                <motion.button
                  onClick={() => setActiveFilter('all')}
                  className="px-4 py-2 bg-gradient-to-r from-primary to-secondary text-white rounded-lg font-medium"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Show All Projects
                </motion.button>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Call to Action */}
        <motion.div 
          variants={itemVariants}
          className="text-center mt-12"
        >
          <p className="text-slate-600 dark:text-slate-400 mb-6">
            Want to see my complete portfolio with advanced filtering and search?
          </p>
          <motion.button 
            onClick={navigateToProjects}
            className="inline-flex items-center justify-center h-12 px-8 rounded-lg bg-gradient-to-r from-primary to-secondary hover:from-primary-dark hover:to-pink-600 text-white font-bold transition-all shadow-lg shadow-purple-500/40"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>View All Projects</span>
            <span className="material-symbols-outlined ml-2">arrow_forward</span>
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Projects;