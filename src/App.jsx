import { useEffect, useRef, useState } from 'react'
import { education, experience, profile, projects, skills } from './data.js'
import { mountBookRing } from './scene.js'

const reducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

/* Dark text on light covers, white on dark ones. */
function inkFor(hex) {
  const n = parseInt(hex.slice(1), 16)
  const [r, g, b] = [(n >> 16) & 255, (n >> 8) & 255, n & 255]
  return 0.299 * r + 0.587 * g + 0.114 * b > 140 ? '#34352f' : '#f7f3ea'
}

/* Pointer-driven 3D tilt. Writes --rx / --ry on the element. */
function useTilt(max = 10) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el || reducedMotion()) return
    const move = (e) => {
      const r = el.getBoundingClientRect()
      const x = (e.clientX - r.left) / r.width - 0.5
      const y = (e.clientY - r.top) / r.height - 0.5
      el.style.setProperty('--ry', `${x * max}deg`)
      el.style.setProperty('--rx', `${-y * max}deg`)
    }
    const leave = () => {
      el.style.setProperty('--ry', '0deg')
      el.style.setProperty('--rx', '0deg')
    }
    el.addEventListener('pointermove', move)
    el.addEventListener('pointerleave', leave)
    return () => {
      el.removeEventListener('pointermove', move)
      el.removeEventListener('pointerleave', leave)
    }
  }, [max])
  return ref
}

function Hero() {
  const stage = useRef(null)
  const [webgl, setWebgl] = useState(true)
  useEffect(() => {
    try {
      return mountBookRing(stage.current, { reducedMotion: reducedMotion() })
    } catch {
      setWebgl(false)
    }
  }, [])

  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="stage" ref={stage} aria-hidden="true" data-webgl={webgl} />
      <div className="hero-copy">
        <p className="hero-role">{profile.role}</p>
        <h1 id="hero-title">{profile.name}</h1>
        <p className="hero-study">{profile.study}</p>
        <p className="hero-intro">
          I build full-stack web applications and practical tools on top of large language models.
        </p>
        <div className="hero-actions">
          <a className="btn btn-primary" href="#projects">
            View projects
          </a>
          <a className="btn btn-ghost" href={profile.resume} download>
            Download resume
          </a>
        </div>
      </div>
    </section>
  )
}

function About() {
  return (
    <section className="section" id="about" aria-labelledby="about-title">
      <h2 id="about-title">About</h2>
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
        <dl className="facts panel">
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
            <dd>
              {profile.location}
              <br />
              {profile.relocation}
            </dd>
          </div>
        </dl>
      </div>
    </section>
  )
}

function Book({ project }) {
  const ref = useTilt(22)
  return (
    <div className="book-stage" ref={ref} aria-hidden="true">
      <div className="book" style={{ '--c': project.color, '--ink': inkFor(project.color) }}>
        <div className="face front">
          <span className="front-title">{project.title}</span>
          {project.dates && <span className="front-date">{project.dates}</span>}
        </div>
        <div className="face spine" />
        <div className="face pages" />
        <div className="face top" />
        <div className="face back" />
      </div>
      <div className="book-shadow" />
    </div>
  )
}

const shelves = [
  ['recent', 'Recent projects'],
  ['earlier', 'Earlier projects'],
]

