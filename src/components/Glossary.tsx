import { useEffect, useId, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { explainText, type Definition } from '../content/glossary';
export function useExplanation() {
 const [active,setActive]=useState<{definition:Definition;anchor:HTMLElement}|null>(null);
 const [position,setPosition]=useState({left:8,top:8});const popup=useRef<HTMLDivElement>(null);const timeout=useRef<ReturnType<typeof setTimeout>|undefined>(undefined);const id=useId();
 const cancel=()=>clearTimeout(timeout.current);
 const close=()=>{cancel();setActive(null);};
 const open=(definition:Definition,anchor:HTMLElement)=>{cancel();setActive({definition,anchor});};
 const leave=()=>{cancel();timeout.current=setTimeout(()=>setActive(null),180);};
 useEffect(()=>()=>cancel(),[]);
 useEffect(()=>{
  if(!active)return;
  const place=()=>{const rect=active.anchor.getBoundingClientRect();const width=popup.current?.offsetWidth??280;const height=popup.current?.offsetHeight??120;setPosition({left:Math.max(8,Math.min(rect.left,window.innerWidth-width-8)),top:Math.max(8,Math.min(rect.bottom+8,window.innerHeight-height-8))});};
  const escape=(e:KeyboardEvent)=>{if(e.key==='Escape')close();};
  const outside=(e:PointerEvent)=>{if(!active.anchor.contains(e.target as Node)&&!popup.current?.contains(e.target as Node))close();};
  place();document.addEventListener('keydown',escape);document.addEventListener('pointerdown',outside);window.addEventListener('resize',place);window.addEventListener('scroll',place,true);
  return()=>{document.removeEventListener('keydown',escape);document.removeEventListener('pointerdown',outside);window.removeEventListener('resize',place);window.removeEventListener('scroll',place,true);};
 },[active]);
 const tooltip=active?createPortal(<div ref={popup} id={id} role="tooltip" className="explanation-popup" style={position} onMouseEnter={cancel} onMouseLeave={leave}><strong>{active.definition.title}</strong><p>{active.definition.explanation}</p></div>,document.body):null;
 return {active,id,open,close,leave,cancel,tooltip};
}
function ExplainedTerm({text,definition}:{text:string;definition:Definition}) {
 const help=useExplanation();
 return <><button type="button" className="explained-term" aria-label={`Explică «${text}»`} aria-describedby={help.active?help.id:undefined} onMouseEnter={e=>help.open(definition,e.currentTarget)} onMouseLeave={help.leave} onFocus={e=>help.open(definition,e.currentTarget)} onBlur={help.close} onClick={e=>help.open(definition,e.currentTarget)}>{text}</button>{help.tooltip}</>;
}
export function GlossaryText({text}:{text:string}) {return <>{explainText(text).map((part,i)=>part.definition?<ExplainedTerm key={i} text={part.text} definition={part.definition}/>:part.text)}</>;}
