// src/components/Navbar.jsx
import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import adminLogo from '../assets/thevedsicon.jpg';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm fixed-top">
      <div className="container-fluid">
        {/* Brand */}
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <img
            src={adminLogo}
            alt="VEDS Logo"
            className="me-2"
            style={{ width: '45px', height: '45px', borderRadius: '50%', objectFit: 'cover' }}
          />
          <div className="d-flex flex-column">
            <span className="fw-bold fs-5 text-white">VEDS Construction</span>
            <small className="text-muted" style={{ fontSize: '0.7rem' }}>
              Admin Dashboard
            </small>
          </div>
        </Link>

        {/* Mobile Toggle */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar Links */}
        <div className="collapse navbar-collapse" id="navbarContent">
          <ul className="navbar-nav ms-auto align-items-center">
            {/* Dashboard */}
            <li className="nav-item mx-2">
              <NavLink
                className="nav-link d-flex align-items-center fw-medium"
                to="/"
                end
              >
                <i className="bi bi-speedometer2 me-2"></i>
                Dashboard
              </NavLink>
            </li>

            {/* Upload Work */}
            <li className="nav-item mx-2">
              <NavLink
                className="nav-link d-flex align-items-center fw-medium"
                to="/upload"
              >
                <i className="bi bi-cloud-upload me-2 text-success"></i>
                Upload Work
              </NavLink>
            </li>

            {/* View Work */}
            <li className="nav-item mx-2">
              <NavLink
                className="nav-link d-flex align-items-center fw-medium"
                to="/view"
              >
                <i className="bi bi-eye me-2 text-info"></i>
                View Work
              </NavLink>
            </li>

            {/* Reports Dropdown */}
            <li className="nav-item mx-2 dropdown">
              <a
                className="nav-link dropdown-toggle d-flex align-items-center fw-medium"
                href="#"
                id="reportsDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i className="bi bi-bar-chart me-2"></i>
                Reports
              </a>
              <ul className="dropdown-menu dropdown-menu-end shadow-sm" aria-labelledby="reportsDropdown">
                <li>
                  <Link className="dropdown-item d-flex align-items-center" to="/reports/weekly">
                    <i className="bi bi-calendar-week me-2"></i>
                    Weekly
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item d-flex align-items-center" to="/reports/monthly">
                    <i className="bi bi-calendar-month me-2"></i>
                    Monthly
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item d-flex align-items-center" to="/reports/progress">
                    <i className="bi bi-graph-up me-2"></i>
                    Progress
                  </Link>
                </li>
              </ul>
            </li>

            {/* User Dropdown */}
            <li className="nav-item mx-2 dropdown">
              <a
                className="nav-link dropdown-toggle d-flex align-items-center"
                href="#"
                id="userDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <div
                  className="bg-primary rounded-circle d-flex align-items-center justify-content-center me-2"
                  style={{ width: '36px', height: '36px' }}
                >
                  <i className="bi bi-person text-white"></i>
                </div>
                <span className="fw-medium">Engineer</span>
              </a>
              <ul className="dropdown-menu dropdown-menu-end shadow-sm" aria-labelledby="userDropdown">
                <li><h6 className="dropdown-header">Civil Engineer</h6></li>
                <li>
                  <Link className="dropdown-item d-flex align-items-center" to="/profile">
                    <i className="bi bi-person-circle me-2"></i>Profile
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item d-flex align-items-center" to="/settings">
                    <i className="bi bi-gear me-2"></i>Settings
                  </Link>
                </li>
                <li><hr className="dropdown-divider" /></li>
                <li>
                  <Link className="dropdown-item d-flex align-items-center text-danger" to="/logout">
                    <i className="bi bi-box-arrow-right me-2"></i>Logout
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
