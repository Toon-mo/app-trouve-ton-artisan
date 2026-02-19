// Import du modèle Categorie
const { Categorie } = require("../models");

// Récupère toutes les catégories
exports.getAllCategories = async (req, res) => {
  try {
    // Recherche toutes les catégories dans la base de données
    const categories = await Categorie.findAll();

    // Retourne la liste des catégories en JSON
    res.json(categories);
  } catch (err) {
    // Affiche l'erreur dans la console pour le debug
    console.error("Erreur lors de la récupération des catégories :", err);

    // Retourne une erreur 500 avec un message d'erreur
    res.status(500).json({
      message: "Erreur serveur lors de la récupération des catégories.",
    });
  }
};

// Récupère une catégorie par son nom
exports.getCategoryByName = async (req, res) => {
  // Récupère le nom de la catégorie depuis les paramètres de la requête (?name=...)
  const { name } = req.query;

  try {
    // Cherche une catégorie avec ce nom précis
    const category = await Categorie.findOne({
      where: { nom_categorie: name },
    });

    // Si aucune catégorie n'est trouvée avec ce nom
    if (!category)
      return res.status(404).json({ error: "Catégorie introuvable" });

    // Retourne la catégorie trouvée
    res.json(category);
  } catch (err) {
    // Affiche l'erreur dans la console pour le debug
    console.error(
      "Erreur lors de la récupération de la catégorie par nom :",
      err
    );

    // Retourne une erreur 500 avec le message d'erreur détaillé
    res.status(500).json({ error: err.message });
  }
};

// Récupère une catégorie par son slug
exports.getCategoryBySlug = async (req, res) => {
  // Récupère le slug depuis les paramètres de l’URL (/slug/:slug)
  const { slug } = req.params;

  try {
    // Recherche une catégorie correspondant à ce slug
    const category = await Categorie.findOne({
      where: { slug },
    });

    // Si aucune catégorie n'est trouvée avec ce slug
    if (!category)
      return res.status(404).json({ error: "Catégorie introuvable" });

    // Retourne la catégorie trouvée
    res.json(category);
  } catch (err) {
    // Affiche l'erreur dans la console pour le debug
    console.error("Erreur lors de la récupération de la catégorie par slug :", err);

    // Retourne une erreur 500 avec un message d'erreur
    res.status(500).json({ error: "Erreur serveur" });
  }
};

