# Axioma

Aplicație web pentru învățarea matematicii de liceu în limba română, cu parcursuri pentru clasele IX-XII, lecții interactive, laboratoare, provocări zilnice, teste, XP, ranguri și sincronizare opțională prin Firebase.

## Dezvoltare locală

Cerințe: Node.js 24.12+ și Java 21+ pentru emulatorul Firestore.

```bash
npm install
npx playwright install chromium
npm run dev
```

Aplicația funcționează și fără Firebase: progresul vizitatorului este păstrat în browser.

## Firebase și autentificare Google

1. Creează un proiect pe planul gratuit Firebase Spark și adaugă o aplicație Web.
2. Activează **Authentication > Sign-in method > Google**.
3. Creează baza **Firestore** și păstrează regulile din `firestore.rules`.
4. Copiază `.env.example` în `.env.local` și completează valorile aplicației Web:

```env
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_APP_ID=
```

5. După publicare, adaugă domeniul Firebase Hosting în **Authentication > Settings > Authorized domains**.

Cheile configurației Web Firebase nu sunt secrete. Accesul la progres este protejat de autentificare și de regulile Firestore owner-only.

## Validare

```bash
npm run check
```

Comanda rulează build-ul TypeScript/Vite, testele unitare, scenariile Playwright desktop și mobile, auditul de accesibilitate și testele regulilor Firestore.

## Publicare gratuită

Firebase Hosting pe planul Spark este opțiunea implicită: oferă HTTPS, CDN, rutare SPA și integrare directă cu Auth/Firestore.

```bash
npx firebase login
npm run deploy -- --project ID_PROIECT_FIREBASE
```

Comanda publică directorul `dist` și regulile Firestore. Nu include fișierul `.env.local` în controlul versiunilor.
## Recapitulări opționale · 1.2.1

În pagina „Recapitulări” poți revedea clasele V–VIII, fiecare separat sau într-un parcurs comun, și clasele IX–XII. Gimnaziul are 16 repere cu exemple rezolvate și 48 de exerciții. Acestea sunt recapitulări de bază; parcursul complet de gimnaziu rămâne planificat.

La începutul unei clase poți alege recapitularea recomandată sau poți merge direct la materia nouă: V–VIII înainte de IX, IX înainte de X, X înainte de XI, XI înainte de XII. Recapitulările liceale urmează programa selectată și nu schimbă clasa curentă. Antrenamentele sunt fără XP și își păstrează sesiunea în aceeași filă după reîncărcare.

Selectorul laboratorului are descrieri scurte și suport pentru tastatură și atingere. Deschide cu Enter/Space, navighează cu săgețile sau Home/End, confirmă cu Enter și închide cu Escape. Resetarea păstrează exemplul ales.

## Învățare și contribuții

Versiunea 1.2.0 include 59 de lecții, câte trei exerciții suplimentare pentru fiecare și nouă laboratoare cu 27 de exemple ghidate. Exercițiile suplimentare se reiau din aceeași filă după reîncărcare și nu acordă XP; verificările de stăpânire își păstrează regulile existente. Progresul acestui antrenament rămâne în sesiunea browserului, fără sincronizare Firebase.

Termenii subliniați se explică la trecerea cursorului, focalizare cu tastatura sau atingere. Apasă Escape ori atinge în afara explicației pentru a o închide. Simbolurile formulelor au și butoane explicative pentru tastatură. Laboratoarele permit alegerea unui exemplu și resetarea la valorile acelui exemplu.

Pentru dezvoltare, citește [protocolul](docs/development-protocol.md), [specificația](docs/specs/learning-expansion.md) și [analiza adaptoarelor Codex/Claude/Copilot](docs/agent-adapters.md). Cerințele produsului sunt comune; fișierele de intrare diferă doar pentru încărcarea instrucțiunilor. Notele versiunilor sunt în [CHANGELOG.md](CHANGELOG.md) și în pagina „Noutăți” din aplicație.
