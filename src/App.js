import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import HomePage from './Components/Home';
import AboutPage from './Components/AboutPage';
import LoginPage from './Components/Login';
import NavBar from './Main/NavBar';
import InqueryPage from './Components/acInqueryPage';

function App() {
  const authState = useSelector(state => state.auth);

  if(!authState.isAuthenticated){
    return (
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    );
  }
  return (
    <Router>
      <NavBar/>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/acInquery" element={<InqueryPage />} />
      </Routes>
    </Router>
  );
}

export default App;
