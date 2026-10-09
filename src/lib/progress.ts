import type { CurriculumVersion, Grade } from '../content/types';
export interface Result { correct: number; total: number; completedAt: string; }
export interface Progress { schema: 1; results: Record<string,Result>; dates: string[]; grade: Grade; curriculum: CurriculumVersion; lastLesson: string | null; updatedAt: string; }
export const emptyProgress = (): Progress => ({schema:1,results:{},dates:[],grade:9,curriculum:'2026',lastLesson:null,updatedAt:new Date(0).toISOString()});
export function dayKey(date=new Date()) { return new Intl.DateTimeFormat('en-CA',{timeZone:'Europe/Bucharest',year:'numeric',month:'2-digit',day:'2-digit'}).format(date); }
export const passed = (r?:Result) => !!r && r.total>0 && r.correct/r.total>=0.7;
export function sanitizeProgress(raw: unknown): Progress {
  const fallback=emptyProgress(); if(!raw || typeof raw!=='object') return fallback;
  const p=raw as Partial<Progress>; const results:Progress['results']={};
  if(p.results && typeof p.results==='object') for(const [id,r] of Object.entries(p.results).slice(0,1000)) {
    if(/^(lesson|test|daily):[a-zA-Z0-9_-]{1,90}$/.test(id) && r && Number.isInteger(r.correct) && Number.isInteger(r.total) && r.total>0 && r.total<=100 && r.correct>=0 && r.correct<=r.total && typeof r.completedAt==='string' && Number.isFinite(Date.parse(r.completedAt))) results[id]={correct:r.correct,total:r.total,completedAt:r.completedAt};
  }
  return {...fallback,results, dates:Array.isArray(p.dates)?[...new Set(p.dates.filter(d=>typeof d==='string' && /^\d{4}-\d{2}-\d{2}$/.test(d)))].sort().slice(-366):[], grade:[9,10,11,12].includes(p.grade!)?p.grade!:9,curriculum:p.curriculum==='legacy'?'legacy':'2026',lastLesson:typeof p.lastLesson==='string'?p.lastLesson.slice(0,100):null,updatedAt:typeof p.updatedAt==='string' && Number.isFinite(Date.parse(p.updatedAt))?p.updatedAt:fallback.updatedAt};
}
export function mergeProgress(a:Progress,b:Progress):Progress {
  const latest=a.updatedAt>=b.updatedAt?a:b; const results={...a.results};
  for(const [id,r] of Object.entries(b.results)) {const old=results[id];if(!old || r.correct/r.total>old.correct/old.total || (r.correct/r.total===old.correct/old.total && r.completedAt>old.completedAt)) results[id]=r;}
  return {...latest,results,dates:[...new Set([...a.dates,...b.dates])].sort().slice(-366)};
}
export function recordResult(p:Progress,id:string,correct:number,total:number,now=new Date()):Progress {
  if(!Number.isInteger(correct)||!Number.isInteger(total)||total<1||correct<0||correct>total) throw new Error('Scor invalid');
  const candidate:Progress={...p,results:{[id]:{correct,total,completedAt:now.toISOString()}},dates:[dayKey(now)],updatedAt:now.toISOString()};
  return mergeProgress(p,candidate);
}
export function xp(p:Progress) { return Object.entries(p.results).reduce((sum,[id,r])=>sum+ (passed(r)?id.startsWith('lesson:')?100:id.startsWith('daily:stage-')?0:id.startsWith('daily:')?75:150:0),0); }
export const ranks=[{name:'Explorator',min:0,icon:'◇'},{name:'Ucenic',min:300,icon:'◈'},{name:'Strateg',min:900,icon:'✧'},{name:'Expert',min:2000,icon:'✦'},{name:'Maestru',min:4000,icon:'✺'},{name:'Axiomat',min:7000,icon:'✹'}];
export function rankFor(points:number){return [...ranks].reverse().find(r=>points>=r.min)??ranks[0];}
export function streak(dates:string[],now=new Date()) {
  const today=dayKey(now); let cursor=new Date(`${today}T12:00:00Z`); const set=new Set(dates);let count=0;
  if(!set.has(today))cursor.setUTCDate(cursor.getUTCDate()-1);
  while(set.has(cursor.toISOString().slice(0,10))){count++;cursor.setUTCDate(cursor.getUTCDate()-1);}return count;
}
export function readLocal(key:string):Progress { try {return sanitizeProgress(JSON.parse(localStorage.getItem(key)??'null'));}catch{return emptyProgress();} }
export function writeLocal(key:string,p:Progress):boolean {try{localStorage.setItem(key,JSON.stringify(p));return true;}catch{return false;}}
