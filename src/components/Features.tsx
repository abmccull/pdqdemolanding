import React from 'react'
import './Features.css'

interface Feature {
  icon: string
  title: string
  description: string
}

const features: Feature[] = [
  {
    icon: '⚡',
    title: 'Lightning Fast',
    description: 'Experience blazing-fast performance with our optimized infrastructure. Load times reduced by up to 10x.'
  },
  {
    icon: '🔒',
    title: 'Secure by Default',
    description: 'Enterprise-grade security built in from the ground up. Your data is encrypted and protected 24/7.'
  },
  {
    icon: '🚀',
    title: 'Scalable',
    description: 'Grow without limits. Our platform scales effortlessly from startup to enterprise.'
  },
  {
    icon: '📊',
    title: 'Real-time Analytics',
    description: 'Make data-driven decisions with comprehensive analytics and insights at your fingertips.'
  },
  {
    icon: '🔧',
    title: 'Easy Integration',
    description: 'Seamlessly integrate with your existing tools and workflows. Get up and running in minutes.'
  },
  {
    icon: '💬',
    title: '24/7 Support',
    description: 'Our dedicated support team is always here to help. Get expert assistance whenever you need it.'
  }
]

const Features: React.FC = () => {
  return (
    <section id="features-section" className="features">
      <div className="container">
        <div className="features-header">
          <h2 className="features-title">Everything You Need to Succeed</h2>
          <p className="features-subtitle">
            Powerful features designed to help you work smarter, not harder
          </p>
        </div>
        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              <div className="feature-icon">{feature.icon}</div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Features

