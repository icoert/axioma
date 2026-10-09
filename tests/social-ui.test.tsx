// @vitest-environment jsdom
import { cleanup,fireEvent,render,screen,waitFor } from '@testing-library/react';
import { afterEach,beforeEach,describe,expect,it,vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import type { User } from 'firebase/auth';
import { emptyProgress,recordResult } from '../src/lib/progress';

const mocks=vi.hoisted(()=>({
 learning:{value:null as unknown},
 isAdmin:vi.fn(),listUsers:vi.fn(),loadProgress:vi.fn(),getProfiles:vi.fn(),getEntries:vi.fn(),createChallenge:vi.fn(),markRead:vi.fn(),
 friendships:[] as unknown[],challenges:[] as unknown[],notifications:[] as unknown[]
}));

vi.mock('../src/hooks/useLearning',()=>({useLearning:()=>mocks.learning.value}));
vi.mock('../src/lib/firebase',()=>({login:vi.fn()}));
vi.mock('../src/lib/community',()=>({
 isAdministrator:mocks.isAdmin,
 listAdminUsers:mocks.listUsers,
 loadAdminProgress:mocks.loadProgress,
 getProfiles:mocks.getProfiles,
 subscribeChallengeEntries:(_ids:string[],onChange:(items:unknown)=>void)=>{onChange({});return()=>{};},
 createChallenge:mocks.createChallenge,
 pairLearningStreak:()=>3,
 subscribeFriendships:(_uid:string,onChange:(items:unknown[])=>void)=>{onChange(mocks.friendships);return()=>{};},
 subscribeChallenges:(_uid:string,onChange:(items:unknown[])=>void)=>{onChange(mocks.challenges);return()=>{};},
 subscribeNotifications:(_uid:string,onChange:(items:unknown[])=>void)=>{onChange(mocks.notifications);return()=>{};},
 markNotificationRead:mocks.markRead,
 requestFriendship:vi.fn(),acceptFriendship:vi.fn(),declineFriendship:vi.fn(),removeFriendship:vi.fn(),respondToChallenge:vi.fn()
}));

import { Admin } from '../src/pages/Admin';
import { Community } from '../src/pages/Community';
import { NotificationCenter } from '../src/components/Notifications';

const user={uid:'admin',email:'silviuvaj@gmail.com',displayName:'Ada Admin'} as User;
const stats={xp:325,rank:'Ucenic',lessonsCompleted:1,testsPassed:1,dailyChallenges:1,studyDays:3,currentStreak:2,activitiesAttempted:3,activitiesPassed:3,averageScore:85};
const profile={uid:'mara',displayName:'Mara',photoURL:null,grade:10,rank:'Explorator',xp:180,currentStreak:4,recentStudyDates:['2026-10-07','2026-10-08','2026-10-09'],updatedAt:'2026-10-09T12:00:00.000Z'};

beforeEach(()=>{
 const progress=recordResult({...emptyProgress(),grade:10,dates:['2026-10-07','2026-10-08','2026-10-09']},'lesson:logica',3,3,new Date('2026-10-09T12:00:00.000Z'));
 mocks.learning.value={user,progress,update:vi.fn(),sync:'saved',retry:vi.fn(),importGuest:vi.fn()};
 mocks.isAdmin.mockReset().mockReturnValue(true);mocks.listUsers.mockReset();mocks.loadProgress.mockReset();mocks.getProfiles.mockReset();mocks.getEntries.mockReset();mocks.createChallenge.mockReset().mockResolvedValue('duel');mocks.markRead.mockReset().mockResolvedValue(undefined);
 mocks.friendships=[];mocks.challenges=[];mocks.notifications=[];
});
afterEach(cleanup);

describe('signed-in social experience',()=>{
 it('shows a friend pair streak and sends a daily challenge',async()=>{
  mocks.friendships=[{id:'admin__mara',members:['admin','mara'],status:'active',requestedBy:'admin',recipientId:'mara',createdAt:'2026-10-01T12:00:00.000Z',acceptedAt:'2026-10-01T13:00:00.000Z'}];
  mocks.getProfiles.mockResolvedValue({mara:profile});mocks.getEntries.mockResolvedValue({});
  render(<MemoryRouter><Community/></MemoryRouter>);
  expect(await screen.findByRole('heading',{name:'Mara'})).toBeTruthy();
  expect(screen.getByText('3 zile')).toBeTruthy();
  fireEvent.click(screen.getByRole('button',{name:'Provocarea zilei'}));
  await waitFor(()=>expect(mocks.createChallenge).toHaveBeenCalledWith(user,profile,'daily',10,'2026'));
 });

 it('shows unread notifications and marks the opened item as read',async()=>{
  mocks.notifications=[{id:'challenge-invite__duel',recipientId:'admin',actorId:'mara',actorName:'Mara',type:'challenge-invite',title:'Provocare nouă',body:'Mara te-a provocat.',entityType:'challenge',entityId:'duel',createdAt:'2026-10-09T12:00:00.000Z',readAt:null}];
  render(<MemoryRouter><NotificationCenter/></MemoryRouter>);
  fireEvent.click(screen.getByRole('button',{name:'Notificări (1 necitite)'}));
  fireEvent.click(screen.getByRole('button',{name:/Provocare nouă/}));
  await waitFor(()=>expect(mocks.markRead).toHaveBeenCalledWith('challenge-invite__duel'));
 });
});

describe('administrator experience',()=>{
 it('aggregates users and opens detailed progress for the selected account',async()=>{
  mocks.listUsers.mockResolvedValue([{uid:'mara',email:'mara@example.com',displayName:'Mara',photoURL:null,createdAt:'2026-10-01T12:00:00.000Z',lastSeenAt:'2026-10-09T12:00:00.000Z',grade:10,curriculum:'2026',stats}]);
  mocks.loadProgress.mockResolvedValue(recordResult(emptyProgress(),'lesson:logica',3,3,new Date('2026-10-09T12:00:00.000Z')));
  render(<MemoryRouter><Admin/></MemoryRouter>);
    expect(await screen.findAllByText('mara@example.com')).toHaveLength(2);
  expect(screen.getByText('325 XP')).toBeTruthy();
  await waitFor(()=>expect(mocks.loadProgress).toHaveBeenCalledWith('mara'));
  expect(await screen.findByText('lesson · logica')).toBeTruthy();
 });

 it('does not expose analytics to a signed-in non-administrator',()=>{
  mocks.isAdmin.mockReturnValue(false);
  render(<MemoryRouter><Admin/></MemoryRouter>);
  expect(screen.getByRole('heading',{name:'Acces restricționat.'})).toBeTruthy();
  expect(mocks.listUsers).not.toHaveBeenCalled();
 });
});