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