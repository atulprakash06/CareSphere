import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ShieldPlus, User, HeartPulse, ChevronDown } from 'lucide-react';

const Landing = () => {
  const navigate = useNavigate();


  return (
    <div className="container">
      <div 
        className="page-header" 
        style={{ 
          padding: '8rem 1rem 6rem', 
          background: 'linear-gradient(rgba(248, 250, 252, 0.5), rgba(248, 250, 252, 0.9)), url("/hero-bg.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center'
        }}
      >
        <h1 className="page-title" style={{ fontSize: '2.8rem', lineHeight: '1.2', color: '#0F172A', marginBottom: '1.5rem', letterSpacing: '-1px' }}>
          Smart Emergency Healthcare Locator
        </h1>
        <p className="page-subtitle" style={{ fontSize: '1.15rem', color: '#475569', marginBottom: '3rem', maxWidth: '800px', lineHeight: '1.6' }}>
          Find nearby hospitals with real-time availability of emergency facilities. A smart platform designed to instantly locate nearby healthcare facilities during emergencies.
        </p>
        
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', alignItems: 'center', marginBottom: '4rem', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.5rem 1rem', background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '8px', color: '#0F172A', fontWeight: 500, fontSize: '0.8rem', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
            <div style={{ background: '#3b82f6', color: 'white', borderRadius: '50%', width: '18px', height: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px' }}>✓</div>
            <span style={{textAlign: 'left', lineHeight: '1.2'}}><strong>150+</strong> Verified<br/>Hospitals</span>
          </div>
          
          <button 
             className="btn btn-primary" 
             style={{ padding: '1rem 2rem', fontSize: '1.1rem', fontWeight: 600, borderRadius: '8px', boxShadow: '0 4px 14px 0 rgba(220, 38, 38, 0.39)' }}
             onClick={() => navigate('/user')}
          >
             Find Nearest Hospital Now
          </button>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.5rem 1rem', background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '8px', color: '#64748B', fontSize: '0.8rem', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
            <span style={{textAlign: 'left', lineHeight: '1.2'}}>Updated<br/><strong>2 mins ago</strong></span>
          </div>
        </div>
        
        <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap', maxWidth: '850px', margin: '0 auto' }}>
          {/* User Card */}
          <div className="card" style={{ flex: '1', minWidth: '300px', textAlign: 'left', padding: '2rem', border: '1px solid #E2E8F0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', borderRadius: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
              <div style={{ background: '#E0F2FE', width: '48px', height: '48px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <User size={24} color="#0284C7" />
              </div>
              <h2 style={{ fontSize: '1.25rem', margin: 0, color: '#0F172A', fontWeight: 700 }}>For Users</h2>
            </div>
            <p style={{ marginBottom: '2rem', color: '#475569', minHeight: '60px', fontSize: '0.95rem' }}>
              Make your digital medical ID here with a QR code.
            </p>
            <button className="btn btn-outline" style={{ width: 'auto', fontSize: '0.875rem', padding: '0.6rem 1.2rem', color: '#475569', borderColor: '#CBD5E1', fontWeight: 600, background: 'transparent' }} onClick={() => navigate('/user-auth')}>
              Login / Register
            </button>
          </div>

          {/* Admin Card */}
          <div className="card" style={{ flex: '1', minWidth: '300px', textAlign: 'left', padding: '2rem', border: '1px solid #E2E8F0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', borderRadius: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
              <div style={{ background: '#E0F2FE', width: '48px', height: '48px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <ShieldPlus size={24} color="#0284C7" />
              </div>
              <h2 style={{ fontSize: '1.25rem', margin: 0, color: '#0F172A', fontWeight: 700 }}>For Hospital Admins</h2>
            </div>
            <p style={{ marginBottom: '2rem', color: '#475569', minHeight: '60px', fontSize: '0.95rem' }}>
              Manage your facility's profile, update emergency bed availability, and list specialist services.
            </p>
            <button className="btn btn-outline" style={{ width: 'auto', fontSize: '0.875rem', padding: '0.6rem 1.2rem', color: '#475569', borderColor: '#CBD5E1', fontWeight: 600, background: 'transparent' }} onClick={() => navigate('/admin')}>
              Register Your Hospital
            </button>
          </div>
        </div>
      </div>



      {/* Extended Footer */}
      <footer style={{ padding: '4rem 1.5rem 3rem', background: '#0F172A', borderTop: '1px solid #1E293B', fontSize: '0.875rem' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem' }}>
          
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
              <HeartPulse size={24} color="#DC2626" />
              <span style={{ fontSize: '1.25rem', fontWeight: 600, color: '#F8FAFC' }}>CareSphere</span>
            </div>
            <p style={{ color: '#94A3B8', marginBottom: '1rem', lineHeight: '1.5' }}>
              A real-time tracking platform dedicated to reducing emergency response times by monitoring hospital ICUs, oxygen supplies, and ambulance availability.
            </p>
          </div>

          <div>
            <h4 style={{ fontSize: '1rem', marginBottom: '1rem', color: '#F8FAFC' }}>Quick Links</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, color: '#94A3B8', lineHeight: '2' }}>
              <li><Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>Home</Link></li>
              <li><Link to="/user" style={{ color: 'inherit', textDecoration: 'none' }}>Find Hospitals</Link></li>
              <li><Link to="/admin" style={{ color: 'inherit', textDecoration: 'none' }}>Hospital Login</Link></li>
              <li><Link to="/team" style={{ color: 'inherit', textDecoration: 'none' }}>Our Development Team</Link></li>
            </ul>
          </div>

          <div>
            <h4 style={{ fontSize: '1rem', marginBottom: '1rem', color: '#F8FAFC' }}>Legal</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, color: '#94A3B8', lineHeight: '2' }}>
              <li><Link to="/privacy" style={{ color: 'inherit', textDecoration: 'none' }}>Privacy Policy</Link></li>
              <li><Link to="/terms" style={{ color: 'inherit', textDecoration: 'none' }}>Terms & Conditions</Link></li>
              <li><Link to="/cookies" style={{ color: 'inherit', textDecoration: 'none' }}>Cookie Policy</Link></li>
            </ul>
          </div>

          <div>
            <h4 style={{ fontSize: '1rem', marginBottom: '1rem', color: '#F8FAFC' }}>Contact</h4>
            <p style={{ color: '#94A3B8', marginBottom: '0.5rem' }}>Need to report an issue or register offline? Send us a message directly: <br/><Link to="/contact" style={{ color: '#3b82f6', textDecoration: 'none' }}>Contact Us Page</Link></p>
          </div>

        </div>

        <div style={{ maxWidth: '1000px', margin: '3rem auto 0', paddingTop: '1.5rem', borderTop: '1px solid #1E293B', textAlign: 'center', color: '#64748B' }}>
          <p>&copy; {new Date().getFullYear()} CareSphere. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
