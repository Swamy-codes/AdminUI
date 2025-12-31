// src/components/ProjectManager.jsx
import React, { useState, useEffect, useRef } from 'react';
import './projectManager.css';

const ProjectManager = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [selectedProject, setSelectedProject] = useState(null);
  const [viewPhotos, setViewPhotos] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const carouselRef = useRef(null);

  // Fetch projects from API
  const fetchProjects = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://test-check-q5kj.onrender.com/projects');
      if (!response.ok) throw new Error('Failed to fetch projects');

      const result = await response.json();
      const formattedProjects = (result.data || []).map(project => ({
        id: project.id,
        description: project.description,
        images: project.image_urls || [],
      }));

      setProjects(formattedProjects);
      setMessage({ type: '', text: '' });
    } catch (error) {
      setMessage({ type: 'error', text: `Error loading projects: ${error.message}` });
    } finally {
      setLoading(false);
    }
  };

  // Delete project
  const deleteProject = async (projectId) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;

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

  // Handle project selection
  const viewProjectDetails = (project) => {
    setSelectedProject(project);
    setViewPhotos(false);
    setCurrentImageIndex(0);
    document.body.style.overflow = 'hidden';
  };

  const closeProjectDetails = () => {
    setSelectedProject(null);
    setViewPhotos(false);
    document.body.style.overflow = 'auto';
  };

  // Photo carousel
  const openPhotos = () => setViewPhotos(true);
  const nextImage = () => setCurrentImageIndex(prev => (prev + 1) % selectedProject.images.length);
  const prevImage = () => setCurrentImageIndex(prev => (prev === 0 ? selectedProject.images.length - 1 : prev - 1));

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!viewPhotos) return;
      if (e.key === 'Escape') setViewPhotos(false);
      else if (e.key === 'ArrowRight') nextImage();
      else if (e.key === 'ArrowLeft') prevImage();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [viewPhotos]);

  useEffect(() => { fetchProjects(); }, []);

  return (
    <div className="project-manager-container">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Project Portfolio ({projects.length})</h1>
        <button className="btn btn-primary" onClick={fetchProjects} disabled={loading}>
          {loading ? 'Loading...' : 'Refresh'}
        </button>
      </div>

      {message.text && (
        <div className={`alert alert-${message.type === 'error' ? 'danger' : 'success'} alert-dismissible fade show`} role="alert">
          {message.text}
          <button type="button" className="btn-close" onClick={() => setMessage({ type: '', text: '' })}></button>
        </div>
      )}

      {loading ? (
        <p>Loading projects...</p>
      ) : projects.length === 0 ? (
        <p>No projects available.</p>
      ) : (
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {projects.map(project => (
            <div className="col" key={project.id}>
              <div className="card h-100 shadow-sm">
                {project.images[0] && (
                  <img
                    src={project.images[0]}
                    className="card-img-top"
                    alt={project.description}
                    onError={(e) => e.target.src = 'https://via.placeholder.com/400x250?text=No+Image'}
                  />
                )}
                <div className="card-body">
                  <h5 className="card-title">{project.description}</h5>
                  <small className="text-muted">{project.images.length} image(s)</small>
                </div>
                <div className="card-footer d-flex justify-content-between">
                  <button className="btn btn-sm btn-info" onClick={() => viewProjectDetails(project)}>View Details</button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => deleteProject(project.id)}
                    disabled={deletingId === project.id}
                  >
                    {deletingId === project.id ? 'Deleting...' : 'Delete'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Project Details Modal */}
      {selectedProject && (
        <div className="project-modal">
          <div className="modal-overlay" onClick={closeProjectDetails}></div>
          <div className="modal-content">
            <div className="modal-header d-flex justify-content-between align-items-center">
              <h5>Project Details</h5>
              <button className="btn-close" onClick={closeProjectDetails}></button>
            </div>
            <div className="modal-body">
              <p><strong>Description:</strong> {selectedProject.description}</p>
              <p><strong>ID:</strong> {selectedProject.id}</p>

              {!viewPhotos && selectedProject.images.length > 0 && (
                <button className="btn btn-secondary mt-2" onClick={openPhotos}>
                  View Photos ({selectedProject.images.length})
                </button>
              )}

              {viewPhotos && (
                <div className="carousel-container position-relative text-center mt-3">
                  <img
                    src={selectedProject.images[currentImageIndex]}
                    alt={`Slide ${currentImageIndex + 1}`}
                    className="img-fluid"
                    ref={carouselRef}
                    onError={(e) => e.target.src = 'https://via.placeholder.com/800x600?text=Image+Not+Available'}
                  />
                  {selectedProject.images.length > 1 && (
                    <>
                      <button className="carousel-arrow left" onClick={(e) => { e.stopPropagation(); prevImage(); }}>&lt;</button>
                      <button className="carousel-arrow right" onClick={(e) => { e.stopPropagation(); nextImage(); }}>&gt;</button>
                      <div className="carousel-counter mt-2">{currentImageIndex + 1} / {selectedProject.images.length}</div>
                    </>
                  )}
                  <button className="btn btn-sm btn-outline-dark mt-2" onClick={() => setViewPhotos(false)}>Close Photos</button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectManager;
