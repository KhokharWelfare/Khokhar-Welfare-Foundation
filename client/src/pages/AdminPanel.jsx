import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

function AdminPanel() {
  const [donations, setDonations] = useState([]);
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setMessage('Please log in as admin');
      return;
    }
    Promise.all([
      axios.get('http://localhost:5000/api/admin/donations', { headers: { Authorization: `Bearer ${token}` } }),
      axios.get('http://localhost:5000/api/admin/users', { headers: { Authorization: `Bearer ${token}` } }),
    ])
      .then(([donationsRes, usersRes]) => {
        setDonations(donationsRes.data);
        setUsers(usersRes.data);
      })
      .catch(err => setMessage(err.response?.data?.message || 'Error fetching data'));
  }, []);

  const handleStatusUpdate = async (id, status) => {
    const token = localStorage.getItem('token');
    try {
      const res = await axios.patch(`http://localhost:5000/api/admin/donations/${id}`, { status }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setDonations(donations.map(d => d._id === id ? res.data : d));
      setMessage('Status updated');
    } catch (err) {
      setMessage(err.response?.data?.message || 'Error updating status');
    }
  };

  return (
    <div className="page-container">
      <div>
        <Navigation />
        <div className="hero" style={{ backgroundImage: 'url(https://via.placeholder.com/1200x400?text=Admin+Dashboard)' }}>
          <h1>Admin Dashboard</h1>
        </div>
        <div className="content">
          {message && <p className="form-message">{message}</p>}
          <h2>Donations</h2>
          <table className="table">
            <thead>
              <tr>
                <th>Donor</th>
                <th>Amount</th>
                <th>Purpose</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {donations.map((d) => (
                <tr key={d._id}>
                  <td>{d.donorName}</td>
                  <td>{d.amount}</td>
                  <td>{d.purpose}</td>
                  <td>{d.status}</td>
                  <td>
                    <button
                      onClick={() => handleStatusUpdate(d._id, d.status === 'Pending' ? 'Disturbed' : 'Pending')}
                      className="table-btn"
                    >
                      Toggle Status
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <h2>Users</h2>
          <table className="table">
            <thead>
              <tr>
                <th>Email</th>
                <th>Role</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u._id}>
                  <td>{u.email}</td>
                  <td>{u.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default AdminPanel;
