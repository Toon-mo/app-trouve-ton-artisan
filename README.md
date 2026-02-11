# Trouve ton artisan !

Une application web développée pour la Région Auvergne-Rhône-Alpes afin de faciliter la mise en relation entre les particuliers et les artisans locaux.

## 📋 Table des matières

- [À propos](#-à-propos)
- [Fonctionnalités](#-fonctionnalités)
- [Technologies utilisées](#-technologies-utilisées)
- [Prérequis](#-prérequis)
- [Structure du projet](#-structure-du-projet)
- [Installation](#-installation)
- [Lancement](#-lancement)
- [Livrables](#-livrables)

## 🎯 À propos

La Région Auvergne-Rhône-Alpes, forte de son riche écosystème artisanal (près d'un tiers des entreprises régionales), a développé cette plateforme numérique fullstack. L'objectif est de simplifier la recherche et le contact des artisans par les particuliers, tout en garantissant une expérience utilisateur optimale et accessible (conformité WCAG 2.1, design mobile-first).

## ✨ Fonctionnalités

- **Page d'accueil** : Présentation du fonctionnement et "trois artisans du mois"
- **Navigation par catégorie** : Artisans classés par catégories (Bâtiment, Services, Fabrication, Alimentation)
- **Recherche d'artisans** : Barre de recherche par nom d'artisan
- **Fiche détaillée** : Profil complet avec note, spécialité, localisation, description et contact
- **Formulaire de contact** : Contact direct avec l'artisan depuis sa fiche
- **Pages légales** : Mentions légales, données personnelles, accessibilité, cookies
- **Design responsive** : Adaptation mobile, tablette et ordinateur
- **Gestion 404** : Page d'erreur pour les routes non trouvées

## 🛠️ Technologies utilisées

### Frontend

- **ReactJS** - Bibliothèque JavaScript
- **Bootstrap** - Framework CSS et composants UI
- **Sass** - Préprocesseur CSS
- **React Router DOM** - Navigation
- **Fetch API** - Requêtes HTTP
- **Hooks personnalisés** - Pour la gestion dynamique des titres et méta-descriptions des pages

### Backend

- **Node.js** - Runtime JavaScript
- **Express.js** - Framework web
- **Sequelize** - ORM pour MySQL
- **MySQL** - Base de données
- **dotenv** - Variables d'environnement
- **cors** - Gestion Cross-Origin

### Outils

- **Figma** - Maquettage
- **Visual Studio Code** - Éditeur
- **Git & GitHub** - Versionnement

## 📦 Prérequis

Avant l'installation, assurez-vous d'avoir :

- **Node.js** (version 18.x ou supérieure) - [Télécharger](https://nodejs.org/)
- **npm** (inclus avec Node.js)
- **Serveur MySQL** (version 8.x recommandée) - **La base de données sera hébergée localement pour ce devoir.**
- **phpMyAdmin** ou MySQL Workbench pour la gestion de la base
- **Éditeur de code** (VS Code recommandé)

## 📁 Structure du projet

```
trouver_mon_artisan_app/
├── backend/                   # API Node.js
│   ├── config/                # Configuration base de données
│   ├── controllers/           # Logique métier
│   ├── models/                # Modèles Sequelize
│   ├── routes/                # Endpoints API
│   ├── .env                   # Variables d'environnement backend
│   ├── create.sql             #Script de création de la base de données
│   ├── seed.sql               #Script d'ajout de données à la base de données
│   └── server.js              # Point d'entrée API
├── public/                    # Assets statiques
├── src/                       # Code source React
│   ├── assets/                # Images
│   ├── components/            # Composants réutilisables
|   ├── Hooks/                 # Hooks React personnalisés
│   ├── views/                 # Composants de pages
│   ├── styles/                # Fichiers Sass
│   ├── App.js                 # Composant racine et routage
│   └── index.js               # Point d'entrée React
├── .env                       # Variables d'environnement frontend
├── .gitignore
├── package.json
└── README.md
```

## 🚀 Installation

## Cloner le dépôt

Pour commencer, clonez ce dépôt GitHub sur votre machine locale :

```Bash
git clone https://github.com/Toon-mo/app-trouve_ton_artisan.git
cd app-trouve-ton-artisan
```

### 1. Base de données

1. Ouvrez phpMyAdmin
2. Créez une base de données nommée `trouvetonartisanapi`
3. Importez les scripts SQL :
   - `backend/create.sql` (structure des tables)
   - `backend/seed.sql` (données initiales)

### 2. Backend (API)

```bash
# Naviguez vers le dossier backend

cd app-trouve-ton-artisan/backend

# Créez le fichier .env avec vos paramètres MySQL (accès local uniquement)

DB_HOST=127.0.0.1
DB_USER=root
DB_PASSWORD=
DB_NAME=trouvetonartisanapi
DB_DIALECT=mysql
PORT=3001
```

### 3. Frontend

```bash
# Naviguez vers le dossier racine
cd..

# Installez les dépendances
npm install --legacy-peer-deps

# Créez le fichier .env a la racine
REACT_APP_API_URL=http://localhost:3001
```

## ▶️ Lancement

### Démarrer le backend

```bash
cd app-trouve-ton-artisan/backend
node server.js
```

✅ Message attendu : `Connexion à la base de données MySQL établie avec succès.` et `API démarrée sur le port 3001`

Vérifiez sur : http://localhost:3001/api/artisans/top

## Note importante pour le déploiement en ligne : L'application React est déployée sur GitHub Pages. Pour que celle-ci fonctionne pleinement, l'API backend doit être lancée séparément (localement par l'évaluateur ou sur un autre service).

### Démarrer le frontend

```bash
cd app-trouve-ton-artisan
npm start
```

## 📖 Livrables

- 📊 **Rapport de conception** : [Lien vers le PDF](https://github.com/Toon-mo/app-trouve-ton-artisan/blob/main/src/assets/pdf/RAPPORT_DE_CONCEPTION_ET_DEVELOPPEMENT.pdf)
- 🎨 **Maquettes Figma** : [[Lien vers le projet Figma](https://www.figma.com/design/xOKsqnGnTt8A0tjQ3q9XyU/Devoir-Bilan-Morieux-Tony?node-id=0-1&t=mYo54lJSy2OAwu4I-1)]
- 🌐 **Application en ligne** : [Lien vers le site déployé](https://toon-mo.github.io/app-trouve-ton-artisan/)

---

_Développé pour la Région Auvergne-Rhône-Alpes_
