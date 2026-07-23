// src/componentss/admin.jsx
import React from 'react';
import { Container, Row, Col, Card, Badge, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import adminLogo from '../assets/thevedsicon.jpg';

const AdminPanel = () => {
  const companyInfo = {
    name: "Vastu Engineers & Designers",
    founder: "Nagabhushana G V",
    established: "1995",
    tagline: "A legacy of structural excellence & architectural innovation.",
    fullDescription:
      "Established in 1995 by visionary founder Nagabhushana G V, Vastu Engineers & Designers stands as a beacon of enduring trust, precision structural engineering, and modern architectural design across residential, commercial, and industrial projects."
  };

  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="py-4 animate-fade-in">
      <Container fluid className="px-0">
        
        {/* Hero Welcome Banner */}
        <Row className="mb-4">
          <Col lg={12}>
            <Card className="border-0 shadow-sm overflow-hidden text-white" style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #312e81 100%)', borderRadius: '20px' }}>
              <Card.Body className="p-4 p-md-5">
                <Row className="align-items-center">
                  <Col md={8}>
                    <div className="d-flex align-items-center gap-2 mb-2">
                      <Badge bg="warning" text="dark" className="px-3 py-1 fw-bold rounded-pill" style={{ letterSpacing: '0.05em' }}>
                        LIVE PORTAL
                      </Badge>
                      <small className="text-slate-300 opacity-75">{currentDate}</small>
                    </div>
                    <h1 className="fw-bold display-6 mb-2 text-white" style={{ letterSpacing: '-0.02em' }}>
                      Welcome Back, Chief Admin!
                    </h1>
                    <p className="lead text-slate-300 mb-4 opacity-90" style={{ fontSize: '1.05rem', color: '#cbd5e1' }}>
                      {companyInfo.name} — Real-time engineering portfolio, project uploads, and milestone tracking.
                    </p>
                    
                    <div className="d-flex flex-wrap gap-3">
                      <Link to="/upload" className="btn btn-warning px-4 py-2.5 fw-semibold rounded-3 shadow-sm d-inline-flex align-items-center gap-2">
                        <i className="bi bi-cloud-upload-fill"></i>
                        <span>Upload New Work</span>
                      </Link>
                      <Link to="/view" className="btn btn-outline-light px-4 py-2.5 fw-semibold rounded-3 d-inline-flex align-items-center gap-2">
                        <i className="bi bi-folder2-open"></i>
                        <span>View Portfolio</span>
                      </Link>
                    </div>
                  </Col>

                  <Col md={4} className="d-none d-md-flex justify-content-end align-items-center">
                    <div className="p-3 bg-white bg-opacity-10 rounded-4 border border-white border-opacity-15 text-center" style={{ backdropFilter: 'blur(10px)', maxWidth: '240px' }}>
                      <img
                        src={adminLogo}
                        alt="Vastu Engineers"
                        className="rounded-circle border border-warning border-3 shadow mb-2"
                        style={{ width: '80px', height: '80px', objectFit: 'cover' }}
                      />
                      <h6 className="fw-bold text-white mb-0">{companyInfo.founder}</h6>
                      <small className="text-warning fw-medium">Founder & Principal Director</small>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* KPI Stats Row */}
        <Row className="g-4 mb-4">
          <Col md={6} xl={3}>
            <Card className="border-0 shadow-sm h-100 p-3" style={{ background: '#ffffff', borderRadius: '16px', borderLeft: '5px solid #6366f1' }}>
              <Card.Body className="d-flex align-items-center justify-content-between p-2">
                <div>
                  <small className="text-muted fw-bold text-uppercase" style={{ fontSize: '0.75rem', letterSpacing: '0.05em' }}>Active Projects</small>
                  <h2 className="fw-bold text-dark my-1">12</h2>
                  <span className="badge bg-indigo-subtle text-indigo px-2 py-1 rounded-pill" style={{ backgroundColor: '#eef2ff', color: '#4f46e5', fontSize: '0.75rem' }}>
                    <i className="bi bi-arrow-up-right me-1"></i> +2 this month
                  </span>
                </div>
                <div className="p-3 rounded-4" style={{ background: '#eef2ff', color: '#6366f1' }}>
                  <i className="bi bi-building-gear fs-2"></i>
                </div>
              </Card.Body>
            </Card>
          </Col>

          <Col md={6} xl={3}>
            <Card className="border-0 shadow-sm h-100 p-3" style={{ background: '#ffffff', borderRadius: '16px', borderLeft: '5px solid #10b981' }}>
              <Card.Body className="d-flex align-items-center justify-content-between p-2">
                <div>
                  <small className="text-muted fw-bold text-uppercase" style={{ fontSize: '0.75rem', letterSpacing: '0.05em' }}>Completed Projects</small>
                  <h2 className="fw-bold text-dark my-1">48</h2>
                  <span className="badge bg-success-subtle text-success px-2 py-1 rounded-pill" style={{ backgroundColor: '#ecfdf5', color: '#059669', fontSize: '0.75rem' }}>
                    <i className="bi bi-check-circle-fill me-1"></i> 100% Quality Rate
                  </span>
                </div>
                <div className="p-3 rounded-4" style={{ background: '#ecfdf5', color: '#10b981' }}>
                  <i className="bi bi-patch-check-fill fs-2"></i>
                </div>
              </Card.Body>
            </Card>
          </Col>

          <Col md={6} xl={3}>
            <Card className="border-0 shadow-sm h-100 p-3" style={{ background: '#ffffff', borderRadius: '16px', borderLeft: '5px solid #06b6d4' }}>
              <Card.Body className="d-flex align-items-center justify-content-between p-2">
                <div>
                  <small className="text-muted fw-bold text-uppercase" style={{ fontSize: '0.75rem', letterSpacing: '0.05em' }}>Total Clients</small>
                  <h2 className="fw-bold text-dark my-1">85</h2>
                  <span className="badge bg-info-subtle text-info px-2 py-1 rounded-pill" style={{ backgroundColor: '#ecfeff', color: '#0891b2', fontSize: '0.75rem' }}>
                    <i className="bi bi-people-fill me-1"></i> High Satisfaction
                  </span>
                </div>
                <div className="p-3 rounded-4" style={{ background: '#ecfeff', color: '#06b6d4' }}>
                  <i className="bi bi-person-hearts fs-2"></i>
                </div>
              </Card.Body>
            </Card>
          </Col>

          <Col md={6} xl={3}>
            <Card className="border-0 shadow-sm h-100 p-3" style={{ background: '#ffffff', borderRadius: '16px', borderLeft: '5px solid #d97706' }}>
              <Card.Body className="d-flex align-items-center justify-content-between p-2">
                <div>
                  <small className="text-muted fw-bold text-uppercase" style={{ fontSize: '0.75rem', letterSpacing: '0.05em' }}>Site Inspections</small>
                  <h2 className="fw-bold text-dark my-1">16</h2>
                  <span className="badge bg-warning-subtle text-warning px-2 py-1 rounded-pill" style={{ backgroundColor: '#fffbeb', color: '#b45309', fontSize: '0.75rem' }}>
                    <i className="bi bi-clock-history me-1"></i> Scheduled
                  </span>
                </div>
                <div className="p-3 rounded-4" style={{ background: '#fffbeb', color: '#d97706' }}>
                  <i className="bi bi-compass-fill fs-2"></i>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Main Content Grid: Company Details & Quick Actions */}
        <Row className="g-4">
          
          {/* Company Heritage Card */}
          <Col lg={8}>
            <Card className="border-0 shadow-sm p-3 p-md-4" style={{ borderRadius: '16px', background: '#ffffff' }}>
              <Card.Body>
                <div className="d-flex align-items-center justify-content-between mb-3 border-bottom pb-3">
                  <div>
                    <span className="badge bg-warning text-dark fw-bold me-2">EST. 1995</span>
                    <h4 className="fw-bold text-dark d-inline mb-0" style={{ letterSpacing: '-0.01em' }}>Company Information</h4>
                  </div>
                  <Badge bg="light" text="dark" className="border px-3 py-2 fw-medium">
                    <i className="bi bi-award text-warning me-1"></i> 30+ Years Legacy
                  </Badge>
                </div>

                <Row className="g-3 mb-4">
                  <Col md={6}>
                    <div className="p-3 rounded-3 bg-light border border-slate-200">
                      <small className="text-muted d-block fw-semibold mb-1">Company Name</small>
                      <strong className="text-dark fs-6">{companyInfo.name}</strong>
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="p-3 rounded-3 bg-light border border-slate-200">
                      <small className="text-muted d-block fw-semibold mb-1">Visionary Founder</small>
                      <strong className="text-dark fs-6">{companyInfo.founder}</strong>
                    </div>
                  </Col>
                </Row>

                <blockquote className="blockquote p-3 rounded-3 bg-indigo-subtle border-start border-4 border-indigo mb-4" style={{ backgroundColor: '#f5f3ff', borderLeftColor: '#6366f1' }}>
                  <p className="fst-italic text-dark mb-0" style={{ fontSize: '0.95rem' }}>
                    "{companyInfo.tagline}"
                  </p>
                </blockquote>

                <p className="text-secondary lh-lg mb-0" style={{ fontSize: '0.95rem' }}>
                  {companyInfo.fullDescription}
                </p>
              </Card.Body>
            </Card>
          </Col>

          {/* Quick Actions & System Info */}
          <Col lg={4}>
            <Card className="border-0 shadow-sm p-3 p-md-4 h-100" style={{ borderRadius: '16px', background: '#ffffff' }}>
              <Card.Body className="d-flex flex-column justify-content-between">
                <div>
                  <h5 className="fw-bold text-dark mb-3 border-bottom pb-2">
                    <i className="bi bi-lightning-charge-fill text-warning me-2"></i> Quick Actions
                  </h5>

                  <div className="d-grid gap-2 mb-4">
                    <Link to="/upload" className="btn btn-light text-start p-3 rounded-3 border d-flex align-items-center justify-content-between hover-shadow">
                      <div className="d-flex align-items-center gap-3">
                        <div className="p-2 rounded-circle bg-warning bg-opacity-25 text-warning">
                          <i className="bi bi-cloud-arrow-up-fill fs-5"></i>
                        </div>
                        <div>
                          <div className="fw-semibold text-dark">Upload Project Media</div>
                          <small className="text-muted">Add new site photos & details</small>
                        </div>
                      </div>
                      <i className="bi bi-chevron-right text-muted"></i>
                    </Link>

                    <Link to="/view" className="btn btn-light text-start p-3 rounded-3 border d-flex align-items-center justify-content-between hover-shadow">
                      <div className="d-flex align-items-center gap-3">
                        <div className="p-2 rounded-circle bg-indigo bg-opacity-25 text-indigo" style={{ backgroundColor: '#eef2ff', color: '#6366f1' }}>
                          <i className="bi bi-grid-3x3-gap-fill fs-5"></i>
                        </div>
                        <div>
                          <div className="fw-semibold text-dark">Manage Portfolio</div>
                          <small className="text-muted">Edit or delete existing projects</small>
                        </div>
                      </div>
                      <i className="bi bi-chevron-right text-muted"></i>
                    </Link>
                  </div>
                </div>

                <div className="p-3 bg-slate-900 rounded-3 text-white" style={{ background: '#0f172a' }}>
                  <div className="d-flex align-items-center justify-content-between mb-2">
                    <small className="text-warning fw-bold">SYSTEM METRICS</small>
                    <span className="badge bg-success rounded-pill">Optimal</span>
                  </div>
                  <div className="d-flex justify-content-between small text-slate-300">
                    <span>API Service:</span>
                    <span className="text-white fw-medium">Active (Render)</span>
                  </div>
                  <div className="d-flex justify-content-between small text-slate-300 mt-1">
                    <span>Database:</span>
                    <span className="text-white fw-medium">Connected</span>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>

        </Row>

      </Container>
    </div>
  );
};

export default AdminPanel;
