import { useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'

type StoryStep = { eyebrow: string; title: string; body: string; detail: string }

const leadSteps: StoryStep[] = [
  { eyebrow: '01 / CAPTURE', title: 'Every enquiry has a place.', body: 'A question arrives from a website, an ad, a social channel or a direct message. LeadFlow brings the conversation into one workspace so the next action is visible to the whole team.', detail: 'One inbox. A complete customer timeline.' },
  { eyebrow: '02 / UNDERSTAND', title: 'Know who needs attention.', body: 'Context, source and intent help teams distinguish a casual question from a ready buyer. Qualification gives people a useful starting point without replacing their judgment.', detail: 'Priorities grounded in the conversation.' },
  { eyebrow: '03 / MOVE', title: 'Keep momentum without chasing it.', body: 'Tasks, follow ups and pipeline stages connect the handoff from first reply to booked meeting and won deal. Rules can advance work when clear conditions are met.', detail: 'The next step stays in motion.' },
  { eyebrow: '04 / LEARN', title: 'See what actually converts.', body: 'A shared performance view connects enquiry sources, response times, pipeline movement and outcomes. Teams can improve the system using evidence from real work.', detail: 'From activity to accountable growth.' },
]

const scoreSteps: StoryStep[] = [
  { eyebrow: '01 / CONNECT', title: 'Fragmented sources, one entry point.', body: 'Businesses work across mobile money, banks, point of sale, invoices and accounting systems. AfriScore is building connectors for authorized data, beginning with a synthetic sandbox and provider shaped test data.', detail: 'Start with permission and reliable access.' },
  { eyebrow: '02 / NORMALIZE', title: 'Different formats. A common language.', body: 'A credit can appear as CR, CREDIT or an incoming direction. AfriScore translates provider shaped records into a consistent transaction model with source, amount, status and time.', detail: 'One model for many systems.' },
  { eyebrow: '03 / PROTECT', title: 'The business stays in control.', body: 'A developer key identifies the calling application. A separate grant controls which business, purpose and information scope it can access. Revocation closes that route immediately.', detail: 'Access is specific, visible and revocable.' },
  { eyebrow: '04 / UNDERSTAND', title: 'Build on intelligence, not raw noise.', body: 'Normalized records can power explainable financial profiles, invoice reconciliation and grounded insights. The API gives other builders useful infrastructure without claiming live institutional connections that are still being developed.', detail: 'A foundation for the next application.' },
]

function useVisibleSection() {
  const [compact, setCompact] = useState(false)
  useEffect(() => {
    const onScroll = () => setCompact(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return compact
}

function useReveals() {
  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'))
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced || !('IntersectionObserver' in window)) {
      nodes.forEach(node => node.classList.add('is-visible'))
      return
    }
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return
        entry.target.classList.add('is-visible')
        observer.unobserve(entry.target)
      })
    }, { threshold: 0.08, rootMargin: '0px 0px -6% 0px' })
    nodes.forEach(node => observer.observe(node))
    return () => observer.disconnect()
  }, [])
}

