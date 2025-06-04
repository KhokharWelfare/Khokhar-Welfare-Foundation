import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import loginImage from '../assets/usage.png';

function SignupLogin() {
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const validateForm = () => {
    if (!formData.email || !/^\S+@\S+\.\S+$/.test(formData.email)) {
      setMessage('Please enter a valid email');
      return false;
    }
    if (!formData.password || formData.password.length < 6) {
      setMessage('Password must be at least 6 characters');
      return false;
    }
    if (isSignup && !formData.name) {
      setMessage('Please enter your name');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const url = isSignup ? 'https://khokhar-welfare-foundation.vercel.app/api/auth/register' : 'https://khokhar-welfare-foundation.vercel.app/api/auth/login';
    try {
      console.log(formData, "before");
      const res = await axios.post(url, formData);
      if (isSignup) {
        setMessage('Signup successful! Please login.');
        setFormData({ name: '', email: '', password: '' });
        setIsSignup(false); // Switch to login mode
        console.log(formData, "after");
      } else {
        localStorage.setItem('token', res.data.token);
        setMessage('Login successful!');
        navigate('/');
      }
    } catch (err) {
      setMessage(err.response?.data?.message || 'Error processing request');
    }
  };

  return (
    <div className="page-container">
      <div>
        <Navigation />
        <div className="hero-log">
          <h1>{isSignup ? 'Signup' : 'Login'}</h1>
        </div>
        <div className="content">
          <div className="flex-container">
            <div className="flex-item">
              <img src={loginImage} alt="Signup/Login" />
            </div>
            <div className="flex-item">
              <form onSubmit={handleSubmit}>
                {isSignup && (
                  <input
                    type="text"
                    placeholder="Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="form-input"
                  />
                )}
                <input
                  type="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="form-input"
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="form-input"
                />
                {message && <p className="form-message">{message}</p>}
                <button type="submit" className="form-btn">
                  {isSignup ? 'Signup' : 'Login'}
                </button>
                <button
                  type="button"
                  onClick={() => setIsSignup(!isSignup)}
                  className="form-btn"
                >
                  {isSignup ? 'Already have an account? Login' : "Don't have an account? Signup"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default SignupLogin;
