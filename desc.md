# Gestion Scolaire – Frontend établissement

Application de gestion scolaire en français permettant de gérer la structure académique et les paramètres d’un établissement (années scolaires, cycles, filières, classes.).



## Fonctionnalités principales

- **Tableau de bord** : vue d’ensemble des informations clés de l’établissement.
- **Paramètres généraux** : formulaire d’édition du profil de l’établissement (informations générales, logo, coordonnées, etc.).
- **Structure académique** : gestion hiérarchique `années scolaires > Cycle > filières > classes`.
- **Navigation par onglets** dans les paramètres : `Infos Générales` et `Structure Académique`.
- **UI 100 % française** avec messages d’erreur et textes d’interface en français.

## Stack technique

- **Framework** : React 18 + TypeScript
- **Bundler** : Vite
- **Styling** : Tailwind CSS (palette Slate + accents bleus)
- **Formulaires** : `react-hook-form` + `zod` pour la validation
- **Gestion de l’état** : hooks React (`useState`, etc.)

## Prérequis

- Bun installé sur la machine
- `bun` disponible en ligne de commande



- L’application sera accessible sur l’URL indiquée par Vite (en général `http://localhost:5173`).



## Structure du projet

Structure principale du dossier `src` :

```text
src/
├── components/
│   └── navBar/
│       ├── Pages.tsx
│       └── Header.tsx
├── features/
│   ├── settings/
│   │   ├── AnneScolaire.tsx
│   │   └── Cycles.tsx
    │   └── Classes.tsx
    │   └── Filieres.tsx
│   
├── types/
│   └── index.ts
├── App.tsx
├── main.tsx
└── index.css
```

## Bonnes pratiques du projet

- Respecter la hiérarchie des données : `années scolaires > Cycle > filières > classes`.
- Garder tous les textes visibles côté utilisateur en **français**.
- Centraliser les types dans `src/types/index.ts`.
