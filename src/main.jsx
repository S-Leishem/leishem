import React, { useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import { ArrowUpRight, Check, ChevronRight, Github, Instagram, Menu, MessageCircle, Moon, Sun, X, Zap } from 'lucide-react'
import './styles.css'

const waLink = 'https://wa.me/918837473684'
const navItems = [
  ['/', 'Home'], ['/about', 'About'], ['/journey', 'Journey'], ['/skills', 'Skills'],
  ['/interests', 'Interests'], ['/services', 'Services'], ['/contact', 'Contact'],
]

const pageMeta = {
  '/': ['Soubam Leishem | Student Developer', 'Soubam Leishem is a student developer who builds simple, responsive and lightweight websites for individuals and small businesses.'],
  '/about': ['About — Soubam Leishem', 'Get to know Soubam Leishem, his background, interests and approach to building with technology.'],
  '/journey': ['Journey — Soubam Leishem', 'A timeline of Soubam Leishem’s growth through code, electronics and creative technology.'],
  '/skills': ['Skills — Soubam Leishem', 'The languages, tools and technologies Soubam Leishem uses and is currently learning.'],
  '/interests': ['Interests — Soubam Leishem', 'The things that keep Soubam Leishem curious: security, hardware, Linux, AI and more.'],
  '/services': ['Services — Soubam Leishem', 'Thoughtful websites for people and small businesses, built with clarity and care.'],
  '/contact': ['Contact — Soubam Leishem', 'Start a conversation with Soubam Leishem about your next digital project.'],
}

function updateSeo(pathname) {
  const [title, description] = pageMeta[pathname] || pageMeta['/']
  const url = `${window.location.origin}${pathname}`
  document.title = title
  const setMeta = (selector, attribute, value) => {
    const element = document.querySelector(selector)
    if (element) element.setAttribute(attribute, value)
  }
  let canonical = document.querySelector('link[rel="canonical"]')
  if (!canonical) {
    canonical = document.createElement('link')
    canonical.rel = 'canonical'
    document.head.appendChild(canonical)
  }
  canonical.href = url
  setMeta('meta[name="description"]', 'content', description)
  setMeta('meta[property="og:title"]', 'content', title)
  setMeta('meta[property="og:description"]', 'content', description)
  setMeta('meta[property="og:url"]', 'content', url)
  setMeta('meta[name="twitter:title"]', 'content', title)
  setMeta('meta[name="twitter:description"]', 'content', description)

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Soubam Leishem',
    jobTitle: 'Student Developer',
    description,
    url: `${window.location.origin}/`,
    sameAs: ['https://github.com/S-Leishem', 'https://www.instagram.com/soubam_leishem/'],
    knowsAbout: ['HTML', 'CSS', 'Python', 'Web development', 'Responsive design'],
  }
  let script = document.querySelector('#person-structured-data')
  if (!script) {
    script = document.createElement('script')
    script.id = 'person-structured-data'
    script.type = 'application/ld+json'
    document.head.appendChild(script)
  }
  script.textContent = JSON.stringify(structuredData)
}

function useTheme() {
  const [dark, setDark] = useState(() => localStorage.getItem('theme') === 'dark')
  useEffect(() => {
    document.documentElement.dataset.theme = dark ? 'dark' : 'light'
    localStorage.setItem('theme', dark ? 'dark' : 'light')
  }, [dark])
  return [dark, () => setDark(value => !value)]
}

function Layout() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [dark, toggleTheme] = useTheme()
  const location = useLocation()
  useEffect(() => { setMenuOpen(false); window.scrollTo(0, 0) }, [location.pathname])
  useEffect(() => updateSeo(location.pathname), [location.pathname])
  return <div className="site-shell">
    <header className="site-header">
      <Link to="/" className="brand" aria-label="Leishem home"><span className="brand-mark">✦</span><span>LEISHEM<span className="brand-dot">.</span></span></Link>
      <nav className={menuOpen ? 'main-nav is-open' : 'main-nav'} aria-label="Main navigation">
        {navItems.map(([path, label]) => <NavLink key={path} to={path} end={path === '/'} className={({ isActive }) => isActive ? 'active' : ''}>{label}</NavLink>)}
      </nav>
      <div className="header-actions">
        <button className="icon-btn theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">{dark ? <Sun size={18} /> : <Moon size={18} />}</button>
        <Link className="header-cta" to="/contact">Let’s talk <ArrowUpRight size={16} /></Link>
        <button className="icon-btn menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? 'Close menu' : 'Open menu'}>{menuOpen ? <X size={21} /> : <Menu size={21} />}</button>
      </div>
    </header>
    <main><Outlet /></main>
    <Footer />
    <a className="floating-wa" href={waLink} target="_blank" rel="noreferrer" aria-label="Chat on WhatsApp"><MessageCircle size={23} /></a>
  </div>
}

