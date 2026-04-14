import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Info } from 'lucide-react';

const UserAuth = () => {
   const [authView, setAuthView] = useState('login'); // 'login', 'register', 'forgot-request', 'forgot-verify'
   const [username, setUsername] = useState('');
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [otp, setOtp] = useState('');
   const [error, setError] = useState('');
   const [successMsg, setSuccessMsg] = useState('');
   const navigate = useNavigate();

   const clearMsgs = () => {
      setError('');
      setSuccessMsg('');
   };

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

   const handleSubmit = async (e) => {
      e.preventDefault();
      clearMsgs();

      if (authView === 'register' || authView === 'forgot-verify') {
         const validationError = validatePassword(password, username);
         if (validationError) {
            setError(validationError);
            return;
         }
      }

      try {
         if (authView === 'login' || authView === 'register') {
            const endpoint = authView === 'login' ? '/user/login' : '/user/register';
            const payload = authView === 'login' ? { username, password } : { username, email, password };
            const res = await axios.post(`http://localhost:5000${endpoint}`, payload);
            
            localStorage.setItem('patientId', res.data._id);
            navigate('/user-profile');
         } else if (authView === 'forgot-request') {
            const res = await axios.post('http://localhost:5000/user/forgot-password', { email });
            setSuccessMsg(res.data.message);
            setAuthView('forgot-verify');
         } else if (authView === 'forgot-verify') {
            const res = await axios.post('http://localhost:5000/user/reset-password', { email, otp, newPassword: password });
            setSuccessMsg(res.data.message);
            setUsername('');
            setPassword('');
            setAuthView('login');
         }
      } catch (err) {
         setError(err.response?.data?.error || 'Authentication failed');
      }
   };

   return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 'calc(100vh - 73px)', background: '#F8FAFC' }}>
         <div style={{ background: 'white', padding: '3rem', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', width: '100%', maxWidth: '400px' }}>
            
            <h2 style={{ fontSize: '1.8rem', color: '#0F172A', marginBottom: '0.5rem', textAlign: 'center' }}>
               {authView === 'login' && 'Patient Login'}
               {authView === 'register' && 'Create Medical ID'}
               {authView === 'forgot-request' && 'Password Recovery'}
               {authView === 'forgot-verify' && 'Verify OTP Reset'}
            </h2>
            
            <p style={{ textAlign: 'center', color: '#64748B', marginBottom: '2rem' }}>
               {authView === 'login' && 'Access your digital medical record'}
               {authView === 'register' && 'Register to generate your QR code'}
               {authView === 'forgot-request' && 'Enter your email to receive an OTP'}
               {authView === 'forgot-verify' && `We sent a 6-digit code to ${email}`}
            </p>

            {error && <div style={{ background: '#FEE2E2', color: '#DC2626', padding: '1rem', borderRadius: '8px', marginBottom: '1.5rem', fontSize: '0.9rem' }}>{error}</div>}
            {successMsg && <div style={{ background: '#D1FAE5', color: '#059669', padding: '1rem', borderRadius: '8px', marginBottom: '1.5rem', fontSize: '0.9rem' }}>{successMsg}</div>}

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
               
               {/* USERNAME - Login & Register Only */}
               {(authView === 'login' || authView === 'register') && (
                  <div>
                     <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: '#475569' }}>Username</label>
                     <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #CBD5E1', outline: 'none' }}
                     />
                  </div>
               )}

               {/* EMAIL - Register, Forgot-Request, Forgot-Verify */}
               {(authView === 'register' || authView === 'forgot-request' || authView === 'forgot-verify') && (
                  <div>
                     <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: '#475569' }}>Email Address</label>
                     <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        disabled={authView === 'forgot-verify'}
                        style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #CBD5E1', outline: 'none', background: authView === 'forgot-verify' ? '#F1F5F9' : 'white' }}
                     />
                  </div>
               )}

               {/* OTP - Forgot-Verify Only */}
               {authView === 'forgot-verify' && (
                  <div>
                     <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: '#475569' }}>6-Digit OTP</label>
                     <input
                        type="text"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        required
                        maxLength={6}
                        placeholder="123456"
                        style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #CBD5E1', outline: 'none', letterSpacing: '3px', textAlign: 'center', fontSize: '1.2rem', fontWeight: 700 }}
                     />
                  </div>
               )}

               {/* PASSWORD - Login, Register, Forgot-Verify (New Password) */}
               {(authView === 'login' || authView === 'register' || authView === 'forgot-verify') && (
                  <div>
                     <label style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem', fontWeight: 600, color: '#475569' }}>
                        {authView === 'forgot-verify' ? 'New Password' : 'Password'}
                        {(authView === 'register' || authView === 'forgot-verify') && (
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
                        )}
                     </label>
                     <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #CBD5E1', outline: 'none' }}
                     />
                  </div>
               )}

               <button type="submit" style={{ background: '#DC2626', color: 'white', padding: '0.8rem', borderRadius: '8px', border: 'none', fontWeight: 700, fontSize: '1rem', cursor: 'pointer', marginTop: '1rem' }}>
                  {authView === 'login' && 'Login to Portal'}
                  {authView === 'register' && 'Register Account'}
                  {authView === 'forgot-request' && 'Send Recovery Email'}
                  {authView === 'forgot-verify' && 'Update Password'}
               </button>
            </form>

            {/* Bottom Links */}
            <div style={{ marginTop: '2rem', textAlign: 'center', color: '#64748B', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
               {(authView === 'login' || authView === 'forgot-request') && (
                  <div>
                     <span 
                        onClick={() => { clearMsgs(); setAuthView(authView === 'login' ? 'forgot-request' : 'login'); }} 
                        style={{ color: '#0F172A', fontWeight: 600, cursor: 'pointer', fontSize: '0.9rem' }}
                     >
                        {authView === 'login' ? 'Forgot Password?' : 'Return to Login'}
                     </span>
                  </div>
               )}

               <div>
                  {(authView === 'login' || authView === 'register') && (
                     <>
                        {authView === 'login' ? "Don't have an account? " : "Already registered? "}
                        <span 
                           onClick={() => { clearMsgs(); setAuthView(authView === 'login' ? 'register' : 'login'); }} 
                           style={{ color: '#DC2626', fontWeight: 600, cursor: 'pointer' }}
                        >
                           {authView === 'login' ? 'Sign up' : 'Log in'}
                        </span>
                     </>
                  )}
               </div>
            </div>
         </div>
      </div>
   );
};

export default UserAuth;
