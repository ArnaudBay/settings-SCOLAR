# Gestion Scolaire – Frontend établissement

Application de gestion scolaire en français permettant de gérer la structure académique et les paramètres d’un établissement (années scolaires, cycles, filières/streams, classes, etc.).

L’interface est construite autour d’un tableau de bord avec menu latéral (`Sidebar`) et en-tête (`Header`), et de plusieurs sections : tableau de bord, structure académique et paramètres généraux de l’établissement.

## Fonctionnalités principales

- **Tableau de bord** : vue d’ensemble des informations clés de l’établissement.
- **Paramètres généraux** : formulaire d’édition du profil de l’établissement (informations générales, logo, coordonnées, etc.).
- **Structure académique** : gestion hiérarchique `SchoolYear > Cycle > Stream > Class`.
- **Navigation par onglets** dans les paramètres : `Infos Générales` et `Structure Académique`.
- **UI 100 % française** avec messages d’erreur et textes d’interface en français.

## Stack technique

- **Framework** : React 18 + TypeScript
- **Bundler** : Vite
- **Styling** : Tailwind CSS (palette Slate + accents bleus)
- **Formulaires** : `react-hook-form` + `zod` pour la validation
- **Gestion de l’état** : hooks React (`useState`, etc.)

## Prérequis

- Node.js ou Bun installé sur la machine
- `npm` **ou** `bun` disponible en ligne de commande

## Installation & démarrage

Dans le dossier `etablissement` :

- **Installer les dépendances**
  - avec npm : `npm install`
  - avec Bun : `bun install`

- **Lancer le serveur de développement**
  - `npm run dev`  
  - ou `bun dev`

L’application sera accessible sur l’URL indiquée par Vite (en général `http://localhost:5173`).

## Scripts disponibles

- **Développement** : `npm run dev` / `bun dev`
- **Build production** : `npm run build`
- **Prévisualisation du build** : `npm run preview`
- **Lint** : `npm run lint`
- **Vérification de types** (optionnelle) : `npx tsc --noEmit`

## Structure du projet

Structure principale du dossier `src` :

```text
src/
├── components/
│   └── layout/
│       ├── Header.tsx
│       └── Sidebar.tsx
├── features/
│   ├── settings/
│   │   ├── Dashboard.tsx
│   │   └── GeneralSettings.tsx
│   └── academics/
│       └── AcademicManager.tsx
├── types/
│   └── index.ts
├── App.tsx
├── main.tsx
└── index.css
```

## Bonnes pratiques du projet

- Respecter la hiérarchie des données : `SchoolYear > Cycle > Stream > Class`.
- Garder tous les textes visibles côté utilisateur en **français**.
- Centraliser les types dans `src/types/index.ts`.
- Lancer `npm run lint` avant les commits pour conserver une base de code propre.

