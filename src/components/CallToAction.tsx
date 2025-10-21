import React, { useState } from 'react'
import './CallToAction.css'

const CallToAction: React.FC = () => {
  const [email, setEmail] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      // Here you would typically send the email to your backend
      console.log('Email submitted:', email)
      setIsSubmitted(true)
      setTimeout(() => {
        setEmail('')
        setIsSubmitted(false)
      }, 3000)
    }
  }

  return (
    <section id="cta-section" className="cta">
      <div className="container">
        <div className="cta-content">
          <h2 className="cta-title">Ready to Get Started?</h2>
          <p className="cta-subtitle">
            Join thousands of satisfied customers and transform your workflow today
          </p>
          {!isSubmitted ? (
            <form className="cta-form" onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder="Enter your email"
                className="cta-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button type="submit" className="cta-button">
                Start Free Trial
              </button>
            </form>
          ) : (
            <div className="cta-success">
              <span className="success-icon">✓</span>
              <p>Thanks! We'll be in touch soon.</p>
            </div>
          )}
          <p className="cta-note">No credit card required • 14-day free trial</p>
        </div>
      </div>
    </section>
  )
}

export default CallToAction

