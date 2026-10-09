import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { doc, getDoc, getFirestore, runTransaction } from 'firebase/firestore';
import { mergeProgress, sanitizeProgress } from './progress';
import type { Progress } from './progress';
const config={apiKey:import.meta.env.VITE_FIREBASE_API_KEY,authDomain:import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,projectId:import.meta.env.VITE_FIREBASE_PROJECT_ID,appId:import.meta.env.VITE_FIREBASE_APP_ID};
export const firebaseConfigured=Object.values(config).every(v=>typeof v==='string'&&v.trim().length>0);
const app=firebaseConfigured?initializeApp(config):null;
export const auth=app?getAuth(app):null;
const db=app?getFirestore(app):null;
if(auth)auth.languageCode='ro';
export async function login(){if(!auth)throw new Error('Autentificarea Google nu este încă activată pe această instanță. Poți continua ca vizitator.');const provider=new GoogleAuthProvider();provider.setCustomParameters({prompt:'select_account'});await signInWithPopup(auth,provider);}
export async function logout(){if(auth)await signOut(auth);}
export async function loadCloud(uid:string){if(!db)throw new Error('Baza de date nu este configurată.');const snapshot=await getDoc(doc(db,'users',uid,'progress','main'));return sanitizeProgress(snapshot.data());}
export async function saveCloud(uid:string,progress:Progress){if(!db)throw new Error('Baza de date nu este configurată.');const ref=doc(db,'users',uid,'progress','main');return runTransaction(db,async tx=>{const current=await tx.get(ref);const merged=mergeProgress(sanitizeProgress(current.data()),progress);tx.set(ref,merged);return merged;});}
export function authMessage(error:unknown){const code=(error as {code?:string})?.code; if(code==='auth/popup-closed-by-user')return 'Fereastra de conectare a fost închisă. Poți încerca din nou.';if(code==='auth/popup-blocked')return 'Permite ferestrele pop-up pentru a te conecta cu Google.';if(code==='auth/unauthorized-domain')return 'Acest domeniu nu este încă autorizat pentru conectare. Administratorul trebuie să îl adauge în Firebase.';if(code==='auth/network-request-failed')return 'Conexiunea la internet a fost întreruptă. Încearcă din nou.';return error instanceof Error&&!code?error.message:'Conectarea nu a reușit. Încearcă din nou.';}
