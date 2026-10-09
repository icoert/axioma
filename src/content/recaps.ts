import { courseLessons } from './curriculum';
import { makeQuestions, type Exercise } from './helpers';
import type { CurriculumVersion, Grade, Question } from './types';
import { assessmentQuestions } from '../lib/assessment';
export type RecapGrade=5|6|7|8|Grade;
export const recapRoman:Record<RecapGrade,string>={5:'V',6:'VI',7:'VII',8:'VIII',9:'IX',10:'X',11:'XI',12:'XII'};
export interface RecapTopic {id:string;title:string;theory:string[];formula:string;example:{prompt:string;steps:string[]};questions:Question[];lessonId?:string}
export interface RecapPack {id:string;title:string;summary:string;topics:RecapTopic[];questions:Question[];grade?:RecapGrade}
function topic(id:string,title:string,theory:string[],formula:string,example:[string,...string[]],exercises:Exercise[]):RecapTopic {
 return {id,title,theory,formula,example:{prompt:example[0],steps:example.slice(1)},questions:makeQuestions(`recap-${id}`,exercises)};
}
export const middleSchoolTopics:Record<5|6|7|8,RecapTopic[]>={
 5:[
  topic('v-operatii','Numere naturale și ordinea operațiilor',['Rezolvă mai întâi parantezele, apoi puterile, înmulțirile și împărțirile, iar la final adunările și scăderile. Operațiile de același rang se efectuează de la stânga la dreapta.','O putere repetă înmulțirea bazei. Nu confunda 3²=3·3 cu 3·2.'], 'a^m\\cdot a^n=a^{m+n}', ['Calculează 18−2·(3+4).','Paranteza: 3+4=7.','Înmulțirea: 2·7=14.','Scăderea: 18−14=4.'],[
   ['12+3·4 este:','24','60','19','15','Înmulțirea se efectuează înaintea adunării: 12+12=24.'],
   ['2³·2² este:','32','16','64','12','Adunăm exponenții la aceeași bază: 2⁵=32.'],
   ['30−12:3 este:','26','6','18','10','Mai întâi împărțim 12:3=4, apoi scădem 30−4=26.']
  ]),
  topic('v-divizibilitate','Divizori, multipli și numere prime',['Un divizor împarte numărul fără rest. Un număr prim are exact doi divizori naturali: 1 și el însuși. Numărul 1 nu este prim.','Un număr este divizibil cu 3 dacă suma cifrelor este divizibilă cu 3. CMMDC ajută la simplificarea fracțiilor; CMMMC, la alegerea unui numitor comun.'], '18=2\\cdot3^2,\\quad24=2^3\\cdot3', ['Găsește CMMDC(18,24).','Descompunem: 18=2·3² și 24=2³·3.','Păstrăm factorii comuni la puterea mai mică: 2·3.','CMMDC este 6; 18/24 se simplifică la 3/4.'],[
   ['Care dintre numere este prim?','13','1','15','21','13 are numai divizorii 1 și 13; 1 nu este prim, iar 15 și 21 sunt compuse.'],
   ['CMMDC(12,18) este:','6','36','3','12','Divizorii comuni sunt 1,2,3,6; cel mai mare este 6.'],
   ['Care număr este divizibil cu 3?','123','124','125','127','Suma cifrelor lui 123 este 6, multiplu de 3.']
  ]),
  topic('v-fractii','Fracții ordinare și zecimale',['Fracțiile echivalente reprezintă aceeași cantitate. Pentru adunare sau scădere, adu fracțiile la același numitor.','La înmulțire, înmulțește numărătorii și numitorii. La împărțire printr-o fracție nenulă, înmulțește cu inversa ei.'], '\\frac ab+\\frac cb=\\frac{a+c}{b}\\quad(b\\ne0)', ['Calculează 1/2+1/3.','Numitorul comun este 6.','Scriem 1/2=3/6 și 1/3=2/6.','Suma este 5/6.'],[
   ['3/4+1/8 este:','7/8','4/12','1/2','5/8','3/4=6/8; adunând 1/8 obținem 7/8.'],
   ['0,25 este egal cu:','1/4','1/2','1/5','1/25','0,25=25/100=1/4 după simplificare cu 25.'],
   ['2/3·3/5 este:','2/5','6/8','5/3','3/10','Produsul este 6/15, care se simplifică la 2/5.']
  ]),
  topic('v-masurare','Lungimi, perimetre și arii',['Perimetrul este lungimea conturului; aria măsoară suprafața. Folosește aceeași unitate înainte de a calcula.','1 m=100 cm, dar 1 m²=10 000 cm². Unitățile de arie se transformă prin pătratul factorului de lungime.'], 'P_{\\text{dreptunghi}}=2(L+l),\\quad A=Ll', ['Un dreptunghi are 5 cm și 3 cm.','Perimetrul: 2(5+3)=16 cm.','Aria: 5·3=15 cm².','Perimetrul și aria au unități diferite.'],[
   ['Aria unui pătrat cu latura 6 cm este:','36 cm²','24 cm²','12 cm²','6 cm²','Aria pătratului este latura la pătrat: 6²=36 cm².'],
   ['2,5 m în centimetri înseamnă:','250 cm','25 cm','2500 cm','2,5 cm','Înmulțim cu 100: 2,5·100=250 cm.'],
   ['Perimetrul dreptunghiului cu laturi 7 cm și 2 cm este:','18 cm','14 cm','9 cm','28 cm','Perimetrul este 2(7+2)=18 cm.']
  ])
 ],
 6:[
  topic('vi-intregi','Numere întregi și semne',['Pe axă, numerele din dreapta sunt mai mari. Opusul lui a este −a, iar modulul |a| este distanța față de zero.','Produsul a două numere de același semn este pozitiv; al unor numere de semne diferite este negativ. Scăderea unui număr înseamnă adunarea opusului său.'], 'a-b=a+(-b),\\quad|-a|=|a|', ['Calculează −4−(−7).','Schimbăm scăderea în adunarea opusului: −4+7.','De la −4 avansăm șapte unități spre dreapta.','Rezultatul este 3.'],[
   ['−6+9 este:','3','−3','15','−15','Semnele sunt diferite: scădem modulele 9−6 și păstrăm semnul numărului cu modul mai mare.'],
   ['(−3)·(−5) este:','15','−15','−8','8','Două semne negative dau un produs pozitiv: 3·5=15.'],
   ['|−12| este:','12','−12','0','24','Modulul este distanța față de zero, deci 12.']
  ]),
  topic('vi-rationale','Numere raționale și comparații',['Un număr rațional se poate scrie ca raport de întregi cu numitor nenul. Pe axă, comparația ține cont și de semn.','Pentru fracții cu numitori pozitivi, poți compara produsele încrucișate. La numere negative, numărul mai apropiat de zero este mai mare.'], '\\frac ab<\\frac cd\\iff ad<bc\\quad(b,d>0)', ['Compară −2/3 și −1/2.','Aducem la numitorul 6: −4/6 și −3/6.','−4<−3, deci −4/6<−3/6.','Prin urmare, −2/3<−1/2.'],[
   ['Care este mai mare?','−1/4','−1/2','−3/4','−1','Dintre aceste numere negative, −1/4 este cel mai apropiat de zero.'],
   ['−1/2+3/4 este:','1/4','−1/4','5/4','1/2','Scriem −1/2=−2/4, apoi −2/4+3/4=1/4.'],
   ['(−2/3):(4/5) este:','−5/6','−8/15','5/6','−3/10','Înmulțim cu inversa: (−2/3)·(5/4)=−10/12=−5/6.']
  ]),
  topic('vi-proportii','Rapoarte, proporții și procente',['O proporție este egalitatea a două rapoarte. Într-o proporție, produsul extremilor este egal cu produsul mezilor.','Un procent p% reprezintă p/100 din întreg. La mărimi direct proporționale, raportul rămâne constant.'], '\\frac ab=\\frac cd\\Rightarrow ad=bc\\quad(b,d\\ne0)', ['Trei caiete costă 12 lei. Cât costă cinci?','Prețul unui caiet este 12:3=4 lei.','Cinci caiete costă 5·4=20 lei.','Raportul preț/număr de caiete rămâne 4.'],[
   ['20% din 150 este:','30','20','15','75','20/100·150=30.'],
   ['Dacă x/6=2/3, x este:','4','9','12','3','Înmulțim cu 6: x=6·2/3=4.'],
   ['La scară 1:100, 3 cm pe desen reprezintă:','3 m','30 m','30 cm','300 m','Lungimea reală este 3·100=300 cm=3 m.']
  ]),
  topic('vi-unghiuri','Unghiuri și triunghiuri',['Unghiurile suplementare au suma 180°, iar cele complementare, 90°. Unghiurile opuse la vârf sunt egale.','Unghiurile unui triunghi au suma 180°. Într-un triunghi isoscel, unghiurile de la bază sunt egale.'], 'A+B+C=180^\\circ', ['Un triunghi are două unghiuri de 50° și 60°.','Suma celor două este 110°.','Al treilea este 180°−110°=70°.','Verificăm: 50°+60°+70°=180°.'],[
   ['Suplementul unui unghi de 35° este:','145°','55°','325°','35°','Suplementul completează până la 180°: 180°−35°=145°.'],
   ['Un triunghi isoscel cu unghiul la vârf 40° are fiecare unghi de la bază:','70°','40°','140°','80°','Restul de 140° se împarte în două unghiuri egale: 70°.'],
   ['Două unghiuri opuse la vârf, unul de 65°, au măsurile:','65° și 65°','65° și 115°','65° și 25°','65° și 180°','Unghiurile opuse la vârf sunt egale.']
  ])
 ],
 7:[
  topic('vii-reale','Numere reale și radicali',['Rădăcina pătrată principală este nenegativă. √(a²)=|a|, chiar dacă a este negativ.','Pentru a,b≥0, √(ab)=√a·√b. Extrage factorii care sunt pătrate perfecte pentru a simplifica radicalii.'], '\\sqrt{a^2}=|a|,\\quad\\sqrt{12}=2\\sqrt3', ['Simplifică √50.','Descompunem 50=25·2.','√50=√25·√2.','Rezultatul este 5√2.'],[
   ['√72 este:','6√2','8√2','3√2','12√2','72=36·2, iar √36=6, deci √72=6√2.'],
   ['√(−7)² este:','7','−7','49','Nedefinit în ℝ','√(a²)=|a|; pentru a=−7 obținem 7.'],
   ['2√3+5√3 este:','7√3','7√6','10√3','√21','Termenii au același radical, deci adunăm coeficienții 2+5=7.']
  ]),
  topic('vii-ecuatii','Ecuații și sisteme liniare',['Păstrează egalitatea efectuând aceeași operație în ambele membre. Verifică soluția în enunțul inițial.','La sisteme, substituie o expresie dintr-o ecuație în cealaltă sau adună ecuațiile pentru a elimina o necunoscută.'], 'ax+b=0\\Rightarrow x=-\\frac ba\\quad(a\\ne0)', ['Rezolvă 3x−5=10.','Adunăm 5 în ambele membre: 3x=15.','Împărțim la 3: x=5.','Verificăm: 3·5−5=10.'],[
   ['Soluția lui 4x+3=19 este:','4','5','3','16','Scădem 3: 4x=16; împărțim la 4 și obținem x=4.'],
   ['Sistemul x+y=7, x−y=1 are soluția:','(4,3)','(3,4)','(5,2)','(6,1)','Adunăm: 2x=8, deci x=4; apoi y=7−4=3.'],
   ['Soluția lui 2(x−1)=8 este:','5','4','3','6','Împărțim la 2: x−1=4, apoi adunăm 1: x=5.']
  ]),
  topic('vii-pitagora','Triunghiuri dreptunghice și asemănare',['Într-un triunghi dreptunghic, pătratul ipotenuzei este suma pătratelor catetelor. Identifică mai întâi latura opusă unghiului drept.','Triunghiurile asemenea au unghiuri corespunzătoare egale și laturi corespunzătoare proporționale. Ariile se raportează prin pătratul raportului de asemănare.'], 'c^2=a^2+b^2,\\quad\\frac{A_2}{A_1}=k^2', ['Catetele au lungimile 5 cm și 12 cm.','Aplicăm Pitagora: c²=25+144=169.','Lungimea este pozitivă, deci c=√169=13 cm.','13 este mai mare decât fiecare catetă, cum trebuie.'],[
   ['Catetele 9 și 12 dau ipotenuza:','15','21','3','144','c=√(81+144)=√225=15.'],
   ['Un triunghi dreptunghic are ipotenuza 10 și o catetă 6. Cealaltă catetă este:','8','4','16','√136','Cateta căutată este √(10²−6²)=√64=8.'],
   ['Raportul laturilor a două triunghiuri asemenea este 3. Raportul ariilor este:','9','3','6','27','Ariile se raportează prin k², deci 3²=9.']
  ]),
  topic('vii-arii','Patrulatere și cerc',['Aria paralelogramului este baza înmulțită cu înălțimea perpendiculară pe bază; o latură oblică nu înlocuiește înălțimea.','Aria trapezului folosește media bazelor. Pentru cerc, lungimea este 2πr și aria πr².'], 'A_{\\text{trapez}}=\\frac{(B+b)h}{2},\\quad A_{\\text{cerc}}=\\pi r^2', ['Un trapez are bazele 8 cm și 4 cm, înălțimea 3 cm.','Adunăm bazele: 8+4=12.','Înmulțim cu înălțimea și împărțim la 2: 12·3/2.','Aria este 18 cm².'],[
   ['Aria paralelogramului cu baza 7 și înălțimea 4 este:','28','22','14','11','Aria este baza ori înălțimea: 7·4=28.'],
   ['Lungimea unui cerc cu raza 3 este:','6π','3π','9π','12π','L=2πr=2π·3=6π.'],
   ['Aria unui cerc cu raza 2 este:','4π','2π','8π','4','A=πr²=π·2²=4π.']
  ])
 ],
 8:[
  topic('viii-algebra','Calcul algebric și formule de calcul prescurtat',['Deschide parantezele prin distributivitate și adună numai termenii asemenea. (a+b)² conține și termenul 2ab.','Factorizarea transformă o sumă într-un produs. În expresii fracționare, păstrează restricțiile numitorului inițial chiar după simplificare.'], '(a+b)^2=a^2+2ab+b^2,\\quad a^2-b^2=(a-b)(a+b)', ['Simplifică (x²−9)/(x−3).','Domeniul exclude x=3, fiindcă numitorul este zero.','Factorizăm x²−9=(x−3)(x+3).','Pentru x≠3, expresia devine x+3; restricția rămâne.'],[
   ['(x+4)² este:','x²+8x+16','x²+16','x²+4x+16','x²+8','Formula este x²+2·x·4+4²=x²+8x+16.'],
   ['x²−25 se factorizează ca:','(x−5)(x+5)','(x−25)(x+25)','(x−5)²','(x+5)²','Aplicăm diferența de pătrate: x²−5²=(x−5)(x+5).'],
   ['Domeniul expresiei (x²−1)/(x−1) exclude:','1','−1','0','Nicio valoare','Numitorul inițial este zero la x=1; simplificarea nu elimină restricția.']
  ]),
  topic('viii-inecuatii','Ecuații, inecuații și intervale',['La o inecuație, înmulțirea sau împărțirea cu un număr negativ inversează sensul comparației.','Capătul inclus se scrie cu paranteză pătrată; capătul exclus, cu paranteză rotundă. Infinitul nu este un capăt inclus.'], '-2x>6\\iff x<-3', ['Rezolvă 5−2x≤11.','Scădem 5: −2x≤6.','Împărțim la −2 și inversăm semnul: x≥−3.','Soluția este [−3,∞).'],[
   ['Soluția lui −3x<9 este:','x>−3','x<−3','x>3','x<3','Împărțim la −3, deci inversăm semnul: x>−3.'],
   ['Intervalul (−2,5] conține:','5','−2','6','−3','5 este inclus prin paranteza pătrată; −2 este exclus.'],
   ['Soluția lui x²=49 în ℝ este:','−7 și 7','Numai 7','Numai −7','49 și −49','Ambele numere au pătratul 49; √49=7, dar ecuația are două soluții.']
  ]),
  topic('viii-functii','Funcții și coordonate în plan',['O funcție asociază fiecărui argument din domeniu o singură valoare. Pentru f(x)=ax+b, graficul este o dreaptă.','Un punct (x,y) aparține graficului dacă y=f(x). Poți desena dreapta calculând două puncte distincte.'], 'f(x)=ax+b,\\quad P(x,y)\\in G_f\\iff y=f(x)', ['Desenează f(x)=2x+1.','Pentru x=0 obținem y=1, deci punctul (0,1).','Pentru x=1 obținem y=3, deci punctul (1,3).','Dreapta prin aceste două puncte este graficul.'],[
   ['Pentru f(x)=3x−2, f(4) este:','10','12','14','6','Înlocuim x=4: 3·4−2=10.'],
   ['Care punct aparține lui y=x+2?','(1,3)','(1,2)','(2,1)','(0,0)','Pentru x=1, valoarea y trebuie să fie 1+2=3.'],
   ['Graficul lui f(x)=−x+4 intersectează axa Ox în:','(4,0)','(0,4)','(−4,0)','(0,−4)','Pe axa Ox, y=0; −x+4=0 dă x=4.']
  ]),
  topic('viii-spatiu','Geometrie în spațiu și volume',['Volumul unei prisme drepte este aria bazei ori înălțimea. Volumul piramidei este o treime din produsul ariei bazei cu înălțimea.','Înălțimea este distanța perpendiculară dintre planurile bazelor sau dintre vârf și planul bazei. Volumul se măsoară în unități cubice.'], 'V_{\\text{prismă}}=A_bh,\\quad V_{\\text{piramidă}}=\\frac{A_bh}{3}', ['O piramidă are baza pătrată cu latura 6 cm și înălțimea 5 cm.','Aria bazei: 6²=36 cm².','Volumul: 36·5/3=60 cm³.','Înălțimea de 5 cm este perpendiculară pe planul bazei.'],[
   ['Volumul unui cub cu latura 3 este:','27','9','18','81','V=a³=3³=27.'],
   ['O prismă are aria bazei 12 și înălțimea 5. Volumul este:','60','20','17','30','V=A_b·h=12·5=60.'],
   ['Volumul piramidei cu aria bazei 18 și înălțimea 4 este:','24','72','36','22','V=A_bh/3=18·4/3=24.']
  ])
 ]
};
export const middleSchoolSource={title:'Ministerul Educației · programe gimnaziale, OMEN 3393/2017',url:'https://www.edu.ro/Ordin_ministru_3393_2017'};
export const recommendedRecap=(grade:Grade)=>grade===9?'gimnaziu':String(grade-1);
export function getRecap(id:string,version:CurriculumVersion):RecapPack|undefined {
 if(id==='gimnaziu'){const topics=Object.values(middleSchoolTopics).flat();return {id,title:'Recapitulare V–VIII',summary:'O punte spre liceu: numere, algebră, funcții și geometrie.',topics,questions:topics.map(t=>t.questions[0])};}
 if(!/^(5|6|7|8|9|10|11|12)$/.test(id))return undefined;
 const grade=Number(id) as RecapGrade;
 if(grade<9){const topics=middleSchoolTopics[grade as 5|6|7|8];return {id,grade,title:`Recapitulare · Clasa a ${recapRoman[grade]}-a`,summary:'Reamintește ideile de bază, apoi verifică-le prin exerciții explicate.',topics,questions:topics.flatMap(t=>t.questions)};}
 const topics:RecapTopic[]=courseLessons(grade as Grade,version).map(l=>({id:`recap-${l.id}`,title:l.title,theory:l.theory,formula:l.formula,example:l.example,questions:l.practiceQuestions,lessonId:l.id}));
 return {id,grade,title:`Recapitulare · Clasa a ${recapRoman[grade]}-a`,summary:'Reperele clasei, în programa selectată. Revino la lecția completă pentru mai mult antrenament.',topics,questions:assessmentQuestions(grade as Grade,version,`recap-${id}-${version}`,12)};
}
