import { describe,it,expect } from 'vitest';
import { emptyProgress,recordResult,xp,passed,mergeProgress,sanitizeProgress,streak,dayKey,rankFor } from '../src/lib/progress';
const now=new Date('2026-10-09T12:00:00Z');
describe('mastery and progression',()=>{
 it('requires 70% and awards a lesson once',()=>{let p=recordResult(emptyProgress(),'lesson:logica',2,3,now);expect(passed(p.results['lesson:logica'])).toBe(false);expect(xp(p)).toBe(0);p=recordResult(p,'lesson:logica',3,3,now);expect(xp(p)).toBe(100);p=recordResult(p,'lesson:logica',3,3,now);expect(xp(p)).toBe(100);p=recordResult(p,'lesson:logica',1,3,now);expect(xp(p)).toBe(100);expect(p.results['lesson:logica'].correct).toBe(3);});
 it('awards daily and test bonuses only for their activity identities',()=>{let p=recordResult(emptyProgress(),'daily:2026-10-09-9-2026',4,5,now);p=recordResult(p,'test:9-2026',9,12,now);expect(xp(p)).toBe(225);p=recordResult(p,'test:9-2026',12,12,now);expect(xp(p)).toBe(225);});
 it('rejects invalid scores',()=>{expect(()=>recordResult(emptyProgress(),'lesson:x',4,3)).toThrow();expect(()=>recordResult(emptyProgress(),'lesson:x',0,0)).toThrow();});
 it('keeps the best results and the latest settings across devices',()=>{const a=recordResult(emptyProgress(),'lesson:a',3,3,new Date('2026-10-08T12:00Z'));const b=recordResult({...emptyProgress(),grade:12},'lesson:b',2,3,now);const merged=mergeProgress(a,b);expect(Object.keys(merged.results)).toHaveLength(2);expect(merged.grade).toBe(12);expect(merged.dates).toHaveLength(2);expect(mergeProgress(a,b)).toEqual(mergeProgress(b,a));});
 it('merges idempotently',()=>{const p=recordResult(emptyProgress(),'lesson:logica',3,3,now);expect(mergeProgress(p,p)).toEqual(p);});
 it('ignores malformed or hostile saved data',()=>{const p=sanitizeProgress({grade:99,curriculum:'bad',dates:['bad',null,'2026-10-09'],results:{'lesson:a':{correct:999,total:3,completedAt:now.toISOString()},'__proto__':{}},schema:5});expect(p.grade).toBe(9);expect(p.curriculum).toBe('2026');expect(p.results).toEqual({});expect(p.dates).toEqual(['2026-10-09']);});
 it('calculates calendar streaks with yesterday grace',()=>{expect(streak(['2026-10-07','2026-10-08'],now)).toBe(2);expect(streak(['2026-10-06'],now)).toBe(0);expect(streak(['2026-10-08','2026-10-09'],now)).toBe(2);expect(streak([],now)).toBe(0);});
 it('uses Bucharest day boundaries, independent of the browser timezone',()=>{expect(dayKey(new Date('2026-10-08T22:30:00Z'))).toBe('2026-10-09');});
 it('advances ranks at exact thresholds',()=>{expect(rankFor(299).name).toBe('Explorator');expect(rankFor(300).name).toBe('Ucenic');expect(rankFor(7000).name).toBe('Axiomat');});
});
