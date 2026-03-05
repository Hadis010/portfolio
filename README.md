# Portfolio — Hafsa DINI

Portfolio personnel configurable construit avec **Vue 3**, **TypeScript** et **Vite**.  
Toute la personnalisation (textes, couleurs, projets, timeline…) se fait via un seul fichier JSON.

## Stack

| Couche | Technologie |
|--------|------------|
| Frontend | Vue 3 + TypeScript + Vite (rolldown-vite) |
| Backend | Elysia (Bun) — formulaire de contact |
| Linter/Formatter | Biome |
| Dead code | Knip |
| Package manager | Bun |
| CI | GitHub Actions (Biome + Knip + Build) |

## Démarrage rapide

```bash
# Installer les dépendances
bun install

# Lancer le dev (frontend + backend)
bun dev

# Build production
bun run build
```

Le frontend tourne sur `http://localhost:5173`, le backend sur `http://localhost:3000`.

## Configuration — `frontend/site.config.json`

Tout le contenu du site est piloté par le fichier **`site.config.json`** dans le dossier `frontend/`.  
Aucune connaissance en code n'est nécessaire pour le modifier.

### Structure du fichier

| Section | Description |
|---------|------------|
| `site` | Nom, titre, description, langue, URL, couleur du thème (SEO + meta) |
| `theme.colors` | Couleurs du site (`bg`, `text`, `muted`, `success`, `error`) |
| `theme.fonts` | Polices (`title`, `mono`) + URL Google Fonts |
| `hero` | Écran d'accueil : nom affiché, labels loader/scroll, image de fond, son ambiant |
| `about` | Section À propos : titre typing, paragraphe, CV (chemin + label), image |
| `contact` | Section Contact : titre, image, labels/placeholders/erreurs du formulaire |
| `footer` | Nom auteur + template copyright (`{{year}}` et `{{name}}` sont remplacés) |
| `nav` | Liens de navigation + labels paramètres (Son, Animations) |
| `social` | Réseaux sociaux (URL + icône Iconify + label accessibilité) |
| `techMap` | Dictionnaire de toutes les technologies (clé → icône + label) |
| `technologiesBanner` | Clés du `techMap` affichées dans la bande défilante |
| `timeline` | Parcours : formations et expériences professionnelles |
| `projects` | Projets : labels globaux + liste des projets avec technologies, liens, médias |

### Modifier les couleurs

Dans `frontend/site.config.json`, section `theme.colors` :

```json
"theme": {
  "colors": {
    "bg": "#151e16",
    "text": "#ecffee",
    "muted": "#808080",
    "success": "#69a47e",
    "error": "#da6a6a"
  }
}
```

Les couleurs sont appliquées automatiquement comme variables CSS au démarrage.

### Modifier les polices

```json
"theme": {
  "fonts": {
    "title": "Gluten",
    "mono": "Space Mono",
    "googleFontsUrl": "https://fonts.googleapis.com/css2?family=Gluten:wght@400;600;700&family=Space+Mono:wght@400;700&display=swap"
  }
}
```

