import { Github, Linkedin, Mail } from 'lucide-react'
import { person } from '@/app/data'

export default function Footer() {
  return (
    <footer className="border-t py-10 px-6" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-5">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-md flex items-center justify-center font-mono font-bold text-xs"
            style={{ background: '#00ff88', color: '#0a0a0f' }}>
            RL
          </div>
          <span className="font-mono text-xs text-white/25">
            Ralph H. Lorzano · {new Date().getFullYear()}
          </span>
        </div>

        <div className="flex items-center gap-5">
          {['#hero','#about','#skills','#projects','#contact'].map(h => (
            <a key={h} href={h} className="font-mono text-xs text-white/20 hover:text-accent transition-colors">
              {h.replace('#','./')}
            </a>
          ))}
        </div>

        <div className="flex gap-4">
          {[
            { icon: Github,   href: person.github },
            { icon: Linkedin, href: person.linkedin },
            { icon: Mail,     href: `mailto:${person.email}` },
          ].map(({ icon: Icon, href }) => (
            <a key={href} href={href} target="_blank" rel="noreferrer"
              className="text-white/20 hover:text-accent transition-colors">
              <Icon size={15} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
