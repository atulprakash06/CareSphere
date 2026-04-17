import React, { useState } from 'react';
import axios from 'axios';
import { Mail, User, Phone, MessageSquare, Send } from 'lucide-react';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus('');
    
    try {
      await axios.post(`${process.env.REACT_APP_API_URL || "http://localhost:5000"}/contact`, formData);
      setStatus('success');
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (err) {
      console.error(err);
      setStatus('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container" style={{ padding: '2rem 1.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: 'calc(100vh - 73px)' }}>
      
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', color: 'var(--primary)', marginBottom: '0.5rem' }}>Contact Us</h1>
        <p style={{ color: 'var(--text-muted)' }}>How can we help you? Send us a message and we'll get back to you shortly.</p>
      </div>

      <div className="card" style={{ width: '100%', maxWidth: '500px' }}>
        {status === 'success' && (
          <div style={{ padding: '1rem', background: '#D1FAE5', color: '#065F46', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem', textAlign: 'center', fontWeight: 500 }}>
            Message sent successfully! We will contact you soon.
          </div>
        )}
        
        {status === 'error' && (
          <div style={{ padding: '1rem', background: '#FEE2E2', color: '#991B1B', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem', textAlign: 'center', fontWeight: 500 }}>
            Failed to send message. Please try again later.
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500, fontSize: '0.875rem' }}>
              <User size={14} style={{ marginRight: '0.25rem', verticalAlign: 'middle' }} /> Full Name
            </label>
            <input 
              type="text" 
              required
              className="input-field" 
              placeholder="Your Name"
              value={formData.name}
              onChange={e => setFormData({...formData, name: e.target.value})}
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500, fontSize: '0.875rem' }}>
              <Mail size={14} style={{ marginRight: '0.25rem', verticalAlign: 'middle' }} /> Email Address
            </label>
            <input 
              type="email" 
              required
              className="input-field" 
              placeholder="you@example.com"
              value={formData.email}
              onChange={e => setFormData({...formData, email: e.target.value})}
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500, fontSize: '0.875rem' }}>
              <Phone size={14} style={{ marginRight: '0.25rem', verticalAlign: 'middle' }} /> Phone Number
            </label>
            <input 
              type="tel" 
              required
              className="input-field" 
              placeholder="+1 234 567 890"
              value={formData.phone}
              onChange={e => setFormData({...formData, phone: e.target.value})}
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500, fontSize: '0.875rem' }}>
              <MessageSquare size={14} style={{ marginRight: '0.25rem', verticalAlign: 'middle' }} /> How can we help?
            </label>
            <textarea 
              required
              className="input-field" 
              placeholder="Please describe your inquiry..."
              rows={4}
              style={{ resize: 'vertical' }}
              value={formData.message}
              onChange={e => setFormData({...formData, message: e.target.value})}
            ></textarea>
          </div>

          <button 
            type="submit" 
            className="btn btn-primary" 
            disabled={loading}
            style={{ width: '100%', padding: '0.875rem', fontSize: '1rem', marginTop: '0.5rem' }}
          >
            <Send size={18} />
            {loading ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      </div>

    </div>
  );
};

export default ContactUs;
