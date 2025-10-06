import React from 'react';
import { HelpCircle, Zap, Phone, Mail } from 'lucide-react';

export default function Help() {
    return (
        <div className="bg-white p-6 rounded-xl shadow-2xl">
            <h2 className="text-3xl font-bold mb-6 flex items-center text-gray-800"><HelpCircle className="w-7 h-7 mr-2 text-blue-600" /> Help Center</h2>
            
            <section className="mb-8">
                <h3 className="text-xl font-semibold mb-3 text-gray-700 border-b pb-1">How CitizenConnect Works</h3>
                <ol className="list-decimal pl-5 space-y-2 text-gray-600">
                    <li>**File:** Report an issue with location and a photo (optional).</li>
                    <li>**Route (AI):** The system automatically categorizes and routes the complaint to the correct department (Roads, Sanitation, etc.).</li>
                    <li>**Track:** Check the status in real-time on the Tracking Dashboard.</li>
                    <li>**Resolve:** Once the issue is fixed, the admin uploads a *Proof Photo* and you receive an SMS notification.</li>
                </ol>
            </section>

            <section>
                <h3 className="text-xl font-semibold mb-3 text-gray-700 border-b pb-1">Contact Support</h3>
                <div className="space-y-4 text-gray-700">
                    <div className="flex items-center space-x-3">
                        <Phone className="w-5 h-5 text-green-500" />
                        <span>**Hotline:** 1800-CIVIC-CONNECT (Mon-Fri, 9am - 5pm)</span>
                    </div>
                    <div className="flex items-center space-x-3">
                        <Mail className="w-5 h-5 text-red-500" />
                        <span>**Email:** support@citizenconnect.gov.in</span>
                    </div>
                    <p className="text-sm pt-2 text-gray-500">For emergency services, please dial 100 directly.</p>
                </div>
            </section>
        </div>
    );
}