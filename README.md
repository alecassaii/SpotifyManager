# Spotify Family Plan Tracker

Webapp PWA per gestire i costi del piano Spotify Family.

## Deploy su GitHub Pages (gratuito)

### 1. Crea il repo
- Vai su [github.com](https://github.com) → **New repository**
- Nome: `spotify-family` (o quello che vuoi)
- Visibilità: **Private** (consigliato, i dati sono nel browser ma per sicurezza)
- Clicca **Create repository**

### 2. Carica i file
Trascina nella pagina del repo questi file:
```
index.html
manifest.json
sw.js
icon-192.png
icon-512.png
```
Oppure usa Git:
```bash
git init
git add .
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/TUO-USERNAME/spotify-family.git
git push -u origin main
```

### 3. Attiva GitHub Pages
- Vai in **Settings** → **Pages**
- Source: **Deploy from a branch**
- Branch: `main` → `/root`
- Clicca **Save**

Dopo 1-2 minuti l'app sarà disponibile su:
`https://TUO-USERNAME.github.io/spotify-family/`

### 4. Installa come app sul telefono
**iPhone (Safari):**
1. Apri il link in Safari
2. Tocca l'icona di condivisione (□↑)
3. Seleziona "Aggiungi alla schermata Home"

**Android (Chrome):**
1. Apri il link in Chrome
2. Comparirà automaticamente il banner "Installa app"
3. Oppure: menu ⋮ → "Aggiungi alla schermata Home"

## Dati & Backup
- I dati sono salvati nel `localStorage` del browser (solo su quel device)
- Usa **Esporta JSON** nelle impostazioni per fare backup
- Usa **Importa JSON** per ripristinare su un altro device

## Struttura file
```
spotify-family/
├── index.html       ← app completa
├── manifest.json    ← configurazione PWA
├── sw.js            ← service worker (offline)
├── icon-192.png     ← icona app
├── icon-512.png     ← icona app HD
└── README.md        ← questa guida
```
