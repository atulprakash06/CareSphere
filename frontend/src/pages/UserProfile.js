import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { QRCodeCanvas } from 'qrcode.react';

const UserProfile = () => {
   const [formData, setFormData] = useState({
      name: '',
      age: '',
      gender: '',
      bloodGroup: '',
      allergies: '',
      chronicConditions: ''
   });
   const [loading, setLoading] = useState(true);
   const [saving, setSaving] = useState(false);
   const navigate = useNavigate();
   const qrRef = useRef();

   useEffect(() => {
      const patientId = localStorage.getItem('patientId');
      if (!patientId) {
         navigate('/user-auth');
         return;
      }

      const fetchProfile = async () => {
         try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL || "http://localhost:5000"}/user/${patientId}`);
            setFormData({
               name: res.data.name || '',
               age: res.data.age || '',
               gender: res.data.gender || '',
               bloodGroup: res.data.bloodGroup || '',
               allergies: res.data.allergies || '',
               chronicConditions: res.data.chronicConditions || ''
            });
            setLoading(false);
         } catch (err) {
            console.error('Failed to load profile');
            navigate('/user-auth');
         }
      };
      fetchProfile();
   }, [navigate]);

   const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
   };

   const handleSave = async () => {
      setSaving(true);
      try {
         const patientId = localStorage.getItem('patientId');
         await axios.put(`${process.env.REACT_APP_API_URL || "http://localhost:5000"}/user/${patientId}`, formData);
         alert('Medical profile updated successfully');
      } catch (err) {
         alert('Failed to save profile');
      }
      setSaving(false);
   };

   const downloadQR = () => {
      const canvas = qrRef.current.querySelector('canvas');
      if (canvas) {
         const pngUrl = canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream');
         let downloadLink = document.createElement('a');
         downloadLink.href = pngUrl;
         downloadLink.download = `${formData.name ? formData.name.replace(/ /g, '_') : 'Patient'}_CareSphere_MedicalID.png`;
         document.body.appendChild(downloadLink);
         downloadLink.click();
         document.body.removeChild(downloadLink);
      }
   };

   if (loading) return <div style={{ textAlign: 'center', marginTop: '5rem' }}>Loading Medical Profile...</div>;

   // Encode details into JSON for QR payload
   const qrPayload = JSON.stringify({
      Name: formData.name,
      Age: formData.age,
      Blood: formData.bloodGroup,
      Allergies: formData.allergies,
      Chronic: formData.chronicConditions
   });

   return (
      <div className="container" style={{ minHeight: 'calc(100vh - 73px)', display: 'flex', flexDirection: 'column', background: '#F8FAFC' }}>
         <div style={{ maxWidth: '1000px', margin: '3rem auto', width: '100%', padding: '0 1rem' }}>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
               <h1 style={{ fontSize: '2rem', color: '#0F172A', fontWeight: 800 }}>Your Digital Medical ID</h1>
               <button 
                  onClick={() => navigate('/user')} 
                  style={{ padding: '0.75rem 1.5rem', background: '#DC2626', color: 'white', borderRadius: '8px', fontWeight: 600, border: 'none', cursor: 'pointer' }}
               >
                  Find Emergency Facilities →
               </button>
            </div>

            <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
               
               {/* Form Section */}
               <div style={{ flex: '2', minWidth: '300px', background: 'white', padding: '2rem', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
                  <h2 style={{ fontSize: '1.25rem', color: '#0F172A', marginBottom: '1.5rem' }}>Medical Details</h2>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                     <div>
                        <label style={{ display: 'block', fontSize: '0.85rem', color: '#64748B', fontWeight: 600, marginBottom: '0.25rem' }}>Full Name</label>
                        <input type="text" name="name" value={formData.name} onChange={handleChange} style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #CBD5E1', outline: 'none' }} placeholder="John Doe" />
                     </div>
                     <div>
                        <label style={{ display: 'block', fontSize: '0.85rem', color: '#64748B', fontWeight: 600, marginBottom: '0.25rem' }}>Age</label>
                        <input type="text" name="age" value={formData.age} onChange={handleChange} style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #CBD5E1', outline: 'none' }} placeholder="35" />
                     </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                     <div>
                        <label style={{ display: 'block', fontSize: '0.85rem', color: '#64748B', fontWeight: 600, marginBottom: '0.25rem' }}>Gender</label>
                        <input type="text" name="gender" value={formData.gender} onChange={handleChange} style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #CBD5E1', outline: 'none' }} placeholder="Male/Female/Other" />
                     </div>
                     <div>
                        <label style={{ display: 'block', fontSize: '0.85rem', color: '#64748B', fontWeight: 600, marginBottom: '0.25rem' }}>Blood Group</label>
                        <input type="text" name="bloodGroup" value={formData.bloodGroup} onChange={handleChange} style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #CBD5E1', outline: 'none' }} placeholder="O+ / B-" />
                     </div>
                  </div>

                  <div style={{ marginBottom: '1rem' }}>
                     <label style={{ display: 'block', fontSize: '0.85rem', color: '#64748B', fontWeight: 600, marginBottom: '0.25rem' }}>Allergies (if any)</label>
                     <input type="text" name="allergies" value={formData.allergies} onChange={handleChange} style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #CBD5E1', outline: 'none' }} placeholder="Penicillin, Peanuts" />
                  </div>

                  <div style={{ marginBottom: '2rem' }}>
                     <label style={{ display: 'block', fontSize: '0.85rem', color: '#64748B', fontWeight: 600, marginBottom: '0.25rem' }}>Chronic Conditions (if any)</label>
                     <input type="text" name="chronicConditions" value={formData.chronicConditions} onChange={handleChange} style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #CBD5E1', outline: 'none' }} placeholder="Asthma, Type 2 Diabetes" />
                  </div>

                  <button 
                     onClick={handleSave} 
                     disabled={saving}
                     style={{ width: '100%', background: '#0F172A', color: 'white', padding: '0.85rem', borderRadius: '8px', fontWeight: 700, border: 'none', cursor: 'pointer', opacity: saving ? 0.7 : 1 }}
                  >
                     {saving ? 'Updating...' : 'Save & Generate QR Data'}
                  </button>
               </div>

               {/* QR Code Section */}
               <div style={{ flex: '1', minWidth: '300px', background: 'white', padding: '2rem', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <h2 style={{ fontSize: '1.25rem', color: '#0F172A', marginBottom: '0.5rem' }}>Your QR Identity</h2>
                  <p style={{ color: '#64748B', fontSize: '0.9rem', textAlign: 'center', marginBottom: '2rem' }}>Responders can scan this to view your medical context instantly.</p>
                  
                  <div ref={qrRef} style={{ background: 'white', padding: '1rem', borderRadius: '8px', border: '1px solid #E2E8F0', marginBottom: '1.5rem' }}>
                     <QRCodeCanvas 
                        value={qrPayload}
                        size={200}
                        level="Q"
                        includeMargin={false}
                     />
                  </div>

                  <button 
                     onClick={downloadQR} 
                     style={{ padding: '0.75rem 1.5rem', background: '#E2E8F0', color: '#0F172A', borderRadius: '8px', fontWeight: 600, border: 'none', cursor: 'pointer', width: '100%' }}
                  >
                     Download to Device
                  </button>
               </div>

            </div>
         </div>
      </div>
   );
};

export default UserProfile;
