import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Navbar from './components/Navbar';
import FileComplaint from './pages/FileComplaint.jsx';
import TrackComplaints from './pages/TrackComplaints.jsx';
import RewardsPage from './pages/RewardsPage.jsx';
import Help from './pages/Help.jsx';
import './index.css';

function App(){
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="p-4 max-w-4xl mx-auto">
          <Routes>
            <Route path="/" element={<FileComplaint />} />
            <Route path="/track" element={<TrackComplaints />} />
            <Route path="/rewards" element={<RewardsPage />} />
            <Route path="/help" element={<Help />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}
export default App;
