import type { User } from 'firebase/auth';
import { collection, deleteDoc, doc, getDoc, getDocs, onSnapshot, query, runTransaction, updateDoc, where, writeBatch } from 'firebase/firestore';
import type { Firestore, Unsubscribe } from 'firebase/firestore';
import { dayKey, sanitizeProgress, streak } from './progress';
import type { CurriculumVersion, Grade } from '../content/types';
import type { LearningSummary } from './analytics';
import { db } from './firebase';

export const ADMIN_EMAIL='silviuvaj@gmail.com';
export const isAdministrator=(user:User|null)=>user?.email?.toLowerCase()===ADMIN_EMAIL;

export interface PublicProfile {
  uid:string;
  displayName:string;
  photoURL:string|null;
  grade:Grade;
  rank:string;
  xp:number;
  currentStreak:number;
  recentStudyDates:string[];
  updatedAt:string;
}

export interface AdminUser {
  uid:string;
  email:string;
  displayName:string;
  photoURL:string|null;
  createdAt:string;
  lastSeenAt:string;
  grade:Grade;
  curriculum:CurriculumVersion;
  stats:LearningSummary;
}

export interface Friendship {
  id:string;
  members:[string,string];
  status:'pending'|'active';
  requestedBy:string;
  recipientId:string;
  createdAt:string;
  acceptedAt:string|null;
}

export type NotificationType='friend-request'|'friend-accepted'|'challenge-invite'|'challenge-accepted'|'challenge-score';
export interface AppNotification {
  id:string;
  recipientId:string;
  actorId:string;
  actorName:string;
  type:NotificationType;
  title:string;
  body:string;
  entityType:'friendship'|'challenge';
  entityId:string;
  createdAt:string;
  readAt:string|null;
}

export type ChallengeMode='daily'|'test';
export interface FriendChallenge {
  id:string;
  members:[string,string];
  createdBy:string;
  opponentId:string;
  creatorName:string;
  opponentName:string;
  status:'pending'|'active'|'declined';
  mode:ChallengeMode;
  grade:Grade;
  curriculum:CurriculumVersion;
  day:string;
  createdAt:string;
  acceptedAt:string|null;
  expiresAt:string;
}

export interface ChallengeEntry {uid:string;correct:number;total:number;completedAt:string;}

function database():Firestore {if(!db)throw new Error('Baza de date nu este configurată.');return db;}
const now=()=>new Date().toISOString();
export const friendshipId=(first:string,second:string)=>[first,second].sort().join('__');
export const pairLearningStreak=(first:string[],second:string[],date=new Date())=>streak(first.filter(day=>new Set(second).has(day)),date);
const fromDoc=<T>(snapshot:{id:string;data:()=>unknown})=>({id:snapshot.id,...snapshot.data() as object}) as T;

function notification(recipientId:string,actor:User,type:NotificationType,title:string,body:string,entityType:'friendship'|'challenge',entityId:string):Omit<AppNotification,'id'> {
  return {recipientId,actorId:actor.uid,actorName:actor.displayName??'Un prieten',type,title,body,entityType,entityId,createdAt:now(),readAt:null};
}
const notificationRef=(type:NotificationType,entityId:string,actorId?:string)=>doc(database(),'notifications',`${type}__${entityId}${actorId?`__${actorId}`:''}`);

export function subscribeNotifications(uid:string,onChange:(items:AppNotification[])=>void,onError?:(error:Error)=>void):Unsubscribe {
  const source=query(collection(database(),'notifications'),where('recipientId','==',uid));
  return onSnapshot(source,snapshot=>onChange(snapshot.docs.map(item=>fromDoc<AppNotification>(item)).sort((a,b)=>b.createdAt.localeCompare(a.createdAt)).slice(0,40)),error=>onError?.(error));
}

export async function markNotificationRead(id:string){await updateDoc(doc(database(),'notifications',id),{readAt:now()});}

export async function getProfile(uid:string):Promise<PublicProfile|null>{const snapshot=await getDoc(doc(database(),'profiles',uid));return snapshot.exists()?fromDoc<PublicProfile>(snapshot):null;}

export async function getProfiles(uids:string[]):Promise<Record<string,PublicProfile>> {
  const entries=await Promise.all([...new Set(uids)].map(async uid=>[uid,await getProfile(uid)] as const));
  return Object.fromEntries(entries.filter((entry):entry is [string,PublicProfile]=>entry[1]!==null));
}

export function subscribeFriendships(uid:string,onChange:(items:Friendship[])=>void,onError?:(error:Error)=>void):Unsubscribe {
  const source=query(collection(database(),'friendships'),where('members','array-contains',uid));
  return onSnapshot(source,snapshot=>onChange(snapshot.docs.map(item=>fromDoc<Friendship>(item)).sort((a,b)=>b.createdAt.localeCompare(a.createdAt))),error=>onError?.(error));
}

export async function requestFriendship(actor:User,friendCode:string):Promise<PublicProfile> {
  const recipientId=friendCode.trim();if(!recipientId||recipientId===actor.uid)throw new Error('Introdu codul unui alt utilizator.');
  const profile=await getProfile(recipientId);if(!profile)throw new Error('Nu am găsit un cont cu acest cod.');
  const id=friendshipId(actor.uid,recipientId);const relationshipRef=doc(database(),'friendships',id);const existing=await getDoc(relationshipRef);
  if(existing.exists())throw new Error((existing.data() as Friendship).status==='active'?'Sunteți deja prieteni.':'Invitația există deja.');
  const batch=writeBatch(database());const createdAt=now();batch.set(relationshipRef,{members:[actor.uid,recipientId].sort(),status:'pending',requestedBy:actor.uid,recipientId,createdAt,acceptedAt:null});
  const noticeRef=notificationRef('friend-request',id);batch.set(noticeRef,notification(recipientId,actor,'friend-request','Invitație de prietenie',`${actor.displayName??'Un utilizator'} vrea să învățați împreună.`,'friendship',id));await batch.commit();return profile;
}

