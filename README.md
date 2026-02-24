# Trouve ton artisan

Application web full‑stack développée pour la Région Auvergne‑Rhône‑Alpes afin de faciliter la mise en relation entre particuliers et artisans locaux.

---

## 📋 Table des matières

- [À propos](#-à-propos)
- [Fonctionnalités](#-fonctionnalités)
- [Technologies utilisées](#-technologies-utilisées)
- [Prérequis](#-prérequis)
- [Structure du projet](#-structure-du-projet)
- [Installation](#-installation)
- [Lancement](#-lancement)
- [Livrables](#-livrables)

---

## 🎯 À propos

La région Auvergne‑Rhône‑Alpes dispose d’un écosystème artisanal particulièrement dense, représentant près d’un tiers des entreprises locales.
Cette plateforme a été conçue pour simplifier la recherche d’artisans et le contact direct, tout en garantissant une expérience fluide, accessible (WCAG 2.1) et mobile‑first.

---

## ✨ Fonctionnalités

- Accueil : présentation du service et mise en avant de trois artisans du mois

- Navigation par catégories (Bâtiment, Services, Fabrication, Alimentation)

- Recherche par nom d’artisan

- Fiche artisan détaillée : note, spécialité, localisation, description

- Formulaire de contact intégré

- Pages légales : mentions légales, données personnelles, accessibilité, cookies

- Design responsive (mobile, tablette, desktop)

- Page 404 pour les routes inexistantes

---

## 🛠️ Technologies utilisées

- Frontend
  React

- React Router

- Bootstrap

- Sass

- Fetch API

- Hooks personnalisés (SEO dynamique)

- Déploiement : Render Web Service

- Backend
  Node.js

- Express

- Sequelize

- PostgreSQL (hébergé sur Render)

- dotenv

- cors

- Déploiement : Render Web Service

- Outils
  Figma

- Visual Studio Code

- Git & GitHub

---

## 📦 Prérequis

- Node.js 18+

- npm

- Un compte Render (API + base PostgreSQL + frontend)

- pgAdmin ou tout autre client PostgreSQL (optionnel)

- VS Code recommandé

---

## 📁 Structure du projet

```
trouver_mon_artisan_app/
├── backend/                   # API Node.js
│   ├── config/                # Configuration PostgreSQL
│   ├── controllers/           # Logique métier
│   ├── models/                # Modèles Sequelize
│   ├── routes/                # Endpoints API
│   ├── .env                   # Variables d'environnement backend
│   └── server.js              # Point d'entrée API
├── public/                    # Assets statiques
├── src/                       # Frontend React
│   ├── assets/                # Images
│   ├── components/            # Composants réutilisables
│   ├── Hooks/                 # Hooks personnalisés
│   ├── views/                 # Pages
│   ├── styles/                # Sass
│   ├── App.js                 # Routage
│   └── index.js               # Entrée React
├── .env                       # Variables d'environnement frontend
├── package.json
└── README.md
```

---

## 🚀 Installation (développement local)

Cloner le dépôt

```bash
git clone https://github.com/Toon-mo/app-trouve-ton-artisan.git
cd app-trouve-ton-artisan
```

### 1. Backend — PostgreSQL (Render)

La base de données est hébergée sur Render.
Dans votre tableau de bord Render, récupérer les informations suivantes :

- DATABASE_URL

- HOST

- USER

- PASSWORD

- DATABASE

- PORT (5432 par défaut)

Créer ensuite le fichier .env dans /backend :

```
DB_HOST=your-render-host
DB_USER=your-render-user
DB_PASSWORD=your-render-password
DB_NAME=your-render-database
DB_DIALECT=postgres
DB_PORT=5432
PORT=3001
```

---

### 2. Frontend

```bash
npm install --legacy-peer-deps
```

Créer un fichier .env à la racine :

```bash
REACT_APP_API_URL=https://your-backend-service.onrender.com
```

---

### ▶️ Lancement en local

Backend

```bash
cd backend
node server.js
```

Messages attendus :

- « Connexion PostgreSQL établie avec succès »

- « API démarrée sur le port 3001 »

Frontend

```bash
cd ..
npm start
```

---

### 🌐 Déploiement

L’application est entièrement hébergée sur Render :

- Frontend : Render Web Service

- Backend : Render Web Service

- Base de données : Render PostgreSQL

Le frontend communique avec l’API via REACT_APP_API_URL.

---

### 📖 Livrables

- 📊 Rapport de conception
  https://github.com/Toon-mo/app-trouve-ton-artisan/blob/main/src/assets/pdf/RAPPORT_DE_CONCEPTION_ET_DEVELOPPEMENT.pdf

- 🎨 Maquettes Figma
  https://www.figma.com/design/xOKsqnGnTt8A0tjQ3q9XyU/Devoir-Bilan-Morieux-Tony (figma.com in Bing)

- 🌐 Application en ligne
  https://app-trouve-ton-artisan.onrender.com/

---

_Développé pour la Région Auvergne‑Rhône‑Alpes._

---
