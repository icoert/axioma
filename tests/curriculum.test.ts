import { describe,it,expect } from 'vitest';
import katex from 'katex';
import { lessons,courseLessons } from '../src/content/curriculum';
import { assessmentQuestions,dailyQuestions,shuffled } from '../src/lib/assessment';
describe('editorial content integrity',()=>{
 it('has unique lessons and questions with worked solutions and unambiguous choices',()=>{expect(new Set(lessons.map(l=>l.id)).size).toBe(lessons.length);const ids:string[]=[];for(const l of lessons){expect(l.theory.length,l.id).toBeGreaterThanOrEqual(2);expect(l.example.steps.length,l.id).toBeGreaterThanOrEqual(3);expect(l.questions.length,l.id).toBeGreaterThanOrEqual(3);for(const q of l.questions){ids.push(q.id);expect(q.options.length,q.id).toBe(4);expect(new Set(q.options).size,q.id).toBe(4);expect(q.answer,q.id).toBeGreaterThanOrEqual(0);expect(q.answer,q.id).toBeLessThan(4);expect(q.explanation.length,q.id).toBeGreaterThan(5);}}expect(new Set(ids).size).toBe(ids.length);});
 it('renders every formula without a KaTeX error',()=>{for(const l of lessons)expect(()=>katex.renderToString(l.formula,{throwOnError:true}),l.id).not.toThrow();});
 it('provides assessable material in all grades and both curricula',()=>{for(const version of ['legacy','2026'] as const){for(const grade of [9,10,11,12] as const){const list=courseLessons(grade,version);expect(list.length,`${version}/${grade}`).toBeGreaterThanOrEqual(10);expect(assessmentQuestions(grade,version,'test').length).toBe(12);}}});
 it('maps new cohort moves without losing mastery identities',()=>{expect(courseLessons(10,'2026').some(l=>l.id==='polinoame')).toBe(true);expect(courseLessons(12,'legacy').some(l=>l.id==='polinoame')).toBe(true);expect(courseLessons(11,'2026').some(l=>l.id==='dreapta')).toBe(true);expect(courseLessons(12,'2026').some(l=>l.id==='inele')).toBe(false);expect(courseLessons(9,'2026').some(l=>l.id==='ceva-menelaus')).toBe(true);});
 it('gives reproducible daily quizzes with distinct questions across chapters',()=>{const a=dailyQuestions(9,'2026','2026-10-09');expect(a).toEqual(dailyQuestions(9,'2026','2026-10-09'));expect(a).not.toEqual(dailyQuestions(9,'2026','2026-10-10'));expect(new Set(a.map(q=>q.id)).size).toBe(5);});
 it('shuffles without modifying its input',()=>{const a=[1,2,3,4,5];expect(shuffled(a,'a')).toEqual(shuffled(a,'a'));expect(a).toEqual([1,2,3,4,5]);});
});
