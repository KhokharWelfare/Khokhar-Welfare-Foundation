import React, { useState } from 'react';
import axios from 'axios';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import donateHero from '../assets/donate.png';

function Donate() {
  const [formData, setFormData] = useState({ name: '', amount: '', imageString: null });
  const [message, setMessage] = useState('');

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
      if (!allowedTypes.includes(file.type)) {
        setMessage('Please upload a JPEG, PNG, or JPG image');
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        setMessage('Image size must be less than 5MB');
        return;
      }
      setFormData({ ...formData, imageString: file });
      setMessage('');
      console.log('Selected file:', {
        name: file.name,
        type: file.type,
        size: file.size,
      });
    }
  };

  const handleSubmit = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setMessage('Please log in to donate');
      return;
    }
    if (!formData.name.trim()) {
      setMessage('Please provide your name');
      return;
    }
    if (!formData.amount || isNaN(formData.amount) || Number(formData.amount) <= 0) {
      setMessage('Please provide a valid positive amount');
      return;
    }
    if (!formData.imageString) {
      setMessage('Please upload an image');
      return;
    }

    const data = new FormData();
    data.append('name', formData.name.trim());
    data.append('amount', formData.amount);
    data.append('imageString', formData.imageString);

    // Log FormData contents
    for (let [key, value] of data.entries()) {
      console.log(`FormData: ${key} =`, value instanceof File ? {
        name: value.name,
        type: value.type,
        size: value.size,
      } : value);
    }

    try {
      const response = await axios.post('http://localhost:5000/api/donation', data, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      setMessage('Donation submitted successfully!');
      setFormData({ name: '', amount: '', imageString: null });
      document.querySelector('input[type="file"]').value = '';
    } catch (err) {
      console.error('Donation error:', {
        message: err.message,
        response: err.response ? {
          status: err.response.status,
          data: err.response.data,
        } : 'No response',
        stack: err.stack,
      });
      setMessage(
        err.response?.data?.message ||
        'Error submitting donation. Please try again.'
      );
    }
  };

  return (
    <div className="page-container">
      <div>
        <Navigation />
        <div className="hero-donate">
          <div className="blackDrop"></div>
          <img src={donateHero} className="heroImage" alt="" />
          <div className="heroText">
            <h1>Make a Donation</h1>
          </div>
        </div>
        <div className="content">
          <div className="form-container">
            <input
              type="text"
              placeholder="Your Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="form-input"
            />
            <input
              type="number"
              placeholder="Amount (PKR)"
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
              className="form-input"
            />
            <input
              type="file"
              accept="image/jpeg,image/png,image/jpg"
              onChange={handleFileChange}
              className="form-input"
            />
            <button onClick={handleSubmit} className="form-btn">Submit Donation</button>
            {message && <p className="form-message">{message}</p>}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Donate;
