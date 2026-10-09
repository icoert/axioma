import { test,expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { findLesson } from '../../src/content/curriculum';
import { assessmentQuestions } from '../../src/lib/assessment';

test('dashboard, grade and curriculum selections persist on reload',async({page})=>{
 await page.goto('/');await expect(page.getByRole('heading',{name:/Salut/})).toBeVisible();await page.getByLabel('Clasa',{exact:true}).selectOption('12');await page.getByLabel('Programa',{exact:true}).selectOption('legacy');await page.reload();await expect(page.getByLabel('Clasa',{exact:true})).toHaveValue('12');await page.getByRole('link',{name:'Parcursul meu',exact:true}).click();await expect(page.getByRole('heading',{name:'Legi de compoziție',exact:true})).toBeVisible();await page.getByLabel('Caută lecții').fill('primitive');await expect(page.getByRole('heading',{name:'Primitive și integrale nedefinite',exact:true})).toBeVisible();await expect(page.getByRole('heading',{name:'Legi de compoziție',exact:true})).toHaveCount(0);
});

test('worked example, mastery quiz, persistence and no repeated XP',async({page})=>{
 const lesson=findLesson('logica')!;await page.goto('/lectie/logica');await page.getByRole('button',{name:'Arată primul pas'}).click();await expect(page.getByText('Numărul 2 este prim: are exact doi divizori pozitivi.')).toBeVisible();await page.getByRole('link',{name:'Verifică ce ai înțeles'}).click();await expect(page.getByRole('button',{name:'Verifică răspunsul'})).toBeDisabled();
 for(const q of lesson.questions){await page.getByRole('radio').nth(q.answer).check();await page.getByRole('button',{name:'Verifică răspunsul'}).click();await expect(page.getByRole('status')).toContainText('Exact!');await page.getByRole('button',{name:/Următoarea întrebare|Vezi rezultatul/}).click();}
 await expect(page.getByRole('heading',{name:'Ai reușit!'})).toBeVisible();await expect(page.locator('.xp-chip')).toContainText('100 XP');await page.reload();await expect(page.locator('.xp-chip')).toContainText('100 XP');await page.getByRole('button',{name:'Încearcă din nou'}).click();
 for(const q of lesson.questions){await page.getByRole('radio').nth(q.answer).check();await page.getByRole('button',{name:'Verifică răspunsul'}).click();await page.getByRole('button',{name:/Următoarea întrebare|Vezi rezultatul/}).click();}
 await expect(page.locator('.xp-chip')).toContainText('100 XP');await page.goto('/lectie/logica');await expect(page.getByText('Stăpânită',{exact:true})).toBeVisible();
});

test('wrong answers show explanations and failure awards no XP',async({page})=>{
 await page.goto('/quiz/lesson/logica');const lesson=findLesson('logica')!;for(const q of lesson.questions){await page.getByRole('radio').nth((q.answer+1)%4).check();await page.getByRole('button',{name:'Verifică răspunsul'}).click();await expect(page.getByRole('status')).toContainText(q.explanation);await page.getByRole('button',{name:/Următoarea întrebare|Vezi rezultatul/}).click();}await expect(page.getByRole('heading',{name:'Hai să mai exersăm.'})).toBeVisible();await expect(page.locator('.xp-chip')).toContainText('0 XP');
});

test('daily challenge resumes and result review is complete',async({page})=>{
 await page.goto('/quiz/daily/9');await page.getByRole('radio').first().check();await page.getByRole('button',{name:'Verifică răspunsul'}).click();await page.getByRole('button',{name:'Următoarea întrebare'}).click();await page.reload();await expect(page.getByText('Întrebarea 2 din 5')).toBeVisible();for(let i=1;i<5;i++){await page.getByRole('radio').first().check();await page.getByRole('button',{name:'Verifică răspunsul'}).click();await page.getByRole('button',{name:/Următoarea întrebare|Vezi rezultatul/}).click();}await expect(page.locator('.review-item')).toHaveCount(5);
});

test('daily mission unlocks each learning stage and persists progress',async({page})=>{
 await page.goto('/');await expect(page.getByRole('progressbar',{name:'Progresul misiunii de azi'})).toHaveAttribute('aria-valuenow','0');await expect(page.getByText('Blocat')).toHaveCount(2);await page.getByRole('link',{name:/Înțelege:/}).click();await page.goto('/');await expect(page.getByRole('progressbar',{name:'Progresul misiunii de azi'})).toHaveAttribute('aria-valuenow','1');await page.getByRole('link',{name:/Exersează:/}).click();const lesson=findLesson('logica')!;for(const question of lesson.questions){await page.getByRole('radio').nth(question.answer).check();await page.getByRole('button',{name:'Verifică răspunsul'}).click();await page.getByRole('button',{name:/Următoarea întrebare|Vezi rezultatul/}).click();}await page.goto('/');await expect(page.getByRole('progressbar',{name:'Progresul misiunii de azi'})).toHaveAttribute('aria-valuenow','2');await expect(page.getByRole('link',{name:/Provocarea zilei:/})).toBeVisible();await page.reload();await expect(page.getByRole('progressbar',{name:'Progresul misiunii de azi'})).toHaveAttribute('aria-valuenow','2');
});

test('timed assessment withholds feedback, grades correctly and awards XP',async({page})=>{
 await page.goto('/quiz/test/9');const questions=assessmentQuestions(9,'2026','test-9-2026',12);await expect(page.getByRole('timer')).toBeVisible();for(const q of questions){await page.getByRole('radio').nth(q.answer).check();await expect(page.getByRole('status')).toHaveCount(0);await page.getByRole('button',{name:/Următoarea întrebare|Vezi rezultatul/}).click();}await expect(page.getByRole('heading',{name:'Ai reușit!'})).toBeVisible();await expect(page.locator('.xp-chip')).toContainText('150 XP');await expect(page.locator('.review-item')).toHaveCount(12);
});

test('expired assessment submits unanswered questions after reload',async({page})=>{
 await page.goto('/quiz/test/9');await expect(page.getByRole('timer')).toBeVisible();await page.evaluate(()=>{const key=Object.keys(sessionStorage).find(k=>k.includes('session:guest:test:9-2026'))!;const saved=JSON.parse(sessionStorage.getItem(key)!);saved.startedAt=Date.now()-901000;sessionStorage.setItem(key,JSON.stringify(saved));});await page.reload();await expect(page.getByRole('heading',{name:'Hai să mai exersăm.'})).toBeVisible();await expect(page.getByText('Fără răspuns',{exact:true})).toHaveCount(12);
});

test('interactive labs update parameters and reset',async({page})=>{
 await page.goto('/laborator');const slider=page.getByRole('slider',{name:'Coeficient a',exact:true});await slider.fill('2');await expect(page.locator('.lab-caption')).toContainText('2x²');await page.getByRole('button',{name:'Resetează graficul'}).click();await expect(slider).toHaveValue('1');await page.getByRole('tab',{name:'Trigonometrie',exact:true}).click();await page.getByRole('slider',{name:'Unghi θ'}).fill('90');await expect(page.locator('.lab-caption')).toContainText('sin θ = 1.00');await page.getByRole('tab',{name:'Integrala',exact:true}).click();await page.getByRole('slider',{name:'Limita superioară'}).fill('3');await expect(page.locator('.lab-caption')).toContainText('2.250');
});

test('account actions, export, roadmap and unknown routes',async({page})=>{
 await page.goto('/cont');await expect(page.getByRole('button',{name:'Continuă cu Google'})).toBeEnabled();const downloadPromise=page.waitForEvent('download');await page.getByRole('button',{name:'Descarcă progresul'}).click();expect((await downloadPromise).suggestedFilename()).toMatch(/axioma-progres/);await page.goto('/viitor');await expect(page.getByRole('heading',{name:'Matematică pentru clasele V–VIII'})).toBeVisible();await page.goto('/nu-exista');await expect(page.getByRole('heading',{name:'Pagina nu a fost găsită.'})).toBeVisible();
});

test('community asks guests to sign in and admin access stays restricted',async({page})=>{
 await page.goto('/prieteni');await expect(page.getByRole('heading',{name:'Prieteni și dueluri.'})).toBeVisible();await expect(page.getByRole('button',{name:'Continuă cu Google'})).toBeEnabled();await expect(page.getByText('CODUL TĂU DE PRIETEN')).toHaveCount(0);
 await page.goto('/admin');await expect(page.getByRole('heading',{name:'Panoul de administrare'})).toBeVisible();await expect(page.getByText('Conectează-te cu un cont de administrator.')).toBeVisible();
});

test('release history reflects product pushes',async({page})=>{
 await page.goto('/noutati');await expect(page.getByRole('heading',{name:'Ce e nou în Axioma.'})).toBeVisible();const history=page.getByRole('region',{name:'Istoricul lansărilor'});await expect(history.getByText('v1.2.0',{exact:true})).toBeVisible();await expect(page.getByRole('link',{name:/Tag v1.2.0/})).toHaveAttribute('href','https://github.com/icoert/axioma/tree/v1.2.0');await expect(history.getByText('v1.1.0')).toBeVisible();await expect(history.getByText('v1.0.0')).toBeVisible();await expect(page.getByRole('link',{name:/Commit 586f02b/})).toHaveAttribute('href','https://github.com/icoert/axioma/commit/586f02b');await expect(page.getByText('Panou de administrare cu statistici generale și progres detaliat pe utilizator.')).toBeVisible();
 await page.setViewportSize({width:780,height:900});await expect.poll(()=>page.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth+1)).toBe(true);
});

test('invalid storage recovers without crashing',async({page})=>{
 await page.addInitScript(()=>localStorage.setItem('axioma:guest','{bad json'));await page.goto('/');await expect(page.getByRole('heading',{name:/Salut/})).toBeVisible();await expect(page.locator('.xp-chip')).toContainText('0 XP');
});

test('all primary pages fit the viewport and have no serious accessibility violations',async({page})=>{
 await page.emulateMedia({reducedMotion:'reduce'});
 for(const route of ['/','/materie','/laborator','/provocari','/prieteni','/ranguri','/noutati','/viitor','/cont','/admin','/lectie/gradul-doi','/quiz/lesson/logica']){await page.goto(route);await expect(page.locator('h1')).toBeVisible();await expect.poll(()=>page.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth+1)).toBe(true);const result=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze();expect(result.violations.filter(v=>['critical','serious'].includes(v.impact??'')).map(v=>({id:v.id,nodes:v.nodes.map(n=>({target:n.target,reason:n.failureSummary}))})),`${route}: ${JSON.stringify(result.violations.map(v=>({id:v.id,nodes:v.nodes.map(n=>n.target)})))}`).toEqual([]);}
});