function useStoryProgress(length: number) {
  const [active, setActive] = useState(0)
  const refs = useRef<(HTMLElement | null)[]>([])
  useEffect(() => {
    const update = () => {
      const target = window.innerHeight * (window.innerWidth <= 700 ? 0.77 : 0.45)
      let closest = 0
      let distance = Number.POSITIVE_INFINITY
      refs.current.forEach((node, index) => {
        if (!node) return
        const box = node.getBoundingClientRect()
        const midpoint = box.top + box.height / 2
        const next = Math.abs(midpoint - target)
        if (next < distance) { distance = next; closest = index }
      })
      setActive(closest)
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => { window.removeEventListener('scroll', update); window.removeEventListener('resize', update) }
  }, [length])
  return { active, setActive, refs }
}

function ArrowLink({ href, children, light = false }: { href: string; children: ReactNode; light?: boolean }) {
  return <a className={`arrow-link ${light ? 'arrow-link-light' : ''}`} href={href}><span>{children}</span><b aria-hidden="true">↗</b></a>
}

function Brand() {
  return <a className="brand" href="#top" aria-label="Veris home"><span className="brand-symbol" aria-hidden="true"><i /><i /><i /></span><span className="brand-word">veris<span className="brand-dot">.</span></span></a>
}

function Header() {
  const [menu, setMenu] = useState(false)
  const compact = useVisibleSection()
  const button = useRef<HTMLButtonElement>(null)
  useEffect(() => {
    if (!menu) return
    const close = (event: KeyboardEvent) => { if (event.key === 'Escape') { setMenu(false); button.current?.focus() } }
    document.addEventListener('keydown', close)
    return () => document.removeEventListener('keydown', close)
  }, [menu])
  const links = [['Company', 'company'], ['LeadFlow', 'leadflow'], ['AfriScore', 'afriscore'], ['Marketing', 'marketing'], ['Our approach', 'approach']]
  return <header className={`site-header ${compact ? 'site-header-scrolled' : ''}`}><div className="header-inner"><Brand /><nav className="desktop-links" aria-label="Primary navigation">{links.map(([label, id]) => <a key={id} href={`#${id}`}>{label}</a>)}</nav><div className="header-end"><a className="header-cta" href="#portfolio">Explore Veris <span aria-hidden="true">↗</span></a><button ref={button} className="menu-toggle" aria-expanded={menu} aria-controls="mobile-menu" aria-label={menu ? 'Close menu' : 'Open menu'} onClick={() => setMenu(!menu)}>{menu ? '×' : '☰'}</button></div></div><nav id="mobile-menu" className={`mobile-menu ${menu ? 'mobile-menu-open' : ''}`} aria-label="Mobile navigation" inert={!menu}>{links.map(([label, id]) => <a key={id} href={`#${id}`} onClick={() => setMenu(false)}>{label}<span>↗</span></a>)}<a href="#portfolio" onClick={() => setMenu(false)}>Explore Veris <span>↗</span></a></nav></header>
}

function HeroVisual() {
  return <div className="hero-visual" aria-label="Veris turns business friction into focused ventures"><div className="visual-grid" /><div className="visual-head"><span>VERIS / SYSTEM VIEW</span><span>01—03</span></div><div className="orbit orbit-one" /><div className="orbit orbit-two" /><div className="orbit orbit-three" /><div className="visual-center"><div className="center-v">V</div><span>BUSINESS<br />POSSIBILITY</span></div><div className="floating-card fc-one"><span className="status-signal signal-lime" />CUSTOMER GROWTH<em>LeadFlow</em></div><div className="floating-card fc-two"><span className="status-signal signal-coral" />MARKET PRESENCE<em>Veris Marketing</em></div><div className="floating-card fc-three"><span className="status-signal signal-blue" />BUSINESS DATA<em>AfriScore</em></div><div className="hero-visual-foot">THREE FOCUSED VENTURES <span>ONE SHARED STANDARD</span></div></div>
}

function Hero() {
  return <section className="hero" id="top"><div className="page-shell hero-layout"><div className="hero-copy"><span className="section-tag"><i /> INDEPENDENT AFRICAN TECHNOLOGY COMPANY</span><h1>Building the systems behind <em>what comes next.</em></h1><p>Veris is a company for the work businesses do every day: finding customers, reaching markets and making sense of fragmented operations. We build focused products and services that make that work clearer, faster and more connected.</p><div className="hero-actions"><ArrowLink href="#company">Meet Veris</ArrowLink><a className="under-link" href="#portfolio">Explore our ventures <span>↓</span></a></div><div className="hero-footnote"><span>FOUNDED IN KENYA</span><span>BUILT WITH AN AFRICAN HORIZON</span></div></div><HeroVisual /></div><div className="scroll-note" aria-hidden="true"><span>SCROLL TO EXPLORE</span><i /></div></section>
}

function RunningLine() { return <div className="running-line" aria-hidden="true"><div>PRODUCTS <span>✳</span> SERVICES <span>✳</span> INFRASTRUCTURE <span>✳</span> PRODUCTS <span>✳</span> SERVICES <span>✳</span> INFRASTRUCTURE <span>✳</span></div></div> }

function Company() {
  return <section className="company-section section-pad" id="company"><div className="page-shell"><div className="section-topline" data-reveal><span>01 / THE COMPANY</span><span>WHY VERIS EXISTS</span></div><div className="company-intro"><div data-reveal><span className="eyebrow">THE IDEA</span><h2>One company.<br /><em>Many useful ways</em><br />to move forward.</h2></div><div className="company-intro-copy" data-reveal><p className="lead-copy">Growing a business should not mean stitching together disconnected tools and starting from zero at every stage.</p><p>Veris is the parent company behind a growing portfolio of focused ventures. Each one addresses a different but related problem: how businesses win customers, how they present themselves and grow, and how their operational data becomes useful infrastructure.</p><p>We connect strategy, design, engineering and operations. The ventures share standards for clarity, reliability and responsible data use, while each product stays focused on the people and workflows it serves.</p><ArrowLink href="#portfolio">See the portfolio</ArrowLink></div></div><div className="company-pillars"><article data-reveal><span className="pillar-number">01</span><div className="pillar-icon icon-lime">↗</div><h3>Build what people use</h3><p>Start with the daily work, then make the next action easier to see and complete.</p></article><article data-reveal><span className="pillar-number">02</span><div className="pillar-icon icon-coral">✳</div><h3>Make growth accountable</h3><p>Join creative thinking with clear execution and meaningful measures of progress.</p></article><article data-reveal><span className="pillar-number">03</span><div className="pillar-icon icon-blue">⌁</div><h3>Create shared foundations</h3><p>Turn repeated business friction into infrastructure others can build upon.</p></article></div></div></section>
}

const products = [
  { number: '01', name: 'LeadFlow', type: 'CUSTOMER GROWTH PLATFORM', state: 'IN ACTIVE BUILD', intro: 'A clearer path from first enquiry to loyal customer.', detail: 'LeadFlow gives growing teams a shared place to capture conversations, qualify demand, coordinate follow ups and understand what is moving their pipeline.', anchor: '#leadflow', tone: 'lime' },
  { number: '02', name: 'AfriScore', type: 'BUSINESS INFRASTRUCTURE API', state: 'DEVELOPER FOUNDATION', intro: 'A common language for African business information.', detail: 'AfriScore is building a permissioned layer that connects fragmented systems, normalizes records and makes financial and operational intelligence available through APIs.', anchor: '#afriscore', tone: 'blue' },
  { number: '03', name: 'Veris Marketing', type: 'GROWTH SERVICES', state: 'IN FORMATION', intro: 'Strategy, creative and distribution that work together.', detail: 'A service venture for brands that need sharper positioning, thoughtful campaigns, stronger content systems and reporting tied to business outcomes.', anchor: '#marketing', tone: 'coral' },
] as const

function Portfolio() {
  const [active, setActive] = useState(0)
  return <section className="portfolio-section section-pad" id="portfolio"><div className="page-shell"><div className="section-topline" data-reveal><span>02 / THE PORTFOLIO</span><span>FOCUSED VENTURES</span></div><div className="portfolio-header" data-reveal><h2>Different challenges.<br /><em>Connected ambition.</em></h2><p>Veris works across the customer journey and the systems beneath it. Explore each venture, then follow the visual stories below to see how the pieces work.</p></div><div className="portfolio-stage" data-reveal><div className="portfolio-nav" role="tablist" aria-label="Veris ventures">{products.map((product, index) => <button key={product.name} role="tab" aria-selected={active === index} aria-controls="portfolio-panel" onClick={() => setActive(index)} onMouseEnter={() => setActive(index)}><span>{product.number}</span><strong>{product.name}</strong><i aria-hidden="true">↗</i></button>)}</div><div className={`portfolio-panel tone-${products[active].tone}`} id="portfolio-panel" role="tabpanel" aria-live="polite" key={products[active].name}><div className="portfolio-panel-head"><span>{products[active].type}</span><span>{products[active].state}</span></div><div className="portfolio-glyph" aria-hidden="true">{active === 0 ? '↗' : active === 1 ? '⌁' : '✳'}</div><div className="portfolio-panel-bottom"><h3>{products[active].intro}</h3><p>{products[active].detail}</p><ArrowLink href={products[active].anchor}>Explore {products[active].name}</ArrowLink></div></div></div></div></section>
}

function StoryLayout({ id, number, label, title, intro, steps, visual, theme, cta }: { id: string; number: string; label: string; title: ReactNode; intro: string; steps: StoryStep[]; visual: (active: number) => ReactNode; theme: 'light' | 'dark'; cta: ReactNode }) {
  const { active, setActive, refs } = useStoryProgress(steps.length)
  return <section className={`story-section story-${theme}`} id={id}><div className="page-shell"><div className="section-topline" data-reveal><span>{number} / {label}</span><span>SCROLL TO EXPLORE</span></div><div className="story-intro" data-reveal><h2>{title}</h2><p>{intro}</p></div><div className="story-layout"><div className="story-narrative">{steps.map((step, index) => <article key={step.eyebrow} ref={node => { refs.current[index] = node }} role="button" tabIndex={0} aria-current={active === index ? 'step' : undefined} className={`story-step ${active === index ? 'story-step-active' : ''}`} onClick={() => { setActive(index); refs.current[index]?.scrollIntoView({ behavior: 'smooth', block: 'center' }) }} onKeyDown={event => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); setActive(index); refs.current[index]?.scrollIntoView({ behavior: 'smooth', block: 'center' }) } }}><span>{step.eyebrow}</span><h3>{step.title}</h3><p>{step.body}</p><small>{step.detail}</small></article>)}</div><div className="story-visual-wrap"><div className="story-visual-sticky"><div className="story-progress" aria-label={`Step ${active + 1} of ${steps.length}`}>{steps.map((step, index) => <button key={step.eyebrow} aria-label={`View ${step.eyebrow}`} aria-current={active === index ? 'step' : undefined} onClick={() => { setActive(index); refs.current[index]?.scrollIntoView({ behavior: 'smooth', block: 'center' }) }}><i /></button>)}</div><div className="story-visual-content" key={active}>{visual(active)}</div></div></div></div><div className="story-end" data-reveal>{cta}</div></div></section>
}