export async function acceptFriendship(item:Friendship,actor:User){const batch=writeBatch(database());batch.update(doc(database(),'friendships',item.id),{status:'active',acceptedAt:now()});const noticeRef=notificationRef('friend-accepted',item.id);batch.set(noticeRef,notification(item.requestedBy,actor,'friend-accepted','Invitație acceptată',`${actor.displayName??'Prietenul tău'} a acceptat invitația.`,'friendship',item.id));await batch.commit();}
export async function declineFriendship(item:Friendship){await deleteDoc(doc(database(),'friendships',item.id));}
export async function removeFriendship(item:Friendship){await deleteDoc(doc(database(),'friendships',item.id));}

export function subscribeChallenges(uid:string,onChange:(items:FriendChallenge[])=>void,onError?:(error:Error)=>void):Unsubscribe {
  const source=query(collection(database(),'challenges'),where('members','array-contains',uid));
  return onSnapshot(source,snapshot=>onChange(snapshot.docs.map(item=>fromDoc<FriendChallenge>(item)).sort((a,b)=>b.createdAt.localeCompare(a.createdAt))),error=>onError?.(error));
}

export async function createChallenge(actor:User,opponent:PublicProfile,mode:ChallengeMode,grade:Grade,curriculum:CurriculumVersion):Promise<string> {
  const challengeRef=doc(collection(database(),'challenges'));const createdAt=now();const expires=new Date(Date.now()+(mode==='daily'?36:7*24)*3_600_000).toISOString();
  const challenge:Omit<FriendChallenge,'id'>={members:[actor.uid,opponent.uid].sort() as [string,string],createdBy:actor.uid,opponentId:opponent.uid,creatorName:actor.displayName??'Un prieten',opponentName:opponent.displayName,status:'pending',mode,grade,curriculum,day:dayKey(),createdAt,acceptedAt:null,expiresAt:expires};
  const batch=writeBatch(database());batch.set(challengeRef,challenge);const noticeRef=notificationRef('challenge-invite',challengeRef.id);batch.set(noticeRef,notification(opponent.uid,actor,'challenge-invite','Provocare nouă',`${actor.displayName??'Un prieten'} te-a provocat la ${mode==='daily'?'provocarea zilei':'un test de antrenament'}.`,'challenge',challengeRef.id));await batch.commit();return challengeRef.id;
}

export async function respondToChallenge(challenge:FriendChallenge,actor:User,accept:boolean){const batch=writeBatch(database());batch.update(doc(database(),'challenges',challenge.id),{status:accept?'active':'declined',acceptedAt:accept?now():null});if(accept){const noticeRef=notificationRef('challenge-accepted',challenge.id);batch.set(noticeRef,notification(challenge.createdBy,actor,'challenge-accepted','Provocare acceptată',`${actor.displayName??'Prietenul tău'} a acceptat provocarea.`,'challenge',challenge.id));}await batch.commit();}

export async function submitChallengeResult(challengeId:string,actor:User,correct:number,total:number){
  const store=database();const challengeRef=doc(store,'challenges',challengeId);const entryRef=doc(store,'challenges',challengeId,'entries',actor.uid);
  await runTransaction(store,async tx=>{const challengeSnapshot=await tx.get(challengeRef);if(!challengeSnapshot.exists())throw new Error('Provocarea nu mai este disponibilă.');const challenge=fromDoc<FriendChallenge>(challengeSnapshot);if(challenge.status!=='active'||!challenge.members.includes(actor.uid))throw new Error('Provocarea nu este activă.');const previous=await tx.get(entryRef);if(previous.exists()){const old=previous.data() as ChallengeEntry;if(old.correct/old.total>=correct/total)return;}const opponentId=challenge.members.find(uid=>uid!==actor.uid)!;tx.set(entryRef,{uid:actor.uid,correct,total,completedAt:now()});tx.set(notificationRef('challenge-score',challengeId,actor.uid),notification(opponentId,actor,'challenge-score','Scor nou în provocare',`${actor.displayName??'Prietenul tău'} a terminat cu ${correct}/${total}.`,'challenge',challengeId));});
}

export function subscribeChallengeEntries(challengeIds:string[],onChange:(items:Record<string,ChallengeEntry[]>)=>void,onError?:(error:Error)=>void):Unsubscribe {
  const values:Record<string,ChallengeEntry[]>={};if(!challengeIds.length){onChange(values);return()=>{};}
  const stops=challengeIds.map(id=>onSnapshot(collection(database(),'challenges',id,'entries'),snapshot=>{values[id]=snapshot.docs.map(item=>item.data() as ChallengeEntry);onChange({...values});},error=>onError?.(error)));
  return()=>stops.forEach(stop=>stop());
}

export async function listAdminUsers():Promise<AdminUser[]>{const snapshot=await getDocs(collection(database(),'users'));return snapshot.docs.map(item=>fromDoc<AdminUser>(item)).sort((a,b)=>b.lastSeenAt.localeCompare(a.lastSeenAt));}
export async function loadAdminProgress(uid:string){const snapshot=await getDoc(doc(database(),'users',uid,'progress','main'));return sanitizeProgress(snapshot.data());}