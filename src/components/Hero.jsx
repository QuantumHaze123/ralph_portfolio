'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Github, Linkedin, Mail, Download, ArrowRight, ChevronDown } from 'lucide-react'
import { person } from '@/app/data'

const TERMINAL_LINES = [
  { delay: 0,    type: 'cmd',    text: 'node server.js' },
  { delay: 600,  type: 'info',   text: '→  Server running on port 3000' },
  { delay: 1100, type: 'info',   text: '→  Connected to MongoDB database' },
  { delay: 1600, type: 'req',    text: 'GET /api/v1/health' },
  { delay: 2000, type: 'res',    text: '200 OK  { "status": "healthy" }' },
  { delay: 2600, type: 'req',    text: 'POST /api/v1/users/auth' },
  { delay: 3000, type: 'res',    text: '200 OK  { "token": "eyJhbGci..." }' },
  { delay: 3600, type: 'info',   text: '→  JWT verified · rate limiter active' },
  { delay: 4100, type: 'cursor', text: '' },
]

const typeColor = {
  cmd:    '#c8c8d8',
  info:   'rgba(0,255,136,0.55)',
  req:    '#00c4ff',
  res:    '#00ff88',
  cursor: '#00ff88',
}
const typePrefix = { cmd: '$ ', info: '', req: '← ', res: '→ ', cursor: '$ ' }

function TerminalLine({ line, visible }) {
  if (!visible) return null
  return (
    <div className="flex gap-2 items-start leading-relaxed">
      <span style={{ color: typeColor[line.type], opacity: 0.5, flexShrink: 0 }}>
        {typePrefix[line.type]}
      </span>
      {line.type === 'cursor'
        ? <span className="cursor-blink" />
        : <span style={{ color: typeColor[line.type] }}>{line.text}</span>
      }
    </div>
  )
}

const c = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
}
const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22,1,0.36,1] } },
}

export default function Hero() {
  const [visibleLines, setVisibleLines] = useState([])

  useEffect(() => {
    const timers = TERMINAL_LINES.map((line, i) =>
      setTimeout(() => setVisibleLines(v => [...v, i]), line.delay + 400)
    )
    return () => timers.forEach(clearTimeout)
  }, [])

  const go = (href) => document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section id="hero" className="min-h-screen flex items-center px-6 pt-24 pb-16">
      <div className="max-w-5xl mx-auto w-full">
        <div className="grid lg:grid-cols-[1fr,1.05fr] gap-14 items-center">

          {/* Left: intro */}
          <motion.div variants={c} initial="hidden" animate="show">
            <motion.div variants={item} className="flex items-center gap-2 mb-6">
              <div className="status-dot" />
              <span className="font-mono text-xs text-white/35">available for hire</span>
            </motion.div>

            <motion.div variants={item}>
              <p className="eyebrow mb-3">// backend developer</p>
              <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight tracking-tight mb-2">
                Ralph H.<br />
                <span className="grad">Lorzano</span>
              </h1>
            </motion.div>

            <motion.p variants={item} className="text-white/45 text-[15px] leading-relaxed max-w-sm mt-5 mb-8">
              {person.tagline}
            </motion.p>

            <motion.div variants={item} className="flex flex-wrap gap-3 mb-8">
              <a href={person.resumeUrl} download className="btn-solid">
                <Download size={14} /> Resume
              </a>
              <button onClick={() => go('#projects')} className="btn-ghost">
                View Projects <ArrowRight size={14} />
              </button>
            </motion.div>

            <motion.div variants={item} className="flex items-center gap-4">
              {[
                { icon: Github,   href: person.github,              label: 'GitHub' },
                { icon: Linkedin, href: person.linkedin,            label: 'LinkedIn' },
                { icon: Mail,     href: `mailto:${person.email}`,   label: 'Email' },
              ].map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noreferrer"
                  className="text-white/25 hover:text-accent transition-colors"
                  whileHover={{ scale: 1.15, y: -2 }}
                >
                  <Icon size={18} />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* Right: terminal */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.22,1,0.36,1] }}
          >
            <div className="terminal overflow-hidden">
              <div className="terminal-bar">
                <div className="dot dot-red"/>
                <div className="dot dot-yellow"/>
                <div className="dot dot-green"/>
                <span className="ml-2 font-mono text-xs text-white/20">~/projects/api-server</span>
              </div>
              <div className="p-5 space-y-1.5 text-xs font-mono min-h-[220px]">
                {TERMINAL_LINES.map((line, i) => (
                  <TerminalLine key={i} line={line} visible={visibleLines.includes(i)} />
                ))}
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3 mt-3">
              {[
                { v: '4',    l: 'APIs Built' },
                { v: '1+',   l: 'Year Exp.' },
                { v: '100%', l: 'REST Focused' },
              ].map(({ v, l }) => (
                <div key={l} className="panel rounded-xl p-3 text-center">
                  <div className="font-mono font-bold text-accent text-lg">{v}</div>
                  <div className="text-white/25 text-xs mt-0.5">{l}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="flex justify-center mt-16"
        >
          <motion.button
            onClick={() => go('#about')}
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 1.8, repeat: Infinity }}
            className="text-white/15 hover:text-accent transition-colors"
          >
            <ChevronDown size={20} />
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}
