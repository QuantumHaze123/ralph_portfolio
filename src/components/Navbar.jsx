'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const links = [
  { label: 'home',     href: '#hero' },
  { label: 'about',    href: '#about' },
  { label: 'skills',   href: '#skills' },
  { label: 'projects', href: '#projects' },
  { label: 'contact',  href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const go = (href) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
    setOpen(false)
  }

  return (
    <>
      <motion.nav
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'py-2' : 'py-4'}`}
      >
        <div className={`max-w-5xl mx-auto px-6 flex items-center justify-between h-12 ${scrolled ? 'panel rounded-xl' : ''}`}>
          {/* Logo */}
          <button onClick={() => go('#hero')} className="flex items-center gap-2.5 group">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center font-mono font-bold text-xs"
              style={{ background: '#00ff88', color: '#0a0a0f' }}
            >
              RL
            </div>
            <span className="font-mono text-sm text-white/70 group-hover:text-accent transition-colors">
              ralph<span className="text-accent">.</span>dev
            </span>
          </button>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1">
            {links.map(l => (
              <button
                key={l.label}
                onClick={() => go(l.href)}
                className="px-3 py-1.5 font-mono text-xs text-white/40 hover:text-accent transition-colors rounded-md"
              >
                ./{l.label}
              </button>
            ))}
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden text-white/40 hover:text-accent transition-colors"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 md:hidden flex flex-col items-center justify-center gap-6"
            style={{ background: 'rgba(10,10,15,0.97)', backdropFilter: 'blur(20px)' }}
          >
            {links.map((l, i) => (
              <motion.button
                key={l.label}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
                onClick={() => go(l.href)}
                className="font-mono text-xl text-white/50 hover:text-accent transition-colors"
              >
                ./{l.label}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
