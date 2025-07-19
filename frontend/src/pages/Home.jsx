import React, { useEffect, useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import heroImage from '../assets/hero-image.svg';
import aiImage from '../assets/image1.png';
import shieldImage from '../assets/shield.png';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { UserContext } from '../UserContext';
import UserModal from '../components/UserModal';
import RadarFeed from './RadarFeed';

const Home = () => {
  const { user } = useContext(UserContext);
  const [showModal, setShowModal] = useState(false);
  const [showLoginNotice, setShowLoginNotice] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  const toggleModal = () => setShowModal(!showModal);

  const handleCheckClick = () => {
    if (user) {
      navigate('/report');
    } else {
      setShowLoginNotice(true);
      setTimeout(() => {
        navigate('/login');
      }, 1000);
    }
  };
  

  return (
    <div className="homepage">
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">🛡️ JobShield</div>
        <ul className="nav-links">
          <li><a href="#">Home</a></li>
          <li><a href="#problem">Why This?</a></li>
          <li><a href="#features">Features</a></li>
          <li>
            {user ? (
              <>
                <div className="avatar-container" onClick={toggleModal}>
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/1077/1077012.png"
                    alt="Avatar"
                    className="avatar-icon"
                  />
                </div>
                {showModal && <UserModal user={user} onClose={toggleModal} />}
              </>
            ) : (
              <Link to="/login" className="login-btn">Login</Link>
            )}
          </li>
        </ul>
      </nav>

      {/* Hero */}
      <section className="hero fade-in" data-aos="fade-up">
        <div className="hero-text">
          <h1>Protect Yourself from Fake Internships & Jobs</h1>
          <p>AI-powered job scanner + community vote = protection from scammers.</p>
          <button onClick={handleCheckClick} className="cta-button">
            Check a Fake Job
          </button>
        </div>
        <img src={heroImage} alt="AI Scanner" className="hero-img" />
      </section>

      
      {showLoginNotice && (
        <div className="login-notice">Kindly login to continue</div>
      )}

      {/* Problem Section */}
      <section className="problem" data-aos="fade-right" id='problem'>
        <h2>The Growing Threat of Fake Jobs</h2>
        <p>
          Over 60% of college students report receiving scam offers. The rise in fake internships,
          non-existent recruiters, and fake websites is alarming.
        </p>
        <div className="stats">
          <div className="stat fade-in">
            <h3>60K+</h3>
            <p>Fake Job Cases in 2024</p>
          </div>
          <div className="stat fade-in delay1">
            <h3>82%</h3>
            <p>Students fall for fake offers</p>
          </div>
          <div className="stat fade-in delay2">
            <h3>10x</h3>
            <p>Rise in the last 3 years</p>
          </div>
        </div>
      </section>

      {/* Solution */}
      <section className="solution" data-aos="fade-up" id="features">
        <div className="solution-content">
          <img src={aiImage} alt="Solution" />
          <div className="solution-text">
            <h2>How We Solve It</h2>
            <ul>
              <li>AI-powered job scoring and detection</li>
              <li>Community reports and voting system</li>
              <li>Open dashboard for transparency</li>
              <li>Scalable and secure verification process</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Radar Feed Section */}
      <section className="radar-section" id="radar" data-aos="fade-up">
        <h2>Latest Scam Radar</h2>
        <p>Jobs recently flagged by our AI engine and community. Stay alert.</p>
        <Link to="/radar" className="view-more-btn">
          View Full Radar →
        </Link>
      </section>

      {/* Feature Cards */}
      <section className="features" data-aos="zoom-in-up">
  <h2>Platform Highlights</h2>
  <div className="feature-cards">
    <div className="card slide-up">
      <h3>AI-Based Rating</h3>
      <p>We use GPT to analyze job descriptions, patterns & offer letters for authenticity.</p>
    </div>
    <div className="card slide-up delay1">
      <h3>Community Voting</h3>
      <p>Users can upvote or flag job reports, strengthening accuracy and trust.</p>
    </div>
    <div className="card slide-up delay2">
      <h3>Secure Login</h3>
      <p>Login with Google – safe, fast & no password headaches.</p>
    </div>
    <div className="card slide-up delay3">
      <h3>Scam Radar Feed</h3>
      <p>Live feed of flagged jobs to help users spot real-time scam trends instantly.</p>
    </div>
    
  </div>
</section>


      {/* Final CTA */}
      <section className="final-cta">
        <img src={shieldImage} alt="Protection" />
        <div>
          <h2>Be Part of the Solution</h2>
          <p>Report fake job offers anonymously or with your profile. Help us build a safer web.</p>
          <a href="/dashboard" className="cta-button">Explore Public Dashboard</a>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>© 2025 JobShield. Built for real-world protection.</p>
      </footer>
    </div>
  );
};

export default Home;
