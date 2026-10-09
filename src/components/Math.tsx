import { useMemo } from 'react';
import katex from 'katex';
export function MathFormula({value,block=true}:{value:string;block?:boolean}) {const html=useMemo(()=>katex.renderToString(value,{displayMode:block,throwOnError:false,trust:false,output:'htmlAndMathml'}),[value,block]);return <div className={block?'math-block':'math-inline'} dangerouslySetInnerHTML={{__html:html}}/>;}
