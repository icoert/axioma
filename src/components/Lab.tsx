import { useId, useState } from 'react';
import { RotateCcw, SlidersHorizontal } from 'lucide-react';
import type { LabKind } from '../content/types';
const X=(x:number)=>240+x*32;const Y=(y:number)=>160-y*24;
function curve(fn:(x:number)=>number,start=-7,end=7){return Array.from({length:201},(_,i)=>{const x=start+(end-start)*i/200;return `${i?'L':'M'}${X(x).toFixed(2)},${Y(fn(x)).toFixed(2)}`;}).join(' ');}
export function Lab({kind='quadratic',compact=false}:{kind?:LabKind;compact?:boolean}) {
 const [a,setA]=useState(1);const [b,setB]=useState(0);const [c,setC]=useState(-2);const [t,setT]=useState(1);const uid=useId().replaceAll(':','');
 const reset=()=>{setA(1);setB(0);setC(-2);setT(1);};
 const f=(x:number)=>kind==='derivative'?x*x/3:kind==='integral'?x*x/4:a*x*x+b*x+c;
 const path=curve(f);const theta=t*Math.PI/180;
 const slider=(name:string,value:number,set:(n:number)=>void,min:number,max:number,step=1)=><label className="slider-row"><span>{name}</span><input aria-label={name} type="range" min={min} max={max} step={step} value={value} onChange={e=>set(Number(e.target.value))}/><output>{value}</output></label>;
 const title=kind==='trigonometry'?'Cercul trigonometric':kind==='derivative'?'Tangenta în mișcare':kind==='integral'?'Aria de sub grafic':kind==='vectors'?'Vectori în plan':'Laboratorul parabolei';
 return <section className={`lab ${compact?'compact':''}`} aria-label={title}>
  <div className="lab-header"><span><SlidersHorizontal size={16}/>{compact?'EXPLOREAZĂ O IDEE':title}</span><button className="icon-button" onClick={reset} aria-label="Resetează graficul"><RotateCcw size={16}/></button></div>
  <svg viewBox="0 0 480 320" role="img" aria-label={`${title}. ${kind==='quadratic'?`a=${a}, b=${b}, c=${c}`:`Parametru ${t}`}`}>
   <defs><pattern id={`grid-${uid}`} width="32" height="24" patternUnits="userSpaceOnUse"><path d="M 32 0 L 0 0 0 24" fill="none" stroke="currentColor" strokeOpacity=".1" strokeWidth="1"/></pattern><clipPath id={`clip-${uid}`}><rect width="480" height="320"/></clipPath><linearGradient id={`fill-${uid}`} x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#b8ea69" stopOpacity=".45"/><stop offset="100%" stopColor="#b8ea69" stopOpacity=".06"/></linearGradient></defs>
   <rect width="480" height="320" fill={`url(#grid-${uid})`}/><path d="M0 160H480 M240 0V320" stroke="currentColor" strokeOpacity=".3"/><text x="463" y="150">x</text><text x="250" y="18">y</text><text x="249" y="178">0</text>
   <g clipPath={`url(#clip-${uid})`}>
   {kind==='trigonometry'?<><circle cx="240" cy="160" r="115" stroke="currentColor" strokeOpacity=".4" fill="none"/><path d={`M240 160L${240+115*Math.cos(theta)} ${160-115*Math.sin(theta)}L${240+115*Math.cos(theta)} 160Z`} fill={`url(#fill-${uid})`} stroke="#c6f36a" strokeWidth="2"/><circle cx={240+115*Math.cos(theta)} cy={160-115*Math.sin(theta)} r="7" fill="#c6f36a"/><text x="20" y="30">θ = {t}°</text></>:
   kind==='vectors'?<><path d={`M240 160L${X(a)} ${Y(t)}`} stroke="#c6f36a" strokeWidth="4"/><path d={`M240 160L${X(b+2)} ${Y(c)}`} stroke="#a798ed" strokeWidth="4"/><path d={`M${X(a)} ${Y(t)}L${X(a+b+2)} ${Y(t+c)}L${X(b+2)} ${Y(c)}`} stroke="currentColor" strokeOpacity=".5" strokeDasharray="5 5" fill="none"/><path d={`M240 160L${X(a+b+2)} ${Y(t+c)}`} stroke="#f8ca74" strokeWidth="3"/><circle cx={X(a+b+2)} cy={Y(t+c)} r="5" fill="#f8ca74"/></>:
   <>{kind==='integral'&&<path d={`${curve(f,0,t)}L${X(t)} 160L240 160Z`} fill={`url(#fill-${uid})`}/>}<path className="curve-line" d={path} fill="none" stroke="#c6f36a" strokeWidth="3.5" strokeLinecap="round"/>{kind==='derivative'?<><path d={curve(x=>f(t)+(2*t/3)*(x-t))} stroke="#aa9aec" strokeWidth="2"/><circle cx={X(t)} cy={Y(f(t))} r="6" fill="#c6f36a"/></>:kind==='quadratic'&&a!==0&&<circle cx={X(-b/(2*a))} cy={Y(f(-b/(2*a)))} r="6" fill="#c6f36a"/>}</>}
   </g>
  </svg>
  <div className="lab-caption" aria-live="polite">{kind==='trigonometry'?`sin θ = ${Math.sin(theta).toFixed(2)} · cos θ = ${Math.cos(theta).toFixed(2)}`:kind==='derivative'?`f(x) = x²/3 · f′(${t}) = ${(2*t/3).toFixed(2)}`:kind==='integral'?`∫₀${t} x²/4 dx = ${(t**3/12).toFixed(3)}`:kind==='vectors'?`u = (${a}, ${t}) · v = (${b+2}, ${c}) · u + v = (${a+b+2}, ${t+c})`:`f(x) = ${a}x² ${b<0?'−':'+'} ${Math.abs(b)}x ${c<0?'−':'+'} ${Math.abs(c)}`}</div>
  <div className="lab-controls">{kind==='trigonometry'?slider('Unghi θ',t,setT,0,360):kind==='derivative'?slider('Punctul x',t,setT,-5,5,.1):kind==='integral'?slider('Limita superioară',t,setT,0,5,.1):kind==='vectors'?<>{slider('uₓ',a,setA,-5,5)}{slider('uᵧ',t,setT,-5,5)}</>:<>{slider('Coeficient a',a,setA,-2,2,.25)}{!compact&&<>{slider('Coeficient b',b,setB,-4,4,.5)}{slider('Coeficient c',c,setC,-4,4,.5)}</>}</>}</div>
  {!compact&&<p className="lab-note">{kind==='quadratic'?(a===0?'a = 0: funcția nu mai este de gradul al doilea.':`Vârful V(${(-b/(2*a)).toFixed(2)}, ${f(-b/(2*a)).toFixed(2)}). ${a>0?'Vârful este un minim.':'Vârful este un maxim.'}`):kind==='integral'?'Modifică limita superioară și compară aria cu valoarea integralei.':kind==='vectors'?'Verde: u. Violet: v. Auriu: suma u + v, construită cu regula paralelogramului.':'Mișcă punctul și urmărește cum se schimbă relațiile dintre valori.'}</p>}
 </section>;
}
