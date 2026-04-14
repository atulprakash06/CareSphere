import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, AlertCircle } from 'lucide-react';

const Chatbot = () => {
   const [isOpen, setIsOpen] = useState(false);
   const [messages, setMessages] = useState([
      { sender: 'bot', text: 'Hello! I am the CareSphere Triage Assistant. How can I help you today? (Note: I am an AI, not a doctor. In a real emergency, call an ambulance immediately.)' }
   ]);
   const [input, setInput] = useState('');
   const messagesEndRef = useRef(null);

   const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
   };

   useEffect(() => {
      scrollToBottom();
   }, [messages, isOpen]);

   const handleSend = (e) => {
      e.preventDefault();
      if (!input.trim()) return;

      const userText = input.trim();
      setMessages(prev => [...prev, { sender: 'user', text: userText }]);
      setInput('');

      // Mock heuristic AI Response
      setTimeout(() => {
         let botResponse = "I'm sorry, I didn't quite catch that. Could you describe your symptoms?";
         
         const lowerText = userText.toLowerCase();
         if (lowerText.includes('chest') || lowerText.includes('heart') || lowerText.includes('pain')) {
            botResponse = "Chest pain is a critical symptom. Please find the nearest hospital with an **ICU** available on our map immediately or call emergency services.";
         } else if (lowerText.includes('breath') || lowerText.includes('oxygen') || lowerText.includes('asthma')) {
            botResponse = "If you are having trouble breathing, please look for a hospital on our map that has **Oxygen** and **Ventilators** available.";
         } else if (lowerText.includes('cut') || lowerText.includes('blood') || lowerText.includes('bleed')) {
            botResponse = "For heavy bleeding, applying pressure is critical. Please head to the nearest **Emergency 24/7** ward. You can filter for this on the map!";
         } else if (lowerText.includes('hi') || lowerText.includes('hello')) {
            botResponse = "Hello! Please describe any symptoms you are experiencing so I can suggest what type of facility you might need.";
         } else {
            botResponse = "Based on that, it's best to consult a medical professional. If it feels urgent, please visit the closest emergency ward.";
         }

         setMessages(prev => [...prev, { sender: 'bot', text: botResponse }]);
      }, 800);
   };

   return (
      <div style={{ position: 'fixed', bottom: '2rem', right: '2rem', zIndex: 9999 }}>
         
         {/* Expended Chat Window */}
         {isOpen && (
            <div style={{
               position: 'absolute', bottom: '80px', right: '0', 
               width: '350px', height: '500px', backgroundColor: '#FFFFFF',
               borderRadius: '16px', boxShadow: '0 10px 25px rgba(0,0,0,0.15)',
               display: 'flex', flexDirection: 'column', overflow: 'hidden',
               border: '1px solid #E2E8F0'
            }}>
               {/* Header */}
               <div style={{ padding: '1rem', backgroundColor: '#0F172A', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                     <div style={{ width: '10px', height: '10px', backgroundColor: '#10B981', borderRadius: '50%' }}></div>
                     <span style={{ fontWeight: 600 }}>Triage Assistant</span>
                  </div>
                  <button onClick={() => setIsOpen(false)} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', padding: '0' }}>
                     <X size={20} />
                  </button>
               </div>

               {/* Disclaimer Banner */}
               <div style={{ backgroundColor: '#FEF2F2', padding: '0.5rem 1rem', fontSize: '0.75rem', color: '#DC2626', display: 'flex', alignItems: 'flex-start', gap: '0.5rem', borderBottom: '1px solid #FECACA' }}>
                  <AlertCircle size={14} style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span style={{ lineHeight: '1.4' }}>This AI is for informational purposes only. Do not use for definitive medical diagnosis.</span>
               </div>

               {/* Messages Area */}
               <div style={{ flex: 1, padding: '1rem', overflowY: 'auto', backgroundColor: '#F8FAFC', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {messages.map((msg, idx) => (
                     <div key={idx} style={{
                        maxWidth: '85%',
                        alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                        backgroundColor: msg.sender === 'user' ? '#0284C7' : '#FFFFFF',
                        color: msg.sender === 'user' ? 'white' : '#334155',
                        padding: '0.75rem 1rem',
                        borderRadius: '12px',
                        boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
                        fontSize: '0.9rem',
                        lineHeight: '1.5',
                        border: msg.sender === 'user' ? 'none' : '1px solid #E2E8F0',
                        borderBottomRightRadius: msg.sender === 'user' ? '4px' : '12px',
                        borderBottomLeftRadius: msg.sender === 'bot' ? '4px' : '12px'
                     }}>
                        {msg.text}
                     </div>
                  ))}
                  <div ref={messagesEndRef} />
               </div>

               {/* Input Form */}
               <form onSubmit={handleSend} style={{ display: 'flex', padding: '1rem', backgroundColor: '#FFFFFF', borderTop: '1px solid #E2E8F0' }}>
                  <input 
                     type="text" 
                     value={input}
                     onChange={(e) => setInput(e.target.value)}
                     placeholder="Type symptoms here..." 
                     style={{ flex: 1, border: '1px solid #CBD5E1', borderRadius: '24px', padding: '0.5rem 1rem', outline: 'none', fontSize: '0.9rem' }}
                  />
                  <button type="submit" style={{ backgroundColor: '#0284C7', color: 'white', border: 'none', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginLeft: '0.5rem', cursor: 'pointer' }}>
                     <Send size={18} />
                  </button>
               </form>
            </div>
         )}

         {/* Floating Toggle Button */}
         <button 
            onClick={() => setIsOpen(!isOpen)}
            style={{
               width: '60px', height: '60px', borderRadius: '30px',
               backgroundColor: isOpen ? '#DC2626' : '#0284C7', color: 'white',
               border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
               display: 'flex', alignItems: 'center', justifyContent: 'center',
               cursor: 'pointer', transition: 'all 0.2s'
            }}
         >
            {isOpen ? <X size={28} /> : <MessageSquare size={28} />}
         </button>
      </div>
   );
};

export default Chatbot;
