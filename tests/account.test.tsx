// @vitest-environment jsdom
import { act, cleanup, render, screen, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { LearningProvider, useLearning } from '../src/hooks/useLearning';
import { emptyProgress, recordResult, xp } from '../src/lib/progress';
import type { Progress } from '../src/lib/progress';
import type { User } from 'firebase/auth';
const mock=vi.hoisted(()=>({callback:((_:User|null)=>{}) as (u:User|null)=>void,load:vi.fn(),save:vi.fn()}));
vi.mock('firebase/auth',()=>({onAuthStateChanged:(_auth:unknown,cb:(u:User|null)=>void)=>{mock.callback=cb;return()=>{};}}));
vi.mock('../src/lib/firebase',()=>({auth:{},loadCloud:mock.load,saveCloud:mock.save}));
function Probe(){const {user,progress,update,importGuest,sync}=useLearning();return <><div data-testid="identity">{user?.uid??'guest'}</div><div data-testid="points">{xp(progress)}</div><div data-testid="sync">{sync}</div><button onClick={()=>update(p=>recordResult(p,'lesson:logica',3,3))}>complete</button><button onClick={importGuest}>import</button></>;}
function signIn(uid:string|null){act(()=>mock.callback(uid?{uid} as User:null));}
beforeEach(()=>{localStorage.clear();mock.load.mockReset();mock.save.mockReset();mock.save.mockResolvedValue(emptyProgress());});afterEach(cleanup);
describe('account isolation and synchronization',()=>{
 it('does not import guest results into an account until requested',async()=>{localStorage.setItem('axioma:guest',JSON.stringify(recordResult(emptyProgress(),'lesson:logica',3,3)));mock.load.mockResolvedValue(emptyProgress());render(<LearningProvider><Probe/></LearningProvider>);signIn(null);expect(screen.getByTestId('points').textContent).toBe('100');signIn('alice');await waitFor(()=>expect(screen.getByTestId('sync').textContent).toBe('saved'));expect(screen.getByTestId('points').textContent).toBe('0');act(()=>screen.getByText('import').click());expect(screen.getByTestId('points').textContent).toBe('100');signIn('bob');await waitFor(()=>expect(screen.getByTestId('sync').textContent).toBe('saved'));expect(screen.getByTestId('points').textContent).toBe('0');});
 it('retains work performed while cloud loading is pending',async()=>{let resolve!:(p:Progress)=>void;mock.load.mockImplementation(()=>new Promise<Progress>(r=>{resolve=r;}));render(<LearningProvider><Probe/></LearningProvider>);signIn('alice');act(()=>screen.getByText('complete').click());expect(screen.getByTestId('points').textContent).toBe('100');await act(async()=>resolve(emptyProgress()));expect(screen.getByTestId('points').textContent).toBe('100');expect(JSON.parse(localStorage.getItem('axioma:alice')!).results['lesson:logica'].correct).toBe(3);});
 it('ignores a late cloud response after changing accounts',async()=>{let resolveAlice!:(p:Progress)=>void;mock.load.mockImplementation((uid:string)=>uid==='alice'?new Promise<Progress>(r=>{resolveAlice=r;}):Promise.resolve(emptyProgress()));render(<LearningProvider><Probe/></LearningProvider>);signIn('alice');signIn('bob');await waitFor(()=>expect(screen.getByTestId('sync').textContent).toBe('saved'));await act(async()=>resolveAlice(recordResult(emptyProgress(),'lesson:logica',3,3)));expect(screen.getByTestId('identity').textContent).toBe('bob');expect(screen.getByTestId('points').textContent).toBe('0');});
 it('preserves local work when Firestore is unavailable',async()=>{mock.load.mockRejectedValue(new Error('offline'));render(<LearningProvider><Probe/></LearningProvider>);signIn('alice');await waitFor(()=>expect(screen.getByTestId('sync').textContent).toBe('error'));act(()=>screen.getByText('complete').click());expect(JSON.parse(localStorage.getItem('axioma:alice')!).results['lesson:logica'].correct).toBe(3);});
});
