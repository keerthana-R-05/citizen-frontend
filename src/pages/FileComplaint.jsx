import React, { useState, useCallback } from "react";
import ComplaintForm from "../components/ComplaintForm";

export default function FileComplaint() {
  const [submitMessage, setSubmitMessage] = useState("");
  const [loadingState, setLoadingState] = useState(false);
  
  const fetchComplaints = useCallback(() => {
    console.log("FileComplaint: Submission relies on tracking page polling to refresh.");
  }, []);

  return (
    <div>
        <ComplaintForm 
            setSubmitMessage={setSubmitMessage} 
            setLoadingState={setLoadingState}
            fetchComplaints={fetchComplaints}
            submitMessage={submitMessage}
        />
        {/* The status message is displayed here, in the parent component */}
        {submitMessage && (
            <p className={`mt-4 p-3 rounded-lg text-sm ${submitMessage.includes('successfully') ? 'bg-green-100 text-green-700' : submitMessage.includes('Listening') ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>
                {submitMessage}
            </p>
        )}
    </div>
  );
}