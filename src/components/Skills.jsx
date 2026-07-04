'use client'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { skills } from '@/app/data'

export default function Skills() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section id="skills" className="py-28 px-6">
      <div className="max-w-5xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <p className="eyebrow mb-3">// skills.config</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            Tools and <span className="grad">Frameworks</span>
          </h2>
          <p className="text-white/35 text-sm mt-3 max-w-md">
            The tools I reach for when building server-side systems and APIs.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {skills.map(({ category, items }, ci) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: ci * 0.07 }}
              className="panel rounded-xl p-5 lift"
            >
              <p className="font-mono text-xs text-white/25 mb-4 tracking-wider uppercase">{category}</p>
              <div className="flex flex-wrap gap-2">
                {items.map((skill, si) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.3, delay: ci * 0.07 + si * 0.04 + 0.2 }}
                    className="tag"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-8 panel rounded-xl p-5"
        >
          <p className="font-mono text-xs text-white/25 mb-4 tracking-wider uppercase">Core Focus</p>
          <div className="flex flex-wrap gap-3 items-center">
          {['Node.js', 'Express.js', 'REST API', 'JWT Auth', 'Socket.IO', 'Postman', 'Git'].map((t, i) => (
              <div key={t} className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-accent/60" style={{ background: 'rgba(0,255,136,0.6)' }} />
                <span className="font-mono text-sm text-white/60">{t}</span>
                {i < 5 && <div className="w-px h-4 ml-1" style={{ background: 'rgba(255,255,255,0.08)' }} />}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
