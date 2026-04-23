import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { projectsData } from '../data/projectsData';

const AllProjects = ({ navigateToHome }) => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const projectsPerPage = 6;

  const filters = [
    { id: 'all', label: 'All Projects' },
    { id: 'web', label: 'Web Apps' },
    { id: 'mobile', label: 'Mobile' },
    { id: 'design', label: 'UI/UX Design' }
  ];

  // Filter and search projects
  const filteredProjects = projectsData.filter(project => {
    const matchesFilter = activeFilter === 'all' || project.category === activeFilter;
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.technologies.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  // Pagination
  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);
  const startIndex = (currentPage - 1) * projectsPerPage;
  const currentProjects = filteredProjects.slice(startIndex, startIndex + projectsPerPage);

  // Reset to first page when filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [activeFilter, searchTerm]);

  const handleViewDetails = (project) => {
    // Create a detailed modal or alert with project information
    const details = `
PROJECT DETAILS

Title: ${project.title}
Category: ${project.category.toUpperCase()}
Date: ${new Date(project.date).toLocaleDateString()}
${project.featured ? 'Status: ⭐ Featured Project' : ''}

Description:
${project.longDescription || project.description}

Technologies Used:
${project.technologies.join(', ')}

Links:
• Live Demo: ${project.liveUrl}
• Source Code: ${project.githubUrl}
    `;
    
    alert(details);
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

  const cardVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    },
    exit: {
      scale: 0.8,
      opacity: 0,
      transition: { duration: 0.3 }
    }
  };

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark text-slate-900 dark:text-white">
      {/* Header */}
      <div className="bg-white/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-gray-200 dark:border-[#283039] sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <button 
                onClick={navigateToHome}
                className="flex items-center gap-2 text-primary hover:text-primary-dark transition-colors"
              >
                <span className="material-symbols-outlined">arrow_back</span>
                <span className="font-medium">Back to Home</span>
              </button>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 text-primary">
                <span className="material-symbols-outlined">work</span>
              </div>
              <h1 className="text-2xl font-bold">All Projects</h1>
            </div>
          </div>
        </div>
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
      >
        {/* Search and Filters */}
        <motion.div variants={itemVariants} className="mb-12">
          {/* Search Bar */}
          <div className="mb-8">
            <div className="relative max-w-md mx-auto">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 material-symbols-outlined text-slate-400">
                search
              </span>
              <input
                type="text"
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-[#1a2027] text-slate-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-4">
            {filters.map((filter) => (
              <motion.button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`px-6 py-3 rounded-full font-medium transition-all ${
                  activeFilter === filter.id
                    ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-lg shadow-purple-500/30'
                    : 'bg-white dark:bg-[#1a2027] text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-[#283039] border border-slate-200 dark:border-slate-600'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {filter.label}
              </motion.button>
            ))}
          </div>

          {/* Results Count */}
          <div className="text-center mt-6">
            <p className="text-slate-600 dark:text-slate-400">
              Showing {currentProjects.length} of {filteredProjects.length} projects
              {searchTerm && ` for "${searchTerm}"`}
            </p>
          </div>
        </motion.div>

        {/* Projects Grid */}
        <AnimatePresence mode="wait">
          <motion.div 
            key={`${activeFilter}-${currentPage}-${searchTerm}`}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
          >
            {currentProjects.map((project) => (
              <motion.div 
                key={project.id} 
                variants={cardVariants}
                className="group bg-white dark:bg-[#1a2027] rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col h-full"
                whileHover={{ y: -10 }}
              >
                <div className="relative overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
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
                    <div className="absolute top-4 left-4 px-3 py-1 bg-gradient-to-r from-primary to-secondary text-white text-xs font-bold rounded-full">
                      ⭐ Featured
                    </div>
                  )}

                  {/* Category Badge */}
                  <div className="absolute top-4 right-4 px-2 py-1 bg-black/50 backdrop-blur-sm text-white text-xs font-medium rounded-full capitalize">
                    {project.category}
                  </div>
                </div>
                
                {/* Card Content - Flex grow to push buttons to bottom */}
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-primary transition-colors flex-1">
                      {project.title}
                    </h3>
                    <span className="text-xs text-slate-500 dark:text-slate-400 ml-2">
                      {new Date(project.date).toLocaleDateString()}
                    </span>
                  </div>
                  
                  <p className="text-slate-600 dark:text-slate-400 mb-4 text-sm leading-relaxed flex-grow">
                    {project.longDescription || project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.slice(0, 3).map((tech, index) => (
                      <span 
                        key={index}
                        className="px-2 py-1 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded text-xs font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="px-2 py-1 bg-primary/10 text-primary rounded text-xs font-medium">
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
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Pagination */}
        {totalPages > 1 && (
          <motion.div 
            variants={itemVariants}
            className="flex justify-center items-center gap-2"
          >
            <motion.button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="flex items-center justify-center w-10 h-10 rounded-lg bg-white dark:bg-[#1a2027] border border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-400 hover:text-primary hover:border-primary disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              whileHover={{ scale: currentPage === 1 ? 1 : 1.1 }}
              whileTap={{ scale: currentPage === 1 ? 1 : 0.9 }}
            >
              <span className="material-symbols-outlined">chevron_left</span>
            </motion.button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <motion.button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`flex items-center justify-center w-10 h-10 rounded-lg font-medium transition-all ${
                  currentPage === page
                    ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-lg shadow-purple-500/30'
                    : 'bg-white dark:bg-[#1a2027] border border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-400 hover:text-primary hover:border-primary'
                }`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {page}
              </motion.button>
            ))}

            <motion.button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="flex items-center justify-center w-10 h-10 rounded-lg bg-white dark:bg-[#1a2027] border border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-400 hover:text-primary hover:border-primary disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              whileHover={{ scale: currentPage === totalPages ? 1 : 1.1 }}
              whileTap={{ scale: currentPage === totalPages ? 1 : 0.9 }}
            >
              <span className="material-symbols-outlined">chevron_right</span>
            </motion.button>
          </motion.div>
        )}

        {/* No Results */}
        {filteredProjects.length === 0 && (
          <motion.div 
            variants={itemVariants}
            className="text-center py-12"
          >
            <div className="flex items-center justify-center w-20 h-20 mx-auto mb-4 bg-slate-100 dark:bg-[#1a2027] rounded-full">
              <span className="material-symbols-outlined text-3xl text-slate-400">search_off</span>
            </div>
            <h3 className="text-xl font-bold mb-2">No projects found</h3>
            <p className="text-slate-600 dark:text-slate-400 mb-4">
              Try adjusting your search terms or filters
            </p>
            <motion.button
              onClick={() => {
                setSearchTerm('');
                setActiveFilter('all');
              }}
              className="px-6 py-2 bg-gradient-to-r from-primary to-secondary text-white rounded-lg font-medium hover:shadow-lg hover:shadow-purple-500/30 transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Clear Filters
            </motion.button>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default AllProjects;