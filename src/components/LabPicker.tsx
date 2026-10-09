import { useEffect, useId, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Check, ChevronDown } from 'lucide-react';
interface Choice {id:string;title:string;description?:string}
export function LabPicker({label,value,choices,onChange}:{label:string;value:string;choices:Choice[];onChange:(id:string)=>void}) {
 const uid=useId();const trigger=useRef<HTMLButtonElement>(null);const menu=useRef<HTMLDivElement>(null);
 const [open,setOpen]=useState(false);const [active,setActive]=useState(0);const [position,setPosition]=useState({left:12,top:12,width:280,maxHeight:320});
 const selected=Math.max(0,choices.findIndex(c=>c.id===value));
 const show=(index=selected)=>{setActive(index);setOpen(true);};
 const choose=(index:number)=>{onChange(choices[index].id);setOpen(false);trigger.current?.focus();};
 useLayoutEffect(()=>{
  if(!open)return;
  const place=()=>{const rect=trigger.current!.getBoundingClientRect();const below=innerHeight-rect.bottom-16;const above=rect.top-16;const down=below>=Math.min(260,above);const maxHeight=Math.max(80,Math.min(360,down?below:above));const height=Math.min(menu.current?.scrollHeight??maxHeight,maxHeight);const width=Math.min(rect.width,innerWidth-24);setPosition({left:Math.max(12,Math.min(rect.left,innerWidth-width-12)),top:down?rect.bottom+8:Math.max(8,rect.top-height-8),width,maxHeight});};
  const outside=(e:PointerEvent)=>{if(!trigger.current?.contains(e.target as Node)&&!menu.current?.contains(e.target as Node))setOpen(false);};
  place();document.addEventListener('pointerdown',outside);window.addEventListener('resize',place);window.addEventListener('scroll',place,true);
  return()=>{document.removeEventListener('pointerdown',outside);window.removeEventListener('resize',place);window.removeEventListener('scroll',place,true);};
 },[open]);
 useEffect(()=>{if(open)document.getElementById(`${uid}-${active}`)?.scrollIntoView({block:'nearest'});},[open,active,uid]);
 const current=choices[selected];
 return <div className="lab-picker"><span id={`${uid}-label`} className="lab-picker-label">{label}</span><button ref={trigger} type="button" role="combobox" aria-labelledby={`${uid}-label`} aria-haspopup="listbox" aria-expanded={open} aria-controls={open?`${uid}-list`:undefined} aria-activedescendant={open?`${uid}-${active}`:undefined} className={`lab-picker-trigger ${open?'is-open':''}`} onClick={()=>open?setOpen(false):show()} onBlur={()=>setOpen(false)} onKeyDown={e=>{
  if(e.key==='Escape'){e.preventDefault();setOpen(false);return;}if(e.key==='Tab'){setOpen(false);return;}
  if(['ArrowDown','ArrowUp','Home','End'].includes(e.key)){e.preventDefault();if(!open){show(e.key==='Home'?0:e.key==='End'?choices.length-1:selected);return;}setActive(i=>e.key==='Home'?0:e.key==='End'?choices.length-1:e.key==='ArrowDown'?(i+1)%choices.length:(i-1+choices.length)%choices.length);}
  if(e.key==='Enter'||e.key===' '){e.preventDefault();if(open)choose(active);else show();}
 }}><span>{current.title}</span><ChevronDown size={18} aria-hidden="true"/></button>{open&&createPortal(<div ref={menu} id={`${uid}-list`} role="listbox" aria-labelledby={`${uid}-label`} className="lab-picker-menu" style={position}>{choices.map((choice,i)=><div key={choice.id} id={`${uid}-${i}`} role="option" aria-selected={selected===i} aria-label={choice.title} className={`lab-picker-option ${active===i?'highlighted':''}`} onMouseDown={e=>e.preventDefault()} onPointerMove={()=>setActive(i)} onClick={()=>choose(i)}><span className="lab-choice-check" aria-hidden="true">{selected===i?<Check size={17}/>:i+1}</span><div><strong>{choice.title}</strong>{choice.description&&<p>{choice.description}</p>}</div></div>)}</div>,document.body)}</div>;
}
