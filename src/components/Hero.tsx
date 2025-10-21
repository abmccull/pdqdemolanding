import React from 'react'
import './Hero.css'

const Hero: React.FC = () => {
  const handleGetStarted = () => {
    document.getElementById('cta-section')?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleLearnMore = () => {
    document.getElementById('features-section')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="hero">
      <div className="container">
        <div className="hero-content">
          <h1 className="hero-title">
            Fast, Reliable Solutions for Your Business
          </h1>
          <p className="hero-subtitle">
            PDQ Demo delivers cutting-edge technology and seamless experiences. 
            Streamline your workflow and accelerate your success with our innovative platform.
          </p>
          <div className="hero-buttons">
            <button className="btn btn-primary" onClick={handleGetStarted}>
              Get Started
            </button>
            <button className="btn btn-secondary" onClick={handleLearnMore}>
              Learn More
            </button>
          </div>
        </div>
        <div className="hero-visual">
          <div className="hero-card">
            <div className="hero-card-content">
              <div className="stat">
                <div className="stat-value">99.9%</div>
                <div className="stat-label">Uptime</div>
              </div>
              <div className="stat">
                <div className="stat-value">10x</div>
                <div className="stat-label">Faster</div>
              </div>
              <div className="stat">
                <div className="stat-value">24/7</div>
                <div className="stat-label">Support</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero

