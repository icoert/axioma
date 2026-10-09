import { passed, rankFor, streak, xp } from './progress';
import type { Progress, Result } from './progress';

export interface LearningSummary {
  xp: number;
  rank: string;
  lessonsCompleted: number;
  testsPassed: number;
  dailyChallenges: number;
  studyDays: number;
  currentStreak: number;
  activitiesAttempted: number;
  activitiesPassed: number;
  averageScore: number;
}

export interface PlatformUserRecord {
  createdAt: string;
  lastSeenAt: string;
  grade: number;
  curriculum: string;
  stats: LearningSummary;
}

export interface PlatformSummary {
  users: number;
  activeToday: number;
  active7Days: number;
  active30Days: number;
  new30Days: number;
  totalXp: number;
  averageXp: number;
  lessonsCompleted: number;
  testsPassed: number;
  dailyChallenges: number;
  studyDays: number;
  averageStreak: number;
  bestStreak: number;
  averageScore: number;
  gradeDistribution: Record<string, number>;
  curriculumDistribution: Record<string, number>;
}

export function summarizeProgress(progress: Progress): LearningSummary {
  const results=Object.entries(progress.results);
  const scored=results.map(([,result])=>result).filter((result):result is Result=>result.total>0);
  const activitiesPassed=results.filter(([,result])=>passed(result)).length;
  const points=xp(progress);
  return {
    xp:points,
    rank:rankFor(points).name,
    lessonsCompleted:results.filter(([id,result])=>id.startsWith('lesson:')&&passed(result)).length,
    testsPassed:results.filter(([id,result])=>id.startsWith('test:')&&passed(result)).length,
    dailyChallenges:results.filter(([id,result])=>id.startsWith('daily:')&&!id.startsWith('daily:stage-')&&passed(result)).length,
    studyDays:progress.dates.length,
    currentStreak:streak(progress.dates),
    activitiesAttempted:results.filter(([id])=>!id.startsWith('daily:stage-')).length,
    activitiesPassed,
    averageScore:scored.length?Math.round(scored.reduce((sum,result)=>sum+result.correct/result.total*100,0)/scored.length):0
  };
}

export function aggregatePlatform(users: PlatformUserRecord[],now=new Date()): PlatformSummary {
  const age=(iso:string)=>Math.max(0,now.getTime()-Date.parse(iso));
  const day=86_400_000;
  const totalXp=users.reduce((sum,user)=>sum+user.stats.xp,0);
  const gradeDistribution:Record<string,number>={};
  const curriculumDistribution:Record<string,number>={};
  for(const user of users){const grade=String(user.grade);gradeDistribution[grade]=(gradeDistribution[grade]??0)+1;curriculumDistribution[user.curriculum]=(curriculumDistribution[user.curriculum]??0)+1;}
  return {
    users:users.length,
    activeToday:users.filter(user=>age(user.lastSeenAt)<=day).length,
    active7Days:users.filter(user=>age(user.lastSeenAt)<=7*day).length,
    active30Days:users.filter(user=>age(user.lastSeenAt)<=30*day).length,
    new30Days:users.filter(user=>age(user.createdAt)<=30*day).length,
    totalXp,
    averageXp:users.length?Math.round(totalXp/users.length):0,
    lessonsCompleted:users.reduce((sum,user)=>sum+user.stats.lessonsCompleted,0),
    testsPassed:users.reduce((sum,user)=>sum+user.stats.testsPassed,0),
    dailyChallenges:users.reduce((sum,user)=>sum+user.stats.dailyChallenges,0),
    studyDays:users.reduce((sum,user)=>sum+user.stats.studyDays,0),
    averageStreak:users.length?Math.round(users.reduce((sum,user)=>sum+user.stats.currentStreak,0)/users.length*10)/10:0,
    bestStreak:users.reduce((best,user)=>Math.max(best,user.stats.currentStreak),0),
    averageScore:users.length?Math.round(users.reduce((sum,user)=>sum+user.stats.averageScore,0)/users.length):0,
    gradeDistribution,
    curriculumDistribution
  };
}