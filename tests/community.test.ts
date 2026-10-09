import { describe,expect,it } from 'vitest';
import { friendshipId,pairLearningStreak } from '../src/lib/community';

describe('friend learning utilities',()=>{
 const now=new Date('2026-10-09T12:00:00.000Z');
 it('uses one stable friendship document regardless of invitation direction',()=>{
  expect(friendshipId('bob','alice')).toBe('alice__bob');
  expect(friendshipId('alice','bob')).toBe('alice__bob');
 });
 it('counts only consecutive dates studied by both friends',()=>{
  expect(pairLearningStreak(['2026-10-06','2026-10-07','2026-10-08','2026-10-09'],['2026-10-05','2026-10-07','2026-10-08','2026-10-09'],now)).toBe(3);
  expect(pairLearningStreak(['2026-10-06','2026-10-07','2026-10-08'],['2026-10-07','2026-10-08'],now)).toBe(2);
  expect(pairLearningStreak(['2026-10-05'],['2026-10-05'],now)).toBe(0);
 });
});