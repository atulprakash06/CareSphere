import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import AdminDashboard from './pages/AdminDashboard';
import UserDashboard from './pages/UserDashboard';
import AdminPortal from './pages/AdminPortal';
import HospitalManage from './pages/HospitalManage';
import ContactUs from './pages/ContactUs';
import AboutUs from './pages/AboutUs';
import FAQ from './pages/FAQ';
import HowItWorks from './pages/HowItWorks';
import UserAuth from './pages/UserAuth';
import UserProfile from './pages/UserProfile';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import Cookies from './pages/Cookies';
import Team from './pages/Team';
import Navbar from './components/Navbar';
import Chatbot from './components/Chatbot';
import './index.css';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Chatbot />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/cookies" element={<Cookies />} />
        <Route path="/team" element={<Team />} />
        <Route path="/user-auth" element={<UserAuth />} />
        <Route path="/user-profile" element={<UserProfile />} />
        <Route path="/admin" element={<AdminPortal />} />
        <Route path="/admin/register" element={<AdminDashboard />} />
        <Route path="/admin/manage/:id" element={<HospitalManage />} />
        <Route path="/user" element={<UserDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
