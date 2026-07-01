'use client'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Server, Database, ShieldCheck, FileCode } from 'lucide-react'
import { person } from '@/app/data'

const pillars = [
  { icon: Server,      label: 'API Design',       desc: 'RESTful endpoints structured for clarity, versioning, and easy integration.' },
  { icon: Database,    label: 'Database Layer',    desc: 'Schema design and query optimization across SQL and NoSQL stores.' },
  { icon: ShieldCheck, label: 'Auth & Security',   desc: 'JWT flows, rate limiting, input validation, and proper error handling.' },
  { icon: FileCode,    label: 'Documentation',     desc: 'Swagger/OpenAPI specs that make frontend teams happy to work with.' },
]

export default function About() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section id="about" className="py-28 px-6">
      <div className="max-w-5xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <p className="eyebrow mb-3">// about.json</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            The developer <span className="grad">behind the API</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10">
          {/* Bio */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {person.bio.split('\n\n').map((p, i) => (
              <p key={i} className="text-white/45 text-sm leading-relaxed mb-4">{p}</p>
            ))}

            <div className="terminal mt-6 text-xs">
              <div className="terminal-bar">
                <div className="dot dot-red"/><div className="dot dot-yellow"/><div className="dot dot-green"/>
                <span className="ml-2 text-white/20 font-mono">ralph.json</span>
              </div>
              <div className="p-4 font-mono">
                <span className="text-white/20">{'{'}</span>
                {[
                  ['name',     '"Ralph H. Lorzano"'],
                  ['role',     '"Junior Backend Developer"'],
                  ['location', '"Philippines 🇵🇭"'],
                  ['focus',    '"REST APIs & server-side systems"'],
                  ['available','true'],
                ].map(([k, v]) => (
                  <div key={k} className="ml-4">
                    <span className="text-accent/60">"{k}"</span>
                    <span className="text-white/20">: </span>
                    <span style={{ color: v === 'true' ? '#fb923c' : v.startsWith('"') ? '#00c4ff' : '#fff' }}>{v}</span>
                    <span className="text-white/20">,</span>
                  </div>
                ))}
                <span className="text-white/20">{'}'}</span>
              </div>
            </div>
          </motion.div>

          {/* Pillars */}
          <div className="grid grid-cols-2 gap-4">
            {pillars.map(({ icon: Icon, label, desc }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.15 * i + 0.2 }}
                className="panel rounded-xl p-5 lift"
              >
                <div className="w-9 h-9 rounded-lg flex items-center justify-center mb-4"
                  style={{ background: 'rgba(0,255,136,0.08)' }}>
                  <Icon size={16} className="text-accent" />
                </div>
                <h3 className="text-white text-sm font-semibold mb-1.5">{label}</h3>
                <p className="text-white/35 text-xs leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