function Footer() {
  return <footer className="site-footer"><div className="footer-top"><Link to="/" className="brand"><span className="brand-mark">✦</span><span>LEISHEM<span className="brand-dot">.</span></span></Link><p>Curious by nature. Intentional by design.</p><div className="socials"><a href="https://github.com/S-Leishem" target="_blank" rel="noreferrer" aria-label="GitHub"><Github size={18} /></a><a href="https://www.instagram.com/soubam_leishem/" target="_blank" rel="noreferrer" aria-label="Instagram"><Instagram size={18} /></a></div></div><div className="footer-bottom"><span>© {new Date().getFullYear()} Leishem</span><span>Made with curiosity &amp; good coffee</span></div></footer>
}

function PageIntro({ eyebrow, title, description }) {
  return <section className="page-intro wrap"><span className="eyebrow">{eyebrow}</span><h1>{title}</h1>{description && <p className="lede">{description}</p>}</section>
}

function Button({ to, children, secondary = false }) { return <Link to={to} className={secondary ? 'button button-secondary' : 'button'}>{children}<ArrowUpRight size={17} /></Link> }

function Home() {
  return <><section className="hero wrap"><div className="hero-copy"><span className="eyebrow">Developer · Maker · Learner</span><h1>Building things<br /><em>worth using.</em></h1><p className="lede">I’m Leishem, a developer who likes turning curious ideas into clear, useful digital experiences — from the first sketch to the final pixel.</p><div className="button-row"><Button to="/services">See my services</Button><Button to="/about" secondary>More about me</Button></div></div><div className="hero-art"><div className="orb orb-one"></div><div className="orb orb-two"></div><div className="art-card"><span>Currently exploring</span><strong>Creative<br />technology</strong><small>code + circuits + curiosity</small></div><div className="art-coordinate">20° 17′ N<br />85° 49′ E</div></div></section><section className="marquee"><div>WEB DEVELOPMENT <span>✦</span> ELECTRONICS <span>✦</span> CREATIVE CODE <span>✦</span> WEB DEVELOPMENT <span>✦</span> ELECTRONICS <span>✦</span></div></section><section className="section wrap home-grid"><div><span className="eyebrow">A little context</span><h2>Not just code.<br /><em>A point of view.</em></h2></div><div><p className="body-copy">I care about the details that make a product feel intuitive, human and memorable. My work sits at the intersection of technology and design, always grounded in a desire to keep learning.</p><Button to="/about" secondary>Read my story</Button></div></section><section className="section wrap service-banner"><div><span className="eyebrow">Have an idea?</span><h2>Let’s make it<br /><em>real together.</em></h2></div><div><p className="body-copy">Need a clean website or a thoughtful digital presence? I can help you get there.</p><Button to="/services">See my services</Button></div></section></>
}

function About() {
  return <><PageIntro eyebrow="01 — About" title={<>A curious mind,<br /><em>always in motion.</em></>} description="I’m Leishem — a developer, maker and lifelong learner from India. I enjoy making sense of complex things and turning them into something people can use." /><section className="section wrap about-layout"><div className="portrait-card"><div className="portrait-initial">L<span>.</span></div><span className="portrait-caption">A work in progress,<br />by design.</span></div><div className="about-text"><h2>Technology became my language for asking better questions.</h2><p className="body-copy">My journey started with a fascination for how computers work beneath the surface. That curiosity grew into a love for programming, web development and electronics — each one offering a new way to build, test and understand.</p><p className="body-copy">I’m at my best when I’m learning something new, working through a stubborn bug, or shaping a rough idea into a polished experience. I value patience, honest work and the small details that make a big difference.</p><div className="quote">“Stay curious. Build with intention.”</div></div></section><section className="section wrap split-callout"><div><span className="eyebrow">Beyond the screen</span><h2>Hands-on by nature.</h2></div><p className="body-copy">When I’m away from my editor, you’ll find me tinkering with circuits, exploring Linux, reading about security or getting lost in a good game. Every interest feeds the next idea.</p></section></>
}

const timeline = [
  ['Before 2024', 'Finding the spark', 'Started exploring computers, hardware and the fundamentals of programming. Small experiments became a habit.'],
  ['2024', 'Building the foundation', 'Focused on web fundamentals, Python and understanding how products move from an idea to a working interface.'],
  ['2025', 'Going deeper', 'Built more complete projects, learned to think in systems and began connecting software with electronics.'],
  ['2026', 'Making it meaningful', 'Sharpening my craft, sharing useful work and looking for opportunities to build things that matter.'],
]
function Journey() { return <><PageIntro eyebrow="02 — Journey" title={<>The long way<br /><em>around.</em></>} description="Progress is rarely a straight line. Here are a few chapters from my ongoing journey with technology." /><section className="section wrap timeline">{timeline.map(([date, title, text], i) => <div className="timeline-item" key={date}><div className="timeline-date">{date}</div><div className="timeline-dot">{i + 1}</div><div className="timeline-content"><h2>{title}</h2><p className="body-copy">{text}</p></div></div>)}</section><section className="wrap journey-note"><Zap size={24} /><div><h3>Still learning, always.</h3><p>There’s no finish line — just the next interesting problem.</p></div></section></> }

