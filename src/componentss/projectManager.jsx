// src/componentss/projectManager.jsx
import React, { useState, useEffect } from 'react';
import './projectManager.css';

const ProjectManager = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [selectedProject, setSelectedProject] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch projects from API endpoint
  const fetchProjects = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://test-check-q5kj.onrender.com/projects');
      if (!response.ok) throw new Error('Failed to fetch projects from server');

      const result = await response.json();
      const formattedProjects = (result.data || []).map(project => ({
        id: project.id,
        description: project.description,
        images: project.image_urls || [],
      }));

      setProjects(formattedProjects);
      setMessage({ type: '', text: '' });
    } catch (error) {
      setMessage({ type: 'error', text: `Error loading project portfolio: ${error.message}` });
    } finally {
      setLoading(false);
    }
  };

  // Delete project
  const deleteProject = async (projectId) => {
    if (!window.confirm('Are you sure you want to delete this project? This action cannot be undone.')) return;

    setDeletingId(projectId);
    try {
      const response = await fetch(`https://test-check-q5kj.onrender.com/projects/${projectId}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Failed to delete project');

      setProjects(prev => prev.filter(project => project.id !== projectId));
      setMessage({ type: 'success', text: 'Project deleted successfully!' });
      if (selectedProject?.id === projectId) setSelectedProject(null);
    } catch (error) {
      setMessage({ type: 'error', text: `Error deleting project: ${error.message}` });
    } finally {
      setDeletingId(null);
    }
  };

  // Modal Lightbox Details
  const viewProjectDetails = (project) => {
    setSelectedProject(project);
    setCurrentImageIndex(0);
    document.body.style.overflow = 'hidden';
  };

  const closeProjectDetails = () => {
    setSelectedProject(null);
    document.body.style.overflow = 'auto';
  };

  const nextImage = () => {
    if (!selectedProject?.images?.length) return;
    setCurrentImageIndex(prev => (prev + 1) % selectedProject.images.length);
  };

  const prevImage = () => {
    if (!selectedProject?.images?.length) return;
    setCurrentImageIndex(prev => (prev === 0 ? selectedProject.images.length - 1 : prev - 1));
  };

  // Keyboard navigation for image modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!selectedProject) return;
      if (e.key === 'Escape') closeProjectDetails();
      else if (e.key === 'ArrowRight') nextImage();
      else if (e.key === 'ArrowLeft') prevImage();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedProject, currentImageIndex]);

  useEffect(() => {
    fetchProjects();
  }, []);

  // Filter projects by search query
  const filteredProjects = projects.filter(p => 
    p.description?.toLowerCase().includes(searchQuery.toLowerCase()) || 
    String(p.id).includes(searchQuery)
  );

  return (
    <div className="container-fluid py-3 animate-fade-in">
      
      {/* Header Section */}
      <div className="card border-0 shadow-sm rounded-4 mb-4 p-4 text-white" style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)' }}>
        <div className="d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-3">
          <div>
            <div className="d-flex align-items-center gap-2 mb-1">
              <span className="badge bg-warning text-dark fw-bold">VASTU ENGINEERS PORTFOLIO</span>
            </div>
            <h1 className="fw-bold text-white mb-0 fs-3">Civil & Architectural Projects</h1>
            <p className="text-slate-300 mb-0 small mt-1" style={{ color: '#cbd5e1' }}>
              Explore structural developments, blueprints, and completed site progress.
            </p>
          </div>

          <div className="d-flex align-items-center gap-2">
            <button 
              className="btn btn-outline-light d-flex align-items-center gap-2 px-3 py-2 rounded-3 fw-semibold"
              onClick={fetchProjects} 
              disabled={loading}
            >
              <i className={`bi bi-arrow-clockwise ${loading ? 'spin' : ''}`}></i>
              <span>{loading ? 'Refreshing...' : 'Refresh Feed'}</span>
            </button>
          </div>
        </div>

        {/* Filter Search Input */}
        <div className="mt-3 pt-3 border-top border-white border-opacity-10">
          <div className="row g-2">
            <div className="col-md-6 col-lg-4">
              <div className="input-group">
                <span className="input-group-text bg-white bg-opacity-10 text-white border-secondary border-opacity-25">
                  <i className="bi bi-search"></i>
                </span>
                <input
                  type="text"
                  className="form-control bg-white bg-opacity-10 text-white placeholder-slate-400 border-secondary border-opacity-25"
                  placeholder="Search projects by keyword or ID..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{ color: '#ffffff' }}
                />
              </div>
            </div>
            <div className="col-md-6 col-lg-8 d-flex align-items-center justify-content-md-end text-slate-300 small">
              Showing <strong className="text-warning mx-1">{filteredProjects.length}</strong> of {projects.length} Total Projects
            </div>
          </div>
        </div>
      </div>

      {/* Alert Feedback */}
      {message.text && (
        <div className={`alert alert-${message.type === 'error' ? 'danger' : 'success'} alert-dismissible fade show border-0 shadow-sm p-3 mb-4 rounded-3 d-flex align-items-center gap-3`} role="alert">
          <i className={`bi ${message.type === 'error' ? 'bi-exclamation-triangle-fill fs-4' : 'bi-check-circle-fill fs-4'}`}></i>
          <div>{message.text}</div>
          <button type="button" className="btn-close" onClick={() => setMessage({ type: '', text: '' })}></button>
        </div>
      )}

      {/* Loading Skeleton Grid */}
      {loading ? (
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          {[1, 2, 3, 4, 5, 6].map(n => (
            <div className="col" key={n}>
              <div className="card h-100 border-0 shadow-sm rounded-4 overflow-hidden">
                <div className="skeleton" style={{ height: '220px' }}></div>
                <div className="card-body p-3">
                  <div className="skeleton mb-2" style={{ height: '20px', width: '80%' }}></div>
                  <div className="skeleton" style={{ height: '14px', width: '40%' }}></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : filteredProjects.length === 0 ? (
        /* Empty State */
        <div className="text-center py-5 my-4 bg-white rounded-4 border p-5 shadow-sm">
          <div className="p-4 rounded-circle bg-light d-inline-block mb-3 text-muted">
            <i className="bi bi-folder-x display-4"></i>
          </div>
          <h4 className="fw-bold text-dark mb-2">No Projects Found</h4>
          <p className="text-muted max-w-md mx-auto mb-4">
            {searchQuery ? `No results matching "${searchQuery}". Try a different term.` : 'There are currently no uploaded projects in the portfolio.'}
          </p>
          {searchQuery && (
            <button className="btn btn-sm btn-outline-secondary rounded-pill px-3" onClick={() => setSearchQuery('')}>
              Clear Search Query
            </button>
          )}
        </div>
      ) : (
        /* Projects Card Grid */
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          {filteredProjects.map(project => {
            const thumbnail = project.images[0] || 'https://via.placeholder.com/600x400?text=No+Image+Available';
            return (
              <div className="col" key={project.id}>
                <div className="card h-100 border-0 shadow-sm rounded-4 overflow-hidden card-custom hover-shadow">
                  
                  {/* Image Container with Zoom effect & Image Badge */}
                  <div 
                    className="position-relative overflow-hidden cursor-pointer" 
                    style={{ height: '220px', background: '#0f172a' }}
                    onClick={() => viewProjectDetails(project)}
                  >
                    <img
                      src={thumbnail}
                      className="w-100 h-100"
                      alt={project.description}
                      style={{ objectFit: 'cover', transition: 'transform 0.5s ease' }}
                      onError={(e) => { e.target.src = 'https://via.placeholder.com/600x400?text=Image+Unavailable'; }}
                    />
                    <span className="position-absolute top-0 end-0 m-3 badge bg-dark bg-opacity-75 text-warning border border-warning border-opacity-50 px-3 py-1.5 rounded-pill shadow-sm" style={{ backdropFilter: 'blur(4px)' }}>
                      <i className="bi bi-camera-fill me-1"></i>
                      {project.images.length} Image{project.images.length !== 1 ? 's' : ''}
                    </span>
                    <span className="position-absolute bottom-0 start-0 m-3 badge bg-slate-900 text-white px-2.5 py-1 rounded-3 small">
                      ID: #{project.id}
                    </span>
                  </div>

                  {/* Card Content */}
                  <div className="card-body p-4 d-flex flex-column justify-content-between">
                    <div>
                      <h5 className="fw-bold text-dark mb-2 text-truncate-2" style={{ fontSize: '1.05rem', lineHeight: '1.4' }}>
                        {project.description}
                      </h5>
                    </div>

                    <div className="pt-3 mt-3 border-top d-flex align-items-center justify-content-between">
                      <button 
                        className="btn btn-sm btn-primary-custom px-3 py-2 rounded-3 text-white fw-semibold d-flex align-items-center gap-1.5"
                        onClick={() => viewProjectDetails(project)}
                      >
                        <i className="bi bi-eye-fill"></i> View Details
                      </button>

                      <button
                        className="btn btn-sm btn-outline-danger px-3 py-2 rounded-3 fw-semibold d-flex align-items-center gap-1.5"
                        onClick={() => deleteProject(project.id)}
                        disabled={deletingId === project.id}
                      >
                        {deletingId === project.id ? (
                          <>
                            <span className="spinner-border spinner-border-sm" role="status"></span>
                            Deleting...
                          </>
                        ) : (
                          <>
                            <i className="bi bi-trash3-fill"></i> Delete
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Project Lightbox & Gallery Modal */}
      {selectedProject && (
        <div className="project-modal">
          <div className="modal-overlay" onClick={closeProjectDetails}></div>
          <div className="modal-content shadow-lg border-0">
            
            {/* Modal Header */}
            <div className="modal-header d-flex align-items-center justify-content-between p-4 text-white" style={{ background: '#0f172a' }}>
              <div className="d-flex align-items-center gap-3">
                <span className="badge bg-warning text-dark fw-bold px-3 py-1">PROJECT DETAILS</span>
                <h5 className="mb-0 text-white fw-bold">ID #{selectedProject.id}</h5>
              </div>
              <button className="btn-close btn-close-white" onClick={closeProjectDetails}></button>
            </div>

            {/* Modal Body */}
            <div className="modal-body p-4 p-md-5">
              <div className="row g-4">
                
                {/* Left Column: Image Carousel / Lightbox */}
                <div className="col-lg-7">
                  {selectedProject.images.length > 0 ? (
                    <div className="carousel-container position-relative rounded-4 overflow-hidden border bg-dark" style={{ minHeight: '380px', height: '420px' }}>
                      <img
                        src={selectedProject.images[currentImageIndex]}
                        alt={`Slide ${currentImageIndex + 1}`}
                        className="w-100 h-100"
                        style={{ objectFit: 'contain', background: '#090d16' }}
                        onError={(e) => { e.target.src = 'https://via.placeholder.com/800x600?text=Image+Unavailable'; }}
                      />

                      {/* Navigation Controls */}
                      {selectedProject.images.length > 1 && (
                        <>
                          <button 
                            className="carousel-arrow left shadow" 
                            onClick={(e) => { e.stopPropagation(); prevImage(); }}
                            title="Previous Image (Left Arrow)"
                          >
                            <i className="bi bi-chevron-left"></i>
                          </button>
                          <button 
                            className="carousel-arrow right shadow" 
                            onClick={(e) => { e.stopPropagation(); nextImage(); }}
                            title="Next Image (Right Arrow)"
                          >
                            <i className="bi bi-chevron-right"></i>
                          </button>
                          
                          <div className="image-counter">
                            {currentImageIndex + 1} / {selectedProject.images.length}
                          </div>
                        </>
                      )}
                    </div>
                  ) : (
                    <div className="p-5 text-center bg-light rounded-4 border text-muted">
                      <i className="bi bi-image-alt display-3 mb-2"></i>
                      <p>No site images available for this project entry.</p>
                    </div>
                  )}

                  {/* Thumbnail Row */}
                  {selectedProject.images.length > 1 && (
                    <div className="d-flex gap-2 mt-3 overflow-x-auto pb-2">
                      {selectedProject.images.map((img, idx) => (
                        <div 
                          key={idx} 
                          className={`rounded-3 overflow-hidden border border-2 cursor-pointer ${idx === currentImageIndex ? 'border-warning shadow' : 'border-transparent opacity-60'}`}
                          style={{ width: '70px', height: '55px', flexShrink: 0, transition: 'all 0.2s' }}
                          onClick={() => setCurrentImageIndex(idx)}
                        >
                          <img src={img} alt={`Thumb ${idx}`} className="w-100 h-100" style={{ objectFit: 'cover' }} />
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Right Column: Project Meta Details */}
                <div className="col-lg-5">
                  <div className="p-4 bg-light rounded-4 border h-100 d-flex flex-column justify-content-between">
                    <div>
                      <small className="text-muted fw-bold text-uppercase d-block mb-1" style={{ letterSpacing: '0.05em' }}>Project Description</small>
                      <h4 className="fw-bold text-dark mb-3 lh-base">{selectedProject.description}</h4>

                      <div className="py-3 border-top border-bottom my-3">
                        <div className="d-flex justify-content-between py-1">
                          <span className="text-muted">Total Media Attachments:</span>
                          <strong className="text-dark">{selectedProject.images.length} File(s)</strong>
                        </div>
                        <div className="d-flex justify-content-between py-1">
                          <span className="text-muted">Managed By:</span>
                          <strong className="text-dark">Vastu Engineers Admin</strong>
                        </div>
                        <div className="d-flex justify-content-between py-1">
                          <span className="text-muted">Status:</span>
                          <span className="badge bg-success-subtle text-success fw-bold">Published</span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-3 border-top d-flex gap-2">
                      <button 
                        className="btn btn-outline-danger w-100 py-2.5 fw-semibold rounded-3 d-flex align-items-center justify-content-center gap-2"
                        onClick={() => deleteProject(selectedProject.id)}
                        disabled={deletingId === selectedProject.id}
                      >
                        <i className="bi bi-trash3-fill"></i> Delete Entry
                      </button>
                      <button 
                        className="btn btn-dark w-100 py-2.5 fw-semibold rounded-3"
                        onClick={closeProjectDetails}
                      >
                        Close Modal
                      </button>
                    </div>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default ProjectManager;
