import { createContext, useContext, useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import type { User } from 'firebase/auth';
import { auth, loadCloud, saveCloud } from '../lib/firebase';
import { emptyProgress, mergeProgress, readLocal, writeLocal } from '../lib/progress';
import type { Progress } from '../lib/progress';
type Sync='local'|'loading'|'saved'|'saving'|'error'|'storage-error';
interface Learning {progress:Progress; update:(fn:(p:Progress)=>Progress)=>void; user:User|null; sync:Sync; retry:()=>void; importGuest:()=>void;}
const Context=createContext<Learning|null>(null);
export function LearningProvider({children}:{children:ReactNode}) {
 const [user,setUser]=useState<User|null>(null);const [authReady,setAuthReady]=useState(!auth);
 useEffect(()=>{if(!auth)return;return onAuthStateChanged(auth,u=>{setUser(u);setAuthReady(true);},()=>setAuthReady(true));},[]);
 if(!authReady)return <div className="empty-state" role="status">Se încarcă spațiul tău de învățare…</div>;
 // A separate mounted state for each identity prevents asynchronous account cross-contamination.
 return <AccountProgress key={user?.uid??'guest'} user={user}>{children}</AccountProgress>;
}
function AccountProgress({user,children}:{user:User|null;children:ReactNode}) {
 const key=`axioma:${user?.uid??'guest'}`;
 const [progress,setProgress]=useState(()=>readLocal(key));const [sync,setSync]=useState<Sync>(user?'loading':'local');const [ready,setReady]=useState(!user);const [retryCount,setRetry]=useState(0);const mounted=useRef(true);
 useEffect(()=>{mounted.current=true;return()=>{mounted.current=false;};},[]);
 useEffect(()=>{if(!user)return;let cancelled=false;setReady(false);setSync('loading');loadCloud(user.uid).then(remote=>{if(cancelled)return;setProgress(current=>mergeProgress(current,remote));setReady(true);setSync('saved');}).catch(()=>{if(cancelled)return;setReady(true);setSync('error');});return()=>{cancelled=true;};},[user?.uid,retryCount]);
 useEffect(()=>{if(!writeLocal(key,progress))setSync('storage-error');},[key,progress]);
 useEffect(()=>{if(!ready||!user)return;const timer=window.setTimeout(()=>{setSync('saving');saveCloud(user.uid,progress).then(()=>{if(mounted.current)setSync('saved');}).catch(()=>{if(mounted.current)setSync('error');});},700);return()=>clearTimeout(timer);},[progress,user?.uid,ready]);
 const update=(fn:(p:Progress)=>Progress)=>setProgress(p=>({...fn(p),updatedAt:new Date().toISOString()}));
 return <Context.Provider value={{progress,user,sync,update,retry:()=>setRetry(n=>n+1),importGuest:()=>update(p=>mergeProgress(p,{...readLocal('axioma:guest'),grade:p.grade,curriculum:p.curriculum,updatedAt:p.updatedAt}))}}>{children}</Context.Provider>;
}
export function useLearning(){const value=useContext(Context);if(!value)throw new Error('LearningProvider lipsește');return value;}
export { emptyProgress };
