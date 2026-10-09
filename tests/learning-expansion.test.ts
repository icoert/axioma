import { describe,it,expect } from 'vitest';
import { lessons } from '../src/content/curriculum';
import { supplementary } from '../src/content/supplementary';
import { labs } from '../src/content/labs';
import { binomial,complexPolar,exponential,progression } from '../src/lib/labMath';
import { explainText } from '../src/content/glossary';
describe('supplementary content',()=>{
 it('gives every lesson three distinct extra questions without reusing mastery identities',()=>{
  expect(Object.keys(supplementary).sort()).toEqual(lessons.map(l=>l.id).sort());const allIds:string[]=[];
  for(const l of lessons){expect(l.practiceQuestions,l.id).toHaveLength(3);for(const q of l.practiceQuestions)expect(q.explanation.length,q.id).toBeGreaterThan(10);for(const q of [...l.questions,...l.practiceQuestions]){allIds.push(q.id);expect(new Set(q.options).size,q.id).toBe(4);expect(q.answer).toBeGreaterThanOrEqual(0);expect(q.answer).toBeLessThan(4);expect(q.explanation.length).toBeGreaterThan(5);}}
  expect(new Set(allIds).size).toBe(allIds.length);expect(lessons.flatMap(l=>l.practiceQuestions.filter(q=>l.questions.some(old=>old.prompt===q.prompt)).map(q=>`${l.id}: ${q.prompt}`))).toEqual([]);
 });
 it('provides 27 guided examples with valid defaults',()=>{expect(labs).toHaveLength(9);for(const lab of labs){expect(lab.examples).toHaveLength(3);expect(new Set(lab.examples.map(e=>e.id)).size).toBe(3);for(const e of lab.examples){expect(e.investigation.length).toBeGreaterThan(50);expect([e.a,e.b,e.c,e.t].every(Number.isFinite)).toBe(true);}}});
});
describe('lab mathematics',()=>{
 it('uses modulus and quadrant-aware complex arguments, with no argument at zero',()=>{expect(complexPolar(3,4).modulus).toBe(5);expect(complexPolar(0,0).argument).toBeNull();expect(complexPolar(0,2).argument).toBe(90);expect(complexPolar(-1,1).argument).toBe(135);expect(complexPolar(-1,-1).argument).toBe(-135);});
 it('distinguishes arithmetic and geometric sums, including zero and unit ratios',()=>{expect(progression(1,2,5)).toEqual({terms:[1,3,5,7,9],last:9,sum:25});expect(progression(1,2,5,true).sum).toBe(31);expect(progression(3,1,5,true).sum).toBe(15);expect(progression(4,0,5,true).sum).toBe(4);expect(progression(2,-1,4,true).sum).toBe(0);expect(progression(8,.5,4,true).sum).toBe(15);expect(()=>progression(1,1,0)).toThrow(RangeError);});
 it('normalizes the binomial distribution and handles certainty and impossibility',()=>{for(let n=2;n<=12;n++)for(const p of [0,.2,.5,.95,1]){const probs=Array.from({length:n+1},(_,k)=>binomial(n,p,k));expect(probs.reduce((a,b)=>a+b,0)).toBeCloseTo(1,12);expect(probs.every(x=>x>=0&&x<=1)).toBe(true);}expect(binomial(4,.5,2)).toBe(.375);expect(binomial(4,0,0)).toBe(1);expect(binomial(4,1,4)).toBe(1);expect(()=>binomial(4,.5,5)).toThrow(RangeError);});
 it('supports growing, decaying and constant powers without allowing nonpositive bases',()=>{expect(exponential(2,3)).toBe(8);expect(exponential(.5,2)).toBe(.25);expect(exponential(1,-4)).toBe(1);expect(()=>exponential(0,2)).toThrow(RangeError);});
});
describe('Romanian glossary',()=>{
 it('matches full words and inflections while preserving all text',()=>{const text='Derivata și produsul scalar, nu subderivata. ∫ și ∞.';const parts=explainText(text);expect(parts.map(p=>p.text).join('')).toBe(text);expect(parts.filter(p=>p.definition).map(p=>p.text)).toEqual(['Derivata','produsul scalar','∫','∞']);});
 it('chooses the longest term instead of splitting a progression into shorter terms',()=>{const parts=explainText('O progresie geometrică are rația 2.');expect(parts.filter(p=>p.definition).map(p=>p.text)).toEqual(['progresie geometrică','rația']);});
});
