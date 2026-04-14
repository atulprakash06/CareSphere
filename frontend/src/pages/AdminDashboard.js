import React, { useState } from 'react';
import axios from 'axios';
import { ArrowLeft, Save, Building2, Info } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    contactNumber: '',
    password: '',
    name: '',
    location: '',
    lat: '',
    lng: '',
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

  const validatePassword = (pwd, userParam) => {
    if (pwd.length < 8) return "Password must be at least 8 characters.";
    if (!/[a-zA-Z]/.test(pwd)) return "Password must contain at least 1 letter.";
    if (!/\d/.test(pwd)) return "Password must contain at least 1 number.";
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(pwd)) return "Password must contain at least 1 special character.";
    
    const lower = pwd.toLowerCase();
    if (userParam && lower.includes(userParam.toLowerCase())) return "Password must not contain your username.";
    if (lower.includes("caresphere")) return "Password must not contain the site name.";
    
    return null;
  };

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

    const validationError = validatePassword(formData.password, formData.username);
    if (validationError) {
      setMessage(validationError);
      setLoading(false);
      return;
    }

    try {
      const payload = {
        username: formData.username,
        email: formData.email,
        contactNumber: formData.contactNumber,
        password: formData.password,
        name: formData.name,
        location: formData.location,
        coordinates: {
          lat: parseFloat(formData.lat),
          lng: parseFloat(formData.lng)
        },
        emergency: formData.emergency,
        facilities: {
          oxygen: formData.oxygen,
          icuBeds: parseInt(formData.icuBeds),
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

      await axios.post('http://localhost:5000/hospital', payload);
      setMessage('Success! Hospital registered. Please check email to verify and approve it.');
      
      // Reset form
      setFormData({
        username: '',
        email: '',
        contactNumber: '',
        password: '',
        name: '',
        location: '',
        lat: '',
        lng: '',
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
    } catch (err) {
      setMessage('Failed to add hospital. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container" style={{ padding: '2rem 1.5rem' }}>

      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem' }}>
          <Building2 size={32} color="var(--primary)" />
          <h2 style={{ fontSize: '2rem', margin: 0 }}>Add New Hospital</h2>
        </div>

        {message && (
          <div style={{
            padding: '1rem', 
            borderRadius: 'var(--radius-md)', 
            marginBottom: '1.5rem',
            background: message.includes('success') ? 'var(--primary-light)' : '#FEF2F2',
            color: message.includes('success') ? 'var(--primary-hover)' : '#DC2626',
            border: `1px solid ${message.includes('success') ? 'var(--primary-light)' : '#FECACA'}`
          }}>
            {message}
          </div>
        )}

        <div className="card">
          <form onSubmit={handleSubmit}>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', paddingBottom: '0.5rem', borderBottom: '1px solid var(--border)' }}>
              Hospital Details
            </h3>
            <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
              <div className="form-group" style={{ flex: '1', minWidth: '300px' }}>
                <label className="form-label">Hospital Name</label>
                <input 
                  type="text" 
                  name="name" 
                  className="form-input" 
                  value={formData.name} 
                  onChange={handleChange} 
                  required 
                  placeholder="e.g. City General Hospital"
                />
              </div>
              <div className="form-group" style={{ flex: '1', minWidth: '300px' }}>
                <label className="form-label">Location / Address</label>
                <input 
                  type="text" 
                  name="location" 
                  className="form-input" 
                  value={formData.location} 
                  onChange={handleChange} 
                  required 
                  placeholder="e.g. 123 Main St"
                />
              </div>
            </div>

            <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', paddingBottom: '0.5rem', borderBottom: '1px solid var(--border)' }}>
              Account Credentials (For Updating Facilities Later)
            </h3>
            <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
              <div className="form-group" style={{ flex: '1', minWidth: '300px' }}>
                <label className="form-label">Username</label>
                <input 
                  type="text" 
                  name="username" 
                  className="form-input" 
                  value={formData.username} 
                  onChange={handleChange} 
                  required 
                  placeholder="e.g. cityhospital123"
                />
              </div>
              <div className="form-group" style={{ flex: '1', minWidth: '300px' }}>
                <label className="form-label" style={{ display: 'flex', alignItems: 'center' }}>
                  Password
                  <div className="tooltip-container">
                    <Info size={16} color="#0284C7" />
                    <div className="tooltip-text">
                      <strong>Password Criteria</strong>
                      <ul>
                        <li>✔ At least 8 characters</li>
                        <li>✔ At least 1 letter (a, b, c...)</li>
                        <li>✔ At least 1 number (1, 2, 3...)</li>
                        <li>✔ At least 1 special character ($, @, %...)</li>
                        <li>✖ Must not contain your username or the site name</li>
                      </ul>
                    </div>
                  </div>
                </label>
                <input 
                  type="password" 
                  name="password" 
                  className="form-input" 
                  value={formData.password} 
                  onChange={handleChange} 
                  required 
                  placeholder="Secure password"
                />
              </div>
            </div>
            
            <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', paddingBottom: '0.5rem', borderBottom: '1px solid var(--border)' }}>
              Contact Details
            </h3>
            <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
              <div className="form-group" style={{ flex: '1', minWidth: '300px' }}>
                <label className="form-label">Recovery Email</label>
                <input 
                  type="email" 
                  name="email" 
                  className="form-input" 
                  value={formData.email} 
                  onChange={handleChange} 
                  required 
                  placeholder="admin@hospital.com"
                />
              </div>
              <div className="form-group" style={{ flex: '1', minWidth: '300px' }}>
                <label className="form-label">Emergency Phone Number</label>
                <input 
                  type="text" 
                  name="contactNumber" 
                  className="form-input" 
                  value={formData.contactNumber} 
                  onChange={handleChange} 
                  required 
                  placeholder="+1 (555) 123-4567"
                />
              </div>
            </div>

            <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', paddingBottom: '0.5rem', borderBottom: '1px solid var(--border)' }}>
              Location
            </h3>
            <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
              <div className="form-group" style={{ flex: '1' }}>
                <label className="form-label">Latitude</label>
                <input 
                  type="number" 
                  step="any" 
                  name="lat" 
                  className="form-input" 
                  value={formData.lat} 
                  onChange={handleChange} 
                  required 
                  placeholder="-1.283"
                />
              </div>
              <div className="form-group" style={{ flex: '1' }}>
                <label className="form-label">Longitude</label>
                <input 
                  type="number" 
                  step="any" 
                  name="lng" 
                  className="form-input" 
                  value={formData.lng} 
                  onChange={handleChange} 
                  required 
                  placeholder="36.816"
                />
              </div>
            </div>

            <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', paddingBottom: '0.5rem', borderBottom: '1px solid var(--border)' }}>
              Facilities & Capacity
            </h3>

            <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', marginBottom: '2rem', alignItems: 'center' }}>
              <div className="form-group" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', margin: 0 }}>
                <input 
                  type="checkbox" 
                  name="emergency" 
                  id="emergency"
                  checked={formData.emergency} 
                  onChange={handleChange} 
                  style={{ width: '18px', height: '18px', accentColor: 'var(--primary)' }}
                />
                <label htmlFor="emergency" style={{ margin: 0, fontWeight: 500, cursor: 'pointer' }}>24/7 Emergency</label>
              </div>

              <div className="form-group" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', margin: 0 }}>
                <input 
                  type="checkbox" 
                  name="oxygen" 
                  id="oxygen"
                  checked={formData.oxygen} 
                  onChange={handleChange} 
                  style={{ width: '18px', height: '18px', accentColor: 'var(--primary)' }}
                />
                <label htmlFor="oxygen" style={{ margin: 0, fontWeight: 500, cursor: 'pointer' }}>Oxygen Available</label>
              </div>

              <div className="form-group" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', margin: 0 }}>
                <input 
                  type="checkbox" 
                  name="ventilator" 
                  id="ventilator"
                  checked={formData.ventilator} 
                  onChange={handleChange} 
                  style={{ width: '18px', height: '18px', accentColor: 'var(--primary)' }}
                />
                <label htmlFor="ventilator" style={{ margin: 0, fontWeight: 500, cursor: 'pointer' }}>Ventilators</label>
              </div>

              <div className="form-group" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', margin: 0 }}>
                <input 
                  type="checkbox" 
                  name="ambulance" 
                  id="ambulance"
                  checked={formData.ambulance} 
                  onChange={handleChange} 
                  style={{ width: '18px', height: '18px', accentColor: 'var(--primary)' }}
                />
                <label htmlFor="ambulance" style={{ margin: 0, fontWeight: 500, cursor: 'pointer' }}>Ambulance on Standby</label>
              </div>

              <div className="form-group" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', margin: 0 }}>
                <label className="form-label" style={{ margin: 0 }}>ICU Beds:</label>
                <input 
                  type="number" 
                  name="icuBeds" 
                  className="form-input" 
                  value={formData.icuBeds} 
                  onChange={handleChange} 
                  min="0"
                  style={{ width: '80px', padding: '0.375rem' }}
                />
              </div>
            </div>

            <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', paddingBottom: '0.5rem', borderBottom: '1px solid var(--border)', marginTop: '2rem' }}>
              Initial Blood Bank Stock
            </h3>
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

            <button 
              type="submit" 
              className="btn btn-primary" 
              disabled={loading}
              style={{ padding: '0.875rem 2rem', fontSize: '1rem', width: '100%', boxShadow: 'var(--shadow-md)' }}
            >
              <Save size={20} />
              {loading ? 'Saving...' : 'Register Complete Hospital'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
