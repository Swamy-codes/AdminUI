// src/componentss/login.jsx
import React, { useState, useEffect } from 'react';
import adminLogo from '../assets/thevedsicon.jpg';

// SHA-256 Helper using native Web Crypto API
async function hashText(text) {
  const msgUint8 = new TextEncoder().encode(text);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}


// Default SHA-256 for "admin" (case-insensitive): 8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918
// Default SHA-256 for "Admin":                       c1c224b03cd9bc7b6a86d77f5dace40191766c485cd55dc48caf9ac873335d6f
// Default SHA-256 for "1234":                        03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4
const EXPECTED_USER_HASH_LOWER = import.meta.env?.VITE_ADMIN_USER_HASH || '8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918';
const EXPECTED_USER_HASH_EXACT = 'c1c224b03cd9bc7b6a86d77f5dace40191766c485cd55dc48caf9ac873335d6f';
const EXPECTED_PASS_HASH = import.meta.env?.VITE_ADMIN_PASS_HASH || '03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4';

const MAX_ATTEMPTS = 5;
const LOCKOUT_SECONDS = 30;

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [lockoutTimer, setLockoutTimer] = useState(0);

  // Handle countdown timer for lockout
  useEffect(() => {
    let interval = null;
    if (lockoutTimer > 0) {
      interval = setInterval(() => {
        setLockoutTimer(prev => {
          if (prev <= 1) {
            setFailedAttempts(0);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [lockoutTimer]);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (lockoutTimer > 0) {
      setError(`Account temporarily locked. Please wait ${lockoutTimer} seconds.`);
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      // Secure SHA-256 hash evaluation so plain credentials are never stored in client bundle
      const inputUserHashLower = await hashText(username.trim().toLowerCase());
      const inputUserHashExact = await hashText(username.trim());
      const inputPassHash = await hashText(password.trim());

      // Simulation delay
      await new Promise(res => setTimeout(res, 350));

      const isUserValid = inputUserHashLower === EXPECTED_USER_HASH_LOWER || inputUserHashExact === EXPECTED_USER_HASH_EXACT;
      const isPassValid = inputPassHash === EXPECTED_PASS_HASH;

      if (isUserValid && isPassValid) {
        setFailedAttempts(0);
        onLogin();
      } else {
        const nextAttempts = failedAttempts + 1;
        setFailedAttempts(nextAttempts);

        if (nextAttempts >= MAX_ATTEMPTS) {
          setLockoutTimer(LOCKOUT_SECONDS);
          setError(`Too many failed attempts. Login locked out for ${LOCKOUT_SECONDS} seconds.`);
        } else {
          setError(`Invalid credentials. ${MAX_ATTEMPTS - nextAttempts} attempt(s) remaining.`);
        }
        setIsSubmitting(false);
      }
    } catch (err) {
      setError('Authentication failed. Please try again.');
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="d-flex align-items-center justify-content-center min-vh-100 p-2 p-sm-3 p-md-4"
      style={{
        background: 'radial-gradient(circle at 50% 20%, #1e293b 0%, #0f172a 100%)',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 1050,
        overflowY: 'auto'
      }}
    >
      {/* Background Decorative Blur Orbs */}
      <div
        className="d-none d-md-block"
        style={{
          position: 'absolute',
          width: '350px',
          height: '350px',
          borderRadius: '50%',
          background: 'rgba(99, 102, 241, 0.15)',
          filter: 'blur(80px)',
          top: '15%',
          left: '20%',
          pointerEvents: 'none'
        }}
      />
      <div
        className="d-none d-md-block"
        style={{
          position: 'absolute',
          width: '300px',
          height: '300px',
          borderRadius: '50%',
          background: 'rgba(217, 119, 6, 0.12)',
          filter: 'blur(70px)',
          bottom: '15%',
          right: '20%',
          pointerEvents: 'none'
        }}
      />

      <div className="container px-1 px-sm-3" style={{ maxWidth: '960px' }}>
        <div className="row g-0 rounded-4 overflow-hidden shadow-lg border border-secondary border-opacity-25" style={{ background: 'rgba(15, 23, 42, 0.75)', backdropFilter: 'blur(20px)' }}>

          {/* Left Column - Branding Banner */}
          <div className="col-lg-6 p-4 p-md-5 d-flex flex-column justify-content-between text-white border-end border-secondary border-opacity-25"
            style={{ background: 'linear-gradient(145deg, rgba(30, 41, 59, 0.6) 0%, rgba(15, 23, 42, 0.8) 100%)' }}>
            <div>
              <div className="d-flex align-items-center gap-3 mb-4">
                <img
                  src={adminLogo}
                  alt="Vastu Engineers Logo"
                  className="rounded-circle border border-warning border-2 shadow"
                  style={{ width: '56px', height: '56px', objectFit: 'cover' }}
                />
                <div>
                  <h4 className="fw-bold m-0 text-white" style={{ letterSpacing: '-0.02em' }}>Vastu Engineers & Designers</h4>
                  <small className="text-warning fw-semibold" style={{ fontSize: '0.75rem', letterSpacing: '0.05em' }}>ESTABLISHED 1995</small>
                </div>
              </div>

              <div className="my-4">
                <h2 className="fw-bold mb-3" style={{ background: 'linear-gradient(135deg, #ffffff 0%, #cbd5e1 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  Enterprise Portal Management
                </h2>
                <p className="text-slate-300 lh-lg" style={{ fontSize: '0.95rem', color: '#94a3b8' }}>
                  A legacy of excellence in structural engineering, architecture, and project management. Access project portfolios, upload site reports, and track milestones.
                </p>
              </div>
            </div>

            <div className="pt-4 border-top border-secondary border-opacity-25">
              <div className="d-flex align-items-center gap-3 text-slate-400" style={{ fontSize: '0.85rem', color: '#94a3b8' }}>
                <span><i className="bi bi-shield-check text-warning me-1"></i> SHA-256 Encrypted</span>
                <span>•</span>
                <span><i className="bi bi-lock-fill text-info me-1"></i> Rate-Limited Access</span>
              </div>
            </div>
          </div>

          {/* Right Column - Login Form */}
          <div className="col-lg-6 p-4 p-md-5 d-flex flex-column justify-content-center bg-white">
            <div className="mb-4">
              <span className="badge bg-indigo-subtle text-indigo fw-semibold px-3 py-2 rounded-pill mb-2" style={{ backgroundColor: '#eef2ff', color: '#4f46e5' }}>
                Protected Admin Portal
              </span>
              <h3 className="fw-bold text-dark mb-1">Welcome Back</h3>
              <p className="text-muted small">Enter your admin credentials to access your workspace.</p>
            </div>

            {error && (
              <div className="alert alert-danger d-flex align-items-center gap-2 py-2 px-3 mb-4 rounded-3 text-danger border-0 bg-danger-subtle" style={{ backgroundColor: '#fef2f2', color: '#dc2626' }}>
                <i className="bi bi-exclamation-triangle-fill"></i>
                <small className="fw-medium">{error}</small>
              </div>
            )}

            <form onSubmit={handleLogin}>
              <div className="mb-3">
                <label className="form-label fw-semibold text-secondary small">Username</label>
                <div className="input-group">
                  <span className="input-group-text bg-light border-end-0 text-muted">
                    <i className="bi bi-person"></i>
                  </span>
                  <input
                    type="text"
                    className="form-control border-start-0 bg-light"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter username"
                    disabled={lockoutTimer > 0 || isSubmitting}
                    required
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="form-label fw-semibold text-secondary small">Password</label>
                <div className="input-group">
                  <span className="input-group-text bg-light border-end-0 text-muted">
                    <i className="bi bi-key"></i>
                  </span>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    className="form-control border-start-0 border-end-0 bg-light"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password"
                    disabled={lockoutTimer > 0 || isSubmitting}
                    required
                  />
                  <button
                    type="button"
                    className="btn btn-light border border-start-0 text-muted"
                    onClick={() => setShowPassword(!showPassword)}
                    title={showPassword ? "Hide password" : "Show password"}
                    disabled={lockoutTimer > 0 || isSubmitting}
                  >
                    <i className={`bi bi-eye${showPassword ? '-slash' : ''}`}></i>
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="btn w-100 py-2.5 fw-semibold text-white shadow-sm"
                style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)' }}
                disabled={isSubmitting || lockoutTimer > 0}
              >
                {isSubmitting ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Hashing & Verifying...
                  </>
                ) : lockoutTimer > 0 ? (
                  <>
                    <i className="bi bi-lock-fill me-2"></i> Locked ({lockoutTimer}s)
                  </>
                ) : (
                  <>
                    Sign In to Dashboard <i className="bi bi-arrow-right ms-2"></i>
                  </>
                )}
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Login;
