import React, { useState } from "react";
import axios from "axios";
import { FileText, MapPin, Phone, Mic, MicOff, AlertCircle } from "lucide-react";

export default function ComplaintForm({ setSubmitMessage, setLoadingState, fetchComplaints, submitMessage }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [phone, setPhone] = useState("+91"); // <<<--- DEFAULT VALUE ADDED HERE
  const [photoBefore, setPhotoBefore] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [micStatus, setMicStatus] = useState(null); 
  const [locationMessage, setLocationMessage] = useState(null);

  // --- VOICE RECOGNITION SETUP ---
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = SpeechRecognition ? new SpeechRecognition() : null;

  if (recognition) {
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-IN';

    recognition.onstart = () => { 
      setIsListening(true);
      setMicStatus('listening');
      setSubmitMessage("Listening... Speak clearly now.");
    };

    recognition.onresult = (event) => { 
      const transcript = event.results[0][0].transcript;
      setDescription(prev => (prev ? prev + ' ' : '') + transcript); 
      setSubmitMessage("Voice input complete.");
    };

    recognition.onend = () => { 
      setIsListening(false);
      setMicStatus(null);
    };

    recognition.onerror = (event) => { 
      setIsListening(false);
      setMicStatus('error');
      setSubmitMessage(`Voice error: ${event.error}. Please try typing or refresh.`);
    };
  }
  
  const toggleListening = () => {
    if (!SpeechRecognition) {
      setSubmitMessage("Voice Recognition is not supported by your browser.");
      setMicStatus('error');
      return;
    }

    if (isListening) {
      recognition.stop();
    } else {
      setMicStatus(null); 
      setSubmitMessage("Starting microphone...");
      recognition.start();
    }
  };

  // --- GPS PINNING LOGIC ---
  const handleLocationPinning = () => {
    if (!navigator.geolocation) {
        setLocationMessage("Geolocation is not supported by your browser.");
        return;
    }
    
    setLocationMessage("Attempting to get precise location...");
    
    navigator.geolocation.getCurrentPosition(
        (position) => {
            const lat = position.coords.latitude.toFixed(6);
            const lon = position.coords.longitude.toFixed(6);
            const gpsString = `GPS: ${lat}, ${lon}`;
            
            setLocation(gpsString);
            setLocationMessage("Location pinned successfully! (Using GPS)");
        },
        (error) => {
            console.error("Geolocation Error:", error);
            setLocationMessage("Could not pin location. Please type the address manually.");
        },
        { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
    );
  };
  // --- END GPS PINNING LOGIC ---


  const handleFile = (e) => {
    setPhotoBefore(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Enforce E.164 format check (must start with +)
    if (!phone.startsWith('+')) { 
        setSubmitMessage('Phone number must start with a "+" sign (E.164 format, e.g., +91).'); 
        return; 
    }
    
    setLoading(true);
    setLoadingState(true);
    setSubmitMessage("Submitting complaint... AI routing in progress.");

    const form = new FormData();
    form.append('title', title);
    form.append('description', description);
    form.append('location', location);
    form.append('phone_number', phone);
    if (photoBefore) form.append('photo_before', photoBefore);

    try {
      await axios.post("http://127.0.0.1:8000/api/complaints/", form, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setSubmitMessage('Complaint submitted successfully! Tracking started.');
      setTitle(''); setDescription(''); setLocation(''); setPhone('+91'); setPhotoBefore(null); // Reset phone to +91
    } catch (err) {
      console.error("Submission Error:", err);
      setSubmitMessage(`Submission failed. Check backend connection. Status: ${err.response?.status}`);
    } finally {
        setLoading(false);
        setLoadingState(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-2xl">
      <h2 className="text-2xl font-bold mb-6 flex items-center text-blue-600"><FileText className="w-6 h-6 mr-2" /> Report a Civic Issue</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        
        <input value={title} onChange={e=>setTitle(e.target.value)} required placeholder="Issue Title (e.g., Pothole on Elm St)" className="w-full p-3 border rounded-lg"/>
        
        <div className="relative">
            <textarea value={description} onChange={e=>setDescription(e.target.value)} required placeholder="Detailed description..." rows="3" className="w-full p-3 border rounded-lg pr-12"/>
            
            <button 
                type="button"
                onClick={toggleListening}
                disabled={!recognition || loading}
                className={`absolute top-2 right-2 p-1 rounded-full transition ${
                    isListening ? 'bg-red-500 text-white shadow-lg pulse-mic' : 
                    micStatus === 'error' ? 'bg-red-200 text-red-700' :
                    'bg-gray-200 text-gray-700 hover:bg-blue-100'
                }`}
                title={isListening ? "Stop Recording" : "Start Voice Input"}
            >
                {isListening ? <MicOff className="w-5 h-5" /> : 
                 micStatus === 'error' ? <AlertCircle className="w-5 h-5" /> :
                 <Mic className="w-5 h-5" />}
            </button>

            <style jsx>{`
                @keyframes pulse {
                    0% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.7); }
                    70% { box-shadow: 0 0 0 10px rgba(239, 68, 68, 0); }
                    100% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0); }
                }
                .pulse-mic {
                    animation: pulse 1.5s infinite;
                }
            `}</style>
        </div>

        {/* LOCATION & PHONE INPUTS (Mobile Optimized) */}
        <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0"> 
            {/* Location Input with Pinning Button */}
            <div className="relative w-full sm:w-1/2">
                <MapPin className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input 
                    value={location} 
                    onChange={e=>setLocation(e.target.value)} 
                    required 
                    placeholder="Location Address or GPS Pinned" 
                    className="w-full p-3 border rounded-lg pl-10 pr-12"
                />
                <button 
                    type="button" 
                    onClick={handleLocationPinning}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 text-blue-600 hover:text-blue-800"
                    title="Pin Current GPS Location"
                >
                    <MapPin className="w-6 h-6" />
                </button>
            </div>
            
            {/* Phone Input (Starts with +91) */}
            <div className="relative w-full sm:w-1/2">
                <Phone className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input 
                    value={phone} 
                    onChange={e=>setPhone(e.target.value)} 
                    required 
                    placeholder="+91XXXXXXXXXX for SMS" 
                    className="w-full p-3 border rounded-lg pl-10"
                />
            </div>
        </div>
        
        {locationMessage && <p className={`mt-2 p-2 text-xs rounded ${locationMessage.includes('successfully') ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>{locationMessage}</p>}


        <label className="block text-sm font-medium text-gray-700">Proof Photo / Video (Before)</label>
        <input 
            type="file" 
            accept="image/*,video/*" 
            capture="environment" 
            onChange={handleFile} 
            className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        />
        
        <button type="submit" disabled={loading} className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition shadow-md disabled:bg-gray-400">
            {loading ? "Submitting..." : "Submit Complaint"}
        </button>
      </form>
      {submitMessage && <p className={`mt-4 p-3 rounded-lg text-sm ${submitMessage.includes('successfully') ? 'bg-green-100 text-green-700' : submitMessage.includes('Listening') ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>{submitMessage}</p>}
    </div>
  );
}