function LeadFlowVisual({ active }: { active: number }) {
  const names = ['Amina N.', 'James M.', 'Studio K', 'Rose T.']
  const messages = [
    ['Hello! Can you help me choose a plan for my team?', 'Absolutely. How many people will need access?'],
    ['We need a solution for two locations.', 'Got it. I’ll prepare the best fit and next steps.'],
    ['Is there time for a walkthrough this week?', 'Yes. Thursday afternoon is available.'],
    ['We are ready to move forward.', 'Great. I’ll send the agreement and onboarding plan.'],
  ]
  return <div className="lead-ui"><div className="ui-top"><div className="ui-brand"><span>↗</span> leadflow <small>WORKSPACE</small></div><div className="ui-live"><i /> LIVE VIEW</div></div><div className="ui-body"><div className="ui-sidebar"><span className="ui-section-label">CONVERSATIONS</span>{names.map((name, index) => <div className={`ui-conversation ${index === active ? 'selected' : ''}`} key={name}><div className={`avatar avatar-${index}`}>{name[0]}</div><div><strong>{name}</strong><small>{['New enquiry', 'Qualified lead', 'Meeting booked', 'Ready to close'][index]}</small></div><i /></div>)}</div><div className="ui-main"><div className="ui-main-header"><div><span className="ui-section-label">CUSTOMER THREAD</span><strong>{names[active]}</strong></div><span className="ui-channel">{['WEBSITE', 'WHATSAPP', 'EMAIL', 'INSTAGRAM'][active]}</span></div><div className="ui-message"><span>{messages[active][0]}</span></div><div className="ui-message reply"><span>{messages[active][1]}</span></div><div className="ui-action"><span>Next best action</span><strong>{['Reply within 5 minutes', 'Share a tailored proposal', 'Confirm the walkthrough', 'Begin onboarding'][active]}</strong><b>↗</b></div></div><div className="ui-aside"><span className="ui-section-label">LEAD PROFILE</span><div className="ui-score-ring" style={{ '--score': `${[25, 55, 77, 96][active]}%` } as React.CSSProperties}><span>{[25, 55, 77, 96][active]}</span><small>READINESS</small></div><div className="ui-keyval"><span>Source</span><strong>{['Website', 'WhatsApp', 'Email', 'Social'][active]}</strong></div><div className="ui-keyval"><span>Stage</span><strong>{['New', 'Qualified', 'Meeting', 'Closing'][active]}</strong></div><div className="ui-keyval"><span>Owner</span><strong>Sales team</strong></div><div className="ui-pipeline"><span>PIPELINE</span><div>{[0, 1, 2, 3].map(index => <i key={index} className={index <= active ? 'on' : ''} />)}</div></div></div></div><div className="ui-bottom"><span>CAPTURE</span><span>QUALIFY</span><span>AUTOMATE</span><span>MEASURE</span></div></div>
}

