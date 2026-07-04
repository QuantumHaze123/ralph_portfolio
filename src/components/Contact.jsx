'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Send, CheckCircle, Github, Linkedin, Mail } from 'lucide-react'
import { person } from '@/app/data'

export default function Contact() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle')
  const [feedback, setFeedback] = useState('')

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'required'
    if (!form.email.trim()) e.email = 'required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'invalid email'
    if (!form.message.trim()) e.message = 'required'
    return e
  }

  const submit = async (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) {
      setErrors(errs)
      setFeedback('')
      return
    }

    setErrors({})
    setFeedback('')
    setStatus('sending')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Unable to send message right now.')
      }

      setStatus('success')
      setForm({ name: '', email: '', message: '' })
      setTimeout(() => setStatus('idle'), 5000)
    } catch (error) {
      setStatus('error')
      setFeedback(error.message || 'Unable to send message right now.')
      setTimeout(() => {
        setStatus('idle')
        setFeedback('')
      }, 7000)
    }
  }

  const inputClass = (name) =>
    `w-full border rounded-lg px-4 py-2.5 text-white text-sm outline-none transition-all font-mono placeholder-white/20 ${
      errors[name]
        ? 'border-red-500/30 focus:border-red-500/50'
        : 'border-white/6 focus:border-green-500/30'
    }`

  const inputStyle = { background: 'rgba(255,255,255,0.03)' }

  return (
    <section id="contact" className="py-28 px-6">
      <div className="max-w-5xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <p className="eyebrow mb-3">// contact.post</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            Let's <span className="grad">connect</span>
          </h2>
          <p className="text-white/35 text-sm mt-3 max-w-md">
            Open to junior backend roles, internships, and freelance API work. Response within 24 hours.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-[1fr,1.4fr] gap-10">
          {/* Left: contact info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-4"
          >
            {[
              { icon: Mail,     label: 'email',    value: person.email,                     href: `mailto:${person.email}` },
              { icon: Github,   label: 'github',   value: person.github.split('/').pop(),   href: person.github },
              { icon: Linkedin, label: 'linkedin', value: person.linkedin.split('/').pop(),  href: person.linkedin },
            ].map(({ icon: Icon, label, value, href }) => (
              <a key={label} href={href} target="_blank" rel="noreferrer"
                className="flex items-center gap-4 panel rounded-xl p-4 lift group block">
                <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: 'rgba(0,255,136,0.07)' }}>
                  <Icon size={15} className="text-accent" />
                </div>
                <div>
                  <div className="font-mono text-xs text-white/25 mb-0.5">{label}</div>
                  <div className="font-mono text-xs text-white/55 group-hover:text-accent transition-colors">{value}</div>
                </div>
              </a>
            ))}

            <div className="panel rounded-xl p-4"
              style={{ borderColor: 'rgba(0,255,136,0.12)', background: 'rgba(0,255,136,0.02)' }}>
              <div className="flex items-center gap-2 mb-2">
                <div className="status-dot" />
                <span className="font-mono text-xs text-accent">Accepting Opportunities</span>
              </div>
              <p className="font-mono text-xs text-white/25 leading-relaxed">
                Looking for backend, API, or server-side engineering roles in the Philippines or remote.
              </p>
            </div>
          </motion.div>

          {/* Right: form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="panel rounded-2xl p-7"
          >
            <AnimatePresence mode="wait">
              {status === 'success' ? (
                <motion.div
                  key="ok"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-14 text-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', bounce: 0.5, delay: 0.1 }}
                    className="w-16 h-16 rounded-full flex items-center justify-center mb-5"
                    style={{ background: 'rgba(0,255,136,0.08)' }}
                  >
                    <CheckCircle size={32} className="text-accent" />
                  </motion.div>
                  <p className="font-mono text-sm text-white/60 mb-1">// 200 OK</p>
                  <p className="text-white font-semibold mb-2">Message sent!</p>
                  <p className="text-white/35 text-xs font-mono">I'll reply within 24 hours.</p>
                </motion.div>
              ) : status === 'error' ? (
                <motion.div
                  key="error"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-12 text-center"
                >
                  <div className="w-14 h-14 rounded-full flex items-center justify-center mb-4 border border-red-500/25" style={{ background: 'rgba(239,68,68,0.08)' }}>
                    <Mail size={24} className="text-red-400" />
                  </div>
                  <p className="font-mono text-sm text-white/60 mb-1">// failed</p>
                  <p className="text-white font-semibold mb-2">Your message could not be sent</p>
                  <p className="text-white/35 text-xs font-mono max-w-sm">{feedback || 'Please try again in a moment or email me directly.'}</p>
                </motion.div>
              ) : (
                <motion.form key="form" onSubmit={submit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="font-mono text-xs text-white/30 block mb-1.5">
                        name <span className="text-accent/50">*</span>
                        {errors.name && <span className="text-red-400/70 ml-2">// {errors.name}</span>}
                      </label>
                      <input
                        type="text"
                        placeholder="John Doe"
                        value={form.name}
                        onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                        className={inputClass('name')}
                        style={inputStyle}
                      />
                    </div>
                    <div>
                      <label className="font-mono text-xs text-white/30 block mb-1.5">
                        email <span className="text-accent/50">*</span>
                        {errors.email && <span className="text-red-400/70 ml-2">// {errors.email}</span>}
                      </label>
                      <input
                        type="email"
                        placeholder="john@example.com"
                        value={form.email}
                        onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                        className={inputClass('email')}
                        style={inputStyle}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="font-mono text-xs text-white/30 block mb-1.5">
                      message <span className="text-accent/50">*</span>
                      {errors.message && <span className="text-red-400/70 ml-2">// {errors.message}</span>}
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Hi Ralph, I'd like to..."
                      value={form.message}
                      onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                      className={inputClass('message')}
                      style={{ ...inputStyle, resize: 'none' }}
                    />
                  </div>

                  <motion.button
                    type="submit"
                    disabled={status === 'sending'}
                    className="btn-solid w-full justify-center disabled:opacity-50"
                    whileHover={{ scale: status === 'sending' ? 1 : 1.01 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {status === 'sending' ? (
                      <>
                        <motion.div
                          className="w-3.5 h-3.5 border-2 rounded-full"
                          style={{ borderColor: '#0a0a0f4d', borderTopColor: '#0a0a0f' }}
                          animate={{ rotate: 360 }}
                          transition={{ duration: 0.7, repeat: Infinity, ease: 'linear' }}
                        />
                        sending...
                      </>
                    ) : (
                      <><Send size={13} /> send message</>
                    )}
                  </motion.button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
