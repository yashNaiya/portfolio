import { useEffect, useState } from 'react'
import { education, experience, profile, projects, skills } from './data.js'

const nav = [
  ['home', 'Home'],
  ['about', 'About'],
  ['projects', 'Projects'],
  ['experience', 'Experience'],
  ['education', 'Education'],
  ['contact', 'Contact'],
]

/* ---------- icons (inline SVG, inherit currentColor) ---------- */
const Icon = {
  github: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.05-.71.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.68 0-1.25.45-2.28 1.18-3.08-.12-.29-.51-1.46.11-3.04 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.62 1.58.23 2.75.11 3.04.74.8 1.18 1.83 1.18 3.08 0 4.41-2.69 5.38-5.26 5.67.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5Z"
      />
    </svg>
  ),
  linkedin: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z"
      />
    </svg>
  ),
  mail: (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-10 6L2 7" />
    </svg>
  ),
  arrow: (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  ),
  external: (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 17 17 7M8 7h9v9" />
    </svg>
  ),
  moon: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path fill="currentColor" d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" />
    </svg>
  ),
  sun: (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <circle cx="12" cy="12" r="4.5" fill="currentColor" />
      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </svg>
  ),
  menu: (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  ),
  close: (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  ),
}

/* ---------- hooks ---------- */
function useTheme() {
  const [theme, setTheme] = useState(() => document.documentElement.dataset.theme || 'light')
  useEffect(() => {
    document.documentElement.dataset.theme = theme
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'dark' ? '#0f1012' : '#fafafa')
    try {
      localStorage.setItem('theme', theme)
    } catch {
      /* storage unavailable */
    }
  }, [theme])
  return [theme, () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))]
}

/* Highlights the nav link for the section currently in view. */
function useActiveSection() {
  const [active, setActive] = useState('home')
  useEffect(() => {
    const sections = nav.map(([id]) => document.getElementById(id)).filter(Boolean)
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && setActive(e.target.id))
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    sections.forEach((s) => io.observe(s))
    return () => io.disconnect()
  }, [])
  return active
}

/* Fades sections up as they scroll into view. */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal')
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) {
      els.forEach((el) => el.classList.add('is-in'))
      return
    }
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('is-in')
            io.unobserve(e.target)
          }
        }),
      { threshold: 0.12 },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
}

/* ---------- sections ---------- */
function Header() {
  const [theme, toggleTheme] = useTheme()
  const active = useActiveSection()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`header${scrolled ? ' is-scrolled' : ''}${open ? ' is-open' : ''}`}>
      <div className="header-inner">
        <a className="logo" href="#home" aria-label="Yash Naiya, home">
          YN<span>.</span>
        </a>
        <nav id="site-nav" className="nav" aria-label="Main">
          {nav.map(([id, label]) => (
            <a
              key={id}
              href={`#${id}`}
              className={active === id ? 'is-active' : undefined}
              aria-current={active === id ? 'true' : undefined}
              onClick={() => setOpen(false)}
            >
              {label}
            </a>
          ))}
        </nav>
        <div className="header-tools">
          <button
            type="button"
            className="icon-btn"
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {theme === 'dark' ? Icon.sun : Icon.moon}
          </button>
          <button
            type="button"
            className="icon-btn menu-btn"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="site-nav"
            aria-label={open ? 'Close menu' : 'Open menu'}
          >
            {open ? Icon.close : Icon.menu}
          </button>
        </div>
      </div>
    </header>
  )
}

function Hero() {
  return (
    <section className="hero" id="home" aria-labelledby="hero-title">
      <div className="hero-copy">
        <p className="eyebrow">Full-stack&nbsp;&nbsp;|&nbsp;&nbsp;Applied AI&nbsp;&nbsp;|&nbsp;&nbsp;Data</p>
        <h1 id="hero-title">
          Hi, I’m <span className="nowrap">Yash Naiya.</span>
        </h1>
        <p className="hero-intro">
          A software developer doing an M.Tech in Data Analytics at NIT Tiruchirappalli. I build full-stack
          web applications and practical tools on top of large language models.
        </p>
        <div className="hero-actions">
          <a className="btn btn-primary" href={profile.resume} target="_blank" rel="noreferrer">
            View Resume {Icon.arrow}
          </a>
          <a className="btn btn-ghost" href="#contact">
            Let’s Talk
          </a>
        </div>
      </div>
      <div className="portrait">
        <img src={profile.portrait} alt="Portrait of Yash Naiya" width="900" height="900" fetchPriority="high" />
      </div>
    </section>
  )
}

