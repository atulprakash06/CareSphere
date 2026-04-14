import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

const FAQ = () => {
  const [openFaq, setOpenFaq] = useState(null);
  const toggleFaq = (index) => setOpenFaq(openFaq === index ? null : index);

  return (
    <div className="container" style={{ minHeight: 'calc(100vh - 73px)', display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: '6rem 1rem', background: '#1E293B', flex: 1 }}>
         
         <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
           <HelpCircle size={48} color="#94A3B8" />
         </div>
         <h1 style={{ fontSize: '3rem', color: '#FFFFFF', marginBottom: '3rem', letterSpacing: '-0.5px', textAlign: 'center', fontWeight: 800 }}>Frequently Asked Questions</h1>
         
         <div style={{ maxWidth: '800px', margin: '0 auto', background: '#293548', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.3)', border: '1px solid #334155' }}>
            
            <div style={{ borderBottom: '1px solid #334155' }}>
               <button onClick={() => toggleFaq(1)} style={{ width: '100%', padding: '1.5rem 2rem', background: 'transparent', border: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', textAlign: 'left' }}>
                  <span style={{ color: '#F1F5F9', fontWeight: 600, fontSize: '1.1rem' }}>How accurate is the bed availability?</span>
                  <ChevronDown size={20} color="#94A3B8" style={{ transform: openFaq === 1 ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
               </button>
               {openFaq === 1 && (
                 <div style={{ padding: '0 2rem 1.5rem', color: '#CBD5E1', fontSize: '1rem', lineHeight: '1.6' }}>
                   Data is updated in real-time by hospital admins. We show a "Last Updated" timestamp for each facility so you always know exactly how fresh the data is.
                 </div>
               )}
            </div>

            <div style={{ borderBottom: '1px solid #334155' }}>
               <button onClick={() => toggleFaq(2)} style={{ width: '100%', padding: '1.5rem 2rem', background: 'transparent', border: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', textAlign: 'left' }}>
                  <span style={{ color: '#F1F5F9', fontWeight: 600, fontSize: '1.1rem' }}>Do I need an account to find a hospital?</span>
                  <ChevronDown size={20} color="#94A3B8" style={{ transform: openFaq === 2 ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
               </button>
               {openFaq === 2 && (
                 <div style={{ padding: '0 2rem 1.5rem', color: '#CBD5E1', fontSize: '1rem', lineHeight: '1.6' }}>
                   No, anyone can search for emergency services immediately without ever logging in. Speed is our priority.
                 </div>
               )}
            </div>

            <div style={{ borderBottom: '1px solid #334155' }}>
               <button onClick={() => toggleFaq(3)} style={{ width: '100%', padding: '1.5rem 2rem', background: 'transparent', border: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', textAlign: 'left' }}>
                  <span style={{ color: '#F1F5F9', fontWeight: 600, fontSize: '1.1rem' }}>Can I book an ambulance through the site?</span>
                  <ChevronDown size={20} color="#94A3B8" style={{ transform: openFaq === 3 ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
               </button>
               {openFaq === 3 && (
                 <div style={{ padding: '0 2rem 1.5rem', color: '#CBD5E1', fontSize: '1rem', lineHeight: '1.6' }}>
                   Yes, we provide direct contact buttons for hospital-affiliated ambulance services so you can alert them immediately.
                 </div>
               )}
            </div>

            <div>
               <button onClick={() => toggleFaq(4)} style={{ width: '100%', padding: '1.5rem 2rem', background: 'transparent', border: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', textAlign: 'left' }}>
                  <span style={{ color: '#F1F5F9', fontWeight: 600, fontSize: '1.1rem' }}>Is this service free to use?</span>
                  <ChevronDown size={20} color="#94A3B8" style={{ transform: openFaq === 4 ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
               </button>
               {openFaq === 4 && (
                 <div style={{ padding: '0 2rem 1.5rem', color: '#CBD5E1', fontSize: '1rem', lineHeight: '1.6' }}>
                   Yes, CareSphere is a 100% free platform dedicated to helping people in medical emergencies. We do not charge patients.
                 </div>
               )}
            </div>

         </div>
      </div>
    </div>
  );
};

export default FAQ;
