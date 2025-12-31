// src/App.jsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './componentss/Navbar.jsx';
import ProjectUpload from './componentss/upload.jsx';
import ProjectManager from './componentss/projectManager.jsx';
import AdminPanel from './componentss/admin.jsx';
import Login from './componentss/login.jsx';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => setIsLoggedIn(true);
  const handleLogout = () => setIsLoggedIn(false);

  return (
    <Router>
      <div className="App">
        {/* Show Navbar only after login */}
        {isLoggedIn && <Navbar onLogout={handleLogout} />}
        <main className="p-4 mt-5">
          <Routes>
            {!isLoggedIn ? (
              <>
                <Route path="*" element={<Login onLogin={handleLogin} />} />
              </>
            ) : (
              <>
                <Route path="/" element={<AdminPanel />} />
                <Route path="/upload" element={<ProjectUpload />} />
                <Route path="/view" element={<ProjectManager />} />
                <Route path="*" element={<Navigate to="/" />} />
              </>
            )}
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
