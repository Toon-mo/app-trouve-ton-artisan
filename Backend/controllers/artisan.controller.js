const db = require("../models"); // Importe tous les modèles via l'objet db
const { Op } = require("sequelize"); // Importe l'objet Op depuis sequelize

// Récupère tous les artisans
exports.getAllArtisans = async (req, res) => {
  try {
    // Récupère les paramètres de recherche depuis l'URL
    const { search, specialiteId, categoryId } = req.query;

    // Conditions de recherche pour les artisans
    let whereClause = {};
    // Conditions de recherche pour les spécialités
    let specialiteWhereClause = {};

    // Si recherche par nom
    if (search) {
      whereClause.nom_artisan = { [Op.like]: `%${search}%` };
    }

    // Si filtre par spécialité
    if (specialiteId) {
      whereClause.id_specialite = specialiteId;
    }

    // Si filtre par catégorie
    if (categoryId) {
      specialiteWhereClause.id_categorie = categoryId;
    }

    // Recherche dans la base avec les filtres
    const artisans = await db.Artisan.findAll({
      where: whereClause, // Conditions sur les artisans
      include: [
        {
          model: db.Specialite,
          as: "specialite",
          // Applique les conditions sur spécialité si elles existent
          where:
            Object.keys(specialiteWhereClause).length > 0
              ? specialiteWhereClause
              : undefined,
          include: [
            {
              model: db.Categorie,
              as: "categorie", // Inclut aussi la catégorie
            },
          ],
        },
      ],
    });

    // Renvoie les résultats
    res.json(artisans);
  } catch (error) {
    console.error("Erreur lors de la récupération des artisans :", error);
    // Erreur serveur
    res.status(500).json({
      message: "Erreur serveur lors de la récupération des artisans.",
    });
  }
};

// Récupère un artisan spécifique par son ID
exports.getArtisanById = async (req, res) => {
  try {
    // Récupère l'ID depuis les paramètres d'URL
    const { id_artisan } = req.params;

    // Cherche l'artisan par ID avec ses relations
    const artisan = await db.Artisan.findByPk(id_artisan, {
      include: [
        {
          model: db.Specialite,
          as: "specialite",
          include: [
            {
              model: db.Categorie,
              as: "categorie", // Inclut la catégorie
            },
          ],
        },
      ],
    });

    // Si artisan pas trouvé
    if (!artisan) {
      return res.status(404).json({ message: "Artisan non trouvé." });
    }

    // Renvoie l'artisan trouvé
    res.json(artisan);
  } catch (error) {
    console.error("Erreur lors de la récupération de l'artisan :", error);
    // Erreur serveur
    res.status(500).json({
      message: "Erreur serveur lors de la récupération de l'artisan.",
    });
  }
};

// Récupère les 3 meilleurs artisans du mois
exports.getTopArtisans = async (req, res) => {
  try {
    // Cherche les artisans marqués comme "top" (top = 1)
    const topArtisans = await db.Artisan.findAll({
      where: { top: true }, 
      limit: 3, // Maximum 3 résultats
      include: [
        {
          model: db.Specialite,
          as: "specialite",
          include: [
            {
              model: db.Categorie,
              as: "categorie", // Inclut la catégorie
            },
          ],
        },
      ],
    });

    // Renvoie les top artisans
    res.json(topArtisans);
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des artisans Top du mois :",
      error
    );
    // Erreur serveur
    res.status(500).json({
      message:
        "Erreur serveur lors de la récupération des artisans Top du mois.",
    });
  }
};
