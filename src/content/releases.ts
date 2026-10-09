export interface ProductRelease {
 version:string;
 commit?:string;
 tag?:string;
 releasedAt:string;
 title:string;
 summary:string;
 features:string[];
}

export const productReleases:ProductRelease[]=[
 {
  version:'1.2.1',
  tag:'v1.2.1',
  releasedAt:'2026-10-09T16:51:43+03:00',
  title:'Un început mai sigur, în ritmul tău',
  summary:'Recapitulări opționale înainte de fiecare clasă și un selector de laborator mai clar, adaptat ecranului tău.',
  features:[
   'Selector de exemple în laborator cu descrieri, navigare prin tastatură și alegere prin atingere.',
   'Recapitulări pentru clasele V–VIII: 16 repere, exemple rezolvate și 48 de exerciții noi.',
   'Recapitulare V–VIII recomandată înainte de clasa a IX-a, cu opțiunea de a începe direct liceul.',
   'Recapitulări pentru fiecare clasă IX–XII, adaptate programei selectate; anul anterior este recomandat înainte de clasa următoare.',
   'Exerciții de recapitulare reluabile, cu explicații și fără modificarea XP sau a scorurilor de stăpânire.',
   'Îmbunătățiri pentru telefoane înguste, orientare peisaj, tablete, ecrane mari și meniuri care rămân în interiorul ecranului.'
  ]
 },
 {
  version:'1.2.0',
  tag:'v1.2.0',
  releasedAt:'2026-10-09T16:10:00+03:00',
  title:'Mai multe feluri de a înțelege',
  summary:'Exemple ghidate, explicații la îndemână și exerciții noi pentru fiecare lecție.',
  features:[
   'Nouă laboratoare interactive, cu 27 de exemple ghidate și resetare la exemplul ales.',
   'Experimente noi pentru numere complexe, exponențiale, progresii și probabilitate binomială.',
   'Explicații în română pentru termeni și simboluri, disponibile la trecerea cursorului, focalizare și atingere.',
   '177 de exerciții suplimentare: câte trei pentru fiecare dintre cele 59 de lecții.',
   'Sesiuni suplimentare reluabile, cu explicații, fără schimbarea scorului de stăpânire sau XP.',
   'Navigare cu tastatura între laboratoare și respectarea preferinței pentru mișcare redusă.'
  ]
 },
 {
  version:'1.1.0',
  commit:'586f02b',
  releasedAt:'2026-10-09T14:44:37+03:00',
  title:'Învățarea devine socială',
  summary:'Axioma adaugă prieteni, provocări și instrumente de administrare, păstrând progresul fiecărui elev protejat.',
  features:[
   'Prieteni adăugați prin cod personal și invitații private.',
   'Serii comune pentru zilele în care doi prieteni învață împreună.',
   'Provocări directe la exercițiul zilei sau la un test de antrenament.',
   'Scoruri live, notificări și rezultate separate pentru fiecare participant.',
   'Panou de administrare cu statistici generale și progres detaliat pe utilizator.',
   'Reguli Firestore extinse pentru acces de administrator și date sociale private.'
  ]
 },
 {
  version:'1.0.0',
  commit:'96a425e',
  releasedAt:'2026-10-09T12:54:34+03:00',
  title:'Primul parcurs Axioma',
  summary:'Prima versiune publică aduce matematica de liceu într-un parcurs clar, interactiv și adaptat programei românești.',
  features:[
   'Conținut în limba română pentru clasele IX–XII.',
   'Parcursuri distincte pentru programa nouă 2026 și programa anterioară.',
   'Lecții de sinteză, exemple rezolvate și verificări de înțelegere.',
   'Misiune zilnică, teste cronometrate și reluarea sesiunilor începute.',
   'Laboratoare interactive pentru algebră, trigonometrie și analiză.',
   'XP, ranguri, realizări și sincronizarea progresului cu un cont Google.'
  ]
 }
];