Pour changer de police : aller sur [Google Fonts](https://fonts.google.com), copier l'URL d'import, et mettre à jour les noms + l'URL.

### Ajouter un projet

1. Ajouter le poster dans `frontend/public/projects/poster/` (ex: `mon-projet.jpg`)
2. Si vidéo : ajouter dans `frontend/public/projects/videos/` (ex: `mon-projet.mp4`)
3. Si les technologies n'existent pas encore dans `techMap`, les ajouter :
   ```json
   "techMap": {
     "react": { "icon": "devicon:react", "label": "React" }
   }
   ```
4. Ajouter le projet dans `projects.items` :
   ```json
   {
     "id": "mon-projet",
     "title": "Mon Projet",
     "description": "Description du projet...",
     "technologies": ["react", "ts", "docker"],
     "links": {
       "website": "https://mon-projet.com",
       "github": "https://github.com/user/mon-projet"
     },
     "video": "/projects/videos/mon-projet.mp4",
     "poster": "/projects/poster/mon-projet.jpg"
   }
   ```

### Ajouter une technologie à la bande défilante

1. S'assurer que la clé existe dans `techMap`
2. Ajouter la clé dans le tableau `technologiesBanner`

### Icônes

Les icônes utilisent [Iconify](https://icon-sets.iconify.design/). Pour trouver une icône :
1. Aller sur https://icon-sets.iconify.design/
2. Chercher (ex: "react", "angular")
3. Copier le nom complet (ex: `devicon:react`)
4. L'utiliser dans `techMap`, `social`, etc.

### Médias

Tous les fichiers média (images, vidéos, sons, CV) sont dans `frontend/public/` :

```
frontend/public/
├── img/                    # Images de sections (hero, about, contact)
├── projects/
│   ├── poster/             # Posters des projets (.jpg)
│   └── videos/             # Vidéos des projets (.mp4)
├── sound/                  # Son ambiant
├── CV-Hafsa.pdf           # CV téléchargeable
└── favicon.ico
```

## Architecture du code

```
frontend/src/
├── config/          # Chargement + types + application du site.config.json
│   ├── index.ts     # Import JSON + deep merge avec defaults
│   ├── types.ts     # Interface TypeScript SiteConfig
│   ├── defaults.ts  # Valeurs par défaut (fallback si config incomplète)
│   ├── theme.ts     # Applique les couleurs/fonts CSS au runtime
│   └── seo.ts       # Applique title/description/OG meta au runtime
├── data/            # Re-exports typés depuis la config
├── components/      # Composants Vue réutilisables
├── composables/     # Hooks Vue (animations, Lenis, typing)
├── lib/             # Utilitaires (client API, animations)
├── pages/           # Pages/sections du portfolio
├── assets/          # CSS global uniquement
└── main.ts          # Point d'entrée (mount + theme + SEO)
```

## Déploiement

### Build de production

```bash
bun run build
```

Les fichiers sont générés dans `frontend/dist/`.

### Checklist de déploiement

- [ ] Mettre à jour `site.url` dans `site.config.json`
- [ ] Vérifier que `VITE_API_URL` pointe vers le bon backend
- [ ] S'assurer que le CV PDF est bien dans `frontend/public/`
- [ ] Vérifier les images et vidéos dans `frontend/public/projects/`
- [ ] Tester le formulaire de contact (backend Elysia opérationnel)

### Headers recommandés (Nginx / reverse proxy)

```nginx
# Cache statique long pour les assets hashés
location /assets/ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}

# Cache modéré pour les médias publics
location ~* \.(jpg|jpeg|png|gif|webp|mp4|mp3|pdf|ico)$ {
    expires 30d;
    add_header Cache-Control "public";
}

# Sécurité
add_header X-Content-Type-Options "nosniff" always;
add_header X-Frame-Options "SAMEORIGIN" always;
add_header Referrer-Policy "strict-origin-when-cross-origin" always;
```

### Variables d'environnement

Frontend (`frontend/.env`):

| Variable | Défaut | Description |
|----------|--------|------------|
| `VITE_API_URL` | `http://localhost:3000` | URL du backend Elysia |

Backend (`backend/.env`):

| Variable | Défaut | Description |
|----------|--------|------------|
| `BREVO_API_KEY` | _(requis)_ | Clé API Brevo pour l'envoi d'email |
| `TURNSTILE` | _(requis)_ | Clé secrete Cloudflare Turnstile pour verifier le captcha |
| `CONTACT_TO_EMAIL` | _(requis)_ | Adresse destinataire des messages du formulaire |
| `CONTACT_FROM_EMAIL` | _(requis)_ | Adresse expéditeur configurée/validée dans Brevo |
| `CONTACT_FROM_NAME` | `Portfolio Contact` | Nom affiché pour l'expéditeur |

## Lint & Quality

```bash
# Vérifier le code (Biome + Knip)
bun run check

# Formater
bun run format

# Lint + fix
bun run lint
```
