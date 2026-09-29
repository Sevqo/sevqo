import { useEffect, useRef, useState } from 'react'
import type { FormEvent, ReactNode } from 'react'
import { useSiteMotion } from './motion'

const ventures=[
  {id:'leadflow',index:'01',name:'LeadFlow',label:'Sales infrastructure',state:'Product live',headline:'Turn conversations into customers.',copy:'An intelligent customer-acquisition workspace that captures enquiries, qualifies prospects, coordinates follow-up and gives teams a measurable sales pipeline.',domain:'leadflow.veris.org',features:['Unified enquiries','AI qualification','Pipeline & automation','Revenue analytics'],color:'lime'},
  {id:'marketing',index:'02',name:'Veris Marketing',label:'Managed growth systems',state:'Agency opening',headline:'Strategy that reaches the market.',copy:'A modern marketing partner for businesses that need sharper positioning, better creative, accountable campaigns and a team that can connect strategy to execution.',domain:'marketing.veris.org',features:['Brand & positioning','Campaign strategy','Content systems','Performance reporting'],color:'orange'},
  {id:'africore',index:'03',name:'AfriCore',label:'Programmable infrastructure',state:'In development',headline:'Make African business infrastructure programmable.',copy:'A secure infrastructure layer designed to connect fragmented business systems, normalize authorized data, build useful intelligence and expose it through clean APIs.',domain:'africore.veris.org',features:['Data connectors','Unified business model','Intelligence APIs','Authorized actions'],color:'blue'}
] as const

const operatingSteps=[
  ['01','Understand','Start with the real commercial problem, not a fashionable feature.'],
  ['02','Design','Turn complexity into a clear system people can actually use.'],
  ['03','Build','Ship reliable products, services and infrastructure in focused stages.'],
  ['04','Operate','Measure what works, improve the system and stay accountable.']
] as const

function Brand(){return <a className="brand" href="#top" aria-label="Veris home"><span className="brand-mark"><i/>V</span><strong>VERIS<small>BUILD WHAT COMES NEXT</small></strong></a>}

function SectionHeading({eyebrow,title,copy,inverse=false}:{eyebrow:string;title:ReactNode;copy:string;inverse?:boolean}){
  return <header className={'section-heading '+(inverse?'inverse':'')} data-reveal><p className="eyebrow"><span/>{eyebrow}</p><h2>{title}</h2><p>{copy}</p></header>
}

