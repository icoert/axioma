import { useMemo } from 'react';
import katex from 'katex';
import { mathParts } from '../lib/mathText';
export function InlineMath({value}:{value:string}){const html=useMemo(()=>katex.renderToString(value,{throwOnError:false,trust:false,output:'htmlAndMathml',displayMode:false}),[value]);return <span className="rendered-math" dangerouslySetInnerHTML={{__html:html}}/>;}
export function MathText({text}:{text:string}){return <span className="math-text" data-math-text={text}>{mathParts(text).map((part,i)=>part.tex?<InlineMath key={i} value={part.tex}/>:part.text)}</span>;}
