import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BellRing, Megaphone, X } from 'lucide-react';
import { productReleases } from '../content/releases';
import { useReleaseUpdate } from '../hooks/useReleaseUpdate';
import { useEngagement } from '../hooks/useEngagement';
import { useLearning } from '../hooks/useLearning';
import { reminderDue } from '../lib/engagement';
import { dayKey } from '../lib/progress';
export function ReleaseTrigger(){const {preferences}=useEngagement();const unread=preferences.releaseSeen!==productReleases[0].version;return <Link to="/noutati" className="release-trigger" aria-label={`Ce e nou${unread?' · versiune nouă':''}`} title="Ce e nou"><Megaphone size={18}/>{unread&&<span className="release-unread"/>}</Link>;}
export function EngagementNotices(){const updateVersion=useReleaseUpdate();const {preferences,change,error}=useEngagement();const {progress}=useLearning();const location=useLocation();const latest=productReleases[0];const [now,setNow]=useState(()=>new Date());
 useEffect(()=>{const refresh=()=>setNow(new Date());const timer=setInterval(refresh,30000);document.addEventListener('visibilitychange',refresh);return()=>{clearInterval(timer);document.removeEventListener('visibilitychange',refresh);};},[]);
 useEffect(()=>{if(location.pathname==='/noutati'&&preferences.releaseSeen!==latest.version&&!error)change({releaseSeen:latest.version});},[location.pathname,preferences.releaseSeen,latest.version,error]);
 const release=preferences.releaseSeen!==latest.version&&location.pathname!=='/noutati';const reminder=reminderDue(preferences,progress.dates,now);if(!release&&!reminder&&!updateVersion)return null;
 return <div className="engagement-notices">{updateVersion&&<section className="engagement-notice" aria-label="Actualizare disponibilă"><Megaphone size={21}/><div><strong>Axioma v{updateVersion} a fost lansată.</strong><p>Reîncarcă aplicația când ești pregătit pentru a vedea noutățile. Antrenamentul se salvează în această filă.</p><button className="button secondary" onClick={()=>window.location.reload()}>Reîncarcă pentru versiunea nouă</button></div></section>}{release&&<section className="engagement-notice" aria-label="Versiune nouă"><Megaphone size={21}/><div><strong>Axioma v{latest.version} este aici!</strong><p>{latest.summary}</p><Link to="/noutati">Descoperă noutățile</Link></div><button className="icon-button" aria-label="Închide anunțul versiunii" onClick={()=>change({releaseSeen:latest.version})}><X size={18}/></button></section>}{reminder&&<section className="engagement-notice study-reminder" aria-label="Reminder de studiu"><BellRing size={22}/><div><strong>Zece minute pentru următorul tău „aha!”?</strong><p>Un exercițiu azi te ajută să îți păstrezi ritmul.</p><Link to="/provocari" onClick={()=>change({reminderSeen:dayKey(now)})}>Încep antrenamentul</Link><Link to="/remindere">Schimbă programul</Link></div><button className="icon-button" aria-label="Amintește-mi mâine" onClick={()=>change({reminderSeen:dayKey(now)})}><X size={18}/></button></section>}{error&&<p role="status">Preferințele nu pot fi salvate în acest browser.</p>}</div>;
}