function AfriScoreVisual({ active }: { active: number }) {
  const source = ['M-PESA', 'BANK', 'POS']
  return <div className={`score-ui score-stage-${active}`}><div className="score-ui-top"><span>AFRISCORE / DATA FLOW</span><span>SIMULATED EXAMPLE</span></div><div className="score-sources"><span className="score-cap">BUSINESS SOURCES</span><div>{source.map((item, index) => <span key={item} className={index === active % 3 ? 'lit' : ''}><i />{item}</span>)}</div></div><div className="score-flow-line"><i /><i /><i /></div><div className="score-core"><div className="score-core-header"><span>⌁</span><div><strong>AfriScore</strong><small>UNIFIED BUSINESS LAYER</small></div><b>0{active + 1}</b></div>{active === 0 && <div className="score-core-content"><span>ACCOUNT CONNECTION</span><strong>Authorized data enters the system.</strong><p>Provider shaped records are received in a controlled test environment.</p><div className="code-row"><i /> connection.status <b>active</b></div></div>}{active === 1 && <div className="score-core-content"><span>NORMALIZED TRANSACTION</span><strong>One canonical shape.</strong><div className="code-block"><div><em>type</em><b>"credit"</b></div><div><em>amount</em><b>50,000.00</b></div><div><em>currency</em><b>"KES"</b></div><div><em>status</em><b>"completed"</b></div></div></div>}{active === 2 && <div className="score-core-content"><span>CONSENT GATE</span><strong>Access is purpose specific.</strong><div className="permission-row"><span>Developer key</span><b>✓ VERIFIED</b></div><div className="permission-row"><span>Business grant</span><b>✓ ACTIVE</b></div><div className="permission-row"><span>Scope</span><b>FINANCIAL PROFILE</b></div></div>}{active === 3 && <div className="score-core-content"><span>EXPLAINABLE OUTPUT</span><strong>Useful intelligence for builders.</strong><div className="score-bars"><i /><i /><i /><i /><i /><i /><i /></div><div className="code-row"><i /> financial_profile <b>READY ↗</b></div></div>}</div><div className="score-output"><span>{['CONNECT', 'NORMALIZE', 'PERMISSION', 'INTELLIGENCE'][active]}</span><i>→</i><strong>{['SOURCE RECORDS', 'UNIFIED MODEL', 'AUTHORIZED ACCESS', 'BUSINESS API'][active]}</strong></div></div>
}

