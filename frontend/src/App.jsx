import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import PublicDashboard from './pages/PublicDashboard';
import React from 'react';
import './App.css'
import LoginRegister from './components/LoginRegister';
import SubmitJobReport from './pages/SubmitJobReport';
import RadarFeed from './pages/RadarFeed';
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/dashboard" element={<PublicDashboard />} />
      <Route path='/login' element={<LoginRegister/>}/>
      <Route path="/report" element={<SubmitJobReport />} />
      <Route path='/radar' element={<RadarFeed/>}/>
    </Routes>
  );
}

export default App;
