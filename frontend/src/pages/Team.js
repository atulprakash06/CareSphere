import React from 'react';
import { Users, GraduationCap, Code } from 'lucide-react';

const Team = () => {
   const teamMembers = [
      { name: 'Aastha Panda', role: 'Full Stack Developer', degree: 'MCA Student', image: '/aastha.jpg' },
      { name: 'Atul Prakash', role: 'Full Stack Developer', degree: 'MCA Student', image: '/atul.jpg' },
      { name: 'Alok Kumar', role: 'Full Stack Developer', degree: 'MCA Student', image: '/alok.jpg' }
   ];

   return (
      <div style={{ backgroundColor: '#000000', minHeight: '100vh', padding: '4rem 1.5rem', color: '#F8FAFC' }}>
         <div style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#e2e8f0', width: '80px', height: '80px', borderRadius: '50%', marginBottom: '1.5rem' }}>
               <Users size={40} color="#0F172A" />
            </div>
            <h1 style={{ fontSize: '3rem', marginBottom: '1rem', letterSpacing: '-1px' }}>Meet Our Development Team</h1>
            <p style={{ color: '#94A3B8', fontSize: '1.25rem', maxWidth: '700px', margin: '0 auto 4rem', lineHeight: '1.6' }}>
               CareSphere is proudly engineered and maintained by a dedicated team of Master of Computer Applications (MCA) students.
            </p>

            <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center', flexWrap: 'wrap' }}>
               {teamMembers.map((member, idx) => (
                  <div key={idx} style={{ flex: '1', minWidth: '250px', background: '#0F172A', border: '1px solid #1E293B', borderRadius: '16px', padding: '3rem 2rem', transition: 'transform 0.2s', cursor: 'pointer' }} onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-10px)'} onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
                     <div style={{ backgroundColor: '#1E293B', width: '120px', height: '120px', borderRadius: '50%', overflow: 'hidden', margin: '0 auto 1.5rem', border: '3px solid #3b82f6', boxShadow: '0 4px 14px rgba(59, 130, 246, 0.4)' }}>
                        <img src={member.image} alt={member.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                     </div>
                     <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: '#F8FAFC' }}>{member.name}</h3>
                     <p style={{ color: '#3b82f6', fontWeight: 600, marginBottom: '1rem' }}>{member.role}</p>
                     
                     <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', color: '#94A3B8', fontSize: '0.9rem', backgroundColor: '#020617', padding: '0.5rem 1rem', borderRadius: '20px', width: 'fit-content', margin: '0 auto' }}>
                        <GraduationCap size={16} />
                        {member.degree}
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </div>
   );
};

export default Team;