export default function App(){
  const root=useSiteMotion(),[menu,setMenu]=useState(false),[compact,setCompact]=useState(false)
  const sentinel=useRef<HTMLDivElement>(null),menuButton=useRef<HTMLButtonElement>(null)
  useEffect(()=>{const observer=new IntersectionObserver(([entry])=>setCompact(!entry.isIntersecting));if(sentinel.current)observer.observe(sentinel.current);return()=>observer.disconnect()},[])
  useEffect(()=>{if(!menu)return;const close=(event:KeyboardEvent)=>{if(event.key==='Escape'){setMenu(false);menuButton.current?.focus()}};document.addEventListener('keydown',close);return()=>document.removeEventListener('keydown',close)},[menu])
  return <div className="site" ref={root} id="top">
    <a className="skip" href="#main">Skip to content</a><div className="nav-sentinel" ref={sentinel}/>
    <header className={'nav '+(compact?'compact':'')}><div className="nav-inner"><Brand/><nav className="desktop-nav" aria-label="Main navigation"><a href="#ventures">Ventures</a><a href="#model">How we build</a><a href="#africore">AfriCore</a><a href="#principles">Principles</a></nav><div className="nav-actions"><a className="text-link" href="#contact">Company brief</a><a className="button small" href="#contact" data-magnetic>Start a conversation <span>↗</span></a><button ref={menuButton} className="menu-button" aria-expanded={menu} aria-controls="mobile-navigation" aria-label={menu?'Close menu':'Open menu'} onClick={()=>setMenu(value=>!value)}>{menu?'×':'☰'}</button></div></div><nav id="mobile-navigation" className="mobile-nav" hidden={!menu} aria-label="Mobile navigation">{[['Ventures','ventures'],['How we build','model'],['AfriCore','africore'],['Principles','principles'],['Contact','contact']].map(([label,id])=><a href={'#'+id} key={id} onClick={()=>setMenu(false)}>{label}<span>↗</span></a>)}</nav></header>
    <main id="main">
      <section className="hero shell"><div className="hero-copy"><p className="eyebrow hero-kicker"><span/>Independent African technology company</p><h1>Infrastructure for the businesses <em>building what comes next.</em></h1><p>Veris builds focused software, modern growth services and programmable infrastructure for ambitious businesses across Africa.</p><div className="hero-actions"><a className="button" href="#ventures" data-magnetic>Explore Veris <span>↘</span></a><a className="button outline" href="#model">How we build <span>↓</span></a></div><small>Starting in Kenya. Designed for the continent.</small></div><InfrastructureScene/></section>

      <section className="thesis"><div className="shell thesis-inner" data-reveal><p>One company</p><i>→</i><p>Focused ventures</p><i>→</i><p>Shared standards</p><i>→</i><strong>Useful infrastructure</strong></div></section>

      <section className="section" id="ventures"><SectionHeading eyebrow="01 / The Veris portfolio" title={<>Three ventures.<br/>One operating standard.</>} copy="Each Veris branch solves a different layer of the business problem. They share the same commitment to clarity, useful technology and measurable outcomes."/><VenturePortfolio/></section>

      <section className="dark-section" id="model"><div className="section"><SectionHeading inverse eyebrow="02 / How Veris works" title={<>From an important problem<br/>to an operating system.</>} copy="We combine product thinking, creative execution and infrastructure engineering. The work is staged, honest about readiness and designed to become more useful over time."/><OperatingModel/><div className="model-outcome" data-reveal><span>Clear problem</span><i>→</i><span>Focused system</span><i>→</i><span>Real operation</span><i>→</i><strong>Compounding value</strong></div></div></section>

      <section className="section africore" id="africore"><div className="split-heading" data-reveal><div><p className="eyebrow"><span/>03 / Infrastructure venture</p><h2>A common language for<br/>African business systems.</h2></div><p>AfriCore is being designed as the layer between fragmented financial and operational systems and the developers, businesses and AI products that need to understand them.</p></div><AfriCoreMap/><div className="africore-notes" data-reveal><article><span>START SMALL</span><h3>Kenya first.</h3><p>Begin with consent, sandbox data, transaction normalization and basic financial intelligence before expanding country by country.</p></article><article><span>BUILD TRUST</span><h3>Permissioned by design.</h3><p>Access should be explicit, purpose-specific, auditable and revocable. Infrastructure is valuable only when businesses can trust it.</p></article><article><span>EXPAND CAREFULLY</span><h3>Read before act.</h3><p>First help software understand businesses. Add regulated actions and payments through authorized partnerships and licensing.</p></article></div></section>

      <section className="signal-section"><div className="section"><p className="eyebrow" data-reveal><span/>The Veris thesis</p><blockquote data-reveal>“The next generation of African businesses should not have to rebuild the same missing infrastructure.”</blockquote><p data-reveal>Veris exists to turn repeated business friction into systems, services and platforms others can rely on.</p></div></section>

      <section className="section principles" id="principles"><SectionHeading eyebrow="04 / The standard behind the work" title={<>Useful before impressive.<br/>Trust before scale.</>} copy="We want the company to feel ambitious without pretending every part of the ambition is already complete."/><div className="principle-grid">{[
        ['01','Build from reality','Understand the market, workflow and constraints before deciding what the product should be.'],
        ['02','Make complexity legible','Good infrastructure can be technically deep without making customers feel lost.'],
        ['03','Separate live from planned','Show what works, what is being tested and what still depends on partners or regulation.'],
        ['04','Earn the next stage','Expand through evidence, reliability and trust—not through feature claims alone.'],
        ['05','Design for many industries','Create adaptable systems instead of forcing every business into one narrow workflow.'],
        ['06','Keep people accountable','Automation should strengthen judgment, ownership and customer relationships.']
      ].map(([n,title,copy])=><article key={n} data-reveal data-tilt><span>{n}</span><h3>{title}</h3><p>{copy}</p><i>↗</i></article>)}</div></section>

      <section className="section horizons"><SectionHeading eyebrow="05 / Built in stages" title="A company with a long horizon—and a practical next step." copy="The portfolio is designed to grow without confusing future vision with current capability."/><div className="horizon-track" data-reveal>{[
        ['NOW','LeadFlow','Complete the customer-acquisition product, onboard early teams and replace Stripe dependency with Kenya-ready billing.'],
        ['NEXT','Veris Marketing','Open a focused agency that uses strong systems, creative work and transparent reporting to grow client businesses.'],
        ['BUILDING','AfriCore','Finish the first data-infrastructure product around sandbox connectors, normalization, consent and APIs.'],
        ['LATER','Connected ecosystem','Let each venture strengthen the others while keeping customer data, permissions and operating boundaries clear.']
      ].map(([when,title,copy],i)=><article key={title}><span>0{i+1}</span><small>{when}</small><h3>{title}</h3><p>{copy}</p></article>)}</div></section>

      <ContactSection/>
    </main>
    <footer className="footer shell"><div><Brand/><p>Build what comes next.</p><small>© {new Date().getFullYear()} Veris. Kenya.</small></div><div><h3>Ventures</h3><a href="#ventures">LeadFlow</a><a href="#ventures">Veris Marketing</a><a href="#africore">AfriCore</a></div><div><h3>Company</h3><a href="#model">How we build</a><a href="#principles">Principles</a><a href="#contact">Contact</a></div><div className="footer-note"><span>NAIROBI / KENYA</span><p>Software. Services.<br/>Infrastructure.</p></div></footer>
  </div>
}

