import { expect, it } from 'vitest';
import katex from 'katex';
import { mathParts, plainMathToTex } from '../src/lib/mathText';
import { lessons } from '../src/content/curriculum';
import { middleSchoolTopics } from '../src/content/recaps';
import { glossary, symbols } from '../src/content/glossary';
import { labs } from '../src/content/labs';
it('renders powers, radicals, fractions, sets and explicit ambiguous notation without changing prose',()=>{
 expect(plainMathToTex('√(x²+1)')).toBe('\\sqrt{x^{2}+1}');expect(mathParts('z=a+bi')[0].tex).toBe('z=a+bi');expect(mathParts("f'(x)=2x")[0].tex).toBe("f'(x)=2x");expect(plainMathToTex('π/2')).toBe('\\pi /2');expect(plainMathToTex('1/2')).toBe('\\frac{1}{2}');expect(plainMathToTex('aₙ')).toBe('a_{n}');expect(plainMathToTex('{1,2}')).toBe('\\{1,2\\}');
 const sentence='Calculăm 1/2+√50, apoi verificăm x²=49.';const parts=mathParts(sentence);expect(parts.map(p=>p.text).join('')).toBe(sentence);expect(parts.filter(p=>p.tex).length).toBe(2);expect(mathParts('Graficul lui f(x) are punctul P(x,y).').filter(p=>p.tex).length).toBe(2);expect(mathParts('Polinoame. Împărțire și Bézout')).toEqual([{text:'Polinoame. Împărțire și Bézout'}]);expect(mathParts('Recitește explicațiile și încearcă din nou.')).toEqual([{text:'Recitește explicațiile și încearcă din nou.'}]);expect(mathParts('$\\sqrt{(-7)^2}$ este pozitiv.')[0].tex).toBe('\\sqrt{(-7)^2}');
});
it('all authored teaching, recap, lab and quiz expressions parse with KaTeX',()=>{
 const texts:string[]=[];const collect=(value:unknown)=>{if(typeof value==='string')texts.push(value);else if(Array.isArray(value))value.forEach(collect);else if(value&&typeof value==='object')Object.values(value).forEach(collect);};
 for(const l of lessons)collect([l.title,l.summary,l.theory,l.example,l.questions.map(q=>[q.prompt,q.options,q.explanation]),l.practiceQuestions.map(q=>[q.prompt,q.options,q.explanation])]);for(const topic of Object.values(middleSchoolTopics).flat())collect([topic.title,topic.theory,topic.example,topic.questions.map(q=>[q.prompt,q.options,q.explanation])]);collect(glossary);collect(symbols);collect(labs.map(l=>l.examples.map(e=>e.investigation)));
 const failures:string[]=[];for(const text of texts){if(!text.includes('$'))expect(mathParts(text).map(p=>p.text).join('')).toBe(text);}for(const text of texts)for(const part of mathParts(text))if(part.tex)try{katex.renderToString(part.tex,{throwOnError:true,strict:'ignore'});}catch(e){failures.push(`${text} → ${part.tex}: ${String(e)}`);}expect(failures).toEqual([]);
});
