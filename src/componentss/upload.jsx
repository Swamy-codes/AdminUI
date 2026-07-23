// src/componentss/upload.jsx
import React, { useState, useRef } from 'react';
import './upload.css';

function ProjectUpload({ onProjectCreated }) {
  const [description, setDescription] = useState('');
  const [images, setImages] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    handleFiles(files);
  };

  const handleFiles = (files) => {
    if (files.length + images.length > 10) {
      setMessage({ type: 'error', text: 'Maximum 10 images allowed per project upload.' });
      return;
    }
    
    // Validate file types
    const validFiles = files.filter(file => file.type.startsWith('image/'));
    if (validFiles.length !== files.length) {
      setMessage({ type: 'warning', text: 'Some non-image files were skipped.' });
    }
    
    setImages(prev => [...prev, ...validFiles]);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  };

  const removeImage = (index) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!description.trim()) {
      setMessage({ type: 'error', text: 'Please enter a project description.' });
      return;
    }
    
    if (images.length === 0) {
      setMessage({ type: 'error', text: 'Please select at least one image file.' });
      return;
    }

    setUploading(true);
    setMessage({ type: '', text: '' });

    const formData = new FormData();
    formData.append('description', description);
    images.forEach((image) => formData.append('images', image));

    try {
      const response = await fetch('https://test-check-q5kj.onrender.com/projects', {
        method: 'POST',
        headers: {
          'accept': 'application/json',
        },
        body: formData,
      });

      const result = await response.json();

      if (response.ok) {
        setMessage({ type: 'success', text: 'Project published & uploaded successfully to Vastu Engineers Portal!' });
        setDescription('');
        setImages([]);
        if (result.data && result.data[0] && onProjectCreated) {
          onProjectCreated(result.data[0]);
        }
      } else {
        throw new Error(result.message || 'Upload failed');
      }
    } catch (error) {
      setMessage({ type: 'error', text: `Upload failed: ${error.message}` });
    } finally {
      setUploading(false);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  // Determine current active step
  const currentStep = images.length === 0 && !description ? 1 : images.length > 0 && !description ? 2 : 3;

  return (
    <div className="container-fluid py-2 animate-fade-in">
      <div className="row justify-content-center">
        <div className="col-xl-9 col-lg-11">
          <div className="card professional-upload-card border-0 shadow-lg rounded-4 overflow-hidden">
            
            {/* Header Banner */}
            <div className="card-header professional-card-header p-4" style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)' }}>
              <div className="d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-3">
                <div>
                  <div className="d-flex align-items-center gap-2 mb-1">
                    <span className="badge bg-warning text-dark fw-bold">VASTU ENGINEERS PORTAL</span>
                  </div>
                  <h2 className="mb-0 fw-bold text-white fs-3 d-flex align-items-center gap-2">
                    <i className="bi bi-cloud-arrow-up-fill text-warning"></i>
                    Upload New Project
                  </h2>
                  <p className="text-slate-300 mb-0 mt-1" style={{ fontSize: '0.9rem', color: '#cbd5e1' }}>
                    Publish site photos, structural progress reports, and architectural blueprints.
                  </p>
                </div>
                
                {/* Stepper Pill Tracker */}
                <div className="upload-steps bg-white bg-opacity-10 p-2 rounded-pill border border-white border-opacity-10">
                  <span className={`step ${currentStep >= 1 ? 'active' : ''}`}>1. Details</span>
                  <span className="step-divider text-white-50">→</span>
                  <span className={`step ${currentStep >= 2 ? 'active' : ''}`}>2. Media</span>
                  <span className="step-divider text-white-50">→</span>
                  <span className={`step ${currentStep === 3 ? 'active' : ''}`}>3. Publish</span>
                </div>
              </div>
            </div>
            
            {/* Form Body */}
            <div className="card-body p-4 p-md-5 bg-white">
              
              {/* Alert Feedback */}
              {message.text && (
                <div className={`alert alert-${message.type === 'error' ? 'danger' : message.type === 'warning' ? 'warning' : 'success'} alert-dismissible fade show border-0 shadow-sm p-3 mb-4 rounded-3 d-flex align-items-center gap-3`} role="alert">
                  <i className={`bi ${message.type === 'error' ? 'bi-exclamation-triangle-fill fs-4' : message.type === 'warning' ? 'bi-exclamation-circle-fill fs-4' : 'bi-check-circle-fill fs-4'}`}></i>
                  <div>{message.text}</div>
                  <button type="button" className="btn-close" onClick={() => setMessage({ type: '', text: '' })}></button>
                </div>
              )}
              
              <form onSubmit={handleSubmit}>
                
                {/* Section 01: Project Description */}
                <div className="form-section mb-4 p-4 rounded-4 bg-light border border-slate-200">
                  <div className="section-header mb-3 pb-2 border-bottom">
                    <h5 className="section-title fw-bold text-dark mb-1">
                      <span className="section-number bg-warning text-dark me-2">01</span>
                      Project Description & Milestones
                    </h5>
                    <p className="section-subtitle text-muted mb-0 small ms-0 ms-md-4">
                      Enter key structural details, site location, client name, or progress summary.
                    </p>
                  </div>
                  
                  <div className="mb-2">
                    <label className="form-label fw-semibold text-dark small d-flex align-items-center gap-1">
                      <i className="bi bi-pencil-square text-warning"></i>
                      Description Overview <span className="text-danger">*</span>
                    </label>
                    <div className="position-relative">
                      <textarea
                        className="form-control professional-textarea shadow-sm"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows="4"
                        placeholder="e.g., Commercial Complex Foundation Work at Rajajinagar - Phase 1 Concrete Slab Pouring completed under supervision of Nagabhushana G V."
                        maxLength={1000}
                        required
                      />
                      <span className="position-absolute bottom-0 end-0 m-2 badge bg-light text-muted border">
                        {description.length}/1000
                      </span>
                    </div>
                  </div>
                </div>

                {/* Section 02: Media Files */}
                <div className="form-section mb-4 p-4 rounded-4 bg-light border border-slate-200">
                  <div className="section-header mb-3 pb-2 border-bottom">
                    <h5 className="section-title fw-bold text-dark mb-1">
                      <span className="section-number bg-warning text-dark me-2">02</span>
                      Site Photos & Blueprints
                    </h5>
                    <p className="section-subtitle text-muted mb-0 small ms-0 ms-md-4">
                      Drag & drop images or click to select files (PNG, JPG, JPEG, WEBP).
                    </p>
                  </div>

                  {/* Drag & Drop Area */}
                  <div 
                    className={`drop-zone p-5 text-center rounded-4 border-2 border-dashed ${dragOver ? 'drag-over' : ''} ${images.length > 0 ? 'has-images' : ''}`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={triggerFileInput}
                    style={{ background: '#fafafa', cursor: 'pointer', transition: 'all 0.25s ease' }}
                  >
                    <input
                      ref={fileInputRef}
                      type="file"
                      className="d-none"
                      onChange={handleImageChange}
                      multiple
                      accept="image/*"
                      disabled={uploading}
                    />
                    
                    <div className="drop-zone-content">
                      <div className="drop-zone-icon text-warning mb-2" style={{ fontSize: '3.5rem' }}>
                        <i className="bi bi-cloud-upload-fill"></i>
                      </div>
                      <h5 className="fw-bold text-dark mb-1">Drag & Drop Site Images Here</h5>
                      <p className="text-muted small mb-3">or click anywhere to browse local files</p>
                      
                      <div className="d-flex justify-content-center flex-wrap gap-2 mb-2">
                        <span className="badge bg-white text-dark border px-2 py-1">PNG</span>
                        <span className="badge bg-white text-dark border px-2 py-1">JPG</span>
                        <span className="badge bg-white text-dark border px-2 py-1">JPEG</span>
                        <span className="badge bg-white text-dark border px-2 py-1">WEBP</span>
                      </div>
                      <small className="text-muted d-block">
                        <i className="bi bi-info-circle me-1 text-warning"></i> Max 10 files per project • Up to 5MB each
                      </small>
                    </div>
                  </div>

                  {/* Selected Images Grid Preview */}
                  {images.length > 0 && (
                    <div className="mt-4">
                      <div className="d-flex align-items-center justify-content-between mb-3">
                        <h6 className="fw-bold text-dark mb-0">
                          <i className="bi bi-images text-warning me-2"></i>
                          Selected Images ({images.length}/10)
                        </h6>
                        <button 
                          type="button" 
                          className="btn btn-sm btn-outline-danger px-3 py-1 fw-semibold rounded-pill"
                          onClick={() => setImages([])}
                          disabled={uploading}
                        >
                          <i className="bi bi-trash me-1"></i> Clear All
                        </button>
                      </div>
                      
                      <div className="row g-3">
                        {images.map((image, index) => (
                          <div key={index} className="col-6 col-md-4 col-lg-3">
                            <div className="card h-100 border shadow-sm rounded-3 overflow-hidden position-relative group-hover">
                              <div style={{ height: '120px', overflow: 'hidden', background: '#f1f5f9' }}>
                                <img 
                                  src={URL.createObjectURL(image)} 
                                  alt={`Preview ${index + 1}`} 
                                  className="w-100 h-100"
                                  style={{ objectFit: 'cover' }}
                                />
                              </div>
                              <button
                                type="button"
                                className="btn btn-danger btn-sm position-absolute top-0 end-0 m-1 rounded-circle p-0 d-flex align-items-center justify-content-center shadow"
                                style={{ width: '26px', height: '26px' }}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  removeImage(index);
                                }}
                                disabled={uploading}
                                title="Remove image"
                              >
                                <i className="bi bi-x fs-6"></i>
                              </button>
                              <div className="p-2 bg-white">
                                <small className="d-block text-truncate fw-medium text-dark" style={{ fontSize: '0.75rem' }}>{image.name}</small>
                                <small className="text-muted" style={{ fontSize: '0.7rem' }}>
                                  {(image.size / 1024 / 1024).toFixed(2)} MB
                                </small>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Section 03: Submit */}
                <div className="d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-3 pt-2">
                  <div className="d-flex align-items-center gap-2 text-muted small">
                    <i className="bi bi-shield-check text-success fs-5"></i>
                    <span>Project metadata will be stored in Vastu Engineers Portal.</span>
                  </div>
                  
                  <button 
                    type="submit" 
                    className="btn btn-lg px-5 py-3 fw-bold text-white shadow rounded-3 border-0 d-inline-flex align-items-center justify-content-center gap-2"
                    style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)' }}
                    disabled={uploading || images.length === 0 || !description.trim()}
                  >
                    {uploading ? (
                      <>
                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                        Uploading to Server...
                      </>
                    ) : (
                      <>
                        <i className="bi bi-send-fill text-warning"></i>
                        <span>Publish Project</span>
                        <i className="bi bi-arrow-right"></i>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>

            {/* Footer */}
            <div className="card-footer bg-light p-3 border-top border-slate-200">
              <div className="d-flex flex-column flex-sm-row align-items-sm-center justify-content-between gap-2 small text-muted">
                <div><i className="bi bi-lock-fill text-warning me-1"></i> Secure Render API Connection</div>
                <div>Need assistance? Contact <strong>Vastu Engineers Tech Team</strong></div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectUpload;