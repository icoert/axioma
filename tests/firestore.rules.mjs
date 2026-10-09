import { readFileSync } from 'node:fs';
import { before,after,beforeEach,test } from 'node:test';
import { assertFails,assertSucceeds,initializeTestEnvironment } from '@firebase/rules-unit-testing';
import { doc,getDoc,setDoc,deleteDoc,collection,getDocs,query,updateDoc,where,writeBatch,serverTimestamp,Timestamp } from 'firebase/firestore';
let env;
const valid={schema:1,results:{},dates:[],grade:9,curriculum:'2026',lastLesson:null,updatedAt:'2026-10-09T12:00:00.000Z'};
before(async()=>{env=await initializeTestEnvironment({projectId:'demo-axioma',firestore:{host:'127.0.0.1',port:8080,rules:readFileSync('firestore.rules','utf8')}});});
beforeEach(async()=>env.clearFirestore());after(async()=>env?.cleanup());
const ref=(context,uid='alice')=>doc(context.firestore(),'users',uid,'progress','main');
test('owner can create, read, update, and delete their progress',async()=>{const r=ref(env.authenticatedContext('alice'));await assertSucceeds(setDoc(r,valid));await assertSucceeds(getDoc(r));await assertSucceeds(setDoc(r,{...valid,grade:12}));await assertSucceeds(deleteDoc(r));});
test('unauthenticated visitors cannot read or write cloud progress',async()=>{const r=ref(env.unauthenticatedContext());await assertFails(setDoc(r,valid));await assertFails(getDoc(r));});
test('another account cannot read, update or delete user progress',async()=>{await assertSucceeds(setDoc(ref(env.authenticatedContext('alice')),valid));const r=ref(env.authenticatedContext('bob'));await assertFails(getDoc(r));await assertFails(setDoc(r,valid));await assertFails(deleteDoc(r));});
test('invalid shape, oversized lists, and unsupported grades are rejected',async()=>{const r=ref(env.authenticatedContext('alice'));for(const bad of [{...valid,admin:true},{...valid,grade:99},{...valid,schema:2},{...valid,dates:Array(367).fill('2026-10-09')},{...valid,results:[]},{...valid,curriculum:'all'}])await assertFails(setDoc(r,bad));});
test('unlisted collections and user enumeration are denied',async()=>{const db=env.authenticatedContext('alice').firestore();await assertFails(getDocs(collection(db,'users')));await assertFails(setDoc(doc(db,'leaderboard','alice'),{xp:9999}));await assertFails(setDoc(doc(db,'users','alice','progress','other'),valid));});

const iso='2026-10-09T12:00:00.000Z';
const stats={xp:240,rank:'Inițiat',lessonsCompleted:2,testsPassed:1,dailyChallenges:1,studyDays:3,currentStreak:2,activitiesAttempted:5,activitiesPassed:4,averageScore:84};
const account=(uid,email)=>({uid,email,displayName:`Elev ${uid}`,photoURL:null,createdAt:iso,lastSeenAt:iso,grade:10,curriculum:'2026',stats});
const profile=uid=>({uid,displayName:`Elev ${uid}`,photoURL:null,grade:10,rank:'Inițiat',xp:240,currentStreak:2,recentStudyDates:['2026-10-08','2026-10-09'],updatedAt:iso});
const friendship=(requestedBy='alice',recipientId='bob',status='pending')=>({members:['alice','bob'],status,requestedBy,recipientId,createdAt:iso,acceptedAt:status==='active'?iso:null});
const challenge=(status='pending')=>({members:['alice','bob'],createdBy:'alice',opponentId:'bob',creatorName:'Elev alice',opponentName:'Elev bob',status,mode:'daily',grade:10,curriculum:'2026',day:'2026-10-09',createdAt:iso,acceptedAt:status==='active'?iso:null,expiresAt:'2026-10-11T00:00:00.000Z'});
const notification=(type,recipientId,actorId,entityType,entityId)=>({recipientId,actorId,actorName:`Elev ${actorId}`,type,title:'Notificare validă',body:'Conținutul notificării.',entityType,entityId,createdAt:iso,readAt:null});
const authed=(uid,email=`${uid}@example.com`,verified=true)=>env.authenticatedContext(uid,{email,email_verified:verified});
async function seed(path,data){await env.withSecurityRulesDisabled(async context=>setDoc(doc(context.firestore(),path),data));}

test('owners maintain validated analytics while only the verified administrator can enumerate users',async()=>{
	const alice=authed('alice');
	await assertSucceeds(setDoc(doc(alice.firestore(),'users','alice'),account('alice','alice@example.com')));
	await assertFails(setDoc(doc(alice.firestore(),'users','alice'),{...account('alice','alice@example.com'),uid:'bob'}));
	await assertFails(updateDoc(doc(alice.firestore(),'users','alice'),{createdAt:'2027-01-01T00:00:00.000Z'}));
	await assertFails(getDoc(doc(authed('bob').firestore(),'users','alice')));
	const admin=authed('admin','silviuvaj@gmail.com',true);
	await assertSucceeds(getDocs(collection(admin.firestore(),'users')));
	await assertSucceeds(getDoc(doc(admin.firestore(),'users','alice','progress','main')));
	await assertFails(getDocs(collection(authed('admin','silviuvaj@gmail.com',false).firestore(),'users')));
	await assertFails(getDocs(collection(authed('admin','other@example.com',true).firestore(),'users')));
});

test('profiles expose only individual safe records and reject enumeration or impersonation',async()=>{
	const alice=authed('alice');
	await assertSucceeds(setDoc(doc(alice.firestore(),'profiles','alice'),profile('alice')));
	await assertSucceeds(getDoc(doc(authed('bob').firestore(),'profiles','alice')));
	await assertFails(getDoc(doc(env.unauthenticatedContext().firestore(),'profiles','alice')));
	await assertFails(getDocs(collection(authed('bob').firestore(),'profiles')));
	await assertFails(setDoc(doc(authed('bob').firestore(),'profiles','alice'),profile('alice')));
	await assertFails(setDoc(doc(alice.firestore(),'profiles','alice'),{...profile('alice'),email:'alice@example.com'}));
});

test('friend requests and notifications are atomic, participant-scoped, and recipient-approved',async()=>{
	await seed('profiles/bob',profile('bob'));
	const alice=authed('alice');const bob=authed('bob');const id='alice__bob';
	const requestBatch=writeBatch(alice.firestore());
	requestBatch.set(doc(alice.firestore(),'friendships',id),friendship());
	requestBatch.set(doc(alice.firestore(),'notifications',`friend-request__${id}`),notification('friend-request','bob','alice','friendship',id));
	await assertSucceeds(requestBatch.commit());
	await assertSucceeds(getDoc(doc(alice.firestore(),'friendships',id)));
	await assertSucceeds(getDoc(doc(bob.firestore(),'friendships',id)));
	await assertFails(getDoc(doc(authed('mallory').firestore(),'friendships',id)));
	await assertFails(updateDoc(doc(alice.firestore(),'friendships',id),{status:'active',acceptedAt:iso}));
	await assertFails(updateDoc(doc(bob.firestore(),'friendships',id),{requestedBy:'bob',status:'active',acceptedAt:iso}));
	const acceptBatch=writeBatch(bob.firestore());
	acceptBatch.update(doc(bob.firestore(),'friendships',id),{status:'active',acceptedAt:iso});
	acceptBatch.set(doc(bob.firestore(),'notifications',`friend-accepted__${id}`),notification('friend-accepted','alice','bob','friendship',id));
	await assertSucceeds(acceptBatch.commit());
	await assertSucceeds(getDocs(query(collection(bob.firestore(),'notifications'),where('recipientId','==','bob'))));
	await assertFails(getDoc(doc(alice.firestore(),'notifications',`friend-request__${id}`)));
	await assertSucceeds(updateDoc(doc(bob.firestore(),'notifications',`friend-request__${id}`),{readAt:iso}));
	await assertFails(updateDoc(doc(alice.firestore(),'notifications',`friend-request__${id}`),{readAt:iso}));
});

test('challenges require an active friendship and only the opponent can transition them',async()=>{
	await seed('friendships/alice__bob',friendship('alice','bob','active'));
	const alice=authed('alice');const bob=authed('bob');const challengeId='duel-1';
	const inviteBatch=writeBatch(alice.firestore());
	inviteBatch.set(doc(alice.firestore(),'challenges',challengeId),challenge());
	inviteBatch.set(doc(alice.firestore(),'notifications',`challenge-invite__${challengeId}`),notification('challenge-invite','bob','alice','challenge',challengeId));
	await assertSucceeds(inviteBatch.commit());
	await assertFails(getDoc(doc(authed('mallory').firestore(),'challenges',challengeId)));
	await assertFails(updateDoc(doc(alice.firestore(),'challenges',challengeId),{status:'active',acceptedAt:iso}));
	const acceptBatch=writeBatch(bob.firestore());
	acceptBatch.update(doc(bob.firestore(),'challenges',challengeId),{status:'active',acceptedAt:iso});
	acceptBatch.set(doc(bob.firestore(),'notifications',`challenge-accepted__${challengeId}`),notification('challenge-accepted','alice','bob','challenge',challengeId));
	await assertSucceeds(acceptBatch.commit());
	await assertFails(updateDoc(doc(bob.firestore(),'challenges',challengeId),{grade:12}));
	const noFriend=authed('carol');
	await assertFails(setDoc(doc(noFriend.firestore(),'challenges','forged'),{...challenge(),members:['bob','carol'],createdBy:'carol',opponentId:'bob',creatorName:'Elev carol'}));
});

test('challenge scores belong to each participant and notify only the opponent',async()=>{
	await seed('challenges/duel-1',challenge('active'));
	const alice=authed('alice');const bob=authed('bob');
	const scoreBatch=writeBatch(alice.firestore());
	scoreBatch.set(doc(alice.firestore(),'challenges','duel-1','entries','alice'),{uid:'alice',correct:4,total:5,completedAt:iso});
	scoreBatch.set(doc(alice.firestore(),'notifications','challenge-score__duel-1__alice'),notification('challenge-score','bob','alice','challenge','duel-1'));
	await assertSucceeds(scoreBatch.commit());
	const improvedBatch=writeBatch(alice.firestore());
	improvedBatch.set(doc(alice.firestore(),'challenges','duel-1','entries','alice'),{uid:'alice',correct:5,total:5,completedAt:iso});
	improvedBatch.set(doc(alice.firestore(),'notifications','challenge-score__duel-1__alice'),notification('challenge-score','bob','alice','challenge','duel-1'));
	await assertSucceeds(improvedBatch.commit());
	await assertSucceeds(getDocs(collection(bob.firestore(),'challenges','duel-1','entries')));
	await assertFails(setDoc(doc(authed('mallory').firestore(),'challenges','duel-1','entries','alice'),{uid:'alice',correct:5,total:5,completedAt:iso}));
	await assertFails(setDoc(doc(bob.firestore(),'challenges','duel-1','entries','alice'),{uid:'alice',correct:5,total:5,completedAt:iso}));
	await assertFails(setDoc(doc(alice.firestore(),'challenges','duel-1','entries','alice'),{uid:'alice',correct:6,total:5,completedAt:iso}));
	await assertFails(setDoc(doc(alice.firestore(),'challenges','duel-1','entries','alice'),{uid:'alice',correct:4,total:5,completedAt:iso}));
	await assertFails(setDoc(doc(bob.firestore(),'challenges','duel-1','entries','bob'),{uid:'bob',correct:5,total:6,completedAt:iso}));
	await assertFails(setDoc(doc(alice.firestore(),'notifications','random-id'),notification('challenge-score','bob','alice','challenge','duel-1')));
});

const feedbackData=(uid='alice')=>({uid,kind:'feature',title:'Mai multe exemple',message:'Aș dori mai multe exemple explicate de geometrie.',status:'new',response:'',createdAt:serverTimestamp()});
function feedbackBatch(context,id='message-1',data=feedbackData()){const database=context.firestore();const batch=writeBatch(database);batch.set(doc(database,'feedback',id),data);batch.set(doc(database,'users',data.uid,'feedbackLimits','main'),{submittedAt:serverTimestamp(),feedbackId:id});return batch;}
test('feedback is private to owner and verified administrator, with query isolation',async()=>{
 const alice=authed('alice');await assertSucceeds(feedbackBatch(alice).commit());
 await assertSucceeds(getDoc(doc(alice.firestore(),'feedback','message-1')));
 await assertSucceeds(getDocs(query(collection(alice.firestore(),'feedback'),where('uid','==','alice'))));
 await assertFails(getDocs(collection(alice.firestore(),'feedback')));
 await assertFails(getDoc(doc(authed('bob').firestore(),'feedback','message-1')));
 await assertFails(getDoc(doc(env.unauthenticatedContext().firestore(),'feedback','message-1')));
 await assertSucceeds(getDocs(collection(authed('admin','silviuvaj@gmail.com',true).firestore(),'feedback')));
 await assertFails(getDocs(collection(authed('admin','silviuvaj@gmail.com',false).firestore(),'feedback')));
});
test('feedback enforces atomic server timestamps, cooldown, identity and content bounds',async()=>{
 const alice=authed('alice');const database=alice.firestore();await assertFails(setDoc(doc(database,'feedback','no-limit'),feedbackData()));
 await assertFails(feedbackBatch(env.unauthenticatedContext()).commit());
 await assertFails(feedbackBatch(authed('bob'),'forged',feedbackData('alice')).commit());
 for(const patch of [{title:'x'},{message:'x'},{message:'x'.repeat(2001)},{kind:'other'},{status:'planned'},{response:'forged'},{createdAt:Timestamp.fromMillis(1)},{extra:true}])await assertFails(feedbackBatch(alice,'invalid',{...feedbackData(),...patch}).commit());
 const spam=feedbackBatch(alice,'spam-one');spam.set(doc(database,'feedback','spam-two'),feedbackData());await assertFails(spam.commit());
 await assertSucceeds(feedbackBatch(alice).commit());await assertFails(feedbackBatch(alice,'too-fast').commit());
 await assertFails(deleteDoc(doc(database,'users','alice','feedbackLimits','main')));
 await seed('users/alice/feedbackLimits/main',{submittedAt:Timestamp.fromMillis(Date.now()-61000),feedbackId:'message-1'});
 await assertSucceeds(feedbackBatch(alice,'after-minute').commit());
});
test('only administrators can triage feedback and cannot alter its author or message',async()=>{
 const alice=authed('alice');await assertSucceeds(feedbackBatch(alice).commit());const admin=authed('admin','silviuvaj@gmail.com',true).firestore();const ref=doc(admin,'feedback','message-1');
 await assertFails(updateDoc(doc(alice.firestore(),'feedback','message-1'),{status:'closed'}));
 await assertSucceeds(updateDoc(ref,{status:'planned',response:'Vom adăuga exemple în curând.'}));
 await assertFails(updateDoc(ref,{uid:'admin'}));await assertFails(updateDoc(ref,{message:'altered'}));await assertFails(updateDoc(ref,{status:'invalid'}));await assertFails(updateDoc(ref,{response:'x'.repeat(1001)}));
 await assertSucceeds(deleteDoc(doc(alice.firestore(),'feedback','message-1')));
});
