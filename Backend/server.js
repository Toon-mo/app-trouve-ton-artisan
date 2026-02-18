const express = require("express");
const cors = require("cors");
require("dotenv").config(); // Pour utiliser les variables d'environnement

// On importe aussi 'sequelize' pour pouvoir synchroniser les tables
const { connectDB, sequelize } = require("./config/db"); // Importe la fonction de connexion à la DB
const apiRoutes = require("./routes/api"); // Importe les routes API consolidées

const app = express();
const PORT = process.env.PORT || 3001; // Utilise le port du .env ou 3001 par défaut

// Middlewares
app.use(cors()); // Active CORS pour toutes les requêtes
app.use(express.json()); // Permet de parser le JSON des requêtes

// Monte les routes API
app.use("/api", apiRoutes);

// Connecte la base de données avant de démarrer le serveur
connectDB().then(async () => {
  try {
    // Cette ligne crée les tables automatiquement si elles n'existent pas
    await sequelize.sync({ alter: true });
    console.log("Tables de la base de données synchronisées avec succès !");
    
  // Démarre le serveur
  app.listen(PORT, () => {
    console.log(`API démarrée sur le port ${PORT}`);
  });
} catch (syncError) {
    console.error("Erreur lors de la synchronisation des tables :", syncError);
  }
});

// Vérifie que l'API est accessible
app.get("/", (req, res) => {
  res.send("API Trouve ton artisan ! est en cours de fonctionnement.");
});
