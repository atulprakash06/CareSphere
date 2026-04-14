import React, { useState } from 'react';
import { ChevronDown, Crosshair } from 'lucide-react';
import { motion } from 'framer-motion';

const HowItWorks = () => {
  const [openHow, setOpenHow] = useState(null);
  const toggleHow = (index) => setOpenHow(openHow === index ? null : index);

  // Framer Motion Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <div className="container" style={{ minHeight: 'calc(100vh - 73px)', display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: '6rem 1rem', background: '#FFFFFF', flex: 1 }}>
         
         <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
           <div style={{ background: '#FEE2E2', padding: '1rem', borderRadius: '50%' }}>
             <Crosshair size={48} color="#DC2626" />
           </div>
         </div>
         
         <h1 style={{ fontSize: '3rem', color: '#0F172A', marginBottom: '1rem', letterSpacing: '-0.5px', fontWeight: 800, textAlign: 'center' }}>How CareSphere Works</h1>
         <p style={{ color: '#475569', maxWidth: '700px', margin: '0 auto 4rem auto', fontSize: '1.15rem', textAlign: 'center', lineHeight: '1.6' }}>
            We bridge the gap between patients and hospital beds in three simple steps. Click each step below to learn more about the process.
         </p>

         {/* Animated Container wrapper around the Accordion items */}
         <motion.div 
            style={{ maxWidth: '800px', margin: '0 auto', border: '1px solid #E2E8F0', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
            variants={containerVariants}
            initial="hidden"
            animate="show"
         >
            {/* Step 1 */}
            <motion.div variants={itemVariants} style={{ borderBottom: '1px solid #E2E8F0', background: '#FFFFFF' }}>
               <button onClick={() => toggleHow(1)} style={{ width: '100%', padding: '1.5rem 2rem', background: openHow === 1 ? '#F8FAFC' : '#FFFFFF', border: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', textAlign: 'left', transition: 'background 0.2s' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                     <span style={{ fontSize: '2rem' }}>📍</span>
                     <span style={{ fontSize: '1.25rem', color: '#0F172A', fontWeight: 600 }}>1. Locate</span>
                  </div>
                  <ChevronDown size={20} color="#64748B" style={{ transform: openHow === 1 ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
               </button>
               {openHow === 1 && (
                  <div style={{ padding: '0 2rem 2rem', background: '#F8FAFC', color: '#475569', fontSize: '1.05rem', lineHeight: '1.6' }}>
                     The app uses the Google Maps platform to automatically find your current location (or the location you specify) to identify all of the closest medical facilities within a safe travel radius.
                  </div>
               )}
            </motion.div>

            {/* Step 2 */}
            <motion.div variants={itemVariants} style={{ borderBottom: '1px solid #E2E8F0', background: '#FFFFFF' }}>
               <button onClick={() => toggleHow(2)} style={{ width: '100%', padding: '1.5rem 2rem', background: openHow === 2 ? '#F8FAFC' : '#FFFFFF', border: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', textAlign: 'left', transition: 'background 0.2s' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                     <span style={{ fontSize: '2rem' }}>🏥</span>
                     <span style={{ fontSize: '1.25rem', color: '#0F172A', fontWeight: 600 }}>2. Check Availability</span>
                  </div>
                  <ChevronDown size={20} color="#64748B" style={{ transform: openHow === 2 ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
               </button>
               {openHow === 2 && (
                  <div style={{ padding: '0 2rem 2rem', background: '#F8FAFC', color: '#475569', fontSize: '1.05rem', lineHeight: '1.6' }}>
                     You can instantly select exactly what you need right now: ICU Beds, Oxygen, Ventilators, or Ambulances. Compare live availability updated directly by the hospital administrators.
                  </div>
               )}
            </motion.div>

            {/* Step 3 */}
            <motion.div variants={itemVariants} style={{ background: '#FFFFFF' }}>
               <button onClick={() => toggleHow(3)} style={{ width: '100%', padding: '1.5rem 2rem', background: openHow === 3 ? '#F8FAFC' : '#FFFFFF', border: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', textAlign: 'left', transition: 'background 0.2s' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                     <span style={{ fontSize: '2rem' }}>🚑</span>
                     <span style={{ fontSize: '1.25rem', color: '#0F172A', fontWeight: 600 }}>3. Reach & Route</span>
                  </div>
                  <ChevronDown size={20} color="#64748B" style={{ transform: openHow === 3 ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
               </button>
               {openHow === 3 && (
                  <div style={{ padding: '0 2rem 2rem', background: '#F8FAFC', color: '#475569', fontSize: '1.05rem', lineHeight: '1.6' }}>
                     View the absolute shortest visual route and tap the direct-contact button from the app to alert the hospital emergency desk that you are inbound.
                  </div>
               )}
            </motion.div>

         </motion.div>
      </div>
    </div>
  );
};

export default HowItWorks;
