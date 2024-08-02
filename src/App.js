import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Layout from './Layout';
import HomePage from './Components/Home';
import AboutPage from './Components/AboutPage';
import LoginPage from './Components/Login';
import InqueryPage from './Components/acInqueryPage';
import AuctionPage from './Components/auctionPage'
import ViewInqueries from './Components/Inquery/Inquery';
import UserProfiles from './Components/UserM/userProfiles';
import UserAds from './Components/UserM/userAds';
import Adspage from './Components/AdsPage/Adspage';

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
      <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/acInquery" element={<InqueryPage />} />
        <Route path="/auction" element={<AuctionPage />} />
        <Route path="/inquery/:auctionID" element={<ViewInqueries />} />
        <Route path="/userProfiles" element={<UserProfiles />} />
        <Route path="/userAds/:username" element={<UserAds />} />
        <Route path="/adsPage/view/:adCode" element={<Adspage />} />
      </Routes>
      </Layout>
    </Router>
    
  );
}

export default App;
