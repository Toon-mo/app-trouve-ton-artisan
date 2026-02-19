// Import d'Express pour créer les routes
const express = require("express");
// Création du routeur
const router = express.Router();

// Import des contrôleurs
const categorieController = require("../controllers/categorie.controller");
const artisanController = require("../controllers/artisan.controller");
const specialiteController = require("../controllers/specialite.controller");
const contactController = require("../controllers/contact.controller");

// Routes pour les catégories
router.get("/categories", categorieController.getAllCategories); // Récupère toutes les catégories
router.get("/categories/name", categorieController.getCategoryByName); // Recherche une catégorie par nom
router.get("/categories/slug/:slug", categorieController.getCategoryBySlug);


// Routes pour les artisans
router.get("/artisans", artisanController.getAllArtisans); // Récupère tous les artisans (avec filtres)
router.get("/artisans/top", artisanController.getTopArtisans); // Récupère les 3 meilleurs artisans
router.get("/artisans/:id_artisan", artisanController.getArtisanById); // Récupère un artisan par son ID

// Routes pour les spécialités
router.get("/specialites", specialiteController.getAllSpecialites); // Récupère toutes les spécialités
router.get(
  "/categories/:id_categorie/specialites", // Récupère les spécialités d'une catégorie
  specialiteController.getSpecialitesByCategory
);

// Route pour le contact
router.post("/contact", contactController.submitContactForm); // Traite l'envoi du formulaire de contact

// Export du routeur pour l'utiliser dans l'app principale
module.exports = router;
