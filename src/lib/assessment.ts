import { courseLessons, lessons } from '../content/curriculum';
import type { Grade, CurriculumVersion, Question } from '../content/types';
export function hash(seed:string){let h=2166136261;for(const c of seed)h=Math.imul(h^c.charCodeAt(0),16777619);return h>>>0;}
export function shuffled<T>(items:T[],seed:string):T[]{let s=hash(seed);const result=[...items];for(let i=result.length-1;i>0;i--){s=(Math.imul(s,1664525)+1013904223)>>>0;const j=s%(i+1);[result[i],result[j]]=[result[j],result[i]];}return result;}
export function assessmentQuestions(grade:Grade,version:CurriculumVersion,seed:string,count=12):Question[]{
  const ordered=shuffled(courseLessons(grade,version),seed); const questions=ordered.map((l,i)=>l.questions[hash(`${seed}-${i}`)%l.questions.length]);
  const used=new Set(questions.map(q=>q.id));
  const extra=shuffled(ordered.flatMap(l=>l.questions).filter(q=>!used.has(q.id)),seed+'-extra');
  return [...questions,...extra].slice(0,count);
}
export function dailyQuestions(grade:Grade,version:CurriculumVersion,date:string) {return assessmentQuestions(grade,version,`daily-${date}-${grade}-${version}`,5);}
export const questionById=(id:string)=>lessons.flatMap(l=>l.questions).find(q=>q.id===id);