function SectionHead({ eyebrow, title, id }) {
  return (
    <div className="section-head">
      <p className="eyebrow">{eyebrow}</p>
      <h2 id={id}>{title}</h2>
    </div>
  )
}

function About() {
  return (
    <section className="section reveal" id="about" aria-labelledby="about-title">
      <SectionHead eyebrow="About me" title="Developer with a data streak." id="about-title" />
      <div className="about">
        <div className="about-text">
          <p>
            I’m doing an M.Tech in Data Analytics at NIT Tiruchirappalli, which I joined through GATE. I
            build full-stack apps with the MERN stack and .NET, and my recent work is in applied AI:
            fine-tuning small LLMs for Text-to-SQL and building retrieval-augmented assistants that
            answer questions about a codebase.
          </p>
          <p>
            Before my master’s I finished a B.Tech in Computer Engineering at Birla Vishwakarma
            Mahavidyalaya and interned as a software developer at BISAG-N (Govt. of India) and
            TatvaSoft, shipping React front ends, REST APIs and .NET back ends in agile teams.
          </p>
        </div>
        <dl className="facts card">
          <div>
            <dt>Currently</dt>
            <dd>M.Tech, NIT Trichy (2025 – 2027)</dd>
          </div>
          <div>
            <dt>Focus</dt>
            <dd>Full-stack development and applied LLMs</dd>
          </div>
          <div>
            <dt>Based in</dt>
            <dd>{profile.location}</dd>
          </div>
          <div>
            <dt>Availability</dt>
            <dd>{profile.relocation}</dd>
          </div>
        </dl>
      </div>

      <div className="skills" id="skills">
        <h3 className="sub-title">Skills</h3>
        <div className="skill-grid">
          {skills.map((s) => (
            <div key={s.group} className="skill-group">
              <h4>{s.group}</h4>
              <ul className="chips" aria-label={s.group}>
                {s.items.map((it) => (
                  <li key={it}>{it}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function ProjectCard({ p }) {
  const [summary, ...rest] = p.points
  const hasLink = p.link && p.link !== '#'
  return (
    <article className="project card">
      {p.image && (
        <div className="project-shot">
          <img src={p.image} alt={`Screenshot of ${p.title}`} width="1200" height="540" loading="lazy" />
        </div>
      )}
      <div className="project-body">
        <div className="project-head">
          <h3>{p.title}</h3>
          {p.dates && <p className="when">{p.dates}</p>}
        </div>
        <p className="project-summary">{summary}</p>
        {rest.length > 0 && (
          <ul className="points">
            {rest.map((pt) => (
              <li key={pt}>{pt}</li>
            ))}
          </ul>
        )}
        <ul className="tags" aria-label="Built with">
          {p.stack.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>
        {hasLink && (
          <a className="text-link" href={p.link} target="_blank" rel="noreferrer">
            View on GitHub {Icon.external}
          </a>
        )}
      </div>
    </article>
  )
}

function Projects() {
  return (
    <section className="section reveal" id="projects" aria-labelledby="projects-title">
      <SectionHead eyebrow="Selected work" title="Projects." id="projects-title" />
      <div className="project-grid">
        {projects.map((p) => (
          <ProjectCard key={p.title} p={p} />
        ))}
      </div>
    </section>
  )
}

function Experience() {
  return (
    <section className="section reveal" id="experience" aria-labelledby="experience-title">
      <SectionHead eyebrow="Where I’ve worked" title="Experience." id="experience-title" />
      <ol className="timeline">
        {experience.map((e) => (
          <li key={e.org} className="timeline-item">
            <div className="timeline-meta">
              <p className="when">{e.dates}</p>
              <p className="where">{e.place}</p>
            </div>
            <div className="card timeline-card">
              <h3>{e.role}</h3>
              <p className="org">{e.org}</p>
              <ul className="points">
                {e.points.map((pt) => (
                  <li key={pt}>{pt}</li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ol>
    </section>
  )
}

function Education() {
  return (
    <section className="section reveal" id="education" aria-labelledby="education-title">
      <SectionHead eyebrow="Where I’ve studied" title="Education." id="education-title" />
      <ol className="edu-grid">
        {education.map((e) => (
          <li key={e.degree} className="card edu">
            <p className="when">{e.dates}</p>
            <h3>{e.degree}</h3>
            <p className="where">{e.school}</p>
            {e.note && <p className="note">{e.note}</p>}
          </li>
        ))}
      </ol>
    </section>
  )
}

function Contact() {
  const [status, setStatus] = useState('idle')

  async function onSubmit(e) {
    e.preventDefault()
    const form = e.currentTarget
    setStatus('sending')
    try {
      const res = await fetch(`https://formspree.io/f/${profile.formspreeId}`, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      })
      if (!res.ok) throw new Error(String(res.status))
      form.reset()
      setStatus('sent')
    } catch {
      setStatus('error')
    }
  }

  return (
    <section className="section reveal" id="contact" aria-labelledby="contact-title">
      <SectionHead eyebrow="Get in touch" title="Let’s talk." id="contact-title" />
      <div className="contact">
        <div>
          <p className="contact-intro">
            I’m looking for software developer roles and I’m open to relocating. Send a message, or reach
            me directly.
          </p>
          <ul className="direct">
            <li>
              <a href={`mailto:${profile.email}`}>
                <span className="direct-icon">{Icon.mail}</span>
                <span>
                  <span className="direct-label">Email</span>
                  {profile.email}
                </span>
              </a>
            </li>
            <li>
              <a href={profile.links.linkedin} target="_blank" rel="noreferrer">
                <span className="direct-icon">{Icon.linkedin}</span>
                <span>
                  <span className="direct-label">LinkedIn</span>
                  linkedin.com/in/yashnaiya
                </span>
              </a>
            </li>
            <li>
              <a href={profile.links.github} target="_blank" rel="noreferrer">
                <span className="direct-icon">{Icon.github}</span>
                <span>
                  <span className="direct-label">GitHub</span>
                  github.com/yashNaiya
                </span>
              </a>
            </li>
          </ul>
        </div>

        <form className="form card" onSubmit={onSubmit}>
          <label htmlFor="name">Name</label>
          <input id="name" name="name" autoComplete="name" />
          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="email" autoComplete="email" required />
          <label htmlFor="message">Message</label>
          <textarea id="message" name="message" rows={5} required />
          <div className="form-foot">
            <button className="btn btn-primary" type="submit" disabled={status === 'sending'}>
              {status === 'sending' ? 'Sending…' : 'Send message'} {Icon.arrow}
            </button>
            <p className="form-status" role="status">
              {status === 'sent' && 'Message sent. I’ll reply by email.'}
              {status === 'error' && `The message didn’t send. Try again, or email ${profile.email}.`}
            </p>
          </div>
        </form>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <p>© {new Date().getFullYear()} Yash Naiya. All rights reserved.</p>
        <div className="socials">
          <a href={profile.links.github} target="_blank" rel="noreferrer" aria-label="GitHub">
            {Icon.github}
          </a>
          <a href={profile.links.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
            {Icon.linkedin}
          </a>
          <a href={`mailto:${profile.email}`} aria-label="Email">
            {Icon.mail}
          </a>
        </div>
      </div>
    </footer>
  )
}

export default function App() {
  useReveal()
  return (
    <>
      <a className="skip" href="#about">
        Skip to content
      </a>
      <Header />
      <main>
        <Hero />
        <About />
        <Projects />
        <Experience />
        <Education />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
