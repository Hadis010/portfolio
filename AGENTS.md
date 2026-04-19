# AI Agents Rules & Workflows

Ce fichier centralise les règles et workflows pour les agents IA travaillant sur ce projet.

---

## 🚀 Workflows - Commits

Vous êtes mon assistant de commit pour ce dépôt.

### Objectif
Générer des messages de commit Git et un plan multi-commit en utilisant exactement ce format :
`"<emoji> - (<type>) <short description>"`
Exemple : `"✨ - (feat) Replace old images"`

### Types autorisés (Choisir parmi cette liste)
ui | component | page | route | layout | service | style | feat | fix | evol | refactor | perf | test | docs | ci | chore | build | deps | config | db | api | auth | security | ux

### Mapping des Emojis (Doit correspondre)
- ui        -> 🎨
- component -> 🧩
- page      -> 📄
- route     -> 🧭
- layout    -> 🧱
- service   -> 🧰
- style     -> 💅
- feat      -> ✨
- fix       -> 🐛
- evol      -> 🚀
- refactor  -> ♻️
- perf      -> ⚡️
- test      -> ✅
- docs      -> 📝
- ci        -> 👷
- chore     -> 🔧
- build     -> 🏗️
- deps      -> ⬆️
- config    -> ⚙️
- db        -> 🗄️
- api       -> 🔌
- auth      -> 🔐
- security  -> 🛡️
- ux        -> 🧠

### Règles de description (Strictes)
- Anglais uniquement
- Max 60 caractères (limite stricte)
- Première lettre en majuscule
- Pas de point final
- Utiliser un verbe d'action (Add/Update/Fix/Refactor/Improve/Remove)
- Rester simple et spécifique

### Règle de découpage (Crucial)
Utiliser "ONE UNIT = ONE COMMIT" autant que possible.
Une "unité" correspond à :
- UN composant réutilisable
- UNE page
- UN groupe de routes
- UN layout
- UN service
- UN module backend (controller/router/service)
- UN ensemble de changements DB (migration/schema)

---

## 🛠️ Règles - Backend (Elysia)

Référence : [ElysiaJS Best Practice](https://elysiajs.com/essential/best-practice.html)

### Structure des dossiers
Privilégier une structure par feature :
```
src/modules/<feature>/
  index.ts   → controller Elysia (routes, validation HTTP)
  service.ts → logique métier découplée
  model.ts   → schémas de validation (Elysia t) et types
```

### Controller
- **À faire** : une instance Elysia = un controller. Définir les routes directement sur l’instance.
- **À éviter** : passer tout le `Context` à une classe/fonction externe (perte de typage).
- Extraire uniquement ce dont le handler a besoin et le passer au service.

### Service
- Logique métier sans dépendance directe à la requête HTTP : **fonctions pures** exportées via un **objet nommé** (pas de classe à membres uniquement statiques).
- Ce qui dépend de la requête (session, cookie, etc.) : macro Elysia ou plugin nommé, pas une classe qui reçoit `Context`.

### Model
- Utiliser le système de validation Elysia (`t.Object`, etc.) comme unique source de vérité.
- Dériver les types avec `typeof schema.static` ; ne pas dupliquer en `interface` ou classe.
