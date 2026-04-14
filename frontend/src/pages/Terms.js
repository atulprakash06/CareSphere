import React from 'react';

const Terms = () => {
   return (
      <div style={{ backgroundColor: '#000000', minHeight: '100vh', padding: '1px 0' }}>
         <div style={{ maxWidth: '800px', margin: '4rem auto', padding: '2rem', lineHeight: '1.8', color: '#94A3B8', backgroundColor: '#0F172A', borderRadius: '12px', border: '1px solid #1E293B' }}>
            <h1 style={{ fontSize: '2.5rem', color: '#F8FAFC', marginBottom: '2rem' }}>Terms & Conditions</h1>
            
            <section style={{ marginBottom: '2rem' }}>
               <h2 style={{ fontSize: '1.5rem', color: '#E2E8F0', marginBottom: '1rem', borderBottom: '1px solid #334155', paddingBottom: '0.5rem' }}>1. Acceptance of Terms</h2>
               <p>By registering as a User or an Administrator on CareSphere, you agree to be bound by these underlying terms. CareSphere serves strictly as a logistical index for real-time facility mapping.</p>
            </section>

            <section style={{ marginBottom: '2rem' }}>
               <h2 style={{ fontSize: '1.5rem', color: '#E2E8F0', marginBottom: '1rem', borderBottom: '1px solid #334155', paddingBottom: '0.5rem' }}>2. Emergency Disclaimer</h2>
               <p><strong style={{color: '#EF4444'}}>CareSphere is not a replacement for calling national emergency services (e.g. 911, 112).</strong> While our platform strives to provide accurate live data regarding hospital inventory (ICU beds, Oxygen, Blood Banks, Ambulances), we cannot absolutely guarantee real-world availability upon arrival. Users must exercise their own judgment during life-threatening crises.</p>
            </section>

            <section style={{ marginBottom: '2rem' }}>
               <h2 style={{ fontSize: '1.5rem', color: '#E2E8F0', marginBottom: '1rem', borderBottom: '1px solid #334155', paddingBottom: '0.5rem' }}>3. Hospital Responsibilities</h2>
               <p>Facility administrators are expected to act in good faith and publish accurate data. Falsifying ICU capacity or intentionally misleading the public via CareSphere will result in immediate termination and blacklisting of the offending institution's profile.</p>
            </section>

            <section style={{ marginBottom: '2rem' }}>
               <h2 style={{ fontSize: '1.5rem', color: '#E2E8F0', marginBottom: '1rem', borderBottom: '1px solid #334155', paddingBottom: '0.5rem' }}>4. Limitation of Liability</h2>
               <p>Under no circumstance shall CareSphere, its developers, or its stakeholders be held liable for delayed treatment, loss of life, or damages incurred due to reliance on the platform's mapping or inventory data.</p>
            </section>
         </div>
      </div>
   );
};

export default Terms;
