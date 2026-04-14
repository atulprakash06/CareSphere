import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Shield, Search } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/how-it-works', label: 'How it Works' },
    { path: '/faq', label: 'FAQ' },
    { path: '/contact', label: 'Contact' }
  ];

  return (
    <header style={{ 
      background: 'white', 
      borderBottom: '1px solid var(--border)', 
      padding: '1rem 2rem', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'space-between',
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      boxShadow: 'var(--shadow-sm)'
    }}>
      {/* Logos and Brand */}
      <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none', color: '#0F172A' }}>
        <div style={{ position: 'relative', width: '30px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
           <svg width="32" height="36" viewBox="0 0 24 28" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C7 2 2 4 2 4V12C2 17.5 6.5 23 12 26C17.5 23 22 17.5 22 12V4C22 4 17 2 12 2Z" fill="#E2E8F0" stroke="#334155" strokeWidth="2" strokeLinejoin="round"/>
              <path d="M12 2V26M2 10H22M2 18H22" stroke="#94A3B8" strokeWidth="1" opacity="0.5"/>
              <path d="M9 14H15M12 11V17" stroke="#DC2626" strokeWidth="3" strokeLinecap="round"/>
           </svg>
        </div>
        <span style={{ fontSize: '1.5rem', fontWeight: 800, letterSpacing: '-0.5px' }}>CareSphere</span>
      </Link>

      {/* Right Aligned Desktop Links */}
      <nav className="desktop-nav" style={{ display: 'flex', gap: '2rem', alignItems: 'center', marginLeft: 'auto' }}>
        {navLinks.map(link => {
           const isActive = location.pathname === link.path && link.path === '/';
           return (
             <Link 
               key={link.label} 
               to={link.path} 
               style={{ 
                 textDecoration: 'none', 
                 color: isActive ? 'var(--primary)' : '#475569',
                 fontWeight: 500,
                 fontSize: '0.95rem',
                 transition: 'all 0.2s ease'
               }}
             >
               {link.label}
             </Link>
           );
        })}
      </nav>

      <style>{`
        @media (max-width: 900px) {
          .desktop-nav { display: none !important; }
          .hidden-mobile { display: none !important; }
        }
        @keyframes pulse {
           0% { opacity: 1; transform: scale(1); }
           50% { opacity: 0.5; transform: scale(1.2); }
           100% { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </header>
  );
};

export default Navbar;
