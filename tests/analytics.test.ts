import { describe,expect,it } from 'vitest';
import { aggregatePlatform,summarizeProgress } from '../src/lib/analytics';
import type { LearningSummary,PlatformUserRecord } from '../src/lib/analytics';
import { dayKey,emptyProgress,recordResult } from '../src/lib/progress';

describe('learning analytics',()=>{
 it('derives a stable summary from the canonical progress record',()=>{
  const now=new Date();let progress=emptyProgress();
  progress=recordResult(progress,'lesson:logica',3,3,now);
  progress=recordResult(progress,'test:9-2026',9,12,now);
  progress=recordResult(progress,`daily:${dayKey(now)}-9-2026`,4,5,now);
  expect(summarizeProgress(progress)).toEqual({xp:325,rank:'Ucenic',lessonsCompleted:1,testsPassed:1,dailyChallenges:1,studyDays:1,currentStreak:1,activitiesAttempted:3,activitiesPassed:3,averageScore:85});
 });

 it('aggregates activity windows, totals and distributions',()=>{
  const summary=(overrides:Partial<LearningSummary>):LearningSummary=>({xp:0,rank:'Explorator',lessonsCompleted:0,testsPassed:0,dailyChallenges:0,studyDays:0,currentStreak:0,activitiesAttempted:0,activitiesPassed:0,averageScore:0,...overrides});
  const users:PlatformUserRecord[]=[
   {createdAt:'2026-10-01T12:00:00.000Z',lastSeenAt:'2026-10-09T11:00:00.000Z',grade:9,curriculum:'2026',stats:summary({xp:325,lessonsCompleted:1,testsPassed:1,dailyChallenges:1,studyDays:3,currentStreak:2,averageScore:85})},
   {createdAt:'2026-09-01T12:00:00.000Z',lastSeenAt:'2026-10-03T12:00:00.000Z',grade:10,curriculum:'legacy',stats:summary({xp:100,lessonsCompleted:2,studyDays:5,currentStreak:4,averageScore:70})},
   {createdAt:'2026-08-01T12:00:00.000Z',lastSeenAt:'2026-09-01T12:00:00.000Z',grade:9,curriculum:'2026',stats:summary({averageScore:0})}
  ];
  expect(aggregatePlatform(users,new Date('2026-10-09T12:00:00.000Z'))).toEqual({users:3,activeToday:1,active7Days:2,active30Days:2,new30Days:1,totalXp:425,averageXp:142,lessonsCompleted:3,testsPassed:1,dailyChallenges:1,studyDays:8,averageStreak:2,bestStreak:4,averageScore:52,gradeDistribution:{'9':2,'10':1},curriculumDistribution:{'2026':2,legacy:1}});
 });
});