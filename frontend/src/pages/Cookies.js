import React from 'react';

const Cookies = () => {
   return (
      <div style={{ backgroundColor: '#000000', minHeight: '100vh', padding: '1px 0' }}>
         <div style={{ maxWidth: '800px', margin: '4rem auto', padding: '2rem', lineHeight: '1.8', color: '#94A3B8', backgroundColor: '#0F172A', borderRadius: '12px', border: '1px solid #1E293B' }}>
            <h1 style={{ fontSize: '2.5rem', color: '#F8FAFC', marginBottom: '2rem' }}>Cookie Policy</h1>
            
            <section style={{ marginBottom: '2rem' }}>
               <h2 style={{ fontSize: '1.5rem', color: '#E2E8F0', marginBottom: '1rem', borderBottom: '1px solid #334155', paddingBottom: '0.5rem' }}>1. What Are Cookies?</h2>
               <p>Cookies are small text files temporarily stored on your device that allow web applications to track navigation states and keep you securely logged in.</p>
            </section>

            <section style={{ marginBottom: '2rem' }}>
               <h2 style={{ fontSize: '1.5rem', color: '#E2E8F0', marginBottom: '1rem', borderBottom: '1px solid #334155', paddingBottom: '0.5rem' }}>2. How We Use Them</h2>
               <p>CareSphere primarily utilizes Local Storage and Session Cookies to maintain authentications. When you login as a Patient or a Hospital Administrator, we store a session token to ensure you do not have to continuously log in while navigating the different dashboards.</p>
            </section>

            <section style={{ marginBottom: '2rem' }}>
               <h2 style={{ fontSize: '1.5rem', color: '#E2E8F0', marginBottom: '1rem', borderBottom: '1px solid #334155', paddingBottom: '0.5rem' }}>3. Third-Party Cookies</h2>
               <p>CareSphere integrates directly with the <strong style={{color: '#F8FAFC'}}>Google Maps API</strong> to render the Patient Dashboard. Google Maps may utilize functional cookies embedded in the map rendering canvas to analyze traffic telemetry.</p>
            </section>

            <section style={{ marginBottom: '2rem' }}>
               <h2 style={{ fontSize: '1.5rem', color: '#E2E8F0', marginBottom: '1rem', borderBottom: '1px solid #334155', paddingBottom: '0.5rem' }}>4. Managing Cookies</h2>
               <p>You can adjust your browser settings to completely block cookies; however, doing so will inherently break the login pipelines for both Patients and Hospital Admins on this platform.</p>
            </section>
         </div>
      </div>
   );
};

export default Cookies;