function LeadFlow() {
  return <StoryLayout id="leadflow" number="03" label="LEADFLOW" title={<>A customer journey<br />that <em>keeps moving.</em></>} intro="LeadFlow is the customer growth workspace in the Veris portfolio. It helps teams turn scattered enquiries into coordinated relationships, clear pipeline movement and measurable outcomes." steps={leadSteps} visual={active => <LeadFlowVisual active={active} />} theme="light" cta={<><div><span className="eyebrow">THE PRODUCT</span><h3>For teams that need the next conversation to count.</h3></div><ArrowLink href="https://github.com/Veris-Africa/leadflow">Explore LeadFlow development</ArrowLink></>} />
}

function AfriScore() {
  return <StoryLayout id="afriscore" number="04" label="AFRISCORE" title={<>Making business information<br /><em>usable infrastructure.</em></>} intro="AfriScore is the infrastructure venture. Its first foundation gives developers a way to work with synthetic and authorized business data through a normalized model, consent controls and explainable APIs." steps={scoreSteps} visual={active => <AfriScoreVisual active={active} />} theme="dark" cta={<><div><span className="eyebrow">THE DEVELOPER FOUNDATION</span><h3>Built in Kenya. Designed for many more systems and markets.</h3></div><ArrowLink href="https://github.com/Veris-Africa/afriscore" light>Explore AfriScore development</ArrowLink></>} />
}

