import { useEffect, useRef } from 'react'

export function useSiteMotion(){
  const root=useRef<HTMLDivElement>(null)
  useEffect(()=>{
    const element=root.current
    if(!element)return
    const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const reveals=[...element.querySelectorAll<HTMLElement>('[data-reveal]')]
    if(reduced)reveals.forEach(node=>node.dataset.visible='true')
    const observer=reduced?null:new IntersectionObserver(entries=>entries.forEach(entry=>{
      if(entry.isIntersecting){(entry.target as HTMLElement).dataset.visible='true';observer?.unobserve(entry.target)}
    }),{threshold:.14,rootMargin:'0px 0px -6%'})
    reveals.forEach(node=>observer?.observe(node))
    if(reduced)return()=>observer?.disconnect()

    const move=(event:PointerEvent)=>{
      const x=event.clientX/window.innerWidth-.5,y=event.clientY/window.innerHeight-.5
      element.style.setProperty('--pointer-x',String(x))
      element.style.setProperty('--pointer-y',String(y))
    }
    const tilt=(event:PointerEvent)=>{
      const card=(event.target as HTMLElement).closest<HTMLElement>('[data-tilt]')
      if(!card)return
      const box=card.getBoundingClientRect(),x=(event.clientX-box.left)/box.width-.5,y=(event.clientY-box.top)/box.height-.5
      card.style.setProperty('--rx',`${-y*4}deg`);card.style.setProperty('--ry',`${x*5}deg`)
    }
    const reset=(event:PointerEvent)=>{
      const card=(event.target as HTMLElement).closest<HTMLElement>('[data-tilt]')
      if(card){card.style.setProperty('--rx','0deg');card.style.setProperty('--ry','0deg')}
    }
    window.addEventListener('pointermove',move,{passive:true})
    element.addEventListener('pointermove',tilt,{passive:true})
    element.addEventListener('pointerout',reset,{passive:true})
    return()=>{observer?.disconnect();window.removeEventListener('pointermove',move);element.removeEventListener('pointermove',tilt);element.removeEventListener('pointerout',reset)}
  },[])
  return root
}
