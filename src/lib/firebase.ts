import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import type { User } from 'firebase/auth';
import { doc, getDoc, getFirestore, runTransaction } from 'firebase/firestore';
import { summarizeProgress } from './analytics';
import { mergeProgress, sanitizeProgress } from './progress';
import type { Progress } from './progress';
const config={apiKey:import.meta.env.VITE_FIREBASE_API_KEY,authDomain:import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,projectId:import.meta.env.VITE_FIREBASE_PROJECT_ID,appId:import.meta.env.VITE_FIREBASE_APP_ID};
export const firebaseConfigured=Object.values(config).every(v=>typeof v==='string'&&v.trim().length>0);
const app=firebaseConfigured?initializeApp(config):null;
export const auth=app?getAuth(app):null;
export const db=app?getFirestore(app):null;
if(auth)auth.languageCode='ro';
export async function login(){if(!auth)throw new Error('Autentificarea Google nu este încă activată pe această instanță. Poți continua ca vizitator.');const provider=new GoogleAuthProvider();provider.setCustomParameters({prompt:'select_account'});await signInWithPopup(auth,provider);}
export async function logout(){if(auth)await signOut(auth);}
export async function loadCloud(uid:string){if(!db)throw new Error('Baza de date nu este configurată.');const snapshot=await getDoc(doc(db,'users',uid,'progress','main'));return sanitizeProgress(snapshot.data());}
export async function saveCloud(user:User,progress:Progress){if(!db)throw new Error('Baza de date nu este configurată.');const progressRef=doc(db,'users',user.uid,'progress','main');const accountRef=doc(db,'users',user.uid);const profileRef=doc(db,'profiles',user.uid);return runTransaction(db,async tx=>{const current=await tx.get(progressRef);const merged=mergeProgress(sanitizeProgress(current.data()),progress);const now=new Date().toISOString();const stats=summarizeProgress(merged);const createdAt=user.metadata.creationTime??now;tx.set(progressRef,merged);tx.set(accountRef,{uid:user.uid,email:user.email??'',displayName:user.displayName??'Explorator',photoURL:user.photoURL??null,createdAt,lastSeenAt:now,grade:merged.grade,curriculum:merged.curriculum,stats},{merge:true});tx.set(profileRef,{uid:user.uid,displayName:user.displayName??'Explorator',photoURL:user.photoURL??null,grade:merged.grade,rank:stats.rank,xp:stats.xp,currentStreak:stats.currentStreak,recentStudyDates:merged.dates.slice(-90),updatedAt:now},{merge:true});return merged;});}
export function authMessage(error:unknown){const code=(error as {code?:string})?.code; if(code==='auth/popup-closed-by-user')return 'Fereastra de conectare a fost închisă. Poți încerca din nou.';if(code==='auth/popup-blocked')return 'Permite ferestrele pop-up pentru a te conecta cu Google.';if(code==='auth/unauthorized-domain')return 'Acest domeniu nu este încă autorizat pentru conectare. Administratorul trebuie să îl adauge în Firebase.';if(code==='auth/network-request-failed')return 'Conexiunea la internet a fost întreruptă. Încearcă din nou.';return error instanceof Error&&!code?error.message:'Conectarea nu a reușit. Încearcă din nou.';}
