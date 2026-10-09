import { CalendarDays, Check, ExternalLink, GitCommitHorizontal, History, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { productReleases } from '../content/releases';

const releaseDate=(value:string)=>new Intl.DateTimeFormat('ro-RO',{day:'numeric',month:'long',year:'numeric'}).format(new Date(value));

export function Releases(){
 const latest=productReleases[0];
 return <div className="page-enter releases-page">
  <section className="release-hero">
   <div><p className="eyebrow">JURNALUL PRODUSULUI</p><h1>Ce e nou în Axioma<span>.</span></h1><p>Funcții lansate, îmbunătățiri și repere publicate odată cu fiecare versiune.</p></div>
   <dl><div><dt>Versiunea curentă</dt><dd>v{latest.version}</dd></div><div><dt>Lansări publice</dt><dd>{productReleases.length}</dd></div><div><dt>Ultimul push</dt><dd>{releaseDate(latest.releasedAt)}</dd></div></dl>
  </section>
  <section className="release-feed" aria-label="Istoricul lansărilor">
   {productReleases.map((release,index)=><article className={`release-entry ${index===0?'latest':''}`} key={release.commit}>
    <div className="release-marker" aria-hidden="true"><span>{index===0?<Sparkles size={18}/>:<History size={18}/>}</span></div>
    <header className="release-meta">
     <div className="release-labels"><span className="release-version">v{release.version}</span>{index===0&&<span className="release-current">CEA MAI RECENTĂ</span>}</div>
     <p className="release-date"><CalendarDays size={15}/>{releaseDate(release.releasedAt)}</p>
     <h2>{release.title}</h2><p>{release.summary}</p>
     <a href={`https://github.com/icoert/axioma/commit/${release.commit}`} target="_blank" rel="noreferrer"><GitCommitHorizontal size={16}/>Commit {release.commit}<ExternalLink size={14}/></a>
    </header>
    <div className="release-details"><p className="eyebrow">INCLUS ÎN ACEST PUSH</p><ul>{release.features.map(feature=><li key={feature}><Check size={16}/><span>{feature}</span></li>)}</ul></div>
   </article>)}
  </section>
  <section className="release-next"><div><p className="eyebrow">URMEAZĂ</p><h2>Mai sunt idei pe tablă.</h2><p>Vezi direcțiile pe care le explorăm pentru următoarele versiuni.</p></div><Link className="button dark" to="/viitor">Vezi planurile viitoare</Link></section>
 </div>;
}