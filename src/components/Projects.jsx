'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Github, ExternalLink, ChevronDown, ChevronUp, Sparkles, RefreshCw } from 'lucide-react'
import { projects, methodColors } from '@/app/data'

function MethodBadge({ method }) {
  const c = methodColors[method] || methodColors.GET
  return (
    <span
      className="font-mono text-xs px-2 py-0.5 rounded-sm font-semibold flex-shrink-0"
      style={{ background: c.bg, color: c.text, border: `1px solid ${c.border}` }}
    >
      {method}
    </span>
  )
}

function AIDescription({ title, tech, endpoints }) {
  const [text, setText] = useState('')
  const [loading, setLoading] = useState(false)
  const [generated, setGenerated] = useState(false)
  const [error, setError] = useState('')

  const generate = async () => {
    setLoading(true)
    setError('')
    setText('')

    const endpointList = endpoints.map(e => `${e.method} ${e.path} – ${e.desc}`).join('\n')

    try {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-6',
          max_tokens: 1000,
          system: `You are a senior backend engineer writing concise, technical descriptions for a junior developer's portfolio.
Write from the developer's perspective in first person. Be specific, technically accurate, and impressive without overselling.
Keep it to 3–4 short sentences. Focus on: what the system does, key technical decisions, and one specific challenge solved.
Do NOT use bullet points. Do NOT use markdown. Plain prose only.`,
          messages: [{
            role: 'user',
            content: `Write a portfolio description for this API project I built as a junior backend developer:

Project: ${title}
Tech stack: ${tech.join(', ')}
Endpoints I built:
${endpointList}

Keep it honest and junior-level — I built this to learn and grow. 3–4 sentences max.`
          }]
        })
      })

      const data = await response.json()
      const result = data.content?.[0]?.text || ''
      if (!result) throw new Error('Empty response')

      setGenerated(true)
      let i = 0
      const interval = setInterval(() => {
        setText(result.slice(0, i + 1))
        i++
        if (i >= result.length) clearInterval(interval)
      }, 12)
    } catch (e) {
      setError('Could not generate. Check your connection.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mt-4 rounded-lg overflow-hidden"
      style={{ background: 'rgba(0,255,136,0.03)', border: '1px solid rgba(0,255,136,0.1)' }}>
      <div className="flex items-center justify-between px-4 py-2.5"
        style={{ borderBottom: '1px solid rgba(0,255,136,0.08)' }}>
        <div className="flex items-center gap-2">
          <Sparkles size={12} className="text-accent" />
          <span className="font-mono text-xs" style={{ color: 'rgba(0,255,136,0.7)' }}>AI-generated description</span>
        </div>
        <button
          onClick={generate}
          disabled={loading}
          className="flex items-center gap-1.5 font-mono text-xs text-white/30 hover:text-accent transition-colors disabled:opacity-40"
        >
          <RefreshCw size={11} className={loading ? 'animate-spin' : ''} />
          {generated ? 'regenerate' : 'generate'}
        </button>
      </div>

      <div className="p-4 min-h-[60px] flex items-start">
        {!generated && !loading && (
          <button onClick={generate}
            className="flex items-center gap-2 font-mono text-xs text-white/20 hover:text-accent/60 transition-colors">
            <Sparkles size={11} />
            Click to generate description with AI
          </button>
        )}
        {loading && (
          <div className="space-y-2 w-full">
            {[80, 95, 60].map((w, i) => (
              <div key={i} className="h-3 rounded shimmer" style={{ width: `${w}%` }} />
            ))}
          </div>
        )}
        {error && <p className="font-mono text-xs text-red-400/70">{error}</p>}
        {text && (
          <p className="font-mono text-xs text-white/55 leading-relaxed">
            {text}<span className="cursor-blink" />
          </p>
        )}
      </div>
    </div>
  )
}

function ProjectCard({ project, index }) {
  const [expanded, setExpanded] = useState(false)
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className={`panel rounded-2xl overflow-hidden border lift bg-gradient-to-br ${project.gradient} ${project.border}`}
    >
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
              style={{ background: 'rgba(255,255,255,0.04)' }}>
              {project.icon}
            </div>
            <div>
              <h3 className="text-white font-semibold text-base leading-tight">{project.title}</h3>
              <p className="text-white/30 text-xs mt-0.5 font-mono">{project.subtitle}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <a href="#" aria-label="GitHub"
              className="p-1.5 text-white/20 hover:text-accent transition-colors rounded-lg">
              <Github size={15} />
            </a>
            <a href="#" aria-label="Docs"
              className="p-1.5 text-white/20 hover:text-accent transition-colors rounded-lg">
              <ExternalLink size={15} />
            </a>
          </div>
        </div>

        {/* Tech */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.tech.map(t => (
            <span key={t} className="tag"
              style={{ color: project.accent, background: `${project.accent}0d`, borderColor: `${project.accent}22` }}>
              {t}
            </span>
          ))}
        </div>

        {/* Endpoints */}
        <div className="space-y-2">
          {(expanded ? project.endpoints : project.endpoints.slice(0, 2)).map((ep, i) => (
            <div key={i}
              className="flex items-center gap-3 rounded-lg px-3 py-2 font-mono text-xs"
              style={{ background: 'rgba(0,0,0,0.2)' }}>
              <MethodBadge method={ep.method} />
              <span className="text-white/50 truncate">{ep.path}</span>
              <span className="text-white/20 hidden sm:block ml-auto flex-shrink-0">{ep.desc}</span>
            </div>
          ))}
        </div>

        {project.endpoints.length > 2 && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="flex items-center gap-1.5 mt-3 font-mono text-xs text-white/20 hover:text-accent transition-colors"
          >
            {expanded
              ? <><ChevronUp size={12} /> hide endpoints</>
              : <><ChevronDown size={12} /> +{project.endpoints.length - 2} more endpoints</>
            }
          </button>
        )}

        <AIDescription title={project.title} tech={project.tech} endpoints={project.endpoints} />
      </div>
    </motion.div>
  )
}

export default function Projects() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 })

  return (
    <section id="projects" className="py-28 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <p className="eyebrow mb-3">// projects.list</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            APIs I've <span className="grad">built</span>
          </h2>
          <p className="text-white/35 text-sm mt-3 max-w-md">
            Each card shows real endpoints. Hit{' '}
            <span className="font-mono text-xs" style={{ color: 'rgba(0,255,136,0.6)' }}>generate</span>{' '}
            to get an AI-written description powered by Claude.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-5">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
