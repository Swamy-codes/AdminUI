// src/componentss/navbar.jsx
import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import adminLogo from '../assets/thevedsicon.jpg';

const Navbar = ({ onLogout }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark fixed-top py-2.5 shadow-lg" style={{ background: '#0f172a', borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
      <div className="container-fluid px-3 px-md-5">
        {/* Brand Logo & Title */}
        <Link className="navbar-brand d-flex align-items-center gap-3 me-4" to="/">
          <div className="position-relative">
            <img
              src={adminLogo}
              alt="Vastu Engineers Logo"
              className="rounded-circle border border-warning border-2"
              style={{ width: '42px', height: '42px', objectFit: 'cover' }}
            />
            <span className="position-absolute bottom-0 end-0 bg-success border border-dark rounded-circle p-1" style={{ width: '10px', height: '10px' }}></span>
          </div>
          <div className="d-flex flex-column">
            <span className="fw-bold text-white fs-6 lh-1" style={{ letterSpacing: '-0.01em' }}>VEDS Construction</span>
            <small className="text-warning fw-semibold mt-1" style={{ fontSize: '0.68rem', letterSpacing: '0.04em' }}>
              VASTU ENGINEERS & DESIGNERS
            </small>
          </div>
        </Link>

        {/* Mobile Navbar Toggler */}
        <button
          className="navbar-toggler border-0 p-2"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarMainContent"
          aria-controls="navbarMainContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar Navigation Items */}
        <div className="collapse navbar-collapse" id="navbarMainContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 gap-1 mt-2 mt-lg-0">
            
            {/* Dashboard Link */}
            <li className="nav-item">
              <NavLink
                to="/"
                end
                className={({ isActive }) =>
                  `nav-link px-3 py-2 rounded-3 d-flex align-items-center gap-2 fw-medium ${
                    isActive ? 'bg-indigo text-white fw-semibold active' : 'text-slate-300 text-white-50'
                  }`
                }
                style={({ isActive }) => (isActive ? { backgroundColor: '#6366f1', color: '#ffffff' } : {})}
              >
                <i className="bi bi-grid-1x2-fill"></i>
                <span>Dashboard</span>
              </NavLink>
            </li>

            {/* Upload Work Link */}
            <li className="nav-item">
              <NavLink
                to="/upload"
                className={({ isActive }) =>
                  `nav-link px-3 py-2 rounded-3 d-flex align-items-center gap-2 fw-medium ${
                    isActive ? 'bg-indigo text-white fw-semibold active' : 'text-slate-300 text-white-50'
                  }`
                }
                style={({ isActive }) => (isActive ? { backgroundColor: '#6366f1', color: '#ffffff' } : {})}
              >
                <i className="bi bi-cloud-arrow-up-fill text-warning"></i>
                <span>Upload Work</span>
              </NavLink>
            </li>

            {/* View Portfolio Link */}
            <li className="nav-item">
              <NavLink
                to="/view"
                className={({ isActive }) =>
                  `nav-link px-3 py-2 rounded-3 d-flex align-items-center gap-2 fw-medium ${
                    isActive ? 'bg-indigo text-white fw-semibold active' : 'text-slate-300 text-white-50'
                  }`
                }
                style={({ isActive }) => (isActive ? { backgroundColor: '#6366f1', color: '#ffffff' } : {})}
              >
                <i className="bi bi-folder-symlink-fill text-info"></i>
                <span>Project Portfolio</span>
              </NavLink>
            </li>

          </ul>

          {/* Right Action & User Profile Section */}
          <div className="d-flex align-items-center gap-3 pt-2 pt-lg-0">
            {/* Quick Upload Action Button */}
            <Link to="/upload" className="btn btn-sm text-white fw-semibold d-none d-xl-flex align-items-center gap-2 px-3 py-2 rounded-pill shadow-sm" style={{ background: 'linear-gradient(135deg, #d97706 0%, #b45309 100%)', border: 'none' }}>
              <i className="bi bi-plus-circle-fill"></i>
              <span>New Upload</span>
            </Link>

            {/* User Profile Dropdown */}
            <div className="dropdown">
              <button
                className="btn btn-outline-secondary text-white border-0 bg-white bg-opacity-10 rounded-pill p-1 pe-3 d-flex align-items-center gap-2"
                type="button"
                id="userProfileDropdownNav"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <div className="rounded-circle bg-warning text-dark fw-bold d-flex align-items-center justify-content-center" style={{ width: '34px', height: '34px', fontSize: '0.85rem' }}>
                  NG
                </div>
                <div className="text-start d-none d-sm-block">
                  <div className="fw-semibold lh-1 text-white" style={{ fontSize: '0.85rem' }}>Nagabhushana G V</div>
                  <small className="text-warning opacity-75" style={{ fontSize: '0.7rem' }}>Chief Admin</small>
                </div>
                <i className="bi bi-chevron-down text-white-50 ms-1" style={{ fontSize: '0.75rem' }}></i>
              </button>

              <ul className="dropdown-menu dropdown-menu-end dropdown-menu-dark shadow-lg border-0 mt-2 p-2" aria-labelledby="userProfileDropdownNav" style={{ background: '#1e293b', minWidth: '220px' }}>
                <li className="px-3 py-2 border-bottom border-secondary border-opacity-25 mb-1">
                  <div className="fw-bold text-white">Vastu Engineers & Designers</div>
                  <small className="text-warning">Civil & Structural Division</small>
                </li>
                <li>
                  <Link className="dropdown-item py-2 px-3 rounded-2 d-flex align-items-center gap-2" to="/profile">
                    <i className="bi bi-person-badge"></i> Admin Profile
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item py-2 px-3 rounded-2 d-flex align-items-center gap-2" to="/settings">
                    <i className="bi bi-sliders"></i> Portal Settings
                  </Link>
                </li>
                <li><hr className="dropdown-divider border-secondary my-1" /></li>
                <li>
                  <button
                    type="button"
                    className="dropdown-item py-2 px-3 rounded-2 d-flex align-items-center gap-2 text-danger fw-semibold"
                    onClick={onLogout}
                  >
                    <i className="bi bi-box-arrow-right"></i> Sign Out
                  </button>
                </li>
              </ul>
            </div>
          </div>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;