const skillGroups = [['Programming', ['JavaScript', 'Python', 'HTML & CSS', 'C / C++']], ['Web development', ['React', 'Responsive design', 'REST APIs', 'Git & GitHub']], ['Electronics', ['Arduino', 'Microcontrollers', 'Sensors', 'Circuit basics']], ['Currently learning', ['TypeScript', 'Cybersecurity', 'Linux', 'Artificial intelligence']]]
function Skills() { return <><PageIntro eyebrow="03 — Skills" title={<>Tools for<br /><em>making things happen.</em></>} description="A growing toolkit, built through practice. I care more about understanding the fundamentals than collecting badges." /><section className="section wrap skills-grid">{skillGroups.map(([title, skills], index) => <div className="skill-group" key={title}><span className="skill-number">{String(index + 1).padStart(2, '0')}</span><h2>{title}</h2><ul>{skills.map(skill => <li key={skill}><Check size={16} />{skill}</li>)}</ul></div>)}</section><section className="section wrap tools-strip"><span>Also comfortable with</span><strong>VS Code</strong><strong>Figma</strong><strong>GitHub</strong><strong>Linux</strong><strong>Vite</strong></section></> }

const interests = [['01', 'Cybersecurity', 'Learning how systems fail — and how to make them more resilient.'], ['02', 'Electronics', 'Small components, physical feedback and the magic of making a circuit come alive.'], ['03', 'Linux', 'A playground for understanding what’s really happening under the hood.'], ['04', 'Artificial intelligence', 'Exploring tools that expand what people can imagine and create.'], ['05', 'Computer hardware', 'The architecture and engineering behind the screens we use every day.'], ['06', 'Gaming', 'A reminder that technology can be challenging, expressive and joyful.']]
function Interests() { return <><PageIntro eyebrow="05 — Interests" title={<>Follow the<br /><em>curiosity.</em></>} description="The rabbit holes, side quests and obsessions that keep me energized outside of client work." /><section className="section wrap interest-list">{interests.map(([number, title, text]) => <div className="interest-row" key={title}><span>{number}</span><h2>{title}</h2><p>{text}</p><ArrowUpRight size={20} /></div>)}</section></> }

const services = [['01', 'Personal portfolio development', 'A portfolio that feels like you, tells your story and helps the right people find you.'], ['02', 'Small business websites', 'A clear, trustworthy home for your business that works beautifully on every screen.'], ['03', 'Landing pages', 'Focused pages that explain your offer and give visitors a reason to take the next step.'], ['04', 'Custom static websites', 'Fast, reliable and intentionally designed websites without unnecessary complexity.']]
function Services() { return <><PageIntro eyebrow="06 — Services" title={<>Good websites<br /><em>do good work.</em></>} description="I build clear, responsive websites for people with something worth sharing — with an emphasis on thoughtful details and a smooth process." /><section className="section wrap services-list">{services.map(([num, title, text]) => <div className="service-row" key={title}><span>{num}</span><div><h2>{title}</h2><p>{text}</p></div><ChevronRight size={22} /></div>)}</section><section className="wrap contact-cta"><div><span className="eyebrow">Have a project in mind?</span><h2>Let’s talk it<br /><em>through.</em></h2></div><div><p className="body-copy">Tell me what you’re building, where you are in the process and what you need next.</p><a className="button" href={waLink} target="_blank" rel="noreferrer"><MessageCircle size={17} />Message on WhatsApp</a></div></section></> }

function Contact() { return <><PageIntro eyebrow="07 — Contact" title={<>Say hello.<br /><em>Start something.</em></>} description="Have a question, an idea or just want to connect? I prefer messages over phone calls, so drop me a line whenever you’re ready." /><section className="section wrap contact-layout"><div className="contact-card"><span className="eyebrow">Best way to reach me</span><h2>WhatsApp</h2><a href={waLink} target="_blank" rel="noreferrer" className="contact-number">+91 88374 73684</a><a className="button" href={waLink} target="_blank" rel="noreferrer"><MessageCircle size={17} />Contact me on WhatsApp</a></div><div className="contact-details"><a href="https://www.instagram.com/soubam_leishem/" target="_blank" rel="noreferrer"><Instagram size={21} /><span><small>Instagram DM</small>@soubam_leishem</span><ArrowUpRight size={18} /></a><a href="https://github.com/S-Leishem" target="_blank" rel="noreferrer"><Github size={21} /><span><small>GitHub</small>github.com/S-Leishem</span><ArrowUpRight size={18} /></a><div className="contact-note"><MessageCircle size={19} /><p>I’m usually quicker to respond to a thoughtful message than a phone call. Looking forward to hearing from you.</p></div></div></section></> }

function App() { return <Layout /> }
import { Routes, Route } from 'react-router-dom'
function Root() { return <BrowserRouter><Routes><Route element={<App />}><Route path="/" element={<Home />} /><Route path="/about" element={<About />} /><Route path="/journey" element={<Journey />} /><Route path="/skills" element={<Skills />} /><Route path="/interests" element={<Interests />} /><Route path="/services" element={<Services />} /><Route path="/contact" element={<Contact />} /></Route></Routes></BrowserRouter> }
createRoot(document.getElementById('root')).render(<Root />)
