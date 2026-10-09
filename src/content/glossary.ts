export interface Definition { title: string; explanation: string; aliases: string[] }
const term=(title:string,explanation:string,...aliases:string[]):Definition=>({title,explanation,aliases:[title,...aliases]});
export const glossary: Definition[] = [
 term('Propoziție','Enunț pentru care putem decide dacă este adevărat sau fals.','propoziții','propoziția'),
 term('Implicație','Relație „dacă p, atunci q”. Este falsă numai când p este adevărată și q falsă.','implicația'),
 term('Echivalență','Două afirmații sunt echivalente când au aceeași valoare de adevăr.','echivalența','echivalente'),
 term('Predicat','Enunț cu variabile; devine o propoziție după alegerea valorilor.','predicate'),
 term('Cuantificator','Simbol care spune „pentru orice” sau „există” în raport cu un domeniu.','cuantificatori'),
 term('Intersecție','Mulțimea elementelor care aparțin simultan ambelor mulțimi.','intersecția'),
 term('Reuniune','Mulțimea elementelor care aparțin cel puțin uneia dintre mulțimi.','reuniunea'),
 term('Inducție','Demonstrație cu un caz de bază și un pas de la un indice la următorul.','inducția'),
 term('Rație','Diferența dintre termeni consecutivi ai unei progresii aritmetice sau raportul lor într-o progresie geometrică.','rația'),
 term('Progresie aritmetică','Șir în care fiecare termen se obține adăugând aceeași rație la termenul precedent.','progresii aritmetice'),
 term('Progresie geometrică','Șir în care fiecare termen se obține înmulțind termenul precedent cu aceeași rație.','progresii geometrice'),
 term('Domeniu','Mulțimea valorilor permise pentru argumentul unei funcții.','domeniul'),
 term('Injectivă','Funcție care trimite argumente distincte în valori distincte.','injectivitate'),
 term('Surjectivă','Funcție care atinge fiecare element al codomeniului.','surjectivitate'),
 term('Bijectivă','Funcție simultan injectivă și surjectivă; are o funcție inversă.','bijectivitate'),
 term('Discriminant','Pentru ax²+bx+c, numărul Δ=b²−4ac. Semnul lui determină numărul rădăcinilor reale când a≠0.','discriminantul'),
 term('Abscisă','Prima coordonată, x, a unui punct în plan.','abscisa'),
 term('Ordonată','A doua coordonată, y, a unui punct în plan.','ordonata'),
 term('Radicand','Expresia de sub radical. Pentru o rădăcină pătrată reală trebuie să fie nenegativă.','radicandul'),
 term('Radiani','Unitate de măsură a unghiurilor. Un tur complet are 2π radiani, adică 360°.','radian'),
 term('Coliniaritate','Proprietatea punctelor de a se afla pe aceeași dreaptă.','coliniare','coliniari'),
 term('Concurență','Proprietatea mai multor drepte de a trece prin același punct.','concurente'),
 term('Produs scalar','Număr obținut din doi vectori: în plan, uₓvₓ+uᵧvᵧ. Pentru vectori nenuli, zero indică perpendicularitate.','produsul scalar'),
 term('Modul','Pentru un număr real sau complex, distanța față de origine. În statistică, modul este valoarea cu frecvența maximă.','modulul'),
 term('Conjugat','Pentru z=a+bi, conjugatul este a−bi: schimbăm semnul părții imaginare.','conjugatul'),
 term('Argument','Într-o funcție, argumentul este valoarea introdusă. Pentru un număr complex nenul, argumentul este unghiul cu semiaxa reală pozitivă, definit până la multipli de 2π.','argumentul'),
 term('Logaritm','logₐ b este exponentul la care ridicăm a pentru a obține b; a>0, a≠1 și b>0.','logaritmul','logaritmi'),
 term('Permutare','Reordonare a tuturor elementelor unei mulțimi finite.','permutări','permutarea'),
 term('Combinări','Selecții de k elemente din n fără repetare, în care ordinea nu contează.','combinare'),
 term('Determinant','Număr asociat unei matrice pătrate. O matrice este inversabilă exact când determinantul este nenul.','determinantul','determinanți'),
 term('Inversabilă','Matrice pătrată care are o inversă: produsul cu inversa sa este matricea identitate.','inversabilitate'),
 term('Asimptotă','Dreaptă de care graficul se apropie în sensul unei limite, la infinit sau lângă o valoare exclusă.','asimptota','asimptote','asimptotele'),
 term('Continuitate','Într-un punct, limita funcției există și este egală cu valoarea funcției.','continuă','continuitatea'),
 term('Derivată','Limita raportului dintre variația funcției și variația argumentului. Geometric, este panta tangentei.','derivata','derivate'),
 term('Tangentă','Dreapta care descrie direcția locală a unui grafic neted într-un punct.','tangenta','tangentei'),
 term('Monotonie','Creșterea sau descreșterea unei funcții pe un interval.','monotonia'),
 term('Primitivă','Funcție a cărei derivată este funcția dată. Pe un interval, primitivele diferă printr-o constantă.','primitive','primitiva'),
 term('Integrală','Integrala definită acumulează valori cu semn pe un interval; pentru o funcție nenegativă reprezintă aria de sub grafic.','integrala','integrale','integralei'),
 term('Element neutru','Element care, combinat prin lege cu oricare altul, îl lasă neschimbat. De exemplu, 0 la adunare și 1 la înmulțire.','elementul neutru'),
 term('Dispersie','Media pătratelor abaterilor de la medie; măsoară cât de răspândite sunt valorile.','dispersia'),
 term('Independente','Evenimente pentru care probabilitatea intersecției este produsul probabilităților.','independență','independența'),
 term('Binomială','Distribuția numărului de succese în n încercări independente cu aceeași probabilitate p de succes.','binomial'),
 term('Mediană','În statistică, valoarea centrală a datelor ordonate; la un număr par de date, media celor două centrale. Într-un triunghi, mediana unește un vârf cu mijlocul laturii opuse.','mediana'),
];
export const symbols: Record<string, Definition> = Object.fromEntries([
 ['∀','Pentru orice','Afirmația este valabilă pentru fiecare element al domeniului.'],
 ['∃','Există','Cel puțin un element al domeniului satisface afirmația.'],
 ['∈','Aparține','Elementul din stânga se află în mulțimea din dreapta.'],
 ['∉','Nu aparține','Elementul din stânga nu se află în mulțimea din dreapta.'],
 ['≤','Mai mic sau egal','Include și cazul de egalitate.'],['≥','Mai mare sau egal','Include și cazul de egalitate.'],
 ['≠','Diferit','Valorile celor două expresii nu sunt egale.'],['⇒','Implică','Dacă afirmația din stânga este adevărată, cea din dreapta trebuie să fie adevărată.'],
 ['⇔','Echivalent','Cele două afirmații au aceeași valoare de adevăr.'],['→','Tinde către','Într-o limită, argumentul se apropie de valoarea indicată.'],
 ['∞','Infinit','Descrie o creștere fără limită; nu este un număr real.'],['∑','Sumă','Adună termenii indicați de indice și de limitele sumei.'],
 ['∫','Integrală','Simbol pentru integrare; limitele precizează intervalul unei integrale definite.'],['Δ','Delta','Într-o ecuație de gradul al doilea, Δ=b²−4ac este discriminantul.'],
 ['∩','Intersecție','Elementele comune celor două mulțimi.'],['∪','Reuniune','Elementele din cel puțin una dintre mulțimi.'],
 ['π','Pi','Raportul dintre circumferința și diametrul unui cerc, aproximativ 3,14159.'],['√','Radical','Rădăcina pătrată principală, nenegativă, a unui număr nenegativ.'],
 ['θ','Theta','Literă grecească folosită aici pentru un unghi.'],['′','Prim','După numele unei funcții, indică derivata de ordinul întâi.'],
].map(([symbol,title,explanation])=>[symbol,{title,explanation,aliases:[symbol]}]));
const escape=(s:string)=>s.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
const aliases=glossary.flatMap(d=>d.aliases.map(a=>({alias:a,definition:d}))).sort((a,b)=>b.alias.length-a.alias.length);
const byAlias=new Map(aliases.map(a=>[a.alias.toLocaleLowerCase('ro'),a.definition]));
const matcher=new RegExp(`(?<![\\p{L}\\p{N}])(${aliases.map(a=>escape(a.alias)).join('|')})(?![\\p{L}\\p{N}])|[${Object.keys(symbols).join('')}]`,'giu');
export function explainText(text:string): {text:string;definition?:Definition}[] {
 const parts:{text:string;definition?:Definition}[]=[];let end=0;
 for(const match of text.matchAll(matcher)){const start=match.index!;if(start>end)parts.push({text:text.slice(end,start)});parts.push({text:match[0],definition:symbols[match[0]]??byAlias.get(match[0].toLocaleLowerCase('ro'))});end=start+match[0].length;}
 if(end<text.length)parts.push({text:text.slice(end)});return parts;
}
