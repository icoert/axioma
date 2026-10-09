export interface ProductRelease {
 version:string;
 commit:string;
 releasedAt:string;
 title:string;
 summary:string;
 features:string[];
}

export const productReleases:ProductRelease[]=[
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