function InfrastructureScene(){
  return <div className="infrastructure-scene" aria-label="Veris connects business needs to focused ventures" data-reveal><div className="scene-grid"/><div className="scene-label">VERIS SYSTEM / 001</div><div className="scene-inputs"><span>Customer demand</span><span>Growth execution</span><span>Business systems</span></div><div className="route route-a"><i/></div><div className="route route-b"><i/></div><div className="route route-c"><i/></div><div className="scene-core"><span>V</span><strong>VERIS</strong><small>OPERATING LAYER</small></div><div className="scene-outputs"><span className="lime">LeadFlow <b>↗</b></span><span className="orange">Marketing <b>↗</b></span><span className="blue">AfriCore <b>↗</b></span></div><p>Three focused ventures. One shared standard for clarity, craft and trust.</p></div>
}

function VenturePortfolio(){
  const [active,setActive]=useState(0),venture=ventures[active]
  return <div className="venture-layout"><div className="venture-list" role="tablist" aria-label="Veris ventures">{ventures.map((item,index)=><button role="tab" aria-selected={active===index} key={item.id} onMouseEnter={()=>setActive(index)} onFocus={()=>setActive(index)} onClick={()=>setActive(index)}><span>{item.index}</span><div><small>{item.label}</small><strong>{item.name}</strong></div><i>↗</i></button>)}</div><article className={'venture-detail '+venture.color} key={venture.id} data-tilt><div className="venture-meta"><span>{venture.state}</span><small>{venture.domain}</small></div><h3>{venture.headline}</h3><p>{venture.copy}</p><ul>{venture.features.map(feature=><li key={feature}>✓ {feature}</li>)}</ul><a href={venture.id==='africore'?'#africore':'#contact'}>{venture.id==='leadflow'?'Visit product preview':'Discuss this venture'} <span>↗</span></a></article></div>
}

function OperatingModel(){
  const [active,setActive]=useState(0)
  return <div className="operating-model"><div className="model-steps" role="tablist" aria-label="Veris operating model">{operatingSteps.map(([n,title],index)=><button role="tab" aria-selected={active===index} key={n} onMouseEnter={()=>setActive(index)} onFocus={()=>setActive(index)} onClick={()=>setActive(index)}><span>{n}</span>{title}<i>↗</i></button>)}</div><div className="model-detail" key={active}><span>{operatingSteps[active][0]}</span><div><p>{operatingSteps[active][1]}</p><h3>{operatingSteps[active][2]}</h3></div><div className="model-orbit"><i/><i/><i/></div></div></div>
}

function AfriCoreMap(){
  return <div className="africore-map" data-reveal><div className="source-column"><small>AUTHORIZED SOURCES</small>{['M-PESA','BANKS','POS','eTIMS','ACCOUNTING','COMMERCE'].map(item=><span key={item}>{item}</span>)}</div><div className="map-arrow source-arrow"><i/>→</div><div className="core-column"><small>AFRICORE CORE</small>{['Connect','Validate','Normalize','Model','Understand'].map((item,i)=><span key={item}><b>0{i+1}</b>{item}</span>)}</div><div className="map-arrow output-arrow"><i/>→</div><div className="consumer-column"><small>SECURE OUTPUTS</small>{['BUSINESS API','ANALYTICS','RISK','AI TOOLS','RECONCILIATION','APPLICATIONS'].map(item=><span key={item}>{item}</span>)}</div><div className="map-pulse pulse-one"/><div className="map-pulse pulse-two"/></div>
}

function ContactSection(){
  const [sent,setSent]=useState(false)
  const submit=(event:FormEvent<HTMLFormElement>)=>{event.preventDefault();setSent(true)}
  return <section className="contact" id="contact"><div className="section contact-grid"><div data-reveal><p className="eyebrow"><span/>Start somewhere useful</p><h2>What should Veris<br/>help you build?</h2><p>Talk to us about LeadFlow, a marketing engagement, an AfriCore partnership or the next business system that should exist.</p><div className="contact-lines"><span>PRODUCTS / SERVICES / INFRASTRUCTURE</span><span>NAIROBI / KENYA</span></div></div><form onSubmit={submit} data-reveal><label>Your name<input name="name" autoComplete="name" required placeholder="How should we address you?"/></label><label>Work email<input type="email" name="email" autoComplete="email" required placeholder="you@company.com"/></label><label>What are you exploring?<select name="interest" defaultValue=""><option value="" disabled>Choose a starting point</option><option>LeadFlow</option><option>Veris Marketing</option><option>AfriCore</option><option>Partnership</option><option>Something else</option></select></label><label>Brief context<textarea name="message" required placeholder="Tell us about the problem, business or opportunity." rows={4}/></label><button className="button" type="submit">Prepare enquiry <span>↗</span></button>{sent&&<p className="form-status" role="status">Your enquiry is prepared in this preview. We’ll connect secure delivery when the Veris domain and inbox are configured.</p>}</form></div></section>
}
