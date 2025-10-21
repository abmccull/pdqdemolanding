import React from 'react'
import Hero from './components/Hero'
import Features from './components/Features'
import CallToAction from './components/CallToAction'
import Footer from './components/Footer'
import './App.css'

const App: React.FC = () => {
  return (
    <div className="app">
      <Hero />
      <Features />
      <CallToAction />
      <Footer />
    </div>
  )
}

export default App