function MarketingVisual() {
  return <div className="marketing-visual" data-reveal><div className="marketing-visual-head"><span>VERIS MARKETING / CAMPAIGN SYSTEM</span><span>CONCEPT VIEW</span></div><div className="marketing-canvas"><div className="marketing-poster"><span>YOUR NEXT<br />BIG THING</span><i>↗</i><small>THE STORY / THE OFFER / THE MOMENT</small></div><div className="marketing-stack"><div className="marketing-stack-card"><span>01 / POSITIONING</span><strong>A story people remember.</strong><i /></div><div className="marketing-stack-card"><span>02 / DISTRIBUTION</span><strong>Reach the right audience.</strong><i /></div><div className="marketing-stack-card"><span>03 / MEASUREMENT</span><strong>Know what moved.</strong><div className="mini-chart"><i /><i /><i /><i /><i /><i /></div></div></div></div><div className="marketing-visual-foot">STRATEGY <span>→</span> CREATIVE <span>→</span> CAMPAIGNS <span>→</span> LEARNING</div></div>
}

function Marketing() {
  return <section className="marketing-section section-pad" id="marketing"><div className="page-shell"><div className="section-topline" data-reveal><span>05 / VERIS MARKETING</span><span>GROWTH SERVICES</span></div><div className="marketing-layout"><div className="marketing-copy" data-reveal><span className="eyebrow">THE SERVICE VENTURE</span><h2>A better story.<br /><em>A stronger way</em><br />to reach people.</h2><p>Software alone does not create demand. Businesses also need a clear position in the market, ideas worth noticing and consistent execution. Veris Marketing brings strategy, creative and performance thinking together so campaigns connect to a real business goal.</p><div className="marketing-list"><div><span>01</span><strong>Find the position</strong><small>Audience, offer, voice and market fit.</small></div><div><span>02</span><strong>Build the system</strong><small>Brand assets, content and channel plans.</small></div><div><span>03</span><strong>Launch and learn</strong><small>Campaigns, reporting and iteration.</small></div></div><p className="availability">Veris Marketing is being formed as a dedicated service branch.</p></div><MarketingVisual /></div></div></section>
}

