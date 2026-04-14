import React from 'react';

const Privacy = () => {
   return (
      <div style={{ backgroundColor: '#000000', minHeight: '100vh', padding: '1px 0' }}>
         <div style={{ maxWidth: '800px', margin: '4rem auto', padding: '2rem', lineHeight: '1.8', color: '#94A3B8', backgroundColor: '#0F172A', borderRadius: '12px', border: '1px solid #1E293B' }}>
            <h1 style={{ fontSize: '2.5rem', color: '#F8FAFC', marginBottom: '2rem' }}>Privacy Policy</h1>
            
            <p style={{ marginBottom: '1.5rem', color: '#CBD5E1' }}><strong>Last Updated: {new Date().toLocaleDateString()}</strong></p>
            
            <section style={{ marginBottom: '2rem' }}>
               <h2 style={{ fontSize: '1.5rem', color: '#E2E8F0', marginBottom: '1rem', borderBottom: '1px solid #334155', paddingBottom: '0.5rem' }}>1. Introduction</h2>
               <p>Welcome to CareSphere! We respect your privacy and are committed to protecting it. This Privacy Policy outlines what information we collect, how we use it, and how we safeguard your data while you use our real-time hospital resource tracker.</p>
            </section>

            <section style={{ marginBottom: '2rem' }}>
               <h2 style={{ fontSize: '1.5rem', color: '#E2E8F0', marginBottom: '1rem', borderBottom: '1px solid #334155', paddingBottom: '0.5rem' }}>2. Data We Collect</h2>
               <p>For <strong style={{color: '#F8FAFC'}}>Patients</strong>: We collect the personal medical data you voluntarily provide to generate your digital Medical ID QR Code (Name, Age, Blood Type, Allergies, and Chronic Conditions). We also temporarily process your geolocation purely to calculate the closest emergency facilities, but we do not store your GPS coordinates.</p>
               <p>For <strong style={{color: '#F8FAFC'}}>Hospitals</strong>: We securely store the facility name, location, contact numbers, email addresses, and live facility capacities (ICU beds, Oxygen, Blood Banks, Ambulance status).</p>
            </section>

            <section style={{ marginBottom: '2rem' }}>
               <h2 style={{ fontSize: '1.5rem', color: '#E2E8F0', marginBottom: '1rem', borderBottom: '1px solid #334155', paddingBottom: '0.5rem' }}>3. How We Use Your Data</h2>
               <p>We use your data exclusively to bridge the gap between emergency patients and available medical resources. CareSphere will never sell, lease, or distribute your private medical data to third-party advertising brokers. Contact information is only utilized for password recovery and direct platform communications.</p>
            </section>

            <section style={{ marginBottom: '2rem' }}>
               <h2 style={{ fontSize: '1.5rem', color: '#E2E8F0', marginBottom: '1rem', borderBottom: '1px solid #334155', paddingBottom: '0.5rem' }}>4. Security</h2>
               <p>We employ standard hashing algorithms to encrypt passwords and utilize strict MongoDB Schema validations. However, no internet transmission is perfectly secure, and users utilize the platform at their own risk.</p>
            </section>
         </div>
      </div>
   );
};

export default Privacy;
