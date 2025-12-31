// src/components/upload.jsx
import React, { useState, useRef } from 'react';
import './upload.css'; // We'll create this CSS file

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
      setMessage({ type: 'error', text: 'Maximum 10 images allowed' });
      return;
    }
    
    // Validate file types
    const validFiles = files.filter(file => file.type.startsWith('image/'));
    if (validFiles.length !== files.length) {
      setMessage({ type: 'warning', text: 'Some files were not images and were ignored' });
    }
    
    setImages([...images, ...validFiles]);
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
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!description.trim()) {
      setMessage({ type: 'error', text: 'Please enter a description' });
      return;
    }
    
    if (images.length === 0) {
      setMessage({ type: 'error', text: 'Please select at least one image' });
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
        setMessage({ type: 'success', text: 'Project uploaded successfully!' });
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

  return (
    <div className="container-fluid py-4">
      <div className="row justify-content-center">
        <div className="col-xl-8 col-lg-10 col-md-12">
          <div className="card professional-upload-card border-0 shadow-lg">
            <div className="card-header professional-card-header py-4">
              <div className="d-flex align-items-center justify-content-between">
                <div>
                  <h2 className="mb-0">
                    <i className="fas fa-cloud-upload-alt me-3 text-gold"></i>
                    Upload New Project
                  </h2>
                  <p className="text-muted mb-0 mt-2">Share your work with the world</p>
                </div>
                <div className="upload-steps">
                  <span className="step active">1. Details</span>
                  <span className="step-divider">→</span>
                  <span className="step">2. Images</span>
                  <span className="step-divider">→</span>
                  <span className="step">3. Upload</span>
                </div>
              </div>
            </div>
            
            <div className="card-body p-5">
              {message.text && (
                <div className={`alert alert-${message.type === 'error' ? 'danger' : message.type === 'warning' ? 'warning' : 'success'} 
                  alert-dismissible fade show professional-alert`} 
                  role="alert">
                  <div className="d-flex align-items-center">
                    <i className={`fas ${
                      message.type === 'error' ? 'fa-exclamation-circle' : 
                      message.type === 'warning' ? 'fa-exclamation-triangle' : 
                      'fa-check-circle'
                    } me-3`}></i>
                    <span>{message.text}</span>
                  </div>
                  <button type="button" className="btn-close" onClick={() => setMessage({ type: '', text: '' })}></button>
                </div>
              )}
              
              <form onSubmit={handleSubmit}>
                {/* Description Section */}
                <div className="form-section mb-5">
                  <div className="section-header mb-4">
                    <h4 className="section-title">
                      <span className="section-number">01</span>
                      Project Description
                    </h4>
                    <p className="section-subtitle">Tell us about your project</p>
                  </div>
                  
                  <div className="mb-4">
                    <label className="form-label professional-label d-flex align-items-center">
                      <i className="fas fa-edit me-2 text-gold"></i>
                      Description <span className="text-gold ms-2">*</span>
                    </label>
                    <div className="input-group professional-input-group">
                      <textarea
                        className="form-control professional-textarea"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows="5"
                        placeholder="Describe your project in detail. Include the purpose, technologies used, challenges faced, and solutions implemented..."
                        required
                      />
                      <span className="input-group-text char-count">
                        {description.length}/1000
                      </span>
                    </div>
                    <div className="form-text">
                      <i className="fas fa-info-circle me-1 text-gold"></i>
                      Be descriptive to help others understand your work
                    </div>
                  </div>
                </div>

                {/* Images Section */}
                <div className="form-section mb-5">
                  <div className="section-header mb-4">
                    <h4 className="section-title">
                      <span className="section-number">02</span>
                      Project Images
                    </h4>
                    <p className="section-subtitle">Upload screenshots of your work</p>
                  </div>

                  {/* Drag & Drop Area */}
                  <div 
                    className={`drop-zone ${dragOver ? 'drag-over' : ''} ${images.length > 0 ? 'has-images' : ''}`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={triggerFileInput}
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
                      <div className="drop-zone-icon">
                        <i className="fas fa-cloud-upload-alt"></i>
                      </div>
                      <h5 className="mt-3 mb-2">Drag & Drop Images Here</h5>
                      <p className="text-muted mb-3">or click to browse files</p>
                      <div className="file-types">
                        <span className="badge bg-light text-dark me-2">PNG</span>
                        <span className="badge bg-light text-dark me-2">JPG</span>
                        <span className="badge bg-light text-dark me-2">JPEG</span>
                        <span className="badge bg-light text-dark">WEBP</span>
                      </div>
                      <p className="mt-3 text-muted small">
                        <i className="fas fa-info-circle me-1"></i>
                        Max 10 images • Up to 5MB each
                      </p>
                    </div>
                  </div>

                  {/* Image Previews */}
                  {images.length > 0 && (
                    <div className="mt-4">
                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <h6 className="mb-0">
                          <i className="fas fa-images me-2 text-gold"></i>
                          Selected Images ({images.length}/10)
                        </h6>
                        <button 
                          type="button" 
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => setImages([])}
                          disabled={uploading}
                        >
                          <i className="fas fa-trash me-1"></i>
                          Clear All
                        </button>
                      </div>
                      
                      <div className="row g-3">
                        {images.map((image, index) => (
                          <div key={index} className="col-xl-3 col-lg-4 col-md-6">
                            <div className="image-preview-card">
                              <div className="image-wrapper">
                                <img 
                                  src={URL.createObjectURL(image)} 
                                  alt={`Preview ${index + 1}`} 
                                  className="preview-image"
                                />
                                <div className="image-overlay">
                                  <button
                                    type="button"
                                    className="btn btn-sm btn-danger remove-btn"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      removeImage(index);
                                    }}
                                    disabled={uploading}
                                    title="Remove image"
                                  >
                                    <i className="fas fa-times"></i>
                                  </button>
                                </div>
                              </div>
                              <div className="image-info">
                                <small className="text-truncate d-block">{image.name}</small>
                                <small className="text-muted">
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

                {/* Submit Button */}
                <div className="form-section">
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <p className="mb-0 text-muted">
                        <i className="fas fa-shield-alt me-2 text-gold"></i>
                        Your project will be reviewed before publishing
                      </p>
                    </div>
                    <button 
                      type="submit" 
                      className="btn professional-submit-btn px-5 py-3"
                      disabled={uploading || images.length === 0 || !description.trim()}
                    >
                      {uploading ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                          Uploading Project...
                        </>
                      ) : (
                        <>
                          <i className="fas fa-paper-plane me-2"></i>
                          Publish Project
                          <i className="fas fa-arrow-right ms-2"></i>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </form>
            </div>
            
            <div className="card-footer professional-card-footer py-3">
              <div className="row">
                <div className="col-md-6">
                  <div className="d-flex align-items-center">
                    <i className="fas fa-lock me-2 text-gold"></i>
                    <small className="text-muted">Secure SSL Connection</small>
                  </div>
                </div>
                <div className="col-md-6 text-md-end">
                  <small className="text-muted">
                    <i className="fas fa-question-circle me-1 text-gold"></i>
                    Need help? <a href="#" className="text-gold">View guidelines</a>
                  </small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectUpload;