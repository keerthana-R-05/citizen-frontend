import React from 'react';
import { Link } from 'react-router-dom';
import { Zap, FileText, TrendingUp, HelpCircle } from 'lucide-react';

export default function Navbar() {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-teal-500 text-white p-4 shadow-lg sticky top-0 z-10">
      <div className="max-w-4xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold flex items-center">
          <Zap className="h-6 w-6 mr-2" /> CitizenConnect
        </Link>
        <nav className="space-x-3 flex items-center text-sm"> {/* Reduced spacing for mobile */}
          <Link to="/" className="font-medium hover:underline flex items-center">
            <FileText className="h-4 w-4 mr-1" /> File
          </Link>
          <Link to="/track" className="font-medium hover:underline flex items-center">
            <TrendingUp className="h-4 w-4 mr-1" /> Track
          </Link>
          <Link to="/rewards" className="font-medium hover:underline hidden sm:flex items-center"> {/* Hidden on small screens */}
            Rewards
          </Link>
          <Link to="/help" className="font-medium hover:underline hidden sm:flex items-center">
            <HelpCircle className="h-4 w-4 mr-1" /> Help
          </Link>
          <a href="http://localhost:3001" target="_blank" rel="noopener noreferrer" className="bg-white text-blue-600 px-3 py-1 rounded-full text-sm font-semibold hover:bg-gray-100 hidden sm:block">
            Admin Login
          </a>
        </nav>
      </div>
    </header>
  );
}