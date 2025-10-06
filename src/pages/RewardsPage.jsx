import React, { useEffect, useState } from "react";
import axios from "axios";
import Rewards from '../components/Rewards';
import { Trophy } from "lucide-react";

const API_BASE_URL = "http://127.0.0.1:8000";

export default function RewardsPage() {
    const [complaints, setComplaints] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        fetchComplaints();
    },[]);

    const fetchComplaints = async () => {
        try {
            const res = await axios.get(`${API_BASE_URL}/api/complaints/`);
            setComplaints(res.data);
        } catch(err){
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    if(loading) return <div className="p-6 text-center text-lg text-gray-600">Loading rewards data...</div>;

    return (
        <div className="max-w-xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 flex items-center text-gray-800"><Trophy className="w-7 h-7 mr-2 text-yellow-500" /> Rewards Center</h2>
            <Rewards complaints={complaints} />
            
            <div className="mt-8 p-6 bg-white rounded-xl shadow-lg">
                <h3 className="text-xl font-bold mb-3 text-gray-700">Available Rewards (Mock)</h3>
                <ul className="space-y-3 text-gray-600">
                    <li className="p-3 bg-gray-50 rounded-lg flex justify-between items-center">
                        Free Public Transport Pass (200 pts)
                        <button className="bg-yellow-500 text-white text-sm px-3 py-1 rounded-full hover:bg-yellow-600">Redeem</button>
                    </li>
                    <li className="p-3 bg-gray-50 rounded-lg flex justify-between items-center">
                        Certificate of Appreciation (100 pts)
                        <button className="bg-yellow-500 text-white text-sm px-3 py-1 rounded-full hover:bg-yellow-600">Redeem</button>
                    </li>
                    <li className="p-3 bg-gray-50 rounded-lg flex justify-between items-center">
                        Community Event Invitation (50 pts)
                        <button className="bg-yellow-500 text-white text-sm px-3 py-1 rounded-full hover:bg-yellow-600">Redeem</button>
                    </li>
                </ul>
            </div>
        </div>
    );
}