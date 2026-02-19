// Import des types de données Sequelize
const { DataTypes } = require("sequelize");
// Import de la connexion à la base de données
const { sequelize } = require("../config/db");

// Définition du modèle Categorie
const Categorie = sequelize.define(
  "Categorie", // Nom du modèle
  {
    // ID unique de la catégorie
    id_categorie: {
      type: DataTypes.INTEGER, // Nombre entier
      primaryKey: true, // Clé primaire pour rendre la colonne unique
      autoIncrement: true, // Incrémente à chaque nouvelle entrée
      field: "id_categorie", // Nom de la colonne dans la table
    },
    // Nom de la catégorie
    nom_categorie: {
      type: DataTypes.STRING(50), // Texte de 50 caractères max
      allowNull: false, // Champ obligatoire
      field: "nom_categorie", // Nom de la colonne dans la table
    },
    // Slug de la catégorie
    slug: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
      field: "slug",
    },
  },
  {
    tableName: "tab_categorie", // Nom de la table dans la base
    timestamps: false, // Pas de colonnes created_at/updated_at
  },
);

// Export du modèle pour l'utiliser ailleurs
module.exports = Categorie;
