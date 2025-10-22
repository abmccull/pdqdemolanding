import React, { useEffect, useMemo, useRef, useState } from 'react'
import './App.css'

type OrderVolumeOption = '0-5000' | '5000+'

type FormState = {
  firstName: string
  lastName: string
  email: string
  phone: string
  orderVolume: OrderVolumeOption | ''
}

type FormErrors = Partial<Record<keyof FormState, string>>

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>
    MeetingsEmbed?: {
      load: () => void
    }
  }
}

const HUBSPOT_EMBED_URL =
  'https://meetings-eu1.hubspot.com/alec-mccullough/demo?embed=true'

const personalEmailDomains = [
  'gmail.com',
  'yahoo.com',
  'hotmail.com',
  'outlook.com',
  'aol.com',
  'icloud.com',
  'me.com',
  'live.com',
]

const defaultState: FormState = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  orderVolume: '',
}

const App: React.FC = () => {
  const [formState, setFormState] = useState<FormState>(defaultState)
  const [errors, setErrors] = useState<FormErrors>({})
  const [successMessage, setSuccessMessage] = useState<string>('')
  const [showCalendar, setShowCalendar] = useState(false)
  const schedulerRef = useRef<HTMLDivElement | null>(null)

  const orderVolumeLabel = useMemo(
    () =>
      formState.orderVolume === '5000+'
        ? '5,000+ orders/month'
        : formState.orderVolume === '0-5000'
          ? '0–5,000 orders/month'
          : '',
    [formState.orderVolume],
  )

  useEffect(() => {
    if (!showCalendar) return

    const pushCalendarViewEvent = () => {
      window.dataLayer = window.dataLayer || []
      window.dataLayer.push({
        event: 'hubspot_calendar_viewed',
        orderVolume: orderVolumeLabel,
      })
    }

    const existingScript = document.querySelector(
      'script[data-hubspot-meetings="pdq-meetings-embed"]',
    )

    const initializeMeeting = () => {
      const container = schedulerRef.current
      if (!container) return

      if (!container.getAttribute('data-src')) {
        container.setAttribute('data-src', HUBSPOT_EMBED_URL)
      }

      if (window.MeetingsEmbed?.load) {
        window.MeetingsEmbed.load()
      }

      pushCalendarViewEvent()
    }

    if (existingScript) {
      initializeMeeting()
      return
    }

    const script = document.createElement('script')
    script.src =
      'https://static.hsappstatic.net/MeetingsEmbed/ex/MeetingsEmbedCode.js'
    script.type = 'text/javascript'
    script.async = true
    script.defer = true
    script.dataset.hubspotMeetings = 'pdq-meetings-embed'
    script.onload = initializeMeeting
    document.body.appendChild(script)
  }, [showCalendar, orderVolumeLabel])

  const pushFormEvent = (eventName: string) => {
    window.dataLayer = window.dataLayer || []
    window.dataLayer.push({
      event: eventName,
      orderVolume: orderVolumeLabel,
    })
  }

  const validateForm = (): FormErrors => {
    const newErrors: FormErrors = {}

    if (!formState.firstName.trim()) {
      newErrors.firstName = 'First name is required.'
    }

    if (!formState.lastName.trim()) {
      newErrors.lastName = 'Last name is required.'
    }

    if (!formState.email.trim()) {
      newErrors.email = 'Work email is required.'
    } else {
      const email = formState.email.trim().toLowerCase()
      const basicEmailRegex =
        /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i
      if (!basicEmailRegex.test(email)) {
        newErrors.email = 'Please enter a valid work email.'
      } else {
        const domain = email.split('@')[1]
        if (personalEmailDomains.includes(domain)) {
          newErrors.email = 'Please enter a valid work email.'
        }
      }
    }

    if (!formState.phone.trim()) {
      newErrors.phone = 'Phone number is required.'
    } else {
      const digitsOnly = formState.phone.replace(/\D/g, '')
      if (digitsOnly.length < 10 || digitsOnly.length > 15) {
        newErrors.phone = 'Please enter a valid phone number.'
      }
    }

    if (!formState.orderVolume) {
      newErrors.orderVolume = 'Please select a monthly order volume.'
    }

    return newErrors
  }

  const handleChange = (
    field: keyof FormState,
    value: string,
  ) => {
    setFormState((prev) => ({ ...prev, [field]: value }))
    setErrors((prev) => ({ ...prev, [field]: undefined }))
    setSuccessMessage('')
  }

  const handleOrderVolumeChange = (value: OrderVolumeOption) => {
    handleChange('orderVolume', value)
    if (value === '5000+') {
      setShowCalendar(true)
      pushFormEvent('order_volume_qualified')
    } else {
      setShowCalendar(false)
    }
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const validationErrors = validateForm()

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    pushFormEvent('demo_form_submitted')

    if (formState.orderVolume === '0-5000') {
      setSuccessMessage(
        'Thanks for your interest! PDQ is purpose-built for brands processing over 5,000 monthly orders. We’ll reach out once your growth matches our platform capabilities.',
      )
      setShowCalendar(false)
    } else {
      setSuccessMessage(
        'You’re a perfect fit! Choose a time below to meet with the PDQ team.',
      )
      setShowCalendar(true)
      setTimeout(() => {
        schedulerRef.current?.scrollIntoView({ behavior: 'smooth' })
      }, 150)
    }
  }

  return (
    <div className="page">
      <div className="page__brand-bar" role="banner">
        <div className="page__brand-bar-inner">
          <a
            className="page__brand-link"
            href="https://www.prettydamnquick.com"
            target="_blank"
            rel="noreferrer"
          >
            <img
              className="page__brand-logo"
              src="/pdq-logo-wordmark.svg"
              alt="PrettyDamnQuick"
              loading="lazy"
            />
          </a>
        </div>
      </div>
      <header className="hero">
        <div className="hero__text-block">
          <span className="hero__tag">Trusted by Shopify Plus trailblazers</span>
          <h1 className="hero__headline">
            Turn your checkout into a profit engine.
          </h1>
          <p className="hero__subheadline">
            Show every customer their perfect checkout — segment, personalize,
            and A/B test in real time.
          </p>
          <p className="hero__intro">
            Ready to unlock your checkout’s full potential?
          </p>
        </div>
      </header>

      <main className="content">
        <section className="content__left" aria-label="Book a demo form">
          <form className="demo-form" onSubmit={handleSubmit} noValidate>
            <div className="demo-form__row">
              <div className="demo-form__field">
                <label htmlFor="firstName">First Name</label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  value={formState.firstName}
                  onChange={(event) =>
                    handleChange('firstName', event.target.value)
                  }
                  placeholder="Alex"
                  required
                />
                {errors.firstName && (
                  <p className="demo-form__error">{errors.firstName}</p>
                )}
              </div>
              <div className="demo-form__field">
                <label htmlFor="lastName">Last Name</label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  value={formState.lastName}
                  onChange={(event) =>
                    handleChange('lastName', event.target.value)
                  }
                  placeholder="Rivera"
                  required
                />
                {errors.lastName && (
                  <p className="demo-form__error">{errors.lastName}</p>
                )}
              </div>
            </div>

            <div className="demo-form__field">
              <label htmlFor="email">Work Email</label>
              <input
                id="email"
                name="email"
                type="email"
                value={formState.email}
                onChange={(event) => handleChange('email', event.target.value)}
                placeholder="you@brand.com"
                required
              />
              {errors.email && (
                <p className="demo-form__error">{errors.email}</p>
              )}
            </div>

            <div className="demo-form__field">
              <label htmlFor="phone">Phone Number</label>
              <input
                id="phone"
                name="phone"
                type="tel"
                value={formState.phone}
                onChange={(event) => handleChange('phone', event.target.value)}
                placeholder="(555) 123-4567"
                required
              />
              {errors.phone && (
                <p className="demo-form__error">{errors.phone}</p>
              )}
            </div>

            <fieldset className="demo-form__field demo-form__field--fieldset">
              <legend>Monthly Orders</legend>
              <div className="demo-form__radio-group">
                <label className="demo-form__radio">
                  <input
                    type="radio"
                    name="orderVolume"
                    value="0-5000"
                    checked={formState.orderVolume === '0-5000'}
                    onChange={() => handleOrderVolumeChange('0-5000')}
                    required
                  />
                  <span>0–5,000 orders/month</span>
                </label>
                <label className="demo-form__radio">
                  <input
                    type="radio"
                    name="orderVolume"
                    value="5000+"
                    checked={formState.orderVolume === '5000+'}
                    onChange={() => handleOrderVolumeChange('5000+')}
                    required
                  />
                  <span>5,000+ orders/month</span>
                </label>
              </div>
              {errors.orderVolume && (
                <p className="demo-form__error">{errors.orderVolume}</p>
              )}
            </fieldset>

            <button type="submit" className="demo-form__submit">
              Book My Demo
            </button>

            {successMessage && (
              <div
                className={`demo-form__success demo-form__success--${showCalendar ? 'qualified' : 'not-qualified'}`}
                role="status"
              >
                <p>{successMessage}</p>
                {showCalendar && (
                  <button
                    type="button"
                    className="demo-form__success-button"
                    onClick={() =>
                      schedulerRef.current?.scrollIntoView({
                        behavior: 'smooth',
                      })
                    }
                  >
                    Schedule Now
                  </button>
                )}
              </div>
            )}
          </form>
        </section>

        <aside className="content__right" aria-label="Why PDQ">
          <figure className="value-card__visual">
            <img
              src="/pdq-hero-visual.svg"
              alt="PDQ personalizes checkout flows with segmented delivery options"
              loading="lazy"
            />
            <figcaption>
              Checkout segmentation, personalization, and profit-aware delivery.
            </figcaption>
          </figure>
          <div className="value-card">
            <h2 className="value-card__headline">
              Why leading brands choose PDQ
            </h2>
            <ul className="value-card__list">
              <li>
                Segment every shopper — tailor checkout by location, cart size,
                and first-time vs. returning customers.
              </li>
              <li>
                A/B test directly in checkout — optimize shipping, offers, trust
                badges, and upsells.
              </li>
              <li>
                Profit-first logic — only show free express shipping when it
                boosts margins.
              </li>
              <li>
                Increase conversion and AOV with delivery promises that adapt
                dynamically.
              </li>
              <li>
                Proven impact: Laura Geller added $14M in annualized revenue with
                PDQ’s segmented checkout.
              </li>
            </ul>
            <div className="value-card__tagline">
              Trusted by the fastest-growing Shopify Plus brands.
            </div>
            <div className="value-card__logos" aria-label="Customer logos">
              {[
                'Laura Geller',
                'Cozy Earth',
                'Jones Road Beauty',
                'Underoutfit',
                'Tushy',
                'Groove Life',
              ].map((brand) => (
                <div key={brand} className="value-card__logo-pill">
                  {brand}
                </div>
              ))}
            </div>
          </div>
        </aside>
      </main>

      <section
        ref={schedulerRef}
        className={`scheduler ${showCalendar ? 'scheduler--visible' : ''}`}
        aria-hidden={!showCalendar}
      >
        {showCalendar ? (
          <div
            className="meetings-iframe-container"
            data-src={HUBSPOT_EMBED_URL}
          />
        ) : (
          <div className="scheduler__placeholder">
            <p>Select “5,000+ orders/month” to unlock your priority scheduler.</p>
          </div>
        )}
      </section>
    </div>
  )
}

export default App
