import React, { useEffect, useState } from "react";
import axios from "axios";
import Rewards from '../components/Rewards';
import ComplaintList from '../components/ComplaintList';
import { TrendingUp } from 'lucide-react';

const API_BASE_URL = "http://127.0.0.1:8000";

export default function TrackComplaints(){
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    fetchComplaints();
    const interval = setInterval(fetchComplaints, 5000); // Poll for real-time status update
    return () => clearInterval(interval);
  },[]);

  const fetchComplaints = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/complaints/`);
      setComplaints(res.data.sort((a,b) => new Date(b.created_at) - new Date(a.created_at)));
    } catch(err){
      console.error(err);
    } finally {
        setLoading(false);
    }
  };
  
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 flex items-center text-gray-800"><TrendingUp className="w-6 h-6 mr-2 text-blue-600" /> Tracking Dashboard</h2>
      
      <Rewards complaints={complaints} />

      <h3 className="text-xl font-bold mt-8 mb-4 border-b pb-2">All Reported Issues ({complaints.length})</h3>

      <ComplaintList complaints={complaints} loading={loading} />
    </div>
  );
}