import type { LabKind } from './types';
export interface LabExample {id:string;title:string;a:number;b:number;c:number;t:number;geometric?:boolean;investigation:string}
export interface LabDefinition {kind:LabKind;label:string;title:string;examples:LabExample[]}
const example=(id:string,title:string,a:number,b:number,c:number,t:number,investigation:string,geometric=false):LabExample=>({id,title,a,b,c,t,investigation,geometric});
export const labs:LabDefinition[]=[
 {kind:'quadratic',label:'Parabola',title:'Laboratorul parabolei',examples:[
  example('minimum','Un minim sub axă',1,0,-2,1,'Schimbă semnul lui a. Ce se întâmplă cu ramurile parabolei? Modifică b și urmărește abscisa vârfului.'),
  example('maximum','Un maxim deasupra axei',-1,2,3,1,'Prezice coordonatele vârfului și cele două rădăcini. Verifică apoi prin formula discriminantului.'),
  example('double-root','O rădăcină dublă',1,-2,1,1,'Graficul atinge axa în x=1. Modifică c: când are două intersecții și când nu mai are niciuna?')
 ]},
 {kind:'trigonometry',label:'Trigonometrie',title:'Cercul trigonometric',examples:[
  example('first-quadrant','Primul cadran',1,0,-2,1,'Explorează 0°, 90°, 180° și 270°. Cosinusul este coordonata orizontală; sinusul, cea verticală.'),
  example('second-quadrant','Semne în cadranul II',1,0,-2,150,'La 150°, sinusul este pozitiv și cosinusul negativ. Compară cu 30°: care valori rămân egale în modul?'),
  example('full-turn','Un tur complet',1,0,-2,360,'Compară 360° cu 0°. Observă periodicitatea: după un tur, punctul revine în aceeași poziție.')
 ]},
 {kind:'derivative',label:'Derivata',title:'Tangenta în mișcare',examples:[
  example('positive-slope','O pantă pozitivă',1,0,-2,1,'Mută punctul spre origine. Urmărește cum panta tangentei se apropie de zero, apoi își schimbă semnul.'),
  example('stationary','Tangenta orizontală',1,0,-2,0,'La x=0, derivata este zero. Compară pantele la −1 și 1 și explică de ce există un minim.'),
  example('negative-slope','O pantă negativă',1,0,-2,-3,'La x=−3, derivata este −2. Mută punctul spre −1: graficul continuă să scadă, dar mai lent.')
 ]},
 {kind:'integral',label:'Integrala',title:'Aria de sub grafic',examples:[
  example('unit-area','De la 0 la 1',1,0,-2,1,'Dublează limita superioară. Aria se dublează și ea? Pentru x²/4, aria crește cu cubul limitei.'),
  example('cubic-growth','Arie până la 3',1,0,-2,3,'Aria este 3³/12=2,25. Compară cu limita 1: aria devine de 27 de ori mai mare.'),
  example('empty-interval','Interval de lungime zero',1,0,-2,0,'Cu limite egale, integrala este zero. Mărește limita și observă acumularea unei arii nenegative.')
 ]},
 {kind:'vectors',label:'Vectori',title:'Vectori în plan',examples:[
  example('sum','Regula paralelogramului',1,0,-2,1,'Schimbă componentele vectorului verde. Diagonala aurie reprezintă suma celor doi vectori.'),
  example('orthogonal','Vectori perpendiculari',2,-2,3,0,'u=(2,0) și v=(0,3) au produs scalar zero. Modifică uᵧ: se păstrează perpendicularitatea?'),
  example('opposite','Vectori opuși',2,-4,-1,1,'u=(2,1) și v=(−2,−1) au suma zero. Mișcă u și urmărește cum reapare diagonala.')
 ]},
 {kind:'complex',label:'Numere complexe',title:'Planul numerelor complexe',examples:[
  example('three-four','Triunghiul 3–4–5',3,0,0,4,'z=3+4i are modul 5. Reflectă punctul sub axa reală: conjugatul păstrează modulul, dar schimbă semnul argumentului.'),
  example('imaginary','Pe axa imaginară',0,0,0,2,'z=2i are argumentul 90°. Variază partea reală și observă cum se schimbă unghiul.'),
  example('zero','Originea',0,0,0,0,'Modulul lui zero este zero, dar argumentul nu este definit. De ce nu putem atribui o direcție vectorului nul?')
 ]},
 {kind:'exponential',label:'Exponențiale',title:'Creștere și descreștere exponențială',examples:[
  example('growth','Dublare la fiecare pas',2,0,0,1,'Compară f(0), f(1) și f(2). Pentru baza 2, fiecare pas de o unitate dublează valoarea.'),
  example('decay','Înjumătățire la fiecare pas',.5,0,0,2,'Baza este subunitară: valorile scad fără să devină zero. Urmărește asimptota y=0.'),
  example('constant','Cazul bazei 1',1,0,0,3,'Pentru baza 1, graficul este constant. Funcția exponențială strict monotonă cere a>0 și a≠1.')
 ]},
 {kind:'sequences',label:'Progresii',title:'De la termen la sumă',examples:[
  example('arithmetic','Pași egali',1,2,0,5,'Progresia aritmetică 1,3,5,7,9 are suma 25. Crește numărul termenilor și compară cu formula sumei.'),
  example('geometric','Dublare',1,2,0,5,'Progresia geometrică 1,2,4,8,16 are suma 31. Compară ultimul termen cu suma termenilor precedenți.',true),
  example('ratio-one','Rație geometrică 1',3,1,0,5,'Când q=1, toți termenii sunt egali. Formula cu numitorul q−1 nu se aplică; suma este n·a₁.',true)
 ]},
 {kind:'probability',label:'Probabilitate',title:'Distribuția binomială',examples:[
  example('coin','Patru aruncări de monedă',.5,2,0,4,'Pentru patru încercări independente, exact două succese au probabilitatea 6/16=0,375. Compară barele simetrice.'),
  example('rare','Un succes rar',.2,1,0,5,'Fiecare încercare are p=0,2. Compară probabilitatea unui singur succes cu cea a niciunui succes.'),
  example('certain','Succes sigur',1,4,0,4,'Cu p=1, numai k=n are probabilitatea 1. Mută p la 0: acum numai k=0 este posibil.')
 ]}
];
export const getLab=(kind:LabKind)=>labs.find(l=>l.kind===kind)!;
