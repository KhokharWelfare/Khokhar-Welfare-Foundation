import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import usageHero from '../assets/usage.png';

function ViewUsage() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/transaction')
      .then(res => setTransactions(res.data.transactions))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="page-container">
      <div>
        <Navigation />
        <div className="hero-donate">
          <div className="blackDrop"></div>
          <img src={usageHero} className='heroImage-usage' alt="" />
          <div className="heroText">
          <h1>View Usage</h1>
          </div>
        </div>
        <div className="content">
          <table className="table">
            <thead>
              <tr>
                <th>Amount (PKR)</th>
                <th>Recipient</th>
                <th>Purpose</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((t) => (
                <tr key={t._id}>
                  <td>{t.amount}</td>
                  <td>{t.recipient}</td>
                  <td>{t.purpose}</td>
                  <td>{new Date(t.createdAt).toLocaleDateString()}</td>
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

export default ViewUsage;