function Approach() {
  return <section className="approach-section section-pad" id="approach"><div className="page-shell"><div className="section-topline" data-reveal><span>06 / HOW WE BUILD</span><span>SHARED OPERATING PRINCIPLES</span></div><div className="approach-header" data-reveal><h2>Independent ventures.<br /><em>One standard of work.</em></h2><p>Veris gives each venture room to solve its own problem while sharing the disciplines that make a company dependable. The result is a portfolio that can grow without asking customers to understand a complicated corporate structure.</p></div><div className="approach-grid"><article data-reveal><span>01 / FOCUS</span><div className="approach-shape shape-one">◌</div><h3>Begin with a real workflow.</h3><p>We map where people lose time, context or trust, then build around that moment. LeadFlow began with scattered customer conversations. AfriScore begins with fragmented business records.</p></article><article data-reveal><span>02 / CRAFT</span><div className="approach-shape shape-two">✳</div><h3>Make the complex feel clear.</h3><p>Useful infrastructure can be technically deep and still be understandable. Design and explanation are part of the product, from a lead timeline to an API response.</p></article><article data-reveal><span>03 / TRUST</span><div className="approach-shape shape-three">⌁</div><h3>Earn the next stage.</h3><p>We distinguish prototypes from production capabilities, keep permissions explicit and improve through measured use. Expansion follows reliability and legitimate access.</p></article></div><div className="approach-banner" data-reveal><span>THE VERIS THESIS</span><p>Progress compounds when businesses can rely on the systems beneath them.</p><i>↗</i></div></div></section>
}

function Outlook() {
  return <section className="outlook-section section-pad"><div className="page-shell"><div className="section-topline" data-reveal><span>07 / THE HORIZON</span><span>FROM KENYA OUTWARD</span></div><div className="outlook-content" data-reveal><div><h2>Built for the work<br /><em>ahead of us.</em></h2><p>Veris is early in its journey. LeadFlow is being developed as a practical product for customer facing teams. AfriScore has an API and sandbox foundation, while real institutional integrations remain a later stage. Veris Marketing is taking shape as a service venture.</p></div><div className="outlook-rail"><div><span>NOW</span><strong>Strengthen the foundations</strong><p>Improve the products, test with real workflows and establish reliable operations.</p></div><div><span>NEXT</span><strong>Work with early partners</strong><p>Learn with businesses, developers and teams who face these problems firsthand.</p></div><div><span>LATER</span><strong>Connect the ecosystem</strong><p>Let each venture reinforce the others while preserving clear permissions and boundaries.</p></div></div></div></div></section>
}

function FinalCall() {
  return <section className="final-call" id="connect"><div className="page-shell final-call-inner"><span>WHAT COMES NEXT STARTS WITH USEFUL WORK</span><h2>Let’s build something<br /><em>worth relying on.</em></h2><p>Explore the ventures, follow their progress and see how Veris is turning practical problems into lasting systems.</p><div className="final-actions"><ArrowLink href="https://github.com/Veris-Africa" light>View the Veris organization</ArrowLink><a href="#top">Back to the beginning ↑</a></div><div className="final-orbit" aria-hidden="true" /></div></section>
}

function Footer() {
  return <footer className="site-footer"><div className="page-shell"><div className="footer-main"><div><Brand /><p>Focused products, growth services and business infrastructure for a more connected African economy.</p></div><div><span>VENTURES</span><a href="#leadflow">LeadFlow</a><a href="#afriscore">AfriScore</a><a href="#marketing">Veris Marketing</a></div><div><span>COMPANY</span><a href="#company">About Veris</a><a href="#approach">How we build</a><a href="https://github.com/Veris-Africa">Development</a></div></div><div className="footer-base"><span>© {new Date().getFullYear()} VERIS</span><span>FOUNDED IN KENYA · BUILT FOR WHAT COMES NEXT</span></div></div></footer>
}

export default function App() {
  useReveals()
  return <><a className="skip-link" href="#main">Skip to content</a><Header /><main id="main"><Hero /><RunningLine /><Company /><Portfolio /><LeadFlow /><AfriScore /><Marketing /><Approach /><Outlook /><FinalCall /></main><Footer /></>
}
