import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ArrowLeft, RefreshCw, LogOut, CheckCircle2, Phone, Droplet } from 'lucide-react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';

const HospitalManage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  
  const [hospitalInfo, setHospitalInfo] = useState({ name: 'Loading...', location: '' });
  const [formData, setFormData] = useState({
    contactNumber: '',
    emergency: false,
    oxygen: false,
    icuBeds: 0,
    ventilator: false,
    ambulance: false,
    A_pos: false, A_neg: false,
    B_pos: false, B_neg: false,
    O_pos: false, O_neg: false,
    AB_pos: false, AB_neg: false
  });

  useEffect(() => {
    if (location.state && location.state.hospital) {
      const h = location.state.hospital;
      setHospitalInfo({ name: h.name, location: h.location });
      setFormData({
        contactNumber: h.contactNumber || '',
        emergency: h.emergency || false,
        oxygen: h.facilities?.oxygen || false,
        icuBeds: h.facilities?.icuBeds || 0,
        ventilator: h.facilities?.ventilator || false,
        ambulance: h.facilities?.ambulance || false,
        A_pos: h.bloodBank?.A_pos || false,
        A_neg: h.bloodBank?.A_neg || false,
        B_pos: h.bloodBank?.B_pos || false,
        B_neg: h.bloodBank?.B_neg || false,
        O_pos: h.bloodBank?.O_pos || false,
        O_neg: h.bloodBank?.O_neg || false,
        AB_pos: h.bloodBank?.AB_pos || false,
        AB_neg: h.bloodBank?.AB_neg || false
      });
    } else {
      navigate('/admin');
    }
  }, [location, navigate]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const payload = {
        contactNumber: formData.contactNumber,
        emergency: formData.emergency,
        facilities: {
          oxygen: formData.oxygen,
          icuBeds: parseInt(formData.icuBeds) || 0,
          ventilator: formData.ventilator,
          ambulance: formData.ambulance
        },
        bloodBank: {
          A_pos: formData.A_pos, A_neg: formData.A_neg,
          B_pos: formData.B_pos, B_neg: formData.B_neg,
          O_pos: formData.O_pos, O_neg: formData.O_neg,
          AB_pos: formData.AB_pos, AB_neg: formData.AB_neg
        }
      };

      await axios.put(`${process.env.REACT_APP_API_URL || "http://localhost:5000"}/hospital/${id}`, payload);
      setMessage('Facilities & Inventory updated successfully!');
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      setMessage('Failed to update. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    navigate('/admin');
  };

  return (
    <div className="container" style={{ padding: '2rem 1.5rem', minHeight: 'calc(100vh - 73px)' }}>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '2rem' }}>
        <button className="btn btn-outline" onClick={handleLogout} style={{ borderColor: '#DC2626', color: '#DC2626' }}>
          <LogOut size={18} /> Logout
        </button>
      </div>

      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '2rem', margin: '0 0 0.5rem 0', color: 'var(--primary)' }}>{hospitalInfo.name}</h2>
          <p style={{ margin: 0 }}>Update your live emergency capabilities for the public.</p>
        </div>

        {message && (
          <div style={{
             display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '1rem', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem',
             background: message.includes('success') ? 'var(--primary-light)' : '#FEF2F2',
             color: message.includes('success') ? 'var(--primary-hover)' : '#DC2626',
             border: `1px solid ${message.includes('success') ? 'var(--primary-light)' : '#FECACA'}`
          }}>
            {message.includes('success') && <CheckCircle2 size={20} />} {message}
          </div>
        )}

        <div className="card">
          <form onSubmit={handleSubmit}>
             
            <h3 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', paddingBottom: '0.5rem', borderBottom: '1px solid var(--border)' }}>
              Contact Details
            </h3>
            <div style={{ marginBottom: '2rem' }}>
               <label htmlFor="contactNumber" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600, fontSize: '1rem', marginBottom: '0.5rem' }}>
                  <Phone size={18} /> Dispatch / Front Desk Phone Number
               </label>
               <input 
                  type="text" 
                  name="contactNumber" 
                  id="contactNumber"
                  value={formData.contactNumber} 
                  onChange={handleChange} 
                  required
                  placeholder="+1 (555) 123-4567"
                  className="form-input"
               />
               <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Patients will use this number to call for ambulance dispatch.</span>
            </div>

            <h3 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', paddingBottom: '0.5rem', borderBottom: '1px solid var(--border)' }}>
              Live Capacity Settings
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '2.5rem' }}>
              {[ 
                { name: 'emergency', label: '24/7 Emergency Ward', desc: 'Is your emergency room active?' },
                { name: 'oxygen', label: 'Oxygen Available', desc: 'Do you have adequate oxygen supply right now?' },
                { name: 'ventilator', label: 'Ventilators', desc: 'Are there any free ventilators available?' },
                { name: 'ambulance', label: 'Ambulance on Standby', desc: 'Is an ambulance free and ready for dispatch?' },
              ].map(f => (
                 <div key={f.name} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem', background: 'var(--bg-body)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
                    <div>
                       <label htmlFor={f.name} style={{ display: 'block', fontWeight: 600, fontSize: '1rem', marginBottom: '0.25rem' }}>{f.label}</label>
                       <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>{f.desc}</span>
                    </div>
                    <input type="checkbox" name={f.name} id={f.name} checked={formData[f.name]} onChange={handleChange} style={{ width: '24px', height: '24px', accentColor: 'var(--primary)', cursor: 'pointer' }} />
                 </div>
              ))}

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem', background: 'var(--bg-body)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
                 <div>
                    <label htmlFor="icuBeds" style={{ display: 'block', fontWeight: 600, fontSize: '1rem', marginBottom: '0.25rem' }}>Available ICU Beds</label>
                    <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Update the current number of vacant intensive care beds.</span>
                 </div>
                 <input type="number" name="icuBeds" id="icuBeds" className="form-input" value={formData.icuBeds} onChange={handleChange} min="0" style={{ width: '100px', fontSize: '1.25rem', textAlign: 'center' }} />
              </div>
            </div>

            <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.25rem', marginBottom: '1.5rem', paddingBottom: '0.5rem', borderBottom: '1px solid var(--border)' }}>
              <Droplet color="#DC2626" /> Blood Bank Inventory
            </h3>
            <p style={{ color: 'var(--text-muted)', marginBottom: '1rem', fontSize: '0.9rem' }}>Check off the blood types currently available in your storage.</p>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '1rem', marginBottom: '2.5rem' }}>
              {[
                { name: 'A_pos', label: 'A+' }, { name: 'A_neg', label: 'A-' },
                { name: 'B_pos', label: 'B+' }, { name: 'B_neg', label: 'B-' },
                { name: 'O_pos', label: 'O+' }, { name: 'O_neg', label: 'O-' },
                { name: 'AB_pos', label: 'AB+' }, { name: 'AB_neg', label: 'AB-' }
              ].map(blood => (
                 <div key={blood.name} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', background: formData[blood.name] ? 'var(--primary-light)' : 'transparent' }}>
                    <input type="checkbox" id={blood.name} name={blood.name} checked={formData[blood.name]} onChange={handleChange} style={{ width: '18px', height: '18px', accentColor: 'var(--primary)' }} />
                    <label htmlFor={blood.name} style={{ fontWeight: 600, cursor: 'pointer', margin: 0 }}>{blood.label}</label>
                 </div>
              ))}
            </div>

            <button type="submit" className="btn btn-primary" disabled={loading} style={{ width: '100%', padding: '1rem', fontSize: '1.125rem', boxShadow: 'var(--shadow-md)' }}>
              <RefreshCw size={20} className={loading ? "spin" : ""} /> {loading ? 'Publishing Updates...' : 'Publish Live Updates'}
            </button>
          </form>
        </div>
      </div>
      <style>{`
         @keyframes spin { 100% { transform: rotate(360deg); } }
         .spin { animation: spin 1s linear infinite; }
      `}</style>
    </div>
  );
};
export default HospitalManage;
