import { useEffect, useMemo, useRef } from 'react';
import katex from 'katex';
import { symbols } from '../content/glossary';
import { useExplanation } from './Glossary';
export function MathFormula({value,block=true}:{value:string;block?:boolean}) {
 const html=useMemo(()=>katex.renderToString(value,{displayMode:block,throwOnError:false,trust:false,output:'htmlAndMathml'}),[value,block]);
 const container=useRef<HTMLDivElement>(null);const help=useExplanation();const used=useMemo(()=>{const doc=new DOMParser().parseFromString(html,'text/html');const leaves=[...doc.querySelectorAll('.katex-html span')].filter(e=>!e.children.length).map(e=>e.textContent);return Object.keys(symbols).filter(symbol=>leaves.includes(symbol));},[html]);
 useEffect(()=>{
  // Annotate visual leaves only. Keep KaTeX's semantic MathML intact.
  const visual=container.current?.querySelector('.katex-html');if(!visual)return;
  for(const element of visual.querySelectorAll<HTMLElement>('span')){
   const symbol=element.textContent??'';if(element.children.length||!symbols[symbol])continue;
   element.dataset.mathSymbol=symbol;element.classList.add('explained-symbol');
  }
  // Visual leaves offer hover help. Keyboard controls below keep hidden KaTeX unfocusable.
 },[html]);
 const target=(element:EventTarget|null)=>element instanceof HTMLElement?element.closest<HTMLElement>('[data-math-symbol]'):null;
 const show=(element:EventTarget|null)=>{const anchor=target(element);if(anchor)help.open(symbols[anchor.dataset.mathSymbol!],anchor);};
 return <><div ref={container} className={block?'math-block':'math-inline'} onMouseOver={e=>show(e.target)} onMouseOut={e=>{if(!target(e.relatedTarget))help.leave();}} onFocus={e=>show(e.target)} onBlur={help.close} onClick={e=>show(e.target)} onKeyDown={e=>{if((e.key==='Enter'||e.key===' ')&&target(e.target)){e.preventDefault();show(e.target);}}} dangerouslySetInnerHTML={{__html:html}}/>{used.length>0&&<div className="symbol-help" aria-label="Explicații pentru simboluri"><span>Explorează simbolurile:</span>{used.map(symbol=><button key={symbol} className="explained-term" aria-label={`Explică simbolul ${symbol}: ${symbols[symbol].title}`} aria-describedby={help.active?.anchor.dataset.symbol===symbol?help.id:undefined} data-symbol={symbol} onMouseEnter={e=>help.open(symbols[symbol],e.currentTarget)} onMouseLeave={help.leave} onFocus={e=>help.open(symbols[symbol],e.currentTarget)} onBlur={help.close} onClick={e=>help.open(symbols[symbol],e.currentTarget)}>{symbol}</button>)}</div>}{help.tooltip}</>;
}
