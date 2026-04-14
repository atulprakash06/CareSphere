import React, { useState } from 'react';
import axios from 'axios';
import { ArrowLeft, LogIn, Hospital, Info } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AdminPortal = () => {
  const navigate = useNavigate();
  const [authView, setAuthView] = useState('login'); // 'login', 'forgot-request', 'forgot-verify'
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');

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

  const handleAuth = async (e) => {
    e.preventDefault();
    setLoading(true);
    clearMsgs();

    if (authView === 'forgot-verify') {
      const validationError = validatePassword(password, username); // Admin username is not collected during reset in this UI currently, so userParam will be empty string, which is fine, it will just skip username check but execute the rest of the regex.
      if (validationError) {
         setError(validationError);
         setLoading(false);
         return;
      }
    }

    try {
      if (authView === 'login') {
         const res = await axios.post('http://localhost:5000/hospital/login', { username, password });
         navigate(`/admin/manage/${res.data._id}`, { state: { hospital: res.data } });
      } 
      else if (authView === 'forgot-request') {
         const res = await axios.post('http://localhost:5000/hospital/forgot-password', { email });
         setSuccessMsg(res.data.message);
         setAuthView('forgot-verify');
      } 
      else if (authView === 'forgot-verify') {
         const res = await axios.post('http://localhost:5000/hospital/reset-password', { email, otp, newPassword: password });
         setSuccessMsg(res.data.message);
         setAuthView('login');
         setPassword('');
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Authentication failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container" style={{ padding: '2rem 1.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: 'calc(100vh - 73px)', justifyContent: 'center' }}>
      
      <div className="card" style={{ width: '100%', maxWidth: '400px', textAlign: 'center' }}>
        <div style={{ background: 'var(--primary-light)', width: '64px', height: '64px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
          <Hospital size={32} color="var(--primary)" />
        </div>
        
        <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>
           {authView === 'login' && 'Hospital Staff Login'}
           {authView === 'forgot-request' && 'Hospital Recovery'}
           {authView === 'forgot-verify' && 'Verify Facility OTP'}
        </h2>
        <p style={{ marginBottom: '2rem', fontSize: '0.875rem' }}>
           {authView === 'login' && 'Login to update your live facility status'}
           {authView === 'forgot-request' && 'Enter your admin recovery email'}
           {authView === 'forgot-verify' && `6-digit sent to ${email}`}
        </p>

        {error && (
          <div style={{ padding: '0.75rem', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem', background: '#FEF2F2', color: '#DC2626', border: '1px solid #FECACA', fontSize: '0.875rem' }}>
            {error}
          </div>
        )}
        {successMsg && (
           <div style={{ padding: '0.75rem', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem', background: '#D1FAE5', color: '#059669', border: '1px solid #A7F3D0', fontSize: '0.875rem' }}>
              {successMsg}
           </div>
        )}

        <form onSubmit={handleAuth} style={{ textAlign: 'left' }}>
           
          {/* USERNAME - Login Only */}
          {authView === 'login' && (
             <div className="form-group">
               <label className="form-label">Username</label>
               <input type="text" className="form-input" value={username} onChange={(e) => setUsername(e.target.value)} required />
             </div>
          )}

          {/* EMAIL - Forgot Flow */}
          {(authView === 'forgot-request' || authView === 'forgot-verify') && (
             <div className="form-group">
               <label className="form-label">Admin Email</label>
               <input type="email" className="form-input" value={email} onChange={(e) => setEmail(e.target.value)} disabled={authView === 'forgot-verify'} required />
             </div>
          )}

          {/* OTP - Verify Flow */}
          {authView === 'forgot-verify' && (
             <div className="form-group">
               <label className="form-label">6-Digit OTP</label>
               <input type="text" className="form-input" maxLength={6} value={otp} onChange={(e) => setOtp(e.target.value)} required style={{ letterSpacing: '3px', textAlign: 'center', fontSize: '1.25rem', fontWeight: 700 }} />
             </div>
          )}

          {/* PASSWORD - Login & Verify Flow */}
          {(authView === 'login' || authView === 'forgot-verify') && (
             <div className="form-group" style={{ marginBottom: '2rem' }}>
               <label className="form-label" style={{ display: 'flex', alignItems: 'center' }}>
                 {authView === 'login' ? 'Password' : 'New Password'}
                 {authView === 'forgot-verify' && (
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
               <input type="password" className="form-input" value={password} onChange={(e) => setPassword(e.target.value)} required />
             </div>
          )}

          <button type="submit" className="btn btn-primary" disabled={loading} style={{ width: '100%', padding: '0.875rem', fontSize: '1rem' }}>
            <LogIn size={20} />
            {loading ? 'Authenticating...' : authView === 'login' ? 'Login Securely' : authView === 'forgot-request' ? 'Request OTP' : 'Reset Password'}
          </button>
        </form>

        <div style={{ marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border)', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          
          {(authView === 'login' || authView === 'forgot-request') && (
             <p 
               style={{ fontSize: '0.875rem', color: 'var(--primary)', cursor: 'pointer', fontWeight: 600 }}
               onClick={() => { clearMsgs(); setAuthView(authView === 'login' ? 'forgot-request' : 'login'); }}
             >
                {authView === 'login' ? 'Forgot Password?' : 'Return to Login'}
             </p>
          )}

          <p style={{ fontSize: '0.875rem', marginTop: '1rem' }}>New hospital facility?</p>
          <button 
            className="btn btn-outline" 
            style={{ width: '100%' }}
            onClick={() => navigate('/admin/register')}
          >
            Register New Hospital
          </button>
        </div>

      </div>
    </div>
  );
};

export default AdminPortal;
