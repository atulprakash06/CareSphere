import React from 'react';
import { HeartPulse } from 'lucide-react';

const AboutUs = () => {
  return (
    <div className="container" style={{ minHeight: 'calc(100vh - 73px)', display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: '6rem 1rem', background: '#F8FAFC', flex: 1 }}>
         <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem' }}>
              <div style={{ background: '#FEE2E2', padding: '1rem', borderRadius: '50%' }}>
                <HeartPulse size={48} color="#DC2626" />
              </div>
            </div>
            <h1 style={{ fontSize: '3rem', color: '#0F172A', marginBottom: '1.5rem', letterSpacing: '-0.5px', fontWeight: 800 }}>Our Mission</h1>
            <div style={{ width: '60px', height: '4px', background: '#DC2626', margin: '0 auto 2rem auto', borderRadius: '2px' }}></div>
            
            <p style={{ color: '#475569', fontSize: '1.15rem', lineHeight: '1.8', textAlign: 'left', marginBottom: '2rem' }}>
              CareSphere was born out of a critical need observed during global health crises: the devastating gap between life-saving medical resources and the patients desperately searching for them. 
            </p>
            <p style={{ color: '#475569', fontSize: '1.15rem', lineHeight: '1.8', textAlign: 'left', marginBottom: '2rem' }}>
              Our mission is to eliminate the guesswork in medical emergencies. By building a massive, real-time aggregate of hospital data, we empower everyday people to instantly locate intensive care beds, oxygen supplies, and emergency transport without making a dozen frantic phone calls.
            </p>
            <p style={{ color: '#475569', fontSize: '1.15rem', lineHeight: '1.8', textAlign: 'left' }}>
              <strong>We believe that in an emergency, accurate information is just as critical as the treatment itself.</strong> Our platform relies on dedicated hospital administrators who constantly update their live capacity, ensuring that every patient mapping a route is heading towards guaranteed care.
            </p>
         </div>
      </div>
    </div>
  );
};

export default AboutUs;
