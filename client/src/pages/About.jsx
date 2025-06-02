import React from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import aboutHero from '../assets/about.jpg'

function About() {
  return (
    <div className="page-container">
      <div>
        <Navigation />
        <div className="hero">
          <div className="blackDrop"></div>
          <img src={aboutHero} className='heroImage' alt="" />
          <div className="heroText">
          <h1>About Khokhar Welfare Foundation</h1>
          </div>
        </div>
        <div className="content">
          <p>
            Khokhar Welfare Organization is a newly established non-profit initiative founded with a deep sense of responsibility towards society. The organization was created to be a source of hope for those struggling with poverty, lack of education, inadequate healthcare, and social neglect. Even in its early days, the vision is clear—to make a lasting impact through compassion, service, and community-driven solutions. Inspired by the values of empathy, equality, and dedication, the organization aims to bring together individuals who believe in giving back and creating a better world for everyone, regardless of their background, status, or location.

At the core of Khokhar Welfare Organization is the belief that real change begins at the grassroots level. That is why the organization places a strong focus on local community development. Whether it’s helping a child receive quality education, supporting a family with monthly food rations, or arranging free medical camps for underserved areas, every effort is designed to directly benefit those who need it most. The team works closely with residents, community leaders, and volunteers to identify real-world issues and respond to them in practical and sustainable ways. This bottom-up approach ensures that solutions are not only effective but also respectful of the unique challenges faced by each community.

One of the foundational pillars of the organization is education. Khokhar Welfare Organization strongly believes that education is the key to breaking the cycle of poverty. In the near future, the organization plans to launch free tutoring centers for children in low-income areas, distribute school supplies, and offer scholarships to talented students who cannot afford higher education. The goal is not only to educate but to inspire children to dream big and empower them to become leaders of tomorrow. Special attention will be given to promoting literacy among girls and providing them equal opportunities to learn, grow, and thrive.

In addition to education, healthcare is another major focus area. The organization is actively working towards arranging health awareness campaigns, free checkups, and medical aid for those who are unable to afford basic health services. By collaborating with doctors, local clinics, and health professionals, Khokhar Welfare Organization aims to create a healthcare safety net for vulnerable populations. There are also plans to provide mental health support and counseling for people struggling with stress, trauma, or addiction—topics often neglected in underserved areas.

Beyond these services, Khokhar Welfare Organization also aims to serve as a disaster response and humanitarian relief unit. In times of floods, earthquakes, or any emergency, the organization hopes to be among the first to respond with food, shelter, medical aid, and emotional support. Even now, the team is building networks and logistical plans to ensure quick and effective mobilization when needed. The organization believes that in moments of crisis, timely action can mean the difference between life and death, hope and despair.

What makes Khokhar Welfare Organization truly unique is its community-first mindset. Rather than simply offering short-term aid, the focus is on building long-term self-reliance. Vocational training, small business support, and awareness programs are in the pipeline to help individuals stand on their own feet. The aim is to not just give charity, but to restore dignity, purpose, and confidence. Every effort, no matter how small, is made with the intention of igniting a chain reaction of positivity, kindness, and transformation.

Though the journey has just begun, Khokhar Welfare Organization is filled with ambition, energy, and a deep commitment to serve. The road ahead may be challenging, but the dedication of its team, the support of kind-hearted individuals, and the prayers of those being helped make every step worthwhile. This organization is more than just a name—it is a movement, a promise, and a light for those walking through the darkest times. With continued efforts and community involvement, Khokhar Welfare Organization hopes to become a beacon of hope for generations to come.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default About;
