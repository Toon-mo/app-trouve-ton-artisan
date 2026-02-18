// Charge les variables d'environnement
require("dotenv").config();

// Import de Sequelize pour la gestion de la base de données
const { Sequelize } = require("sequelize");

// Création de la connexion à la base de données
const sequelize = new Sequelize(
  process.env.DB_NAME, // Nom de la base de données (dans le fichier .env)
  process.env.DB_USER, // Nom d'utilisateur de la base (dans le fichier .env)
  process.env.DB_PASSWORD, // Mot de passe de la base (dans le fichier .env)
  {
    host: process.env.DB_HOST, // Adresse du serveur
    dialect: process.env.DB_DIALECT, // Type de base de données (mysql)
    logging: false, // Désactive le logging SQL dans la console pour ne pas la surcharger
  }
);

// Fonction asynchrone de test de la connexion à la base de données

async function connectDB() {
  try {
    // Tentative de connexion à la base de données
    await sequelize.authenticate();
    console.log("Connexion à la base de données établie avec succès.");
  } catch (error) {
    // En cas d'erreur de connexion
    console.error("Impossible de se connecter à la base de données :", error);
    process.exit(1); // Arrête l'application en cas d'échec
  }
}

// Export pour utiliser ailleurs
module.exports = { sequelize, connectDB };
