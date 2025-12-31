// src/components/AdminPanel.jsx
import React from 'react';
import { Container, Row, Col, Card, Badge } from 'react-bootstrap';

const AdminPanel = () => {
  const companyInfo = {
    name: "Vastu Engineers & Designers",
    founder: "Nagabhushana G V",
    established: "1995",
    description: "A legacy of excellence continued seamlessly, a hallmark of trust & innovation.",
    fullDescription:
      "Established in 1995 by visionary founder Nagabhushana G V, Vastu Engineers & Designers stands as a beacon of enduring excellence in engineering and architectural innovation."
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(to bottom, #f1f3f5, #e9ecef)',
        padding: '2rem 0'
      }}
    >
      <Container>
        <Row className="justify-content-center mb-4">
          <Col lg={8}>
            <Card className="shadow-sm p-4">
              <Card.Body>
                <h2 className="mb-3 text-primary">Hi, Admin!</h2>
                <p className="lead">
                  Welcome to the <strong>Vastu Engineers Admin Panel</strong>.
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row className="justify-content-center mb-4">
          <Col lg={8}>
            <Card className="shadow-sm p-4">
              <Card.Body>
                <h4 className="mb-3 text-secondary">Company Information</h4>
                <Row className="mb-3">
                  <Col md={6}>
                    <p>
                      <strong>Company:</strong> {companyInfo.name}
                    </p>
                    <p>
                      <strong>Founder:</strong> {companyInfo.founder}
                    </p>
                    <p>
                      <strong>Established:</strong> {companyInfo.established}
                    </p>
                  </Col>
                  <Col md={6}>
                    <p className="fst-italic text-secondary">"{companyInfo.description}"</p>
                  </Col>
                </Row>
                <p>{companyInfo.fullDescription}</p>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row className="justify-content-center">
          <Col lg={10}>
            <Row className="g-4">
              <Col md={4}>
                <Card className="text-center border-primary shadow-sm hover-shadow">
                  <Card.Body>
                    <Card.Title>Active Projects</Card.Title>
                    <h3><Badge bg="primary">12</Badge></h3>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={4}>
                <Card className="text-center border-success shadow-sm hover-shadow">
                  <Card.Body>
                    <Card.Title>Completed</Card.Title>
                    <h3><Badge bg="success">48</Badge></h3>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={4}>
                <Card className="text-center border-info shadow-sm hover-shadow">
                  <Card.Body>
                    <Card.Title>Total Clients</Card.Title>
                    <h3><Badge bg="info">85</Badge></h3>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default AdminPanel;