/* Projects: a 3D bookcase. Pick a spine to pull the book out and read about it. */
function Projects() {
  const [active, setActive] = useState(projects[0].title)
  const current = projects.find((p) => p.title === active)
  const detailRef = useRef(null)

  function choose(title) {
    setActive(title)
    // on small screens the details sit below the case; bring them into view
    if (window.matchMedia('(max-width: 860px)').matches) {
      requestAnimationFrame(() =>
        detailRef.current?.scrollIntoView({ behavior: reducedMotion() ? 'auto' : 'smooth', block: 'start' }),
      )
    }
  }

  return (
    <section className="section" id="projects" aria-labelledby="projects-title">
      <h2 id="projects-title">Projects</h2>
      <p className="lede">Pick a book from the shelf to read about the project.</p>

      <div className="library">
        <div className="bookcase">
          {shelves.map(([key, label]) => (
            <div className="shelf" key={key}>
              <p className="shelf-label">{label}</p>
              <div className="shelf-row" role="group" aria-label={label}>
                {projects
                  .filter((p) => p.shelf === key)
                  .map((p) => {
                    const on = p.title === active
                    return (
                      <button
                        key={p.title}
                        type="button"
                        className={`spine-book${on ? ' is-out' : ''}`}
                        style={{ '--c': p.color, '--ink': inkFor(p.color), '--h': p.height, '--w': `${p.width}px` }}
                        aria-pressed={on}
                        aria-controls="project-detail"
                        onClick={() => choose(p.title)}
                      >
                        <span className="spine-face">
                          <span className="spine-title">{p.short}</span>
                        </span>
                        <span className="spine-top" aria-hidden="true" />
                      </button>
                    )
                  })}
              </div>
              <div className="plank" aria-hidden="true" />
            </div>
          ))}
        </div>

        <article id="project-detail" className="detail panel" ref={detailRef} aria-live="polite" key={current.title}>
          <Book project={current} />
          <div className="detail-body">
            <h3>{current.title}</h3>
            <p className="when">{current.dates || 'Earlier project'}</p>
            <ul className="tags" aria-label="Built with">
              {current.stack.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
            <ul className="points">
              {current.points.map((pt) => (
                <li key={pt}>{pt}</li>
              ))}
            </ul>
            {current.image && (
              <img className="shot" src={current.image} alt={`Screenshot of ${current.title}`} width="1200" height="540" />
            )}
            <a
              className="btn btn-ghost btn-small"
              href={current.link}
              target={current.link === '#' ? undefined : '_blank'}
              rel="noreferrer"
            >
              View project
            </a>
          </div>
        </article>
      </div>
    </section>
  )
}

function Experience() {
  return (
    <section className="section" id="experience" aria-labelledby="experience-title">
      <h2 id="experience-title">Experience</h2>
      <ol className="timeline">
        {experience.map((e) => (
          <li key={e.org} className="panel">
            <div className="timeline-head">
              <div>
                <h3>{e.role}</h3>
                <p className="where">
                  {e.org}, {e.place}
                </p>
              </div>
              <p className="when">{e.dates}</p>
            </div>
            <ul className="points">
              {e.points.map((pt) => (
                <li key={pt}>{pt}</li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </section>
  )
}


function EduCard({ e }) {
  const ref = useTilt(8)
  return (
    <li className="tile" ref={ref}>
      <div className="index-card">
        <div className="card-head">
          <h3>{e.degree}</h3>
          <p className="when">{e.dates}</p>
        </div>
        <p className="where">{e.school}</p>
        <p className="score">{e.score}</p>
        <p className="note">{e.note}</p>
      </div>
    </li>
  )
}

function Education() {
  return (
    <section className="section" id="education" aria-labelledby="education-title">
      <h2 id="education-title">Education</h2>
      <ol className="edu">
        {education.map((e) => (
          <EduCard key={e.degree} e={e} />
        ))}
      </ol>
    </section>
  )
}

/* Skills: each group is a stack of books lying flat, one skill per book. */
const stackColors = ['#65745b', '#a58a6a', '#34352f', '#ddd2bf', '#4e5a46', '#8a6f52', '#7f8c73', '#c2b49c']
function Skills() {
  return (
    <section className="section" id="skills" aria-labelledby="skills-title">
      <h2 id="skills-title">Skills</h2>
      <div className="stacks">
        {skills.map((s, gi) => (
          <div key={s.group} className="stack">
            <ul aria-label={s.group}>
              {s.items.map((it, i) => {
                const n = gi * 3 + i
                return (
                  <li
                    key={it}
                    className="flat-book"
                    style={{
                      '--c': stackColors[n % stackColors.length],
                      '--ink': inkFor(stackColors[n % stackColors.length]),
                      '--shift': `${((n * 37) % 23) - 11}px`,
                      '--tilt': `${((n * 53) % 7) - 3}deg`,
                    }}
                  >
                    {it}
                  </li>
                )
              })}
            </ul>
            <h3>{s.group}</h3>
          </div>
        ))}
      </div>
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
    <section className="section" id="contact" aria-labelledby="contact-title">
      <h2 id="contact-title">Contact</h2>
      <div className="contact">
        <div>
          <p className="contact-intro">
            I’m looking for software developer roles and I’m open to relocating. Send a message, or reach
            me directly.
          </p>
          <dl className="direct">
            <div>
              <dt>Email</dt>
              <dd>
                <a href={`mailto:${profile.email}`}>{profile.email}</a>
              </dd>
            </div>
            <div>
              <dt>Phone</dt>
              <dd>
                <a href={profile.phoneHref}>{profile.phone}</a>
              </dd>
            </div>
            <div>
              <dt>LinkedIn</dt>
              <dd>
                <a href={profile.links.linkedin} target="_blank" rel="noreferrer">
                  linkedin.com/in/yashnaiya
                </a>
              </dd>
            </div>
            <div>
              <dt>GitHub</dt>
              <dd>
                <a href={profile.links.github} target="_blank" rel="noreferrer">
                  github.com/yashNaiya
                </a>
              </dd>
            </div>
          </dl>
        </div>

        <form className="form panel" onSubmit={onSubmit}>
          <label htmlFor="name">Name</label>
          <input id="name" name="name" autoComplete="name" />
          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="email" autoComplete="email" required />
          <label htmlFor="message">Message</label>
          <textarea id="message" name="message" rows={5} required />
          <div className="form-foot">
            <button className="btn btn-primary" type="submit" disabled={status === 'sending'}>
              {status === 'sending' ? 'Sending…' : 'Send message'}
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

export default function App() {
  return (
    <main>
      <Hero />
      <About />
      <Projects />
      <Experience />
      <Education />
      <Skills />
      <Contact />
      <footer className="footer">© {new Date().getFullYear()} Yash Naiya</footer>
    </main>
  )
}
