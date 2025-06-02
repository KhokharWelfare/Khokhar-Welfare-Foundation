import React from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import homeHero from '../assets/home.png';

function Home() {
  return (
    <div className="page-container">
      <div>
        <Navigation />
        <div className="hero">
          <div className="blackDrop"></div>
          <img src={homeHero} className='heroImage' alt="" />
          <div className="heroText">  
          <h1>Khokhar Welfare Foundation</h1>
          <p>Empowering families, building futures</p>
          <a href="/donate" className="hero-btn">Donate Now</a>
          </div>
        </div>
        <div className="content">
          <h2>About Us</h2>
          <p>
            Khokhar Welfare Foundation is an organization where you can donate to support needy families in society. The purpose of your donations is to help them build a bright future through education, healthcare, and community support.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Home;
