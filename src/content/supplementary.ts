import type { Exercise } from './helpers';
// Separate from mastery: these IDs never enter daily tests or historical scores.
export const supplementary: Record<string, Exercise[]> = {
 logica:[
 ['Dacă p este falsă și q adevărată, p ⇒ q este:','Adevărată','Falsă','Nedefinită','Egală cu p','Implicația este falsă numai când antecedentul este adevărat și concluzia falsă.'],
 ['Negația afirmației „Toți elevii au rezolvat” este:','Există un elev care nu a rezolvat','Niciun elev nu a rezolvat','Toți au greșit','Există un elev care a rezolvat','Negația lui „pentru orice” este „există”, cu predicatul negat.'],
 ['p ⇔ q este adevărată când:','p și q au aceeași valoare de adevăr','p este mereu adevărată','q este mereu falsă','p și q au valori diferite','Echivalența cere ca ambele implicații să fie adevărate.']
 ],
 multimi:[
 ['Pentru A={1,2,4}, B={2,3,4}, A∩B este:','{2,4}','{1,3}','{1,2,3,4}','{2}','Intersecția păstrează exact elementele comune: 2 și 4.'],
 ['Pentru A={1,2,4}, B={2,3,4}, A\\B este:','{1}','{3}','{2,4}','{1,3}','Diferența A\\B conține elementele din A care nu sunt în B.'],
 ['Intervalul [−2,3) conține numărul:','−2','3','4','−3','Paranteza pătrată include −2; paranteza rotundă exclude 3.']
 ],
 inductie:[
 ['Baza inducției pentru 1+…+n=n(n+1)/2, n≥1, verifică:','1=1·2/2','0=1','2=1','n=0 obligatoriu','La primul indice n=1, ambele membre sunt egale cu 1.'],
 ['După ipoteza Sₖ=k(k+1)/2, Sₖ₊₁ este:','k(k+1)/2+k+1','k(k+1)/2+1','k²+1','k(k+1)/2+k','Se adaugă termenul următor k+1, apoi se factorizează în (k+1)(k+2)/2.'],
 ['Pentru a demonstra P(n) pentru n≥3, baza uzuală este:','P(3)','P(1) întotdeauna','P(0) întotdeauna','P(100)','Baza se verifică la primul indice din domeniul enunțului.']
 ],
 'progresii-aritmetice':[
 ['a₁=−3, r=4. Cât este a₆?','17','21','13','24','a₆=a₁+5r=−3+20=17.'],
 ['Primii cinci termeni sunt 2,5,8,11,14. Suma lor este:','40','35','45','50','S₅=5(2+14)/2=40.'],
 ['Într-o progresie aritmetică, a₃=7 și a₇=19. Rația este:','3','4','6','12','a₇−a₃=4r, deci r=12/4=3.']
 ],
 'progresii-geometrice':[
 ['a₁=3, q=2. Cât este a₅?','48','24','96','15','a₅=3·2⁴=48.'],
 ['a₁=5, q=1. Cât este S₆?','30','6','5','0','Pentru q=1 toți termenii sunt 5; suma celor șase este 30.'],
 ['a₁=8, q=1/2. Cât este a₄?','1','2','4','1/2','a₄=8·(1/2)³=1.']
 ],
 functii:[
 ['Domeniul real al f(x)=1/(x+2) este:','ℝ\\{−2}','ℝ','[−2,∞)','ℝ\\{2}','Numitorul nu poate fi zero, deci x≠−2.'],
 ['Pentru f(x)=x²−1, imaginea lui 3 este:','8','9','2','10','Se înlocuiește x cu 3: 3²−1=8.'],
 ['Funcția f(x)=x² pe ℝ este:','Pară','Impară','Injectivă','Strict crescătoare','f(−x)=(−x)²=x²=f(x), deci este pară.']
 ],
 'gradul-unu':[
 ['Zeroul lui f(x)=3x−12 este:','4','−4','3','12','3x−12=0 dă x=4.'],
 ['Funcția f(x)=−2x+5 este:','Strict descrescătoare','Strict crescătoare','Constantă','Pară','Coeficientul lui x este negativ, deci valorile scad când x crește.'],
 ['Soluția lui 2x+1≥7 este:','x≥3','x≤3','x≥4','x≤4','Scădem 1 și împărțim la 2 pozitiv: x≥3.']
 ],
 'gradul-doi':[
 ['Vârful parabolei y=x²−6x+5 are abscisa:','3','−3','6','5','xᵥ=−b/(2a)=6/2=3.'],
 ['Ecuația x²+4=0 are în ℝ:','Nicio soluție','O soluție','Două soluții','Patru soluții','x²≥0, astfel x²+4≥4; nu poate fi zero.'],
 ['Soluția lui x²−9<0 este:','(−3,3)','[−3,3]','(3,∞)','ℝ','Produsul (x−3)(x+3) este negativ între rădăcini; inegalitatea este strictă.']
 ],
 viete:[
 ['Pentru x²−7x+10=0, suma rădăcinilor este:','7','−7','10','−10','Suma este −b/a=7.'],
 ['Ecuația monică cu rădăcinile −2 și 5 este:','x²−3x−10=0','x²+3x−10=0','x²−7x+10=0','x²−3x+10=0','Suma este 3, produsul −10, deci x²−3x−10=0.'],
 ['Pentru 2x²−8x+6=0, produsul rădăcinilor este:','3','6','4','−3','Produsul este c/a=6/2=3.']
 ],
 radicali:[
 ['√(−5)² este:','5','−5','25','Nereal','√(x²)=|x|; pentru x=−5 rezultatul este 5.'],
 ['Domeniul lui √(2x−6) este:','[3,∞)','(3,∞)','ℝ','(−∞,3]','Radicandul trebuie să fie nenegativ: 2x−6≥0, deci x≥3.'],
 ['Raționalizarea lui 1/√3 dă:','√3/3','√3','3√3','1/3','Înmulțim numărătorul și numitorul cu √3; numitorul devine 3.']
 ],
 trigonometrie:[
 ['sin 150° este:','1/2','−1/2','√3/2','−√3/2','150°=180°−30°; sinusul este pozitiv și egal cu sin 30°.'],
 ['cos 180° este:','−1','1','0','1/2','Punctul de pe cerc la 180° are coordonata orizontală −1.'],
 ['tan 45° este:','1','0','−1','√3','tan 45°=sin 45°/cos 45°=1.']
 ],
 'formule-trig':[
 ['Dacă sin x=3/5 și cos x=4/5, sin 2x este:','24/25','7/25','12/25','1','sin 2x=2 sin x cos x=2·3·4/25.'],
 ['cos²x−sin²x este egal cu:','cos 2x','sin 2x','1','cos x','Formula unghiului dublu pentru cosinus este cos 2x=cos²x−sin²x.'],
 ['sin(a+b) este:','sin a cos b+cos a sin b','sin a+sin b','sin a sin b','cos a cos b−sin a sin b','Sinusul sumei combină două produse, nu suma sinusurilor.']
 ],
 triunghi:[
 ['Catetele unui triunghi dreptunghic sunt 6 și 8. Ipotenuza este:','10','14','√14','48','Teorema lui Pitagora: c=√(36+64)=10.'],
 ['Două laturi sunt 3 și 4, iar unghiul dintre ele 90°. Aria este:','6','12','7','24','Aria este ab sin C/2=3·4·1/2=6.'],
 ['Laturile 2,3,6 pot forma un triunghi?','Nu, 2+3<6','Da, întotdeauna','Da, dreptunghic','Da, echilateral','Suma oricăror două laturi trebuie să fie mai mare decât a treia.']
 ],
 'ceva-menelaus':[
 ['În configurația lui Ceva, BD/DC=2 și CE/EA=3. AF/FB este:','1/6','6','2/3','3/2','Produsul celor trei rapoarte trebuie să fie 1, deci al treilea este 1/6.'],
 ['Cele trei mediane ale unui triunghi sunt:','Concurente','Paralele','Coliniare','Perpendiculare două câte două','La mediane cele trei rapoarte sunt 1; teorema lui Ceva garantează concurența.'],
 ['Teorema lui Menelaus verifică în principal:','Coliniaritatea a trei puncte','Egalitatea a trei arii','Concurența medianelor','Perpendicularitatea laturilor','Menelaus caracterizează punctele de pe laturile sau prelungirile unui triunghi aflate pe aceeași dreaptă.']
 ],
 vectori:[
 ['u=(−1,3), v=(4,−2). u+v este:','(3,1)','(−5,5)','(4,−6)','(5,−1)','Adunăm componentele: −1+4=3 și 3−2=1.'],
 ['Pentru u=(2,−3), −2u este:','(−4,6)','(4,−6)','(0,−5)','(−4,−6)','Înmulțim fiecare componentă cu −2.'],
 ['Lungimea vectorului (5,12) este:','13','17','7','60','Norma este √(5²+12²)=√169=13.']
 ],
 'produs-scalar':[
 ['(1,2)·(3,−1) este:','1','5','−1','3','Produsul scalar este 1·3+2·(−1)=1.'],
 ['Vectorii (2,1) și (1,−2) sunt:','Perpendiculari','Paraleli','Egali','Opusi','Produsul scalar 2·1+1·(−2)=0, iar vectorii sunt nenuli.'],
 ['Pentru |u|=2, |v|=3 și unghiul 60°, u·v este:','3','6','0','−3','u·v=|u||v|cos 60°=2·3·1/2=3.']
 ],
 puteri:[
 ['2⁻³ este:','1/8','−8','8','−1/8','Exponentul negativ înseamnă inversul: 2⁻³=1/2³.'],
 ['(3²)³ este:','729','81','243','36','Puterea unei puteri înmulțește exponenții: 3⁶=729.'],
 ['Pentru x>0, x^(1/2)·x^(3/2) este:','x²','x³','x','x⁴','La aceeași bază se adună exponenții: 1/2+3/2=2.']
 ],
 exponentiala:[
 ['Ecuația 3^(x+1)=27 are soluția:','2','3','1','4','27=3³, deci x+1=3 și x=2.'],
 ['Funcția (1/2)^x este:','Strict descrescătoare','Strict crescătoare','Negativă','Constantă','Baza este între 0 și 1; valorile scad când exponentul crește.'],
 ['Imaginea funcției 2^x pe ℝ este:','(0,∞)','[0,∞)','ℝ','(−∞,0)','Puterea este mereu pozitivă, tinde la 0 fără să îl atingă și crește fără limită.']
 ],
 logaritmi:[
 ['log₂32 este:','5','4','16','3','2⁵=32, deci log₂32=5.'],
 ['Domeniul lui log₃(x−4) este:','(4,∞)','[4,∞)','ℝ','(−∞,4)','Argumentul logaritmului trebuie să fie strict pozitiv: x−4>0.'],
 ['log₅25+log₅5 este:','3','10','2','5','log₅25=2 și log₅5=1; suma este 3.']
 ],
 inversa:[
 ['Inversa lui f(x)=3x−6 pe ℝ este:','f⁻¹(x)=(x+6)/3','f⁻¹(x)=3x+6','f⁻¹(x)=(x−6)/3','f⁻¹(x)=1/(3x−6)','Din y=3x−6 obținem x=(y+6)/3, apoi redenumim variabila.'],
 ['f(x)=x² pe [0,∞) are inversa:','√x','−√x','x²','1/x','Restricția x≥0 selectează rădăcina pozitivă și face funcția bijectivă pe [0,∞).'],
 ['Dacă f este bijectivă, f⁻¹(f(7)) este:','7','f(7)','1/7','0','Compunerea unei funcții cu inversa sa întoarce argumentul inițial.']
 ],
 complexe:[
 ['Modulul lui 3−4i este:','5','7','1','25','|z|=√(3²+(−4)²)=5.'],
 ['(2+i)(2−i) este:','5','3','4−i','4+i','Produsul unui complex cu conjugatul este modulul la pătrat: 4+1=5.'],
 ['i⁶ este:','−1','1','i','−i','i⁴=1, astfel i⁶=i⁴i²=−1.']
 ],
 moivre:[
 ['(cos θ+i sin θ)³ este:','cos 3θ+i sin 3θ','3cos θ+3i sin θ','cos θ+i sin 3θ','cos³θ+i sin³θ','Formula lui Moivre multiplică argumentul cu exponentul.'],
 ['Rădăcinile pătrate complexe ale lui −9 sunt:','3i și −3i','3 și −3','9i și −9i','i și −i','(3i)²=(−3i)²=−9; ambele rădăcini sunt necesare.'],
 ['Numărul 2(cos 30°+i sin 30°), ridicat la pătrat, are modulul:','4','2','1','8','Modulul puterii este puterea modulului: 2²=4.']
 ],
 combinatorica:[
 ['Câte submulțimi cu 2 elemente are o mulțime cu 5 elemente?','10','20','25','5','C(5,2)=5·4/2=10; ordinea elementelor nu contează.'],
 ['Câte aranjamente de 2 elemente din 4 există?','12','6','16','8','A(4,2)=4·3=12; ordinea contează și nu repetăm elemente.'],
 ['Câte permutări au 4 obiecte distincte?','24','16','12','8','Numărul este 4!=4·3·2·1=24.']
 ],
 binom:[
 ['Coeficientul lui x² în (1+x)⁶ este:','15','6','12','20','Coeficientul este C(6,2)=6·5/2=15.'],
 ['Termenul liber al lui (x+2)³ este:','8','6','2','1','Termenul fără x este 2³=8.'],
 ['Suma coeficienților lui (1+x)⁶ este:','64','36','12','32','Punem x=1: (1+1)⁶=64.']
 ],
 probabilitati:[
 ['La un zar echilibrat, probabilitatea unui număr mai mare decât 4 este:','1/3','1/2','2/3','1/6','Rezultatele favorabile sunt 5 și 6: 2 din 6, adică 1/3.'],
 ['Două monede echilibrate independente dau exact un cap cu probabilitatea:','1/2','1/4','3/4','1','Din CC, CP, PC, PP, două rezultate au exact un cap.'],
 ['Dacă P(A)=0,35, atunci P(complementul lui A) este:','0,65','0,35','1,35','0','Probabilitatea complementului este 1−P(A)=0,65.']
 ],
 statistica:[
 ['Media valorilor 2,4,9 este:','5','4','9','15','Media aritmetică este (2+4+9)/3=5.'],
 ['Mediana valorilor 8,2,5,3,9 este:','5','3','8','27/5','Ordonăm 2,3,5,8,9; valoarea centrală este 5.'],
 ['Modul valorilor 1,2,2,4,4,4 este:','4','2','1','3','Modul este valoarea cu frecvența maximă; 4 apare de trei ori.']
 ],
 dreapta:[
 ['Panta dreptei prin (1,2) și (3,8) este:','3','6','1/3','2','m=(8−2)/(3−1)=6/2=3.'],
 ['Dreptele y=2x+1 și y=2x−3 sunt:','Paralele distincte','Perpendiculare','Coincidente','Secante','Au aceeași pantă și ordonate la origine diferite.'],
 ['Ecuația dreptei verticale prin (3,−2) este:','x=3','y=−2','y=3x−2','x=−2','Toate punctele dreptei verticale au abscisa 3.']
 ],
 matrice:[
 ['Dacă A are 2×3 elemente și B are 3×4, AB are dimensiunea:','2×4','3×3','4×2','Nu există','Dimensiunile interioare coincid; produsul păstrează cele exterioare.'],
 ['Transpusa unei matrice 2×3 are dimensiunea:','3×2','2×3','2×2','3×3','Transpunerea schimbă liniile cu coloanele.'],
 ['Pentru matrice pătrate A, AI este:','A','I','0','A²','Matricea identitate este elementul neutru al înmulțirii matricelor.']
 ],
 determinanti:[
 ['Determinantul matricei [[2,1],[3,4]] este:','5','11','8','−5','Pentru 2×2, det=ad−bc=2·4−1·3=5.'],
 ['Dacă două linii ale unei matrice sunt egale, determinantul este:','0','1','−1','2','Liniile egale sunt dependente; determinantul se anulează.'],
 ['Schimbarea a două linii între ele modifică determinantul în:','Opusul lui','Pătratul lui','Aceeași valoare','Zero obligatoriu','O interschimbare de linii schimbă semnul determinantului.']
 ],
 'inversa-matrice':[
 ['Matricea [[1,2],[2,4]] este:','Neinversabilă','Inversabilă','Identitate','Ortogonală','Determinantul este 4−4=0, deci nu există inversă.'],
 ['Inversa matricei diagonale diag(2,5) este:','diag(1/2,1/5)','diag(5,2)','diag(−2,−5)','diag(2,5)','Fiecare element diagonal nenul se înlocuiește cu inversul său.'],
 ['Pentru A inversabilă, A⁻¹A este:','I','A²','0','−I','Aceasta este proprietatea definitorie a inversei matriceale.']
 ],
 sisteme:[
 ['Sistemul x+y=5, x−y=1 are soluția:','(3,2)','(2,3)','(4,1)','(1,4)','Adunăm ecuațiile: 2x=6; apoi y=5−3=2.'],
 ['Sistemul x+y=1, 2x+2y=3 este:','Incompatibil','Compatibil determinat','Compatibil nedeterminat','Omogen','Dublarea primei ecuații dă 2x+2y=2, în contradicție cu 3.'],
 ['Un sistem liniar pătrat cu determinant nenul are:','O singură soluție','Nicio soluție','Infinit de multe soluții','Exact două soluții','Determinantul nenul permite regula lui Cramer și unicitatea soluției.']
 ],
 'limite-siruri':[
 ['lim n→∞ (3n+1)/(n+2) este:','3','1','0','∞','Împărțim la n: (3+1/n)/(1+2/n) tinde la 3.'],
 ['lim n→∞ (1/3)ⁿ este:','0','1','3','∞','O putere cu baza de modul subunitar tinde la zero.'],
 ['Șirul 2+(−1)ⁿ este:','Divergent','Convergent la 2','Convergent la 3','Convergent la 1','Subșirurile pare și impare au limite distincte: 3 și 1.']
 ],
 'limite-functii':[
 ['lim x→2 (x²−4)/(x−2) este:','4','2','0','Nu există','Pentru x≠2 simplificăm (x−2)(x+2)/(x−2); limita este 4.'],
 ['lim x→0 sin x/x (x în radiani) este:','1','0','∞','−1','Este limita fundamentală trigonometrică, valabilă în radiani.'],
 ['Limita bilaterală a lui 1/x la 0 este:','Nu există','0','1','+∞','La stânga limita este −∞, la dreapta +∞; nu coincid.']
 ],
 continuitate:[
 ['Pentru f(x)=(x²−1)/(x−1), x≠1, valoarea f(1) pentru continuitate este:','2','1','0','−1','Limita la 1 a lui x+1 este 2; valoarea trebuie aleasă egală cu limita.'],
 ['O funcție continuă pe [a,b], cu f(a)<0<f(b), are:','Cel puțin un zero în (a,b)','Exact un zero','Niciun zero','Numai zerouri la capete','Teorema valorilor intermediare garantează existența, nu unicitatea.'],
 ['Orice polinom real este continuu:','Pe ℝ','Numai pe (0,∞)','Numai în 0','Numai unde derivata este pozitivă','Sumele și produsele funcțiilor continue sunt continue; polinoamele sunt continue peste tot.']
 ],
 derivate:[
 ['Derivata lui x⁴ este:','4x³','x³','4x⁴','x⁵/5','Regula puterii: (xⁿ)′=nxⁿ⁻¹.'],
 ['Derivata unei funcții constante 7 este:','0','7','1','x','Variația unei constante este zero la orice punct.'],
 ['f(x)=x² are f′(−3) egal cu:','−6','6','9','−3','f′(x)=2x, deci f′(−3)=−6.']
 ],
 'reguli-derivare':[
 ['Derivata lui (2x+1)³ este:','6(2x+1)²','3(2x+1)²','(2x+1)²','6(2x+1)³','Regula lanțului: 3(2x+1)²·2.'],
 ['Derivata lui x eˣ este:','eˣ(1+x)','eˣ','xeˣ','eˣ(1−x)','Regula produsului: 1·eˣ+x·eˣ=eˣ(1+x).'],
 ['Pentru x≠0, derivata lui 1/x este:','−1/x²','1/x²','ln|x|','−1/x','Scriem x⁻¹ și aplicăm regula puterii.']
 ],
 'teoreme-derivate':[
 ['Pentru f(x)=x² pe [1,3], punctul din teorema lui Lagrange este:','2','1','3','0','Panta secantei este (9−1)/2=4; f′(c)=2c=4, deci c=2.'],
 ['Teorema lui Rolle cere, pe lângă continuitate și derivabilitate:','f(a)=f(b)','f(a)<f(b)','f′(a)=f′(b)','a=b','Egalitatea valorilor la capete garantează un punct interior cu derivata zero.'],
 ['Derivabilitatea într-un punct implică:','Continuitatea în acel punct','Monotonia pe ℝ','Derivată nenulă','Inversa funcției','Derivabilitatea este o condiție mai puternică decât continuitatea locală.']
 ],
 variatie:[
 ['Dacă f′(x)>0 pe un interval, f este:','Strict crescătoare','Strict descrescătoare','Constantă','Pară','Semnul pozitiv al derivatei indică o creștere strictă pe interval.'],
 ['f(x)=x²−4x are un minim în:','x=2','x=−2','x=4','x=0','f′=2x−4 trece de la negativ la pozitiv în 2.'],
 ['La x=0, funcția x³ are:','Punct staționar fără extrem local','Minim local','Maxim local','Discontinuitate','Derivata se anulează în 0, dar 3x² nu își schimbă semnul.']
 ],
 asimptote:[
 ['Asimptota verticală a lui 1/(x−3) este:','x=3','y=3','x=0','y=0','Funcția are limite infinite când x tinde la 3 din stânga și dreapta.'],
 ['Asimptota orizontală a lui (2x+1)/(x−1) la +∞ este:','y=2','x=2','y=1','y=0','Raportul coeficienților dominanți este 2/1=2.'],
 ['Asimptota oblică a lui x+2+1/x la +∞ este:','y=x+2','y=x','y=2','x=0','Diferența dintre funcție și x+2 este 1/x și tinde la zero.']
 ],
 legi:[
 ['Pentru x★y=x+y+2 pe ℝ, elementul neutru este:','−2','0','2','1','x★e=x cere x+e+2=x, deci e=−2.'],
 ['Legea x★y=x−y pe ℝ este comutativă?','Nu','Da','Doar fiindcă ℝ este infinită','Orice lege este comutativă','De exemplu 1★2=−1, dar 2★1=1.'],
 ['Pe ℝ, x★y=x+y+1 este asociativă deoarece ambele grupări dau:','x+y+z+2','x+y+z+1','x+y+z','xyz','(x★y)★z=x+y+1+z+1; cealaltă grupare are aceeași valoare.']
 ],
 grupuri:[
 ['În grupul (ℤ,+), inversul lui 7 este:','−7','1/7','7','0','Inversul aditiv satisface 7+(−7)=0, elementul neutru.'],
 ['Mulțimea ℕ cu adunarea nu este grup deoarece:','Numerele pozitive nu au invers aditiv în ℕ','Adunarea nu este asociativă','Adunarea nu este comutativă','Nu este închisă la adunare','De exemplu inversul aditiv al lui 1 ar fi −1, care nu aparține lui ℕ.'],
 ['Elementul neutru în (ℝ\\{0},·) este:','1','0','−1','2','Pentru orice x nenul, x·1=1·x=x.']
 ],
 modulo:[
 ['Restul lui 17 modulo 5 este:','2','3','1','0','Scriem 17=3·5+2; restul 2 este între 0 și 4.'],
 ['În ℤ₇, [3]·[5] este:','[1]','[2]','[3]','[0]','3·5=15, iar 15 are restul 1 la împărțirea la 7.'],
 ['Inversul multiplicativ al lui [3] în ℤ₇ este:','[5]','[3]','[2]','[6]','3·5=15≡1 (mod 7).']
 ],
 inele:[
 ['Într-un inel unitar, elementul neutru al adunării se notează:','0','1','−1','i','Adunarea are elementul neutru 0; înmulțirea are elementul neutru 1.'],
 ['ℤ este corp?','Nu, 2 nu are invers multiplicativ în ℤ','Da, orice inel este corp','Da, fiindcă are 1','Nu, nu are adunare','Un corp cere invers multiplicativ pentru orice element nenul; 1/2 nu este întreg.'],
 ['Distributivitatea spune că a(b+c) este:','ab+ac','ab+c','a+b+c','abc','Înmulțirea se distribuie față de adunare.']
 ],
 polinoame:[
 ['Gradul lui 3x⁴−x²+1 este:','4','3','2','1','Gradul este cel mai mare exponent cu coeficient nenul.'],
 ['Restul împărțirii lui P(x)=x³−2x+5 la x−2 este:','9','5','8','1','Teorema restului: P(2)=8−4+5=9.'],
 ['Dacă P(−4)=0, atunci P este divizibil cu:','x+4','x−4','x²−4','4x','Teorema factorului leagă rădăcina −4 de factorul x−(−4)=x+4.']
 ],
 'ecuatii-polinomiale':[
 ['Soluțiile reale ale lui x³−4x=0 sunt:','−2,0,2','0,4','−4,0,4','−2,2','Factorizăm x(x−2)(x+2)=0.'],
 ['În x⁴−5x²+4=0, substituția t=x² dă:','t²−5t+4=0','t⁴−5t+4=0','t²−5t²+4=0','t−5t+4=0','x⁴=(x²)²=t²; se obține o ecuație de gradul al doilea în t.'],
 ['Ecuația (x−1)²(x+2)=0 are rădăcini reale distincte:','1 și −2','1 și 2','−1 și −2','Numai 1','Fiecare factor se anulează separat; multiplicitatea nu adaugă o rădăcină distinctă.']
 ],
 primitive:[
 ['O primitivă a lui 6x² este:','2x³','6x³','3x²','12x','Derivata lui 2x³ este 6x².'],
 ['Pe (0,∞), o primitivă a lui 1/x este:','ln x','1/x²','−1/x','x ln x','Derivata lui ln x este 1/x pentru x>0.'],
 ['Două primitive ale aceleiași funcții pe un interval diferă prin:','O constantă','O funcție arbitrară','x întotdeauna','Un factor 2','Derivata diferenței este zero; pe interval, diferența este constantă.']
 ],
 integrala:[
 ['∫₀² 3x² dx este:','8','4','12','6','Primitiva este x³; valoarea este 2³−0³=8.'],
 ['∫₂² f(x) dx, pentru f continuă, este:','0','f(2)','2','1','Capetele identice dau o integrală nulă.'],
 ['Dacă ∫₁³ f(x) dx=7, atunci ∫₃¹ f(x) dx este:','−7','7','0','1/7','Inversarea limitelor schimbă semnul integralei.']
 ],
 'metode-integrare':[
 ['Pentru ∫2x cos(x²) dx, substituția potrivită este:','u=x²','u=cos x','u=2x²','u=x³','du=2x dx, astfel integrala devine ∫cos u du.'],
 ['O primitivă a lui x eˣ este:','(x−1)eˣ','xeˣ','(x+1)eˣ','x²eˣ/2','Prin părți: ∫xeˣ dx=xeˣ−∫eˣ dx=(x−1)eˣ+C.'],
 ['Formula integrării prin părți este:','∫u dv=uv−∫v du','∫u dv=uv+∫v du','∫u dv=u/v','∫u dv=∫v du','Formula rezultă prin integrarea regulii produsului d(uv)=u dv+v du.']
 ],
 'arii-volume':[
 ['Aria dintre y=x și axa Ox pe [0,2] este:','2','4','1','8','Aria este ∫₀² x dx=[x²/2]₀²=2.'],
 ['Aria dintre y=x² și axa Ox pe [−1,1] este:','2/3','0','1/3','2','Funcția este nenegativă și pară; aria este 2∫₀¹x² dx=2/3.'],
 ['Rotirea dreptunghiului 0≤x≤2, 0≤y≤3 în jurul axei Ox dă volumul:','18π','6π','12π','9π','Discurile au raza 3 și înălțimea totală 2: V=π·3²·2=18π.']
 ],
 conice:[
 ['Cercul (x−2)²+(y+1)²=9 are centrul:','(2,−1)','(−2,1)','(2,1)','(−2,−1)','Forma (x−a)²+(y−b)²=r² are centrul (a,b).'],
 ['Elipsa x²/25+y²/9=1 are semiaxa mare:','5','25','3','9','Semiaxele sunt rădăcinile numitorilor: 5 și 3.'],
 ['Pentru hiperbola x²/9−y²/4=1, asimptotele sunt:','y=±(2/3)x','y=±(3/2)x','y=±x','x=±3','Pentru x²/a²−y²/b²=1, asimptotele sunt y=±(b/a)x.']
 ],
 demonstratii:[
 ['Un contraexemplu pentru „Orice număr prim este impar” este:','2','3','5','9','2 este prim și par; un singur contraexemplu respinge afirmația universală.'],
 ['Pentru a demonstra p ⇒ q prin contrapoziție, demonstrăm:','¬q ⇒ ¬p','q ⇒ p','¬p ⇒ ¬q','p ⇒ ¬q','Implicația și contrapoziția ei sunt logic echivalente.'],
 ['Într-o demonstrație prin reducere la absurd, presupunem:','Negația concluziei și obținem o contradicție','Concluzia fără argumente','Doar un exemplu favorabil','Negația ipotezelor obligatoriu','Contradicția arată că negația concluziei este imposibilă sub ipotezele date.']
 ],
 'functii-speciale':[
 ['⌊−1,2⌋ este:','−2','−1','0','1','Partea întreagă este cel mai mare întreg mai mic sau egal cu numărul.'],
 ['|x−3|=2 are soluțiile:','1 și 5','−1 și 5','3 și 2','Numai 5','x−3=2 sau x−3=−2, deci x=5 sau x=1.'],
 ['Funcția |x| este:','Continuă în 0, nederivabilă în 0','Discontinuă în 0','Derivabilă în 0','Strict crescătoare pe ℝ','Limitele laterale coincid, dar pantele laterale sunt −1 și 1.']
 ],
 'sisteme-neliniare':[
 ['Sistemul x+y=5, xy=6 are perechile soluție:','(2,3) și (3,2)','(1,4) și (4,1)','Numai (2,3)','(−2,−3) și (−3,−2)','x și y sunt rădăcinile lui t²−5t+6=0, adică 2 și 3.'],
 ['Sistemul y=x², y=4 are soluțiile:','(−2,4) și (2,4)','(4,2) și (4,−2)','Numai (2,4)','(0,4)','Înlocuim y=4: x²=4 dă x=±2.'],
 ['Sistemul x²+y²=0 pe ℝ are soluția:','(0,0)','(1,−1)','(−1,1)','Nicio soluție','Două pătrate nenegative au suma zero numai când ambele sunt zero.']
 ],
 'trig-inverse':[
 ['arcsin(1/2), în radiani, este:','π/6','5π/6','π/3','−π/6','Valoarea principală arcsin aparține [−π/2,π/2], unde sin(π/6)=1/2.'],
 ['Domeniul real al lui arccos este:','[−1,1]','ℝ','[0,π]','(−1,1)','Cosinusul are valori în [−1,1], domeniul inversei sale principale.'],
 ['arctan 1 este:','π/4','3π/4','π/2','−π/4','Valoarea principală este în (−π/2,π/2); tan(π/4)=1.']
 ],
 'probabilitati-conditionate':[
 ['Dacă P(A∩B)=0,12 și P(B)=0,3, P(A|B) este:','0,4','0,036','0,18','0,7','P(A|B)=P(A∩B)/P(B)=0,12/0,3=0,4.'],
 ['Pentru evenimente independente cu P(A)=0,2, P(B)=0,5, P(A∩B) este:','0,1','0,7','0,3','0,4','Independența permite produsul probabilităților: 0,2·0,5=0,1.'],
 ['Formula P(A|B)=P(A∩B)/P(B) cere:','P(B)>0','P(B)=0','P(A)=1','A și B disjuncte','Nu putem împărți la zero; evenimentul condiționant trebuie să aibă probabilitate pozitivă.']
 ],
 dispersie:[
 ['Pentru X cu valorile 0 și 2, fiecare cu probabilitate 1/2, E(X) este:','1','2','0','4','E(X)=0·1/2+2·1/2=1.'],
 ['Pentru același X∈{0,2} echiprobabil, Var(X) este:','1','2','0','4','E(X²)=2 și E(X)=1, deci Var(X)=2−1²=1.'],
 ['Pentru o variabilă aleatoare constantă 5, dispersia este:','0','5','25','1','Nu există abatere față de medie: E((X−5)²)=0.']
 ],
 permutari:[
 ['Permutarea (1 2 3) în notație ciclică trimite 3 în:','1','2','3','0','Ciclul trimite 1→2, 2→3, 3→1.'],
 ['O transpoziție are semnul:','−1','1','0','2','O transpoziție este o permutare impară și are semnul −1.'],
 ['Compunerea unei permutări cu inversa ei dă:','Permutarea identică','O transpoziție mereu','Permutarea nulă','Un ciclu de lungime 3','Inversa anulează fiecare mutare; toate elementele revin la locul inițial.']
 ],
 'integrale-rationale':[
 ['Pe (1,∞), o primitivă a lui 1/(x−1) este:','ln(x−1)','−1/(x−1)²','ln x','1/(x−1)²','Substituția u=x−1 conduce la ∫du/u=ln u+C.'],
 ['Descompunerea lui 1/[x(x+1)] este:','1/x−1/(x+1)','1/x+1/(x+1)','1/(x+1)−1/x','1/x²','Aducând la același numitor, (x+1−x)/[x(x+1)]=1/[x(x+1)].'],
 ['O primitivă a lui 1/(1+x²) pe ℝ este:','arctan x','ln(1+x²)','arcsin x','−1/(1+x²)','Derivata funcției arctan x este 1/(1+x²).']
 ],
 'proprietati-integrala':[
 ['Dacă f este impară și continuă pe [−a,a], integrala ei este:','0','a','2a','1','Valorile simetrice se anulează; integrala unei funcții impare pe interval simetric este zero.'],
 ['Dacă ∫₀¹ f=2 și ∫₀¹ g=3, atunci ∫₀¹(2f−g) este:','1','7','−1','5','Liniaritatea dă 2·2−3=1.'],
 ['Dacă f≤g pe [a,b], a<b, și ambele sunt continue, atunci:','∫ₐᵇf≤∫ₐᵇg','∫ₐᵇf>∫ₐᵇg','Integralele sunt obligatoriu egale','Nu există comparație','Monotonia integralei păstrează ordinea funcțiilor pentru limite în ordine crescătoare.']
 ]
};
