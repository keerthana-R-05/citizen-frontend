import React from 'react';
import { Clock, CheckCircle, MapPin, Loader2 } from 'lucide-react';

const API_BASE_URL = "http://127.0.0.1:8000";

export default function ComplaintList({ complaints, loading }) {
    
    const getStatusClass = (status) => {
        if(status === 'Pending') return 'bg-yellow-100 text-yellow-800 border-yellow-500';
        if(status === 'In Progress') return 'bg-blue-100 text-blue-800 border-blue-500';
        if(status === 'Resolved') return 'bg-green-100 text-green-800 border-green-500';
        return 'bg-gray-100 text-gray-500 border-gray-500';
    };

    if(loading) {
        return <div className="p-6 text-center text-lg text-gray-600 flex items-center justify-center"><Loader2 className="w-5 h-5 mr-2 animate-spin"/> Loading complaints...</div>;
    }

    if(complaints.length === 0) {
        return <p className="text-gray-600">No issues found. File one to start tracking!</p>;
    }

    return (
        <div className="space-y-4">
            {complaints.map(c => (
                <div className="bg-white rounded-xl p-5 shadow-lg border-l-4 border-blue-600" key={c.id}>
                    <div className="flex justify-between items-start">
                        <div>
                            <h3 className="font-bold text-lg">{c.title}</h3>
                            <p className="text-xs text-gray-500 mt-1">
                                Category: <span className="font-medium text-blue-700">{c.category ? c.category.toUpperCase() : 'N/A'}</span>
                            </p>
                            <p className="text-xs text-gray-500 flex items-center"><MapPin className="w-3 h-3 mr-1"/> {c.location}</p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusClass(c.status)}`}>
                            {c.status}
                        </span>
                    </div>

                    <div className="mt-4 pt-3 border-t border-gray-100">
                        <h4 className="font-semibold text-gray-700 text-sm">Timeline:</h4>
                        <ul className="list-none pl-0 text-sm mt-2 space-y-2">
                            {c.timeline && c.timeline.map(t => (
                                <li key={t.id} className="flex items-center text-gray-600">
                                    {t.status === 'Resolved' ? <CheckCircle className="w-4 h-4 mr-2 text-green-500" /> : <Clock className="w-4 h-4 mr-2 text-yellow-500" />}
                                    <span className="font-medium mr-2">{t.status}:</span>
                                    {new Date(t.timestamp).toLocaleString()}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4"> {/* Mobile Fix: Images stack on small screens */}
                        {c.photo_before_url && (
                            <div className="relative">
                                <img src={c.photo_before_url} alt="Before" className="w-full h-40 object-cover rounded-lg shadow"/>
                                <span className="absolute top-1 left-1 bg-red-600 text-white text-xs px-2 py-1 rounded-full">BEFORE</span>
                            </div>
                        )}
                        {c.photo_after_url ? (
                            <div className="relative">
                                <img src={c.photo_after_url} alt="After" className="w-full h-40 object-cover rounded-lg shadow"/>
                                <span className="absolute top-1 left-1 bg-green-600 text-white text-xs px-2 py-1 rounded-full">RESOLVED PROOF</span>
                            </div>
                        ) : (
                            <div className="flex items-center justify-center h-40 bg-gray-100 rounded-lg text-gray-500 text-center text-sm p-4">
                                {c.status === 'Resolved' ? 'Admin proof pending or not required.' : 'Awaiting Resolution Proof...'}
                            </div>